---
STATUS: ACTIVE
LAST_UPDATED: 2026-07-06
PURPOSE: Nolla難易度調整の技術仕様（判定条件・パラメータ・刻み・初期値・クランプ・コード参照）。開発者向け
RELATED: nolla_difficulty_design_rationale.md(思想・根拠), nolla_game_mechanics_design.md, nolla_adaptive_difficulty_design_0d2.md(archive)
AUDIENCE: エンジニア
---

# Nolla 難易度設計 —「技術仕様」版

> 難易度調整が**実際どう動くか**の仕様。実装コード準拠（app/src/lib/）。
> **背景・思想・エビデンス・事業判断は [nolla_difficulty_design_rationale.md](nolla_difficulty_design_rationale.md) を参照。**

## 0. 概要
難易度は「その子の正解率75〜80%を保つ点」に適応的に寄せる（Staircase法）。以下は神経衰弱（memory-match）を主例に記載。他3ゲーム（sorting / visual-search / corsi-block）も同じ枠組みで、パラメータと優先順位のみ異なる。

---

## 1. 難易度パラメータ（神経衰弱）

| 優先 | パラメータ | 記号 | 範囲 | 難化方向 |
|---|---|---|---|---|
| 1 | ペア数 | pairs | 2–24 | 増やす |
| 2 | 絵柄の視覚類似度 | similarity | 0–100% | 似せる |
| 3 | めくり猶予（自動で裏返るまで）| flipDelay | 800–2000ms | 短くする |
| 4 | カードサイズ | cardSize | 64–96px | 小さくする |

**合成難易度 b**（IRTのbパラメータ。NCI推定に接続）:
```
b = 0.5×log(pairs) + 0.3×(similarity/100) + 0.2×(1 − flipDelay/2000)
```

---

## 2. 調整ロジック

### 2.1 判定タイミング
**1ラウンド終了ごと**に評価。1ラウンド ＝「5試行 or 2分」の早い方。**ラウンド中は変更しない**（予測可能性の担保）。

### 2.2 難易度UP条件：N連続正解
1ラウンド内で **N回連続正解** → 優先順位に従い1パラメータUP。NはIQ帯依存：

| IQ帯 | N | 収束正解率 |
|---|---|---|
| 21–50 | 5 | ~83% |
| 51–70 | 4 | ~80% |
| 71–110 | 3 | ~75% |

`getConsecutiveWinThreshold(iqBand)` → [staircase/threshold.ts](../app/src/lib/staircase/threshold.ts)

### 2.3 難易度DOWN条件：ヒントStage3到達 ≥ 2
**不正解は記録しない**（エラーレス学習でサイレント修正）。代わりに「ヒント3段階目（＝自力で解けずヒント全消費）到達回数」で判定。
- 1ラウンドで **hintStage3Count ≥ 2** → 1パラメータDOWN
- 定数 `HINT_STAGE3_DOWN_THRESHOLD = 2` → [staircase/calculate.ts:37](../app/src/lib/staircase/calculate.ts)

### 2.4 いずれも満たさなければ維持

### 2.5 1段階で動くパラメータ（1ラウンド1つだけ）
UPは優先1から、DOWNは優先4から逆順に「動かせる最初の1つ」を選ぶ。

| 優先 | UP | DOWN |
|---|---|---|
| 1 pairs | `ceil(pairs × step)` | `floor(pairs ÷ step)` |
| 2 similarity | `+step%` | `−step%` |
| 3 flipDelay | `−step ms` | `+step ms` |
| 4 cardSize | `−4px` | `+4px` |

pairsのみ乗算（指数的に難化するため）。他ゲームの優先順位・増減式は [staircase/calculate.ts](../app/src/lib/staircase/calculate.ts) 参照（sorting=items→categories→switching、visual-search=sceneItems→diffSubtlety→diffCount、corsi=seqLength(+1/-1)→blocks→displayMs）。

---

## 3. 刻み・初期値・復元・クランプ

### 3.1 刻み step（反転回数で精密化）
| Phase | reversalCount | step |
|---|---|---|
| 1 探索 | 0–2 | 1.20 |
| 2 収束 | 3–5 | 1.10 |
| 3 精密 | 6+ | 1.05 |

`getStepSize(reversalCount)` → [staircase/step-size.ts](../app/src/lib/staircase/step-size.ts)
step→単位換算: similarity `(step−1)×100`%、flipDelay `(step−1)×1000`ms、cardSize 固定4px。

### 3.2 初期値（初回プレイ）
`pairs=2, similarity=10, flipDelay=1500, cardSize=80` → [games/memory-match/generate.ts](../app/src/lib/games/memory-match/generate.ts)（initial.ts）
⚠️ 議論中の変更案：初期 pairs=2 → 3（下限2は維持）。※未実装。詳細は rationale 版 §5。

### 3.3 セッション復元
| 状況 | 挙動 |
|---|---|
| 2回目以降 | 前回終了時の params ＋ reversalCount を復元（localStorage `nolla_last_params_<childId>_<gameType>`）|
| 14日以上ブランク | params は復元、reversalCount のみリセット（Phase1で再探索）|

### 3.4 暴走防止クランプ（全変更後に適用）
pairs 2–24 / similarity 0–100 / flipDelay 800–2000 / cardSize 64–96 → [staircase/clamp.ts](../app/src/lib/staircase/clamp.ts)

### 3.5 ペア数 → 盤面グリッド
`2=2×2, 3=2×3, 4=2×4, 5=2×5, 6=3×4, 8=4×4, 10=4×5, 12=4×6, 15=5×6, 18=6×6, 20=5×8, 24=6×8`（範囲外はsqrtで自動算出）→ [games/memory-match/generate.ts:25-38](../app/src/lib/games/memory-match/generate.ts)

---

## 4. イレギュラー（偏り・異常）対応の実装現状

### ✅ 既にある耐性
- 反転で刻みを細かく（UP/DOWN振動の収束）
- クランプ（範囲外に出さない）
- 14日ブランクで reversalCount リセット
- ラウンド単位（5試行/2分）判定で単発ノイズを平滑化

### ⚠️ 未対応・要修正
| イレギュラー | 現状 |
|---|---|
| まぐれ・連打での偽の連続正解 | 未対応（タップ速度を難易度側が見ていない）|
| 一時的不調（疲れ・不機嫌）| 未対応 |
| 軸の偏り | 仕様（優先1が上限に達するまで他軸が動かない）|
| 特定ゲーム偏りプレイ | 設計のみ・未実装（デイリー惑星パスポート案は保留）|

### ⚠️ `detectAnomalies` が作りかけ（要修正）
[session/anomaly.ts](../app/src/lib/session/anomaly.ts)：
1. **どこからも呼ばれていない**（定義とindex re-exportのみ＝デッドコード）
2. **返り値がプレースホルダー**で計算結果を捨てている（未完成。`readonly` をオブジェクトリテラルに記述しており構文的にも要確認）
3. **Staircaseに接続されていない**（calculate.ts は anomaly を参照しない）

→ 修正方針：返り値を実装 → detectAnomalies を呼び出し → 「rapidTapping/lowEngagement の回はUP/DOWN判定をスキップ or 保留」を calculate 側に接続。

---

## 5. コード参照マップ（app/src/lib/）

| 役割 | ファイル |
|---|---|
| 調整本体（UP/DOWN、優先順位、増減式）| staircase/calculate.ts |
| UP閾値 N（IQ帯別）| staircase/threshold.ts |
| 刻み step（Phase）| staircase/step-size.ts |
| 上限下限クランプ | staircase/clamp.ts |
| 初期値・ボード生成・グリッド | games/memory-match/generate.ts |
| 難易度b算出（NCI接続）| nci/difficulty-b.ts |
| 異常検出（未完成）| session/anomaly.ts |
| ラウンド区切り | session/trials-per-round.ts |
| セッション状態機械 | session/session-state.ts |

---

*コード準拠 2026-07-06。実装変更時は本ファイルを更新し、思想・判断は rationale 版と同期すること。*
