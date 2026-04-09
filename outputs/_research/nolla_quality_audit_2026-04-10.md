---
STATUS: ACTIVE
LAST_UPDATED: 2026-04-10
PURPOSE: Nolla MVPの品質監査レポート(Supabase advisor / ASD設計境界遵守 / npm CVE)。コード修正はせず検出のみ。
RELATED: nolla-mvp-design.md, nolla_dev_roadmap.md
---

# Nolla 品質監査レポート 2026-04-10

## エグゼクティブサマリー

| 領域 | 検出数 | 重大度 | 対応優先度 |
|---|---|---|---|
| Supabase セキュリティ | 2 WARN | 低 | P3(本番前) |
| Supabase パフォーマンス | 30件 | 中 | P2(本番前必須) |
| ASD 設計境界遵守 | 0 違反 | — | ✓ クリーン |
| npm 依存CVE | 1 HIGH | 中 | P2(一括更新で解消) |

**総評**: ASD設計境界は**完全クリーン**。インフラ/依存層に本番前対応の課題あり(いずれも既知パターンで容易修正可)。

---

## 1. Supabase Security Advisor

### 1.1 [WARN] function_search_path_mutable
- **対象**: `public.update_updated_at` 関数
- **問題**: `search_path` パラメータ未設定。悪意あるスキーマ注入リスク(実運用では低リスクだがベストプラクティス違反)
- **修正**: 次回マイグレーションで `ALTER FUNCTION public.update_updated_at() SET search_path = public, pg_temp;`
- **参考**: https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable

### 1.2 [WARN] auth_leaked_password_protection disabled
- **問題**: Supabase Auth の漏洩パスワード保護(HaveIBeenPwned照合)が無効
- **修正**: Supabase Dashboard → Auth → Settings で有効化(コード変更不要)
- **参考**: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection

---

## 2. Supabase Performance Advisor

### 2.1 [INFO] Unindexed Foreign Keys (13件)
FKに対するカバーインデックス不足。スケール時にJOIN性能劣化。

対象FK一覧:
- `children.parent_id`
- `device_motion.session_id`
- `motor_baselines.child_id`, `motor_baselines.session_id`
- `room_items.child_id`, `room_items.collectible_id`
- `rounds.session_id`
- `sessions.child_id`
- `stars.child_id`, `stars.session_id`
- `touch_dynamics.trial_id`
- `trials.round_id`, `trials.session_id`

**修正**: 単一マイグレーションで13個の `CREATE INDEX` を一括追加可能。
```sql
CREATE INDEX idx_children_parent_id ON public.children(parent_id);
-- 他12件同様
```

### 2.2 [WARN] Auth RLS Initialization Plan (16件)
RLSポリシー内で `auth.uid()` を行ごとに再評価。大量クエリで性能劣化。

対象テーブル: `parents`(4ポリシー), `children`(4), `sessions`, `rounds`, `trials`, `nci_snapshots`, `motor_baselines`, `touch_dynamics`, `device_motion`, `stars`, `collectibles`, `room_items`

**修正パターン**: `auth.uid()` → `(select auth.uid())` に全置換。
```sql
-- Before
USING (parent_id = auth.uid())
-- After
USING (parent_id = (select auth.uid()))
```
単一マイグレーションで全16ポリシー書き換え可能。

### 2.3 [INFO] Auth DB Connection Strategy (1件)
- Auth serverの最大コネクションが絶対数(10)で固定
- インスタンスサイズ拡大しても Auth性能が上がらない
- **修正**: Dashboard設定のみ(パーセンテージ方式に変更)

---

## 3. ASD 設計境界 遵守監査

`.claude/rules/common/nolla-mvp-design.md` の設計境界(科学的根拠あり、例外なし)を既存コードで全件検証。

| # | ルール | 検出 | 判定 |
|---|---|---|---|
| 1 | 時間制限・カウントダウンタイマー禁止 | 本番コードに該当なし(e2eテストのみ) | ✓ PASS |
| 2 | エラー音・スコア減点・「間違い！」表示禁止 | 0件 | ✓ PASS |
| 3 | 「間違い/不正解/失敗」テキスト | 0件(`×`は乗算記号の用途のみ) | ✓ PASS |
| 4 | 文字によるナビ・ゲーム内指示 | チュートリアルは4段階プロンプティング削減法でアニメ主導(tutorial-overlay.tsx) | ✓ PASS |
| 5 | スワイプ・ダブルタップ禁止 | 0件 | ✓ PASS |
| 6 | 縦向きUI禁止 | landscape-lockヒントを portrait 検出時に表示(globals.css L105-108)。本体は横固定 | ✓ PASS |
| 7 | 自動再生フラッシュ・点滅禁止 | `animate-pulse-gentle`(1500ms, opacity 0.85-1.0)= **0.67Hz**。光感受性てんかん閾値3Hzの1/4以下。brightnessも1.1の微変動のみ | ✓ PASS |
| 8 | リアルな人間キャラ禁止 | コードからは検証不可(アセット次第)。デザイン段階で別途確認 | N/A |

**総合判定**: **8項目中7項目 PASS、1項目は対象外(アセット依存)**。コード起因の設計境界違反ゼロ。

---

## 4. npm 依存 CVE

### 4.1 [HIGH] vite (transitive)
- **バージョン**: 8.0.0 - 8.0.4
- **脆弱性3件**:
  1. Path Traversal in Optimized Deps `.map` (Moderate) — GHSA-4w7w-66w2-5vf9
  2. `server.fs.deny` bypass via queries (High) — GHSA-v2wj-q39q-566r
  3. Arbitrary File Read via Dev Server WebSocket (High) — GHSA-p9ff-h696-f583
- **影響範囲**: **開発サーバーのみ**(本番ビルドに影響なし)
- **`fixAvailable: true`** — `npm audit fix` で解消可能
- **修正**: `cd app && npm audit fix` を実行し、lockfileをコミット

### 4.2 全体統計
- 総依存数: 527(prod 30 / dev 460 / optional 97 / peer 17)
- 脆弱性: info 0 / low 0 / moderate 0 / **high 1** / critical 0

---

## 5. 優先対応リスト(次セッション以降)

### P1: 本番前必須
- [ ] **P1-1** `npm audit fix` で vite 更新(開発環境の安全性、影響範囲狭)
- [ ] **P1-2** Supabase RLS `auth.uid()` → `(select auth.uid())` 一括書換マイグレーション(性能問題、現段階なら低コスト)

### P2: 本番前推奨
- [ ] **P2-1** 13個のFKインデックス追加マイグレーション
- [ ] **P2-2** `update_updated_at` 関数の `search_path` 固定

### P3: 本番前任意
- [ ] **P3-1** Leaked Password Protection 有効化(Dashboard操作)
- [ ] **P3-2** Auth DB Connection を percentage方式に(Dashboard操作)

### デザイン確定後に検証
- [ ] **D-1** キャラクターアセットの「リアルな人間キャラ禁止」遵守(幾何学デフォルメ確認)
- [ ] **D-2** 新規追加アニメーションの photosensitive 再検証(3Hz閾値)

---

## 6. 監査コマンド再現手順

```bash
# Supabase
# Claude Code から Supabase MCP の get_advisors(security/performance) を呼ぶ

# npm
cd app && npm audit --json

# ASD grep audit
grep -rn "間違い\|不正解\|失敗" src/**/*.{ts,tsx}
grep -rn "setInterval\|countdown\|timeLimit" src/**/*.{ts,tsx}
grep -rn "onSwipe\|doubleTap" src/**/*.{ts,tsx}
grep -rn "@keyframes.*flash\|blink" src/**/*.css
```

---

**監査実施**: Claude (開発リード) 2026-04-10
**監査スコープ**: 既存コード + Supabase本番プロジェクト + npm依存ツリー
**次回監査タイミング**: P1-P2対応後、および本番デプロイ前
