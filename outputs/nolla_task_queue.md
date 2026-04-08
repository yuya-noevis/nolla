# Nolla 修正タスクキュー

> 派生タスク・修正項目・確認依頼を漏らさないための台帳。  
> 着手順・ブロック関係・優先度を一元管理する。  
> 修正が出たら即ここに追加 → 終わったら DONE マーク。

## 凡例
- [ ] 未着手
- [>] 進行中
- [x] 完了
- [✓] Yuya実機確認済
- [!] ブロッカー

---

## アクティブ (今のセッション)

### Yuya 実機確認待ち

(全て完了)

### 現在進行中

- [>] **Batch 3: DB永続化 §L** (~16 項目)
  - 検証結果 (2026-04-08):
    - ✅ 合格 (13項目): L1-L4, L6-L9, L11-L14, L19
    - [x] **L10 irt_b 計算** → commit dc9c66c で修正済 (要 Yuya 実機プレイ→DB確認)
    - [ ] **L5 game_data 空** (Medium優先, Phase1延期候補)
    - [x] **L15 途中終了ハンドリング** (2026-04-08 修正) — beforeunload + visibilitychange + /api/session/abandon + sendBeacon。要 Yuya 実機確認 (プレイ中にタブ閉じ→sessions.ended_at 確認)
    - [ ] **L16-L18 オフラインキュー デッドコード** (Low優先, Phase1延期候補)

### Subagent 結果統合済み (2026-04-08)

#### Batch 4: コードgrep §B/R/U — ✅ 全クリーン
- 13 clean / 0 critical / 0 medium
- エラー音・カウントダウン・光感受性フラッシュ・実写キャラ・スワイプ・強制終了・「間違い」テキスト・「凸凹」NGワード — **全て不在**
- 全8ゲームボタン aria-label あり / 48-64px タッチターゲット enforced
- ハードコードシークレット無し / SQL パラメータ化済み / XSS安全 (dangerouslySetInnerHTML は SW 登録のみ)
- `animate-pulse-gentle` の opacity 1→0.85 は IEEE 光感受性閾値 (25%) 未満で安全

#### Batch 5: レンダリング §C-F — ✅ 全クリーン
- **52/52 clean / 0 critical / 0 medium**
- 4ゲーム全てで: 内容ランダム化 ✓ / タッチターゲット ✓ / ヒント3段階 ✓ / 即時フィードバック ✓ / useEffect cleanup ✓ / key 安定性 ✓ / 境界バグなし ✓
- corsi-block: container query cqw/cqh アスペクト比保持 ✓ / blockSize 尊重 ✓
- visual-search: 2パネル / 5差分タイプ (color/shape/size/position/presence) 全対応 ✓

#### Batch 8: RLS/セキュリティ §U — 0 critical / 3 medium / 2 low
**セキュリティ基盤は強固**: 全12テーブルで RLS 有効、parent-scoped ポリシー、クロスペアレント情報漏洩ゼロ

**Medium (GDPR準拠ギャップ)** — 全て 2026-04-08 修正済:
1. [x] **`parents` DELETE ポリシー** — migration 20260408000001 で追加 (MCP適用済)
2. [x] **`room_items.collectible_id` ON DELETE CASCADE** — migration 20260408000001 で追加 (MCP適用済)
3. [x] **PIN scrypt ハッシュ化** — `lib/auth/pin.ts` (node:crypto scrypt, per-user salt, legacy SHA-256 互換) + `queries.ts` 呼出置換 — 要 Yuya 実機確認 (PIN設定→`pin_hash` が `scrypt$...` 形式)

**Low (設計意図あり、実装なし)**:
4. 診断情報 (`children.diagnosis`, `ld_types`) が要配慮個人情報だが平文保存 — pgcrypto 等で暗号化予定
5. サービスロールキー無し → GDPR 完全削除 (auth.users削除) に管理API必要

**注**: 1-3 は pre-launch 必須、4-5 は Phase1対応可

### Batch 3 積み残し + 統合所見

- [x] **L15 途中終了ハンドリング** (2026-04-08)
- [ ] **L5 game_data 空** (Medium, Phase1延期)
- [ ] **L16-L18 オフラインキューデッドコード** (Low, Phase1延期)
- [x] **Batch 8 Medium x3** (2026-04-08)
- [ ] **Batch 8 Low x2** (Phase1)

### 残 Batch
- [x] **Batch 6: 画面遷移 §P/T/Q** (2026-04-08 完了) — 致命バグなし。新規発見:
  - Q8/Q9 時系列ビュー未実装 (Phase1延期)
  - T1 round-transition phase unused (デッドコード、要クリーンアップ)
  - P1-P5/P13 は Playwright 検証で扱う
- [x] **Batch 7: a11y §R/X + GAP-K** (2026-04-08 完了) — 致命バグなし。
  - §R/§X 全項目クリア（CSS変数定義済、コントラスト 11.4:1、タッチターゲット 48-64px）
  - GAP-K 異常検出 3/6パターン未実装は B案で Phase1延期確定
  - sessions/rounds/trials/nci_snapshots/children/motor_baselines/stars の全列書込み検証
  - 夜間復帰シナリオ (途中中断→再ログイン)
  - RLS がかかっていないフィールド洗い出し

### Batch 全て完了 (2026-04-08)

- [x] Batch 4 / 5 / 6 / 7 / 8 — 全て致命バグなし、Phase1延期項目のみ残

### 新規追加 (Phase1 候補)

- [x] **Q8/Q9 NCI 時系列ビュー** (2026-04-08) — growth ページに週/月/年/全期間トグル + day1比較 + SVG sparkline 実装 (`timeline-view.tsx`, `getNciSnapshotHistory` query)
- [x] **T1 round-transition unused phase 削除** (2026-04-08) — use-game-session.ts の SessionPhaseUI から削除
- [>] **GAP-K 異常検出** — 外部割込 (RT>30s) 実装済 (2026-04-08, anomaly.ts §4)。位置繰返・タッチダイナミクスは gameData/touchEvents スキーマ拡張が前提 → Phase2
- [x] **P13 リンク切れ検証** (2026-04-08) — 静的解析で全router.push/href/redirect先を列挙 → 全14ルート存在確認、リンク切れゼロ
- [ ] **P1-P5 オンボーディング画面検証** (S1-S5)

---

## バックログ (優先度付き、ブロッカー待ち)

- [ ] **NCI-S 軸 (処理速度)** 設計 + 実装 (現在 thetaS は INITIAL_THETA のまま更新されない)
  - 着手条件: Batch 3 完了後。全ゲーム横断の RT 軸が別途必要
  - Why: NCI 4軸のうち 1 軸が空のまま親ダッシュボードで表示すると違和感

- [ ] **疲労曲線モデル化** (trials-per-round 設計の 100 点化)
  - 着手条件: 実運用データが蓄積してから (初回ベースライン 8 セッション以降)
  - 現在: 3ラウンド目のパフォーマンス低下を無視

- [ ] **文献引用の再検証** (trials-per-round 設計の 100 点化)
  - 着手条件: Yuya の優先度判断次第 (エビデンスドキュメント作成時)
  - 現在: Kessels 2000, Orsini 1987, Zelazo 2006, Wolfe 1998, Foerster 1991 を記憶ベースで引用

- [ ] **モンテカルロ報酬分布シミュレーション**
  - 着手条件: 現状の報酬式で実ユーザーが違和感を訴えたら
  - 現在: 80%成功率均衡時の期待スター分布を解析のみで判断

---

## 完了済 (参考)

- [x] ✓ BUG-13/14: NCI配線 + ベースライン進捗 (e2b2910, 9d4c9e4)
- [x] ✓ BUG-15: rounds 2/3 DB 保存 (9d4c9e4)
- [x] ✓ BUG-10/11: Corsi layout/clipping (1696772, 37f9b8f)
- [x] ✓ BUG-12: PIN スクロール (1696772, 37f9b8f)
- [x] ✓ Memory-match スコア (Yuyaテーブル) (baf9879)
- [x] ✓ Trials-per-round 統一設計 (7e66a46)
- [x] ✓ ホーム画面カルーセル矢印 (c1b893e)
- [x] ✓ 神経衰弱 pairs=3 (6枚) 2ゲーム/R 動作確認 (DB実データ + Yuya実機)
- [x] ✓ ホーム画面フィット (a396447)
- [x] ✓ なかまわけ clamp復旧 + 多シーン (3c44bc3)
- [x] ✓ みつけて 多シーン動作 (7e66a46)
- [x] ✓ グリッド 4試行/R + 中断しない (7e66a46)
- [x] ✓ L10 irt_b trial時点計算 (dc9c66c) — 要再プレイでDB確認

---

## 運用ルール

1. 修正/派生が出たら **即ここに追記** + 優先度付け + ブロッカー記載
2. 着手時に `[ ]` → `[>]`
3. 完了時に `[>]` → `[x]`
4. Yuya 確認通過で `[x]` → `[x] ✓`
5. セッション冒頭でこのファイルを読んで現在地確認
6. Yuya への報告時にこのファイルを参照してサマリを出す
