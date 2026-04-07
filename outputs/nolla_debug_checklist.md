# Nolla MVP デバッグチェックシート

> 9 件の設計書から検証可能な要件を抽出し、漏れなく検証するためのマスターチェックリスト。
> 思いつきデバッグを禁止し、ここに無い項目を追加するルールで漏れを防ぐ。
> 設計書間の矛盾・実装ギャップは末尾の **§Z** に集約。
>
> 出典の略号:
> - **MVP** = nolla_mvp_design_spec_v3.md
> - **IA** = nolla_ia_design_v3.md
> - **MECH** = nolla_game_mechanics_design.md
> - **NCI** = nolla_nci_algorithm_design.md
> - **DEV** = nolla_device_compatibility_spec_v1.md
> - **LEGAL** = nolla_legal_privacy_spec_v1.md
> - **COLOR** = nolla_color_regulation.md
> - **REWARD** = nolla_reward_design_research.md
> - **RULE** = .claude/rules/common/nolla-mvp-design.md

| status記号 | 意味 |
|---|---|
| ⬜ | 未検証 |
| 🔄 | 検証中 |
| ✅ | 検証済み・正常 |
| 🐛 | バグ確認 → 要修正 |
| 🛠 | 修正済み・再検証待ち |
| ⛔ | MVPスコープ外（記録のみ） |

---

## 検証進捗サマリ

| Batch | 範囲 | 項目数 | 結果 | コミット |
|---|---|---|---|---|
| **1** ✅ | §G/H/I/J/K/§C-Fロジック | 70テスト | 全パス・新規バグ2件発見 | (pending) |
| 2 | 既知バグBUG-10/11/12修正 | 3 | — | — |
| 3 | DB永続化 §L | ≈30 | — | — |
| 4 | コードgrep §B/R/U | ≈25 | — | — |
| 5 | レンダリング §C-F描画 | ≈30 | — | — |
| 6 | 画面遷移 §P/T/Q | ≈50 | — | — |
| 7 | アクセシビリティ §R/X | ≈18 | — | — |
| 8 | RLS/セキュリティ §U | ≈19 | — | — |

### Batch 1 で新規発見した致命的バグ

| ID | 内容 | 影響 |
|---|---|---|
| **BUG-13** | `persistNciSnapshot` `updateTheta` がプロダクションコードから**1度も呼ばれていない**。NCI算出パイプライン全体がデッドコード | 親ダッシュボードに表示するNCIデータが永久に存在しない。能力可視化機能が事実上動いていない |
| **BUG-14** | `baseline_sessions_count` への書き込みコードが存在しない。`baseline_established` も同様 | ベースライン確立フェーズ遷移が永久に発生しない。Phase 1-4 表示が機能しない |
| **GAP-K** | 異常検出の設計6パターンのうち、実装は3パターンのみ (instant RT / RT分散 / 疲労)。パターン4位置繰返・5外部割込・6その他は未実装 | 異常セッションを取りこぼし、NCI精度が下がる |

これら3件は次バッチに進む前にYuyaへ報告して修正方針の決定を仰ぐ。

---

## A. 画面・デバイス制約

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| A1 | 横向き（ランドスケープ）固定。縦向き禁止 | RULE §設計境界, MVP §1, MECH §1 | Playwright(縦サイズで起動→警告orロック) | ⬜ |
| A2 | スワイプ・ダブルタップ禁止（タップのみ） | RULE §設計境界, MECH §1 | コードgrep + 操作テスト | ⬜ |
| A3 | タッチターゲット最小48×48px、3-8歳は64×64px | RULE §必須事項, MECH §1 | DOM計測 | ⬜ |
| A4 | アイコン間最小余白16px | RULE §必須事項, MECH §1 | DOM計測 | ⬜ |
| A5 | iPad横向き 1194×834 で全UI表示 | MVP §1 | Playwright | ⬜ |
| A6 | スマホ横向き 812×375 で全UI画面内 | RULE §実機相当チェック | Playwright | ⬜ |
| A7 | 縦専用Apple Pencil・スタイラスは MVP対応不要（タッチで動く） | DEV | 操作不可確認 | ⛔ |
| A8 | 振動API: Android対応・iOS非対応のフォールバック（視覚+音声） | DEV | プラットフォーム別動作 | ⬜ |

---

## B. ゲーム共通メカニクス

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| B1 | 200ms以内の即座フィードバック（視覚+音+振動） | RULE §必須事項, MECH §1 | Playwright計測 | ⬜ |
| B2 | エラーレス学習 4段階プロンプティング削減法 | RULE §必須事項, MECH §1 | use-errorless ユニット | ⬜ |
| B3 | Stage1: サイレント修正（正解箱が光る、エラー表示なし） | MECH §1, §3-6 | レンダリング確認 | ⬜ |
| B4 | Stage2: ヒント表示（対象アイコンの軽い点滅） | MECH §1 | ユニット | ⬜ |
| B5 | Stage3: 自動正解ガイド（強い発光） | MECH §1 | ユニット | ⬜ |
| B6 | Stage3使用率>30% → 主難度維持・副パラメータ緩和 | MECH §2.5 | sim | ⬜ |
| B7 | エラー音・赤バツ・「間違い」表示が**無い** | RULE §設計境界 | UI監査+grep | ⬜ |
| B8 | スコア減点・ペナルティ表現が**無い** | RULE §設計境界 | UI監査 | ⬜ |
| B9 | 時間制限・カウントダウンタイマーが**無い** | RULE §設計境界 | コードgrep | ⬜ |
| B10 | 自動再生フラッシュ・点滅が**無い**（光感受性てんかん） | RULE §設計境界, COLOR §1 | レンダリング監査 | ⬜ |
| B11 | 文字によるナビ・指示が**無い**（重度知的障害向け） | RULE §設計境界 | レンダリング監査 | ⬜ |
| B12 | リアルな人間キャラクターが**無い**（不気味の谷） | RULE §設計境界 | レンダリング監査 | ⬜ |
| B13 | キャラクター感情は3段階のみ（笑顔/中立/困り） | RULE §キャラクター | navi-character.tsx | ⬜ |
| B14 | コンテンツが毎試行ランダム生成される | MECH §1 | sim複数回実行 | ⬜ |
| B15 | 同一答え連続回避メカニズム（前試行と同じ答え禁止） | **§Z-Q4 ギャップ** | 仕様確定後 | ⬜ |
| B16 | 進捗表示はテキストでなくドット/ブロック/段階表示 | MECH §3, COLOR §4A | レンダリング | ⬜ |
| B17 | チュートリアルがアニメ駆動・文字なし・初回のみ | RULE §必須事項 | Playwright(初回) | ⬜ |
| B18 | チュートリアルは2回目以降スキップされる | MVP §2 | Playwright(2回目) | ⬜ |
| B19 | セッションの強制ロックが**無い**（必ず提案型） | RULE §設計境界 | コードレビュー | ⬜ |
| B20 | 規範的表現禁止（「学校で静かに」NG、ポジティブ事例OK） | RULE §設計境界 | 文言監査 | ⬜ |
| B21 | 「凸凹」NGワードが使われていない | feedback memory | grep | ⬜ |

---

## C. ゲーム個別 — memory-match（記憶合わせ）

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| C1 | 同pairIdカード2枚タップ → correct=true | MECH §3 | sim | ✅ Batch1 (generator) |
| C2 | 異pairIdカード2枚タップ → correct=false → サイレント修正で正解再提示 | MECH §3 | sim | ⬜ (Batch5) |
| C3 | 全カード絵柄が視覚的に一意（衝突ゼロ） | MECH §3 (P衝突バグから学習) | レンダリングテスト | ✅ Batch1 generator + 🛠 描画(Batch5) |
| C4 | パラメータ範囲: pairs 2-24 | MECH §2.4 | clamp ユニット | ✅ Batch1 |
| C5 | パラメータ範囲: similarity 0-100 | MECH §2.4 | clamp ユニット | ✅ Batch1 |
| C6 | similarityの具体的視覚仕様 | **§Z-Q17 ギャップ** | 仕様確定後 | ⬜ |
| C7 | パラメータ範囲: flipDelay 800-2000ms | MECH §2.4 | clamp ユニット | ✅ Batch1 |
| C8 | パラメータ範囲: cardSize 64-96px | MECH §2.4 | clamp ユニット | ✅ Batch1 |
| C9 | ラウンド完了条件: 全ペアマッチ + グリッドサイズ正しい | MECH §3 | sim | ✅ Batch1 |
| C10 | 2枚目めくり後、不正解時にflipDelay経過後にflip back | card-grid.tsx | sim | ⬜ |
| C11 | 関連 NCI軸: M (Memory) | NCI §1 | NCI算出ロジック | ⬜ |

---

## D. ゲーム個別 — sorting（なかまわけ / 分類）

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| D1 | 正解条件: 選択カテゴリーのmatchValue == item.attributes[criterion] | MECH §4 | sim | ⬜ |
| D2 | criterion=color: 同色カテゴリー判別可能 | MECH §4 | レンダリングテスト | 🛠 (eb7ad5e) |
| D3 | criterion=shape: 同形カテゴリー判別可能 | MECH §4 | レンダリングテスト | 🛠 |
| D4 | criterion=size: 同サイズカテゴリー判別可能 | MECH §4 | レンダリングテスト | 🛠 |
| D5 | criterion=category: 同カテゴリー判別可能 | MECH §4 | レンダリングテスト | 🛠 |
| D6 | criterion=multi: 複合判別可能 | MECH §4 | レンダリングテスト | 🛠 |
| D7 | アイテムとカテゴリーボックスが同じ視覚エンコードで描画 | MECH §4 | レンダリングテスト | 🛠 |
| D8 | パラメータ範囲: categories 2-5 | MECH §2.4 | clamp + generator | ✅ Batch1 |
| D9 | パラメータ範囲: items 3-15 | MECH §2.4 | clamp + generator | ✅ Batch1 |
| D10 | switching: none / between_rounds / within_round の3値 | MECH §2.4 | enum | ⬜ |
| D11 | criterion昇格条件: 直近3セッション全accuracy≥0.85 ∧ hintStage3率≤0.10 | MECH §2.6, NCI | sim+localStorage | ✅ Batch1 (logic) + 🛠 配線(eb7ad5e) |
| D12 | criterion昇格時に items=4, categories=2, switching=none に初期化 | (実装判断) | sim | 🛠 (実機未検証) |
| D13 | criterion昇格段階数 (初期2色→形→数→複合 等) | **§Z-Q3 ギャップ** | 仕様確定後 | ⬜ |
| D14 | 不正解時のbounce back動作 | MECH §4 | UI | ⬜ |
| D15 | Stage3でガイドライン表示 | MECH §4 | UI | ⬜ |
| D16 | 関連 NCI軸: F (Flexibility) | NCI §1 | NCI算出 | ⬜ |

---

## E. ゲーム個別 — visual-search（みつけて）

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| E1 | 正解: タップ座標が実差分から40px以内 | MECH §5 | sim | ⬜ |
| E2 | タップ許容範囲40pxの根拠 | **§Z-Q12 ギャップ** | 仕様確定後 | ⬜ |
| E3 | 5種diff全てが視覚的に区別可能（color/shape/size/position/presence） | MECH §5 | レンダリングテスト | 🛠 (eb7ad5e) |
| E4 | diff=color: 左右でアイテムの色が異なって見える | MECH §5 | sim | 🛠 |
| E5 | diff=shape: 左右で形が異なって見える | MECH §5 | sim | 🛠 |
| E6 | diff=size: 左右でサイズが異なって見える | MECH §5 | sim | 🛠 |
| E7 | diff=position: 左右で位置が異なって見える | MECH §5 | sim | 🛠 |
| E8 | diff=presence: modified側でアイテムが消失 | MECH §5 | sim | 🛠 |
| E9 | パラメータ範囲: sceneItems 3-25 | MECH §2.4 | clamp + generator | ✅ Batch1 |
| E10 | パラメータ範囲: diffCount 1-7 | MECH §2.4 | clamp + generator | ✅ Batch1 |
| E11 | パラメータ範囲: diffSubtlety 0-100 | MECH §2.4 | clamp | ✅ Batch1 |
| E12 | ラウンド完了: 全diff発見 | MECH §5 | sim | ⬜ |
| E13 | エラー時にターゲットハイライト（Stage1） | MECH §5 | UI | ⬜ |
| E14 | アイテム形状が視覚的に一意（square/star衝突なし） | (S衝突バグから学習) | レンダリングテスト | 🛠 |
| E15 | 関連 NCI軸: A (Attention) | NCI §1 | NCI算出 | ⬜ |

---

## F. ゲーム個別 — corsi-block

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| F1 | 正解: 提示順通りに全シーケンスをタップ | MECH §6 | sim | ⬜ |
| F2 | 不正解: 1ブロック目で誤→即不正解、残りシーケンス無視 | MECH §6 | sim | ⬜ |
| F3 | パラメータ範囲: blocks 4-16 | MECH §2.4 | clamp + generator | ✅ Batch1 |
| F4 | パラメータ範囲: seqLength 2-9 | MECH §2.4 | clamp + generator | ✅ Batch1 |
| F5 | パラメータ範囲: displayMs 500-1500 | MECH §2.4 | clamp | ✅ Batch1 |
| F6 | ブロック配置: 全ペア距離≥1.5×blockSize | generate.ts | プロパティテスト | ✅ Batch1 (best-effort) |
| F7 | シーケンスに連続同ブロックが**含まれない** | generate.ts | プロパティテスト | ✅ Batch1 |
| F8 | watching→input→result→次の遷移 | corsi-block-game.tsx | sim | ⬜ |
| F9 | layout.blockSize が描画に反映される（hardcoded 64の解消） | (バグD1) | レンダリング | 🐛 (未修正) |
| F10 | 位置のクランプで複数ブロックが衝突しない | (バグD2) | レンダリング | 🐛 (未修正) |
| F11 | セッション完了: seqLength完遂 or 3回エラー | MECH §6 | sim | ⬜ |
| F12 | 関連 NCI軸: M (Memory) | NCI §1 | NCI算出 | ⬜ |

---

## G. 適応型難度（Staircase）

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| G1 | UP条件: N連続正解 (B band=5, C/D=4, E/F=3) | MECH §2.5, threshold.ts | ユニット | ✅ Batch1 |
| G2 | DOWN条件: hintStage3を1ラウンド内で2回踏む | MECH §2.5, calculate.ts | sim | ✅ Batch1 |
| G3 | step-size: reversal 0-2→1.20 / 3-5→1.10 / 6+→1.05 | MECH §2.5, step-size.ts | ユニット | ✅ Batch1 |
| G4 | 目標成功率: 75-80%維持 | RULE §必須事項, MECH | 統計検証 | ⬜ (要長期実データ) |
| G5 | UP優先順位 (memory): pairs > similarity > flipDelay > cardSize | calculate.ts | sim | ✅ Batch1 |
| G6 | UP優先順位 (sorting): items > categories > switching > criterion | calculate.ts | sim | ✅ Batch1 |
| G7 | UP優先順位 (visual-search): sceneItems > diffSubtlety > diffCount | calculate.ts | sim | ✅ Batch1 |
| G8 | UP優先順位 (corsi-block): seqLength > blocks > displayMs | calculate.ts | sim | ✅ Batch1 |
| G9 | DOWN優先順位 = UP逆順（各ゲーム） | calculate.ts | sim | ✅ Batch1 (sorting確認) |
| G10 | reversal: UP↔DOWN転換でreversalCount+1 | session-state.ts | ユニット | ✅ Batch1 |
| G11 | clamp: 全パラメータがmin/max範囲内 | clamp.ts | プロパティテスト | ✅ Batch1 |
| G12 | 初期パラメータがIQバンドに応じる（B2 → pairs=2 等） | initial.ts | ユニット | ✅ Batch1 (B2のみ) |
| G13 | 連続正解が「ラウンド跨ぎ」で評価される（リセットされない） | session-state.ts L90-96 | sim | ✅ Batch1 |
| G14 | 不正解時にconsecutiveCorrect=0にリセット | session-state.ts | sim | ✅ Batch1 |
| G15 | 連続セッション: 前回最終paramsが次セッション開始時に復元 | use-game-session.ts | sim+localStorage | ⬜ |
| G16 | childIdが変わったらlocalStorage params参照が無効化 | use-game-session.ts | 手動 | ⬜ |
| G17 | sorting criterion昇格がプロダクションコードから呼ばれる | use-game-session.ts (eb7ad5e) | sim | 🛠 |

---

## H. 反応時間 / DDM（運動・認知分離）

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| H1 | trial.presentedAt / respondedAt がDB記録 | NCI §3 | DBクエリ | ⬜ |
| H2 | reaction_time_ms = respondedAt - presentedAt | NCI §3 | DB計算検証 | ⬜ |
| H3 | 運動ベースライン: 中央値+外れ値除去 (median±2SD) | NCI §3.3 | ユニット | ✅ Batch1 |
| H4 | motor_baselines テーブルにreaction_times配列保存 | DB schema | DBクエリ | ⬜ (Batch3) |
| H5 | weighted_baseline = 0.7×旧 + 0.3×新（MVP簡易） | NCI §3 | ユニット | ✅ Batch1 |
| H6 | 0.7/0.3比率の根拠 | **§Z-Q16 ギャップ** | 仕様確定後 | ⬜ |
| H7 | 認知処理時間 = total RT - motor_baseline (≥0) | NCI §3.4 | ユニット | ✅ Batch1 |
| H8 | RT < 200ms → instant判定（実装閾値） / 設計は<30%中央値 | NCI §4 | sim | ✅ Batch1 (実装値で確認・設計と差分あり要確認) |
| H9 | RT > 異常閾値 → セッション中断 or weight低下 | NCI §4 | sim | ⬜ |
| H10 | 運動ベースラインminigameが各セッション開始時に実行 | use-game-session.ts | Playwright | ⬜ |
| H11 | Phase 1で完全DDM（drift rate, decision threshold）を実装 | NCI §13.2 | スコープ | ⛔ |

---

## I. NCI 4軸スコア

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| I1 | NCI-M算出: memory-match + corsi-block | NCI §1 | コードレビュー | ⬜ |
| I2 | NCI-F算出: sorting | NCI §1 | コードレビュー | ⬜ |
| I3 | NCI-A算出: visual-search | NCI §1 | コードレビュー | ⬜ |
| I4 | NCI-S算出: 全ゲーム統合 | NCI §1 | コードレビュー | ⬜ |
| I5 | IRT 2PLモデル: P = 1/(1+exp(-a(θ-b))) | NCI §2.1 | ユニット | ✅ Batch1 |
| I6 | a(識別力)初期値=1.0 | NCI §2.1 | ユニット | ✅ Batch1 |
| I7 | b(難度)がゲームパラメータから逆算される | NCI §2.1, difficulty-b.ts | ユニット | ✅ Batch1 (4ゲーム単調性確認) |
| I8 | 事前分布: θ ~ N(500, 150²) → 実装は θ ~ N(0, 2²) → **設計と乖離** | NCI §2.2 vs theta.ts | コードレビュー | 🐛 設計と実装乖離 |
| I9 | ベイズ逐次更新（σ単調減・正解で μ↑、不正解で μ↓） | NCI §2.2 | ユニット | ✅ Batch1 |
| I10 | 試行数によるSE推移（実装値で 50→<0.5, 200→<0.25。設計値とスケールが違う点要確認） | NCI §2.3 | sim | ✅ Batch1 (実装値) |
| I11 | nci_snapshots テーブルへの日次書込 | NCI §2 | コードフロー | 🐛 **BUG-13: persistNciSnapshot がプロダクションコードから一切呼ばれていない** |
| I12 | nci_m/f/a/s が0-999.999範囲 | DB schema, NCI §1 | DB制約 | ⬜ |
| I13 | nci_*_se 標準誤差が記録 | DB schema | DBクエリ | ⬜ |
| I14 | theta_*, sigma_* がベイズ状態として記録 | DB schema | DBクエリ | ⬜ |
| I15 | total_trials_used カウント | DB schema | DBクエリ | ⬜ |
| I16 | unique(child_id, snapshot_date) 制約 | DB schema | DB操作 | ⬜ |
| I17 | persist-snapshot.ts がセッション終了時に呼ばれる | コードフロー | grep | 🐛 **BUG-13: 呼び出し0件** |
| I18 | 誤試行はweight=0、ヒント3正解はweight<1 | NCI §G12 | ロジック | ⬜ |
| I19 | 異常セッション anomaly_weight が NCI更新時の係数 | NCI §4 | ロジック | ⬜ |
| I20 | スケーリング係数（0-999.999 → 0-100） | **§Z-Q5 ギャップ** | 校正データ後 | ⛔ |
| I21 | 4軸の独立性（13.3） | NCI §13.3 | 統計検証 | ⬜ |

---

## J. ベースライン確立 / 信頼度フェーズ

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| J1 | ベースライン確立条件: ゲーム毎8セッション ∧ 8暦日以上 ∧ 6セッション以上有効 | NCI §5 | sim+DBクエリ | 🐛 **BUG-14: 確立フローのコードが存在しない** |
| J2 | Phase 1 (1-4 sessions): 初期プロファイリング | NCI §2.3, §5 | UI差異 | ⬜ |
| J3 | Phase 2 (5-8 sessions): 中期 | NCI §5 | UI差異 | ⬜ |
| J4 | Phase 3 (9-16 sessions): 成熟 | NCI §5 | UI差異 | ⬜ |
| J5 | Phase 4 (17+ sessions): 確立 | NCI §5 | UI差異 | ⬜ |
| J6 | 自信度進捗の数式（対数曲線） | **§Z-Q15 ギャップ** | 仕様確定後 | ⬜ |
| J7 | baseline_established=false の間は「測定中」表示 | UI仕様 | UI | ⬜ |
| J8 | baseline_established=true 切替時に baseline_established_at 記録 | DB | DBクエリ | ⬜ |
| J9 | baseline_sessions_count がインクリメントされる | DB | sim+DB | 🐛 **BUG-14: 書き込みコードなし** |

---

## K. 異常セッション検出

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| K1 | 6パターン検出: 成績低迷2SD↓ / ランダムタップ / 疲労20%↓ / 位置繰返 / 外部割込 / その他 | NCI §4 | sim | 🐛 **GAP-K: 6パターン中3パターン (instant/低分散/疲労) のみ実装** |
| K2 | パターン1 重み: 0.2 | NCI §4 | ロジック | ⬜ |
| K3 | パターン2 重み: 0 | NCI §4 | ロジック | ⬜ |
| K4 | パターン3 重み: 0.5 | NCI §4 | ロジック | ⬜ |
| K5 | パターン4 重み: 0 | NCI §4 | ロジック | ⬜ |
| K6 | パターン5 重み: 0.5 | NCI §4 | ロジック | ⬜ |
| K7 | パターン6 重み・判定基準 | **§Z-Q6 ギャップ** | 仕様確定後 | ⬜ |
| K8 | session.anomaly_score / anomaly_weight が記録される | DB | DBクエリ | ⬜ |
| K9 | sessionsテーブルの anomaly_weight=1.0 default | DB schema | DBクエリ | ⬜ |

---

## L. データ永続化 / セッション・ラウンド・トライアル

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| L1 | session start で sessions行作成 | persist.ts | DBクエリ | ✅ |
| L2 | initial_params jsonb 保存 | persist.ts | DBクエリ | ✅ |
| L3 | 各ラウンド開始時に rounds行作成（round_number+difficulty_params） | persist.ts | DBクエリ | ⬜ |
| L4 | 各trial にtrials行作成（round_id+session_id+child_id+game_type） | persist.ts | DBクエリ | ⬜ |
| L5 | trial.game_data jsonb に各ゲーム固有データ（タップ位置等）保存 | DB schema | DBクエリ | ⬜ |
| L6 | trial.difficulty_params がそのtrial時点の難度snapshot | DB schema | DBクエリ | ⬜ |
| L7 | trial.presentedAt / respondedAt 両timestamp埋まる | DB schema | DBクエリ | ⬜ |
| L8 | trial.reaction_time_ms 計算済み | DB schema | DBクエリ | ⬜ |
| L9 | trial.hint_stage_reached 0-3 で記録 | DB schema | DBクエリ | ⬜ |
| L10 | trial.irt_b / irt_a 記録 | DB schema | DBクエリ | ⬜ |
| L11 | session end で final_params, accuracy, total_trials, ended_at 更新 | persist.ts | DBクエリ | ⬜ |
| L12 | session.reversal_count, last_direction 更新 | persist.ts | DBクエリ | ⬜ |
| L13 | session.hint_stage1/2/3_count 集計 | persist.ts | DBクエリ | ⬜ |
| L14 | session.duration_ms 計算 | persist.ts | DBクエリ | ⬜ |
| L15 | sessionの「途中終了」時の挙動 | (要仕様) | 強制離脱テスト | ⬜ |
| L16 | オフラインキュー: ネット切断時にlocalStorage蓄積 | offline/storage.ts | デバイス | ⬜ |
| L17 | オンライン復帰時にflush送信 | offline/sync.ts | デバイス | ⬜ |
| L18 | 重複送信防止: 同一trialが2行作成されない | offline/sync.ts | sim | ⬜ |
| L19 | 全テーブル: parents/children/sessions/rounds/trials/nci_snapshots/motor_baselines/touch_dynamics/device_motion/stars/collectibles/room_items 存在 | migrations | DBスキーマ確認 | ✅ |

---

## M. タッチダイナミクス（要MVP実装範囲確認）

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| M1 | touch_dynamics テーブル定義済み (trial_id FK) | DB schema | 既存 | ✅ |
| M2 | touch_force（押圧）0..1 記録 | NCI §12.2 | DBクエリ | ⬜ |
| M3 | touch_area（接触面積）記録 | NCI §12.2 | DBクエリ | ⬜ |
| M4 | touch_duration_ms 記録 | NCI §12.2 | DBクエリ | ⬜ |
| M5 | touch_trajectory jsonb（軌跡座標配列） | NCI §12.2 | DBクエリ | ⬜ |
| M6 | trajectory_straightness（直線度）0..1 計算 | NCI §12.2 | ユニット | ⬜ |
| M7 | confidence_score 計算 | NCI §12.2 | ユニット | ⬜ |
| M8 | iOSで force/area が取得できない場合のフォールバック | NCI §12.2, DEV | デバイステスト | ⬜ |
| M9 | **MVP実装範囲か Phase 1延期か** | NCI §12.1 | コードgrep+仕様確認 | ⬜ |

---

## N. デバイスモーション（要MVP実装範囲確認）

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| N1 | device_motion テーブル定義済み (session_id FK) | DB schema | 既存 | ✅ |
| N2 | gyro_variance 記録 | NCI §12.3 | DBクエリ | ⬜ |
| N3 | accel_variance 記録 | NCI §12.3 | DBクエリ | ⬜ |
| N4 | device_stability 0..1 計算 | NCI §12.3 | ユニット | ⬜ |
| N5 | attention_duration_ms 記録 | NCI §12.3 | ユニット | ⬜ |
| N6 | repetitive_pattern_detected フラグ | NCI §12.3 | ロジック | ⬜ |
| N7 | repetitive_frequency 記録 | NCI §12.3 | ロジック | ⬜ |
| N8 | iOS DeviceMotionEvent.requestPermission() がユーザ操作後に呼ばれる | DEV | 実機 | ⬜ |
| N9 | **MVP実装範囲か Phase 1延期か** | NCI §12.1 | コードgrep+仕様確認 | ⬜ |

---

## O. スター / 報酬 / トークン経済

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| O1 | 1ラウンド100%正解 → 3スター | (eb7ad5e) | sim | 🛠 |
| O2 | 1ラウンド80%以上 → 2スター | (eb7ad5e) | sim | 🛠 |
| O3 | 1ラウンド80%未満 → 1スター | (eb7ad5e) | sim | 🛠 |
| O4 | starsテーブルにreason='trial_correct'/'round_complete'/'session_complete'/'daily_bonus'/'purchase' | DB constraint | DBクエリ | ⬜ |
| O5 | 即座ご褒美: trial成功時にスター飛び出しアニメ（200ms以内） | REWARD, COLOR §5 | UI計測 | ⬜ |
| O6 | スター飛び出しアニメ色 #DAA520 (くすんだ金) | COLOR §5 | UI | ⬜ |
| O7 | 強化スケジュール: 初期CRF（毎試行）→ 習慣形成後VR3-5 | REWARD | コードレビュー | ⬜ |
| O8 | スター→ショップ交換可能 | REWARD | UI | ⬜ |
| O9 | collectibles獲得条件 | REWARD | コードレビュー | ⬜ |
| O10 | collectibles.item_type ∈ {figure, furniture, wallpaper, badge} | DB constraint | DBクエリ | ⬜ |
| O11 | room_items にマイルーム配置保存 | DB schema | DBクエリ | ⬜ |
| O12 | マイルームグリッドサイズ・配置上限 | **§Z-Q10 ギャップ** | 仕様確定後 | ⬜ |
| O13 | パーソナライズ（親評価から好み反映） | REWARD | コードレビュー | ⬜ |
| O14 | 報酬物質性（社会的でなく物質） | REWARD | UI監査 | ⬜ |

---

## P. 21画面情報設計（IA）

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| P1 | S1: 親同意画面 | IA | Playwright遷移 | ⬜ |
| P2 | S2: 親評価フォーム10-12問 | IA, MVP §2 | Playwright | ⬜ |
| P3 | S3: 子ども機能評価4ミニゲーム | IA, MVP §2 | Playwright | ⬜ |
| P4 | S4: 名前入力（音声 or 入力） | IA, MVP §2 | Playwright | ⬜ |
| P5 | S5: 初期評価結果（前提能力アセスメント） | IA | Playwright | ⬜ |
| P6 | M1: ホーム画面（カルーセル型） | IA | Playwright | ⬜ |
| P7 | ホーム: ナビキャラ + スター総数 + ゲーム建物カルーセル + ドット + マイルーム | IA | UI監査 | ⬜ |
| P8 | M2-M4: 各ゲーム画面 | IA | Playwright | ⬜ |
| P9 | R1-R3: 報酬画面3画面 | IA | Playwright | ⬜ |
| P10 | U1-U2: 共通画面2画面 | IA | Playwright | ⬜ |
| P11 | P1-P5: 親向け画面5画面 (dashboard/growth/ai-support/settings/...) | IA | Playwright | ⬜ |
| P12 | 旧グリッド型ホームが残っていない（IA v3カルーセル統一） | IA, **§Z-Q1** | UI監査 | ⬜ |
| P13 | 全21画面の遷移リンク切れなし | IA | Playwright巡回 | ⬜ |

---

## Q. 親向けダッシュボード / NCI可視化

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| Q1 | dashboard ページが表示される | MVP §6 | Playwright | ⬜ |
| Q2 | 「今日の記録」セクション | MVP §6 | UI | ⬜ |
| Q3 | 「成長グラフ」セクション | MVP §6 | UI | ⬜ |
| Q4 | 「AI支援」セクション（Phase 2: 表示のみ） | MVP §6 | UI | ⛔ |
| Q5 | 「設定」セクション | MVP §6 | UI | ⬜ |
| Q6 | NCI 4軸スコアが表示される | NCI §6 | UI | ⬜ |
| Q7 | NCI表示は0-100スケール（%ゲージなし） | NCI §6, MVP §6 | UI | ⬜ |
| Q8 | 時系列ビュー: 週/月/年/全期間切替 | NCI §7 | UI | ⬜ |
| Q9 | day1→今日の比較表示 | NCI §7 | UI | ⬜ |
| Q10 | グラフ線色 NCI-F: #D4A574, NCI-M: #4A7BA7, NCI-A: #6BA47A | COLOR §4B | UI | ⬜ |
| Q11 | 親UIテキストコントラスト 4.5:1以上 (WCAG AA) | NCI §7, COLOR | UI監査 | ⬜ |
| Q12 | ベースライン未確立時「測定中」文言 | NCI §5 | UI | ⬜ |
| Q13 | 規範的表現禁止（学校で○○できる等） | RULE §設計境界 | 文言監査 | ⬜ |
| Q14 | 期待値コントロール文言（オンボーディング） | NCI §9 | 文言監査 | ⬜ |
| Q15 | 注意バッジ色: 赤でなくベージュ #B8906A | COLOR §4B | UI | ⬜ |
| Q16 | スタッフ詳細ビュー: NCI+SE+月間変化p値+現在パラメータ+エラーパターン | NCI §8 | UI | ⛔ |
| Q17 | スタッフビューp値の統計検定法 | **§Z-Q8 ギャップ** | 仕様確定後 | ⬜ |
| Q18 | トレンド色: 上昇/横ばい/下降 | NCI §6.4 | UI | ⬜ |
| Q19 | θが横ばいの子への文言対応 | NCI §6.5 | 文言監査 | ⬜ |
| Q20 | 親用UIヘッダー rgba(255,255,255,0.95) | COLOR §4B | UI | ⬜ |

---

## R. UI色・ビジュアル

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| R1 | 蛍光色（ネオンピンク・グリーン等）禁止 | COLOR §1A | 色監査 | ⬜ |
| R2 | 色だけで意味を伝えない（形状と組み合わせ） | COLOR §7 | UI監査 | ⬜ |
| R3 | ベースカラー: 背景#F5F5F5, primary#4A7BA7, secondary#6BA47A, accent#D4A574, text#333333 | RULE §カラー, COLOR §2 | CSS変数確認 | ⬜ |
| R4 | 草ブロック #7CBA5D / #8FBC8F | COLOR §3A | CSS | ⬜ |
| R5 | 土ブロック #8B6B4A / #9B7B5A | COLOR §3A | CSS | ⬜ |
| R6 | オーク材 #B8945A / #C4A46C | COLOR §3A | CSS | ⬜ |
| R7 | グロウストーン #DAA520 (低彩度金) | COLOR §3A | CSS | ⬜ |
| R8 | 建物テーマ — コテージ(なかまわけ) 暖色夕暮 | COLOR §3B | CSS | ⬜ |
| R9 | 建物テーマ — 天文台(おぼえて) 青紫夜空 | COLOR §3B | CSS | ⬜ |
| R10 | 建物テーマ — ツリーハウス(みつけて) 青空+緑 | COLOR §3B | CSS | ⬜ |
| R11 | ボタンUI: オーク材グラデ + 下4px立体影 | COLOR §4A | CSS | ⬜ |
| R12 | 進捗ドット 完了#6BA47A / 未完了 rgba(0,0,0,0.1) | COLOR §4A | CSS | ⬜ |
| R13 | 1画面の情報要素（旧6個上限ルールは廃止、ただしオーバーロード注意） | RULE §運用目安 | UI監査 | ⬜ |

---

## S. オンボーディング / アセスメント

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| S1 | 親評価フォーム: 年齢・性別・症状度合・コミュニケーション・受療育・デバイス経験・好み | MVP §2 | UI | ⬜ |
| S2 | children.diagnosis text[] にASD/ADHD/LD/Down等が保存 | DB schema | DBクエリ | ⬜ |
| S3 | children.intellectual_level (mild/moderate/severe等) 保存 | DB schema | DBクエリ | ⬜ |
| S4 | children.ld_types text[] 保存 | DB schema | DBクエリ | ⬜ |
| S5 | children.speech_level 保存 | DB schema | DBクエリ | ⬜ |
| S6 | 前提能力アセスメント (S5): 色判別・形判別・複数ステップ追従 | DB schema | UI+DB | ⬜ |
| S7 | can_distinguish_colors / shapes / follow_multi_step が記録 | DB schema | DBクエリ | ⬜ |
| S8 | 子ども機能評価4ミニゲーム → IQ帯推定 | MVP §2 | コードフロー | ⬜ |
| S9 | iq_band 13段階 (A1-F3) のいずれかが children.iq_band に設定 | NCI §2.3 | DBクエリ | ⬜ |
| S10 | sorting_start_criterion (color/shape/etc) 設定 | DB schema | DBクエリ | ⬜ |
| S11 | games_enabled jsonb で4ゲーム有効化フラグ | DB schema | DBクエリ | ⬜ |
| S12 | voice_recognition_enabled デフォルトfalse | DB schema | DBクエリ | ⬜ |
| S13 | 名前入力（音声 or 親タップ） | MVP §2 | UI | ⬜ |

---

## T. セッションライフサイクル

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| T1 | game/[gameType] → motor-baseline → round-intro → playing → round-transition → completed → reward の遷移 | use-game-session.ts | Playwright | ⬜ |
| T2 | 「もどる」ボタンでホームに戻れる | IA | Playwright | ⬜ |
| T3 | exit-dialog（中断ダイアログ）が動作 | exit-dialog.tsx | Playwright | ⬜ |
| T4 | reward画面で次ゲームを選べる | IA | Playwright | ⬜ |
| T5 | セッション継続時間: A1→2-3min, F3→15min | MECH §2.7 | sim | ⬜ |
| T6 | セッション内試行数: A1→3-5, F3→15 | MECH §2.7 | sim | ⬜ |
| T7 | セッション内休憩タイミング（自動提案） | MECH §2.7, **§Z-Q11** | 仕様確定後 | ⬜ |
| T8 | 休憩は提案型（強制ロック禁止） | RULE §設計境界 | UI | ⬜ |
| T9 | 親同意で再開可 | RULE | UI | ⬜ |

---

## U. セキュリティ / プライバシー / 法令遵守

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| U1 | RLS: parents_own_select/insert/update | migration001 | DB手動テスト | ⬜ |
| U2 | RLS: children_own_select/insert/update (parent_id 経由) | migration001 | DB手動テスト | ⬜ |
| U3 | RLS: sessions_own / rounds_own / trials_own (child経由) | migration002 | DB手動テスト | ⬜ |
| U4 | RLS: nci_snapshots / motor_baselines / touch_dynamics / device_motion / stars / collectibles / room_items | migration003 | DB手動テスト | ⬜ |
| U5 | 別parentが他parent子データを取得できない（実テスト） | LEGAL | 別ユーザでクエリ | ⬜ |
| U6 | 子の診断情報(diagnosis等)は要配慮個人情報として暗号化対象 | migration001 コメント, LEGAL | コードレビュー | ⬜ |
| U7 | PIN: 4桁を平文ではなくhashで保存 (parents.pin_hash) | migration001 | DBクエリ | ⬜ |
| U8 | PIN間違い無制限はNG → ロックアウト or 遅延 | (実装判断) | コードレビュー | ⬜ |
| U9 | XSS: display_name 等外部入力をエスケープ | コードレビュー | grep | ⬜ |
| U10 | Service WorkerがSupabase APIをバイパス | sw.js (5f8b1ff) | sw.js確認 | ✅ |
| U11 | SWがHTML/navigationをキャッシュしない | sw.js (5f8b1ff) | sw.js確認 | ✅ |
| U12 | COPPA: 米国対応はMVP外 | LEGAL | スコープ | ⛔ |
| U13 | GDPR: 親同意・データポータビリティ・削除権・72時間侵害通知 | LEGAL | 機能存在確認 | ⬜ |
| U14 | APPI: 個人同意・30日削除ウィンドウ・個別データ同意フロー | LEGAL | 機能存在確認 | ⬜ |
| U15 | プライバシーポリシー作成 | LEGAL | ドキュメント | ⬜ |
| U16 | データ削除機能 | LEGAL | UI機能 | ⬜ |
| U17 | データ書き出し機能 | LEGAL | UI機能 | ⬜ |
| U18 | サーバー側の暗号化保存 | NCI §11.2 | コードレビュー | ⬜ |
| U19 | エラーメッセージから機密データ漏洩しない | RULE | コードレビュー | ⬜ |

---

## V. デバイス互換性

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| V1 | Pointer Events API: 全デバイス対応 | DEV | コードgrep | ⬜ |
| V2 | 振動API: Android対応 + iOSフォールバック（視覚+音声） | DEV | プラットフォーム別 | ⬜ |
| V3 | Web Speech API: Android対応 / iOS非対応 → 親タップフォールバック | DEV | 自動切替 | ⬜ |
| V4 | MediaPipe Face Mesh: Phase 1+ (MVPは情報基盤のみ) | DEV | スコープ | ⛔ |
| V5 | iPad 1194×834 ランドスケープ基準 | MVP §1 | Playwright | ⬜ |
| V6 | iOS Safari（最新）/ Android Chrome（最新） | DEV | matrix | ⬜ |
| V7 | Apple Pencil: MVP対応不要 | DEV | スコープ | ⛔ |

---

## W. パフォーマンス / 計算量

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| W1 | IRT 計算: O(1) | NCI §11.1 | profiling | ⬜ |
| W2 | DDM 計算: O(n) | NCI §11.1 | profiling | ⬜ |
| W3 | 異常検出: O(n) | NCI §11.1 | profiling | ⬜ |
| W4 | フィードバック < 200ms | RULE §必須事項 | Playwright計測 | ⬜ |

---

## X. アクセシビリティ

| ID | 要件 | 出典 | 検証手段 | status |
|---|---|---|---|---|
| X1 | 色覚多様性: 色だけで意味を伝えない | COLOR §7 | UI監査 | ⬜ |
| X2 | 親UIテキストコントラスト 4.5:1以上 (WCAG AA) | NCI §7 | axe-core | ⬜ |
| X3 | 振動なし環境で視覚+音声フォールバック | DEV | プラットフォーム | ⬜ |
| X4 | 音声認識OFF時に親タップ自動切替 | RULE §必須事項 | 自動切替 | ⬜ |
| X5 | 大きいタッチターゲット（48px〜64px） | RULE | DOM | ⬜ |

---

## Y. 設計書間の矛盾・実装ギャップ（既知）

これらは設計書を読んで既に判明している不確定事項。**各項目は仕様確定→実装→検証** の順で扱う。

| ID | 内容 | 出典・関連 |
|---|---|---|
| Z-Q1 | ホーム画面: 旧グリッド型 vs 新カルーセル型 → IA v3カルーセルに統一済（実装で旧型残存していないか確認） | MVP §7 vs IA |
| Z-Q2 | ゲーム4の名称: Corsiブロック / 視覚探索 → Corsi Block正式 | MVP §3 vs MECH §6 |
| Z-Q3 | sorting ルール切替の段階数（推定3-4段階） | MECH §2.6 |
| Z-Q4 | 同一答え連続回避メカニズム未定義 | MECH §1 |
| Z-Q5 | NCIスケーリング係数（0-999.999→0-100）未決定 | NCI §6 |
| Z-Q6 | 異常検出パターン6の重みづけ・判定基準 | NCI §4 |
| Z-Q7 | ネットワーク・暗号化プロトコル未決定 | NCI §11 |
| Z-Q8 | スタッフビューp値の統計検定法 | NCI §8 |
| Z-Q9 | 音声認識フォールバック詳細 | RULE, DEV |
| Z-Q10 | マイルームグリッドサイズ・配置上限 | REWARD |
| Z-Q11 | セッション内休憩自動提案ロジック | MECH §2.7 |
| Z-Q12 | 視覚探索 タップ許容範囲40pxの根拠 | MECH §5 |
| Z-Q13 | 1画面情報要素上限廃止後のオーバーロードガイドライン | RULE §運用目安 |
| Z-Q14 | 色のセンサリー影響実機検証未実施 | COLOR §1 |
| Z-Q15 | Phase 1-4信頼度進捗の数式 | NCI §2.3, §5 |
| Z-Q16 | DDM 0.7/0.3 比率の根拠 | NCI §3 |
| Z-Q17 | memory-match similarity の具体的視覚仕様 | MECH §2.4 |

---

## Z. 既知バグ・修正履歴（このセッション分）

| ID | 内容 | コミット | 状態 |
|---|---|---|---|
| BUG-01 | Service Workerが古い子データHTMLをキャッシュ | 5f8b1ff | ✅修正 |
| BUG-02 | memory-match カード絵柄が頭文字1字でP/S衝突 | 15bb900 | 🛠 (本番未検証) |
| BUG-03 | sorting アイテム描画が color/shape頭文字固定で他criterion壊れ | eb7ad5e | 🛠 |
| BUG-04 | sorting カテゴリーボックスが COLOR_CSS固定で非color時同色 | eb7ad5e | 🛠 |
| BUG-05 | sorting shouldAdvanceCriterion がプロダクションコードから呼ばれない | eb7ad5e | 🛠 |
| BUG-06 | visual-search diff種別 5つのうち color変化しか描画されない | eb7ad5e | 🛠 |
| BUG-07 | visual-search アイテム形状が頭文字でsquare/star衝突 | eb7ad5e | 🛠 |
| BUG-08 | visual-search presence差分が描画されない（50%試行解けない） | eb7ad5e | 🛠 |
| BUG-09 | memory-match 星計算が wrong<=correct で50%正解=満点 | eb7ad5e | 🛠 |
| BUG-10 | corsi-block layout.blockSize 無視で常に64×64 hardcoded | (未修正) | 🐛 |
| BUG-11 | corsi-block 位置クランプで複数ブロック衝突可能 | (未修正) | 🐛 |
| BUG-12 | PIN画面がスマホ縦狭でスクロール不可・ボタン見切れ | (未修正) | 🐛 |
| BUG-13 | NCI算出パイプライン (`persistNciSnapshot` / `updateTheta`) がプロダクションコードから一切呼ばれていない → NCI 完全デッドコード | (Batch1検出) | 🐛 致命 |
| BUG-14 | `baseline_sessions_count` への書き込みコードが存在しない → ベースライン確立フェーズ遷移が永久に発生しない | (Batch1検出) | 🐛 致命 |
| BUG-15 | theta初期事前分布: 設計 N(500, 150²) vs 実装 N(0, 2²) の乖離 | (Batch1検出) | 🐛 中 |
| GAP-K | 異常検出: 設計6パターン中3パターンのみ実装 (instant RT / RT分散 / 疲労) | (Batch1検出) | ⚠️ 中 |

---

## 進め方ルール

1. **このチェックシートは「正」**。検証はここに書かれた項目のみ実施し、思いつきデバッグ禁止
2. 新しい検証要件が見つかったら**まずこのシートに追加**してから検証する
3. status を上から順に処理し、結果を埋めながら進める
4. 🐛 が出たら即修正→ 🛠 → 再検証 → ✅
5. ⛔ は MVPスコープ外として記録のみ残し、Phase 1以降で消化
6. **Yuyaの承認なしに実検証フェーズに入らない**
7. 全項目が ✅ になるまでこのファイルを破棄しない

## Yuyaへの確認事項

- [ ] このチェックシートの構成・項目数で漏れ・重複なく**正**として進めてよいか
- [ ] §Y のギャップ項目を**先に仕様確定**するか / **後回し**にするか
- [ ] §M タッチダイナミクス・§N デバイスモーション は MVP実装範囲か / Phase 1延期か（テーブルは存在するがコード実装が不明）
- [ ] 検証の優先順位 — A〜X を上から順 / それともコア機能（C-G ゲーム+staircase, I NCI, L データ）を先行
- [ ] 1日でやる量 / 一気走り
- [ ] 既知バグ §Z のうち未修正 BUG-10/11/12 を即修正に入れるか

承認後、最初のバッチ（**B 共通メカニクス + C-F 各ゲーム + G Staircase**）を sim+ユニットテスト+Playwrightで一気に検証します。
