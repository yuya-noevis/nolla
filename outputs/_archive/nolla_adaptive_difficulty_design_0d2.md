# Nolla 適応型難度調整ロジック設計（0-D-2）

**作成日**: 2026-04-06
**ステータス**: CONFIRMED（2026-04-06 Yuya承認）
**参照**: 
- `nolla_adaptive_difficulty_algorithm_research.md`（エビデンスベースの研究レポート）
- `nolla_game_mechanics_design.md`（0-D-1、ゲーム仕様）
- `nolla_nci_algorithm_design.md`（0-D-5、スコアリング）
- `project_game_design_decisions.md`（確定事項）

---

## 0. 概要

適応型難度調整（Adaptive Difficulty Adjustment, ADA）は、Nollaのゲーム体験の核。子どもの実時間パフォーマンスに応じて、ゲーム内の複数パラメータを独立に調整し、**常に成功率75-80%の「学習の黄金帯」を維持する**。

**設計方針**:
1. **Up-Down Staircase Method** を採用（簡潔、エビデンス高、ASD特有の「予測可能性」要件に適合）
2. **4ゲーム × 3-4パラメータ = 計14パラメータ**を独立に追跡・調整
3. **ラウンド終了時のみ難度変更**（ラウンド中の急激な変化を避ける）
4. **IQバンド別の初期値・調整速度カスタマイズ** で、IQによる個人差に対応
5. **NCI θ値と双方向に同期** → 難度調整ロジックとスコアリング/測定が相互支援

---

## 1. 採用アルゴリズム: Up-Down Staircase Method の詳細設計

### 1.1 基本原理

```
N回連続正解 → 難度UP（パラメータを大きくする）
1回不正解   → 難度DOWN（パラメータを小さくする）
↓
自動的に成功率 ~75-80% に収束

Nの値はIQ帯別に異なる（1.3節参照）
```

**統計的根拠**:
- 確率論: N-Down/1-Up Rule は α = 1/(N+1) の失敗率に自動収束
  - N=2: 67%成功率、N=3: 75%、N=4: 80%、N=5: 83%
- Leventhal & Levy (1968): 十分な試行後、成功率は理論値に漸近的に接近

### 1.2 ASD児向け設計上の工夫

#### 1.2.1 「予測可能な難度変更」の実装

**ASD児の不安パターン**（エビデンス: Pellicano & Burr, 2012）:
- 予告なしのルール変更 → パニック（40-84%のASD児が予測可能性を強く求める）
- 急激な難度跳躍 → 混乱・脱落

**対策**:
- ラウンド**終了時のみ**難度変更（ゲーム中の変更禁止）
- 難度変更時に柔らかい視覚演出（背景の色味が微妙に変わる等）
- 難度の上限・下限設定により、極端な跳躍を事前に防止
- 子どもには難度の概念を**一切見せない**（0-D-1 確定事項）

#### 1.2.2 可変ステップサイズ（反転回数に応じた縮小）

**固定ステップサイズは採用しない。** 心理物理学の確立された知見（Kaernbach, 1991; Garcia-Perez, 1998）に基づき、反転回数に応じてステップサイズを段階的に縮小する。

```
【反転とは】
  難度が「上昇→下降」または「下降→上昇」に切り替わった瞬間。
  例: 正解が続いて難度UP → 不正解で難度DOWN = 1回の反転

【ステップサイズの縮小】

  Phase 1 — 探索期（反転 0-2回）:
    乗算係数 = 1.20（20%刻み）
    目的: 子どもの能力帯を素早く大まかに見つける

  Phase 2 — 収束期（反転 3-5回）:
    乗算係数 = 1.10（10%刻み）
    目的: 適切な難度帯に絞り込む

  Phase 3 — 精密期（反転 6回以上）:
    乗算係数 = 1.05（5%刻み）
    目的: 最適点の微調整。以降ずっとこの精度で維持

【効果】
  初回プレイ: 素早く適切な難度に到達（退屈/困難が長く続かない）
  通常プレイ: 既にPhase 3。微調整のみ（安定した体験）
  ブランク復帰: 反転カウンタをリセット → Phase 1から再探索
```

**エビデンス**: Garcia-Perez (1998) "Forced-choice staircases with fixed step sizes" — 可変ステップサイズが固定ステップサイズより精度・収束速度の両方で優れることを数学的に実証。

### 1.3 IQ帯別の連続成功数（N値）

CogMed研究（PMC5993974）で「ASD+知的障害児には標準ペースが早すぎた」と報告されている。低IQ帯では難化条件をより保守的にする。

```
【連続正解N回で難度UP / エラーレスStage 3が2回以上で難度DOWN】

| IQ帯    | N（難化条件） | 理論収束成功率 | 根拠 |
|---------|-------------|--------------|------|
| 21-50   | 5           | ~83%         | 成功体験を多く積ませる。CogMed失敗の教訓 |
| 51-70   | 4           | ~80%         | 標準的な学習最適帯 |
| 71-85   | 3           | ~75%         | 85%ルール下限（Nature Comms 2019） |
| 86-110  | 3           | ~75%         | 同上。ASD児は不確実性耐性が低いため安全側 |

注: 理論収束値はα = 1/(N+1)による。
```

**IQ 86-110帯もN=3とする理由**: 85%ルール（Nature Communications, 2019）の最適学習帯は75-85%。N=2では理論収束67%となり、この範囲を外れる。IQ 86-110でもASD児である以上、不確実性への耐性は定型発達児より低く、67%（3回に1回失敗）は不安トリガーのリスクがある。フィールドテストで「この層にはN=2が適切」と判明した場合にのみ変更する。

### 1.4 初期配置アルゴリズム（初回プレイ）

```
【初回プレイ時の開始位置推定】

Step 1: Band B2（IQ 44-50相当）のパラメータで開始
  理由: 対象ユーザーの中央値付近。高すぎず低すぎない

Step 2: 最初の5試行を「探索フェーズ」として扱う
  可変ステップサイズ Phase 1（係数1.20）が自動適用される
  → 5試行で概ね2-3回の反転が起き、大まかな能力帯が判明

Step 3: 探索フェーズの結果に基づくジャンプ
  5試行の正答率に応じて、一度だけ大きなジャンプを許可:

  | 正答率 | アクション |
  |--------|-----------|
  | 100%（5/5） | 現在のパラメータ × 1.5 にジャンプ |
  | 80-99% | 現在のパラメータ × 1.25 にジャンプ |
  | 60-79% | ジャンプなし（現在位置で適切） |
  | 40-59% | 現在のパラメータ × 0.75 にジャンプ |
  | 0-39%  | 現在のパラメータ × 0.5 にジャンプ |

Step 4: ジャンプ後は通常のStaircaseに移行
  反転カウンタはリセットしない（探索フェーズの反転を引き継ぐ）

【ブランク復帰時（14日以上プレイなし）】
  前回の最終パラメータから開始（ジャンプしない）
  ただし反転カウンタを0にリセット → Phase 1の大きなステップで再探索
  理由: 能力低下の可能性があるが、前回の位置が最良の推定値
```

---

## 2. 共通Staircaseエンジン

4ゲーム全てが同じエンジンを使う。ゲーム固有の部分はパラメータ定義と優先順位のみ。

### 2.1 共通ロジック（疑似コード）

```
// 各ゲーム共通の Staircase エンジン
function adjustDifficulty(game, roundResult, state) {

  // 1. 連続成功数Nを取得（IQ帯別）
  const N = getConsecutiveWinThreshold(state.iq_band)
  // IQ 21-50: N=5, IQ 51-70: N=4, IQ 71-110: N=3

  // 2. 現在のステップサイズを取得（反転回数に応じて縮小）
  const step = getStepSize(state.reversal_count)
  // 反転0-2回: 1.20, 反転3-5回: 1.10, 反転6+回: 1.05

  // 3. 判定
  if (roundResult.consecutive_correct >= N) {
    // 難度UP: 優先パラメータから順に上げる
    const adjusted = increaseByPriority(game.params, step)
    if (directionChanged(state.last_direction, "up")) {
      state.reversal_count += 1  // 反転カウント
    }
    state.last_direction = "up"
    state.consecutive_correct = 0  // リセット
    return adjusted

  } else if (roundResult.has_error) {
    // 難度DOWN: 逆順で戻す
    const adjusted = decreaseByPriority(game.params, step)
    if (directionChanged(state.last_direction, "down")) {
      state.reversal_count += 1
    }
    state.last_direction = "down"
    state.consecutive_correct = 0
    return adjusted
  }

  // 条件未達: パラメータ維持
  return game.params
}
```

### 2.2 パラメータ調整の優先順位

難度UPは**上から順に**、難度DOWNは**下から逆順に**調整する。これにより「上げるのは主パラメータ優先、戻すのは副パラメータ優先」となり、体験の安定性を確保する。

#### 神経衰弱（Memory Match）— NCI-M

| 優先 | パラメータ | 範囲 | UP時の動き | DOWN時の動き |
|------|-----------|------|-----------|-------------|
| 1 | `pairs` | 2-24 | ceil(pairs * step) | floor(pairs / step) |
| 2 | `similarity` | 0-100% | +step_pct | -step_pct |
| 3 | `flip_delay` | 800-2000ms | -step_ms | +step_ms |
| 4 | `card_size` | 64-96px | -4px | +4px |

```
step_pct: Phase1=20%, Phase2=10%, Phase3=5%
step_ms:  Phase1=200ms, Phase2=100ms, Phase3=50ms
```

#### 分類ソーティング（Sorting）— NCI-F

| 優先 | パラメータ | 範囲 | UP時の動き | DOWN時の動き |
|------|-----------|------|-----------|-------------|
| 1 | `items` | 3-15 | ceil(items * step) | floor(items / step) |
| 2 | `categories` | 2-5 | +1（items >= 10時） | -1 |
| 3 | `switching` | none/between/within | 1段階UP | 1段階DOWN |
| 4 | `criterion` | color→shape→category | 達成条件制御（※） | 1段階DOWN |

※ criterion（基準種類）とswitching（基準切替）は0-D-1の2.6節の達成条件を優先。Staircaseで自動昇格しない。達成条件を満たした場合にのみ解放される。

#### 視覚探索（Visual Search）— NCI-A

| 優先 | パラメータ | 範囲 | UP時の動き | DOWN時の動き |
|------|-----------|------|-----------|-------------|
| 1 | `scene_items` | 3-25 | ceil(items * step) | floor(items / step) |
| 2 | `diff_subtlety` | 0-100% | +step_pct | -step_pct |
| 3 | `diff_count` | 1-7 | +1 | -1 |

#### Corsi Block — NCI-M

| 優先 | パラメータ | 範囲 | UP時の動き | DOWN時の動き |
|------|-----------|------|-----------|-------------|
| 1 | `seq_length` | 2-9 | +1（整数のみ） | -1 |
| 2 | `blocks` | 4-16 | ceil(blocks * step) | floor(blocks / step) |
| 3 | `display_ms` | 500-1500ms | -step_ms | +step_ms |

**seq_lengthが乗算ではなく+1/-1の理由**: シーケンス長は「覚える個数」であり、3→4と6→7は認知的には同じ「1個増加」。乗算（3×1.1=3.3→4）は不自然。CogMedも+1/-1方式。

---

## 3. IQ帯別設定の統合テーブル

### 3.1 全設定一覧

| IQ帯 | Band | N（難化条件） | 理論収束成功率 | ステップサイズはPhaseで決定 |
|------|------|-------------|--------------|--------------------------|
| 21-50 | A-B | 5連続正解 | ~83% | Phase1: 1.20 / Phase2: 1.10 / Phase3: 1.05 |
| 51-70 | C-D | 4連続正解 | ~80% | 同上 |
| 71-85 | E | 3連続正解 | ~75% | 同上 |
| 86-110 | F | 3連続正解 | ~75% | 同上 |

**ステップサイズはIQ帯では変えない。反転回数（Phase）でのみ変わる。** IQ帯による調整は連続成功数Nで行う。2つの変数を独立に制御することで、挙動が予測しやすくなる。

### 3.2 初期値とセッション復元

```
【初回プレイ】
  Band B2（IQ 44-50相当）のパラメータで開始
  → 1.4節の初期配置アルゴリズムで素早く適切な位置に移動

【2回目以降のセッション開始】
  前回のセッション終了時のパラメータ値を復元
  反転カウンタも復元（Phase 3に入っていればPhase 3のまま）

【14日以上のブランク後】
  前回のパラメータ値は復元
  反転カウンタのみリセット → Phase 1の大ステップで再探索

【IQ値の変更（保護者が設定変更した場合）】
  パラメータはリセットしない（実際のプレイデータの方が正確）
  Nの値のみ新しいIQ帯に応じて変更
```

詳細な初期パラメータ値は `nolla_game_mechanics_design.md` の Section 2.4 参照テーブルを参照。

---

## 4. ラウンド構造との連携

### 4.1 ラウンドの定義

```
Session
  ├─ Trial 1: ゲーム実行
  ├─ Trial 2
  ├─ ...
  ├─ Trial N
  └─ [ラウンド終了] → Staircase ロジック実行 → 難度調整 → 次ラウンド

ラウンド終了条件（先に達成した方）:
  - 試行数 >= 5
  - 経過時間 >= 2分
```

### 4.2 Staircase ロジックの実行タイミング

```
ラウンド終了時:
  1. ラウンド内の連続正解数を確認
  2. N回連続正解を達成？ → 難度UP（優先順位に従い1パラメータ調整）
  3. エラーレス Stage 3到達が2回以上？ → 難度DOWN（逆順で1パラメータ調整）
  4. どちらでもない → パラメータ維持
  5. 難度変更時: 柔らかい背景変化の演出（0.5秒）
  6. 次ラウンド開始 → 新パラメータでゲーム生成

注: 1ラウンドで調整するのは1パラメータのみ。
    複数パラメータを同時に変えると何が変わったかわからなくなる。
```

**重要**: ラウンド**中**には絶対にパラメータを変更しない。ASD児の予測可能性を保証する。

### 4.3 エラーレス学習との連携

```
難度DOWN の判定には「不正解1回」ではなく「エラーレス Stage 3到達率」を使う。

理由:
  エラーレス学習により、不正解はStage 1-3のヒントで「正解」に導かれる。
  つまり「不正解」が記録されない。代わりにStage到達数で判定する。

  Stage 3到達 = 3回ヒントが出てようやく正解 = 実質的に自力では解けなかった
  → これが1ラウンドで2回以上 → 難度が高すぎる → DOWN

  Stage 1-2到達 = 軽いヒントで正解 = ほぼ自力 → DOWNしない
```

---

## 5. データ記録（NCI への接続）

### 5.1 記録すべき情報

各試行（trial）ごとに以下を記録:

```typescript
type TrialRecord = {
  game_type: "memory-match" | "sorting" | "visual-search" | "corsi-block"
  trial_id: string
  round_number: number
  session_id: string
  
  // パラメータの現在値
  difficulty_params: {
    // 各ゲーム固有のパラメータ
    // 例: pairs, similarity, flip_delay, card_size （神経衰弱）
  }
  
  // パフォーマンス
  correct: boolean
  reaction_time: number  // ms
  response_data: any     // ゲーム固有（選択肢、タップ位置等）
  
  // 時刻・デバイス情報
  timestamp: ISO8601
  touch_dynamics: { pressure: number, area: number }
  device_motion?: { x: number, y: number, z: number }
}
```

### 5.2 NCI への寄与度計算

```
b（難度パラメータ）計算:
  神経衰弱: b = 0.5*log(pairs) + 0.3*(similarity/100) + 0.2*(1 - flip_delay/2000)
  分類:     b = 0.3*log(categories) + 0.4*log(items) + 0.2*criterion_complexity + 0.1*switching_factor
  視覚探索: b = 0.4*log(scene_items) + 0.4*diff_count_factor + 0.2*(diff_subtlety/100)
  Corsi:    b = 0.4*log(blocks) + 0.4*(seq_length/9) + 0.2*(1 - display_ms/1500)

θ 更新:
  ベイズ逐次更新（nolla_nci_algorithm_design.md の Section 2.2 参照）
  各試行の b, a, correct フラグから θ の事後分布を更新
```

---

## 6. セキュリティ・安全性上の考慮

### 6.1 難度の下限・上限

**何らかの理由で調整ロジックが暴走した場合に備える**:

```
神経衰弱:
  pairs:     MIN=2, MAX=24
  similarity: MIN=0, MAX=100
  flip_delay: MIN=800, MAX=2000

分類:
  items:      MIN=3, MAX=15
  categories: MIN=2, MAX=5

視覚探索:
  scene_items: MIN=3, MAX=25
  diff_count:  MIN=1, MAX=7
  diff_subtlety: MIN=0, MAX=100

Corsi:
  seq_length: MIN=2, MAX=9
  blocks:     MIN=4, MAX=16
  display_ms: MIN=500, MAX=1500
```

### 6.2 暴走検出

```
セッション中に以下を監視:
  - 同じパラメータが連続 3セッション上昇し続ける → 確認ログ
  - 同じパラメータが連続 3セッション下降し続ける → 確認ログ
  - 正解率が個人平均 2SD 以上の外れ値 → 異常セッション判定（NCI重み低下）
```

---

## 7. 実装ロードマップ

### Phase 1a（MVP基盤）- 2026年4月中旬

- [ ] Staircase ロジック実装（4ゲーム共通）
- [ ] IQバンド別初期値テーブル実装
- [ ] ラウンド終了時のパラメータ調整ロジック統合
- [ ] データ記録フォーマット定義 → Supabase スキーマに反映
- [ ] ユニットテスト（各ゲームの Staircase 動作確認）

### Phase 1b（詳細調整）- 2026年5月

- [ ] フィールドテスト（10-20名のASD児）
- [ ] 実データから step_size, 初期値パラメータを校正
- [ ] IQバンド間の滑らかな遷移確認
- [ ] ステップサイズ縮小ロジック（初期反転後）の実装

### Phase 2（最適化）- 2026年6月以降

- [ ] 複数パラメータの相互作用分析（IRT の a値 校正）
- [ ] 軸間相関の補正（4軸独立性の完全化）
- [ ] リアルタイムフィードバック機構（保護者向け）

---

## 8. ASD児向け設計チェックリスト

- [ ] **予測可能性**: ラウンド終了時のみ難度変更 → ASD児の不安軽減
- [ ] **段階的なステップサイズ**: 1.05-1.15倍 → 緩やかな上昇で脱落防止
- [ ] **IQ別カスタマイズ**: 低IQほど細かく調整 → 達成感確保
- [ ] **下限設定**: 難度が0まで落ちない → 「できる体験」の保証
- [ ] **データ保全**: 全試行を永続保存 → 長期トレンド分析・研究対応

---

## 9. 参照・詳細仕様

| 項目 | 参照先 |
|------|--------|
| アルゴリズムエビデンス | `nolla_adaptive_difficulty_algorithm_research.md` |
| ゲーム仕様・パラメータ範囲 | `nolla_game_mechanics_design.md` Section 2 |
| IQバンド初期値 | `nolla_game_mechanics_design.md` Section 2.4 参照テーブル |
| NCI スコアリング詳細 | `nolla_nci_algorithm_design.md` |
| 確定設計方針 | `project_game_design_decisions.md` |

---

## 変更履歴

| 日付 | 変更内容 |
|------|---------|
| 2026-04-06 | DRAFT 作成 |
| 2026-04-06 | DRAFT v2: 3点修正 — (1)固定ステップサイズ→反転回数に応じた可変ステップサイズ (2)IQ帯別連続成功数N導入 (3)初期配置アルゴリズム追加 |
| 2026-04-06 | DRAFT v2.1: IQ 86-110帯のN=2→N=3に修正。85%ルール（Nature Comms 2019）の最適帯75-85%を外れていたため |

