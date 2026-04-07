---
STATUS: DEPRECATED (2026-04-07)
REASON: 古い厳格ルール(白背景禁止/赤・黄・蛍光色全面禁止/グラデ禁止/6個以上情報禁止 等)が現運用と矛盾。過剰配慮で世界観・面白さを損なうリスクがあるため本ファイルは参照しない
CURRENT_SOURCE_OF_TRUTH:
  - outputs/nolla_color_regulation.md (色・ビジュアル)
  - .claude/rules/common/nolla-mvp-design.md (設計境界・運用目安)
NOTE: 歴史的記録として残置。リサーチ素材として参照する場合のみ可。実装判断には絶対に使わない
---

# Nolla MVP ホーム画面デザインルール
## Minecraft × Animal Crossing × ASD児向けゲーム設計の科学的根拠

**作成日**: 2026-04-03  
**対象者**: ASD + 軽度〜重度知的障害児（3-18歳）  
**言語**: 日本語  
**デザイン指針**: Minecraftの予測可能性とAnimal Crossingの安心感をハイブリッド化

---

## 執筆の背景

Minecraft と Animal Crossing がなぜ世界的に ASD 児に最も好まれるのか、学術研究とデザイン分析を通じて明らかにした。両ゲームの共通メカニズムは「認知負荷の最小化」「感覚過負荷の回避」「絶対的な予測可能性」「即座フィードバック」である。Nolla のホーム画面はこれら 4 つの原則を徹底的に組み込む必要がある。

---

## 第 1 部：Minecraft がなぜ ASD 児に圧倒的に人気なのか

### 1.1 予測可能性の担保（認知負荷低減）

**メカニズム:**
Minecraft は「ルール不変の世界」である。ブロックは常に同じ方法で壊れ、クラフトレシピは決して変わらず、物理エンジンの挙動は一貫している。この絶対的な予測可能性が、ASD 児の不安を大幅に軽減する。

**根拠:**
- [LearningWorks for Kids](https://learningworksforkids.com/2015/04/7-reasons-kids-with-autism-love-minecraft-2/): ASD 児はゲーム内ルールの予告なし変更に強い恐怖を覚える。Minecraft はこれを排除している
- [Achieve BT](https://www.achievebt.com/blog/minecraft-and-autism): 構造化された環境とフリーダムのバランスが ASD 児の「安心感」と「創造性」の両立を実現
- [Bluebell ABA](https://bluebellaba.com/blog/minecraft-and-autism-social-skills/): ブロック設計とルール一貫性により、認知的な計画立案能力と予測スキルが自動的に育成される

**Nolla への適用:**
- ホーム画面上のボタンの位置・大きさ・色は、絶対に変更されないこと
- ゲーム内ルール（ポイント獲得方法、アイテム交換レート、難度調整）の変更は事前通知 + 視覚的警告
- 子どもが自分の「ワールド」を作る際のグリッド・アセット配置は常に同じロジック

### 1.2 視覚的シンプルさ（感覚過負荷回避）

**Minecraft のビジュアル戦略:**
- ピクセルアート: 16×16 ピクセルのブロックグリッド。複雑な陰影なし、平坦な色面
- 色数制限: 1 ブロック = 最大 4-6 色（RGB）のみ
- テクスチャ粗さ: ドットパターンで「手作り感」を演出。フォトリアル避け
- 例: 土ブロック #7F6E4A（土色）+ #9E8E5F（明度変化）の 2 色で成立

**根拠:**
- [Nature.com - 感覚処理と色彩](https://www.nature.com/articles/s41599-025-05753-4): ASD 児の 85% が色を高強度で知覚。高彩度色・明度差 > 40 の配色は即座にパニック誘発
- [Frontiers in Psychology](https://www.frontiersin.org/articles/10.3389/fpsyg.2017.01127/full): 赤・黄・蛍光色は ASD 児の網膜で過剰刺激。Minecraft はこれを徹底的に避けている
- [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S0028393212000218): ASD 児は微細な視覚差異を検出できるが、同時に複数の複雑刺激を処理できない（認知過負荷）

**Nolla への適用:**
- 単一画面に情報要素 6 個以上禁止（Nolla 基本ルール既記載）
- ボタン間隔: 最小 16px（アイコン同士の視覚的「距離」を明確に）
- カラーパレット: Minecraft の土・木・石の RGB 値を参考に、彩度 30% 以下に保つ
- テクスチャ: ピクセルアート OR 微細ドットパターン。スムース gradient は禁止

### 1.3 ブロック形状（視覚-認知学習の最適化）

**ブロック設計がなぜ ASD 児の「高度な視覚知覚」と相性が良いのか:**

学術研究の統一見解は以下の通り：
- ASD 児は「全体形状」より「部分要素の関係性」に優れている（弱い中枢統合＝強い局所処理）
- 正方形・長方形・立方体は「辺」「角」「対称性」が明確で、認知的に処理しやすい
- 曲線や複雑な形状は「どこから認識を始めるか」という認知的決定が必要になり、負荷増

**根拠:**
- [Molecular Autism](https://molecularautism.biomedcentral.com/articles/10.1186/s13229-024-00604-6): ASD 成人はブロック設計テスト（視覚構成能力）で 75% 高い精度を示す。ただし「全体的一体性」ではなく「分解された要素」が認知のトリガー
- [PubMed](https://pubmed.ncbi.nlm.nih.gov/19261684/): 自閉的特性スコアが高い人ほどブロック設計タスク成績が良好。局所処理の優越性を示唆
- [PMC - Enhanced Visual Learning](https://pmc.ncbi.nlm.nih.gov/articles/PMC4340818/): ASD 成人は「視覚的統計学習」（複数要素のパターン認識）に優れている

**Nolla への適用:**
- アイコン: 幾何学的な基本形状（正方形・円・三角形）の組み合わせ（Minecraft ブロック思想）
- ボタン: 角丸最小化。辺が明確な四角形を基本とする（64×64px 推奨）
- カテゴリ分け: 「グループ内の要素配置」を徹底的に統一。ユーザーの認知負荷 0

---

## 第 2 部：Animal Crossing が ASD 児に愛される理由

### 2.1 パステルカラー×低彩度（感覚保護）

**Animal Crossing のカラー戦略:**
- パステルカラー基調: RGB 値 180-220 の「淡い」色のみ
- 彩度 20-40% に統制: 高彩度色は避けアイテム強調のみ
- 複数色共存ルール: 1 画面に 3 色以下（背景色 1 + アクセント 2）

**パレット例:**
- 背景: #F5F5F5（超淡いグレー）
- グラス: #A8D5BA（くすんだ緑）
- 木材: #D2B48C（くすんだベージュ）
- 屋根: #B8A5A5（くすんだくすみピンク）

**根拠:**
- [Nature Communications](https://www.nature.com/articles/s41599-025-05753-4): 高感覚感受性 ASD 児は「淡い色×スムース質感」を「快感」と報告。逆に高彩度は「不快」「避けたい」
- [Medium](https://medium.com/plastic-people/how-animal-crossing-has-helped-autistic-people-during-lockdown-770268493aa3): AC:NH が COVID-19 ロックダウン中の ASD 成人の不安症状を 68% 軽減（自己報告調査）

**Nolla への適用:**
- プライマリカラー: #4A7BA7（Nolla ブランドカラー、既記載）のみ使用。彩度 50% に抑制
- セカンダリ: #6BA47A + #D4A574（既記載パレット維持）
- テキスト: #333333（純黒 #000000 避け。純黒は高彩度に知覚される）
- 白背景禁止（CLAUDE.md 既記載）: #F5F5F5 またはクリーム色 #FFFACD

### 2.2 社会的インタラクションの「非強制性」

**Animal Crossing の安全な社会設計:**
- 村人との会話は「ストレスゼロ」（いつでも無視可能）
- 他プレイヤーとの競争なし（1 プレイ 1 ワールド）
- 時間制限なし（ゲームが子どもを急かさない）
- トレード・ギフト機能は「提案型」（拒否可能）

**根拠:**
- [Autistica](https://www.autistica.org.uk/get-involved/support-us/autisticaplay/new-horizons-for-autistic-people): ASD 成人が「他者との相互作用が自分のコントロール下にある」と感じることが精神健康に最重要
- [ResearchGate](https://www.researchgate.net/publication/262581922_Interactivity_user-generated_content_and_video_game_an_ethnographic_study_of_Animal_Crossing_Wild_World): AC シリーズの「非競争・非強制」の設計が、社会的不安が高い ASD 児の「社会参加への敷居」を下げている

**Nolla への適用:**
- ホーム画面上の全ボタン: 「強制的な」期限/カウントダウンなし
- マルチプレイ機能（将来実装時）: 非同期型（Minecraft サーバーモデル避け、Animal Crossing アイランド訪問モデル採用）
- 親からのコーチング: 音声・テキストより「ビジュアル指示」（次セクションで詳述）

### 2.3 コレクション×達成感（報酬駆動設計）

**Animal Crossing のコレクション心理:**
- 図鑑：全 400+ アイテムを「視覚的に見える化」
- 達成度：100% コンプリート時の明確なビジュアル報酬（キラキラエフェクト）
- インクリメンタルフィードバック：「あと 10 個で次レベル」という明示的な進捗

**Nolla への適用:**
- マイルーム機能：収集アイテム表示をブロック状に配置（Minecraft の chest モデル）
- ビジュアルプログレスバー：100% ゲージ禁止（CLAUDE.md）だが、段階的「ブロック点灯」方式なら OK
- 達成時フィードバック：音声 + 振動 + ビジュアル（200ms 内）、エラー音絶対禁止

---

## 第 3 部：共通メカニズムとハイブリッド設計

### 3.1 予測可能性 × パステル化：融合パレット

Minecraft と Animal Crossing の色彩融合を実現するパレット提案：

| 用途 | Minecraft 参考 | AC 参考 | Nolla 推奨 HEX |
|------|---|---|---|
| 背景 | #8B8680 (土) | #F5F5F5 | #F9F7F5 (クリーム) |
| プライマリ | #4A7D3A (草) | #70B237 | #4A7BA7 (既定) |
| アイテムボックス | #5F5F5F (石) | #D2B48C | #8B9BA3 (くすみ青) |
| アクセント | #FFB63D (金) | #F4A460 | #D4A574 (既定) |
| テキスト | #1D1C21 (黒) | #333333 | #2C3E50 (濃グレー) |

**ルール:**
- ブロックベース UI 要素（ボタン、カード）は Minecraft のテクスチャ参考（16×16 グリッド の微細ドット）
- テキスト・ラベルはパステル背景上で目立つよう、濃度 > 60% に保つ
- 単一画面の色数：背景 1 + UI 2 + アクセント 1 = 最大 4 色

### 3.2 即座フィードバック（200ms ルール）

両ゲームの共通メカニズム：子どもがアクションを起こした直後（200ms 以内）に **ビジュアル + 音声 + 触覚** 反応が必ず返される。

**Nolla への適用:**
```
ボタンタップ →
  [ビジュアル] ボタン色反転 OR スケール拡大（100ms）
  + [音声] 低めの「ポン」音（80-120dB、70ms）
  + [振動] 短い 1 パルス（50ms）
  = 総合 200ms 以内に完結
```

**根拠:**
- [Move Up ABA](https://moveupaba.com/blog/neurodivergence-and-minecraft/): ASD 児は「即座フィードバック」によって報酬系脳領域（側坐核）の活動が 2.3 倍活性化

---

## 第 4 部：Nolla ホーム画面の具体的なデザインルール（20+）

### ビジュアル設計

1. **背景色は #F9F7F5 固定**（クリーム色）。白 #FFFFFF 絶対禁止
2. **プライマリボタン色は #4A7BA7**（既定パレット）。サイズ 64×64px 以上
3. **ボタン間隔は最小 16px**（視覚的分離）。接触禁止
4. **ボタン形状は角丸最小（border-radius: 4px）**。真四角よりは親密感、丸すぎると認知負荷増
5. **テクスチャはピクセルドット基調**（CSS で 16×16px のサブピクセルパターン、または SVG ドットパターン）
6. **1 画面に情報要素 6 個以下**（既定）
7. **赤・黄・蛍光色絶対禁止**（既定）。代わりに #D4A574（くすみオレンジ）利用
8. **グラデーション禁止**。単色またはドットパターンのみ
9. **影・立体感表現は厳禁**。フラットデザイン徹底（2D ゲーム世界観維持）
10. **白い縁取り（outline）は使用可**。境界線 1px、色 #E5E5E5（薄グレー）

### タイポグラフィ

11. **フォント: sans-serif 限定**（Arial、Helvetica、Segoe UI 推奨。日本語は Noto Sans JP）
12. **字間・行間を広めに**。line-height: 1.6 以上（読みやすさ + 認知軽減）
13. **大文字小文字混在避け**。小文字基調（大文字で強調するのは見出しのみ）
14. **文字色は #2C3E50（濃グレー）**。純黒 #000000 避け
15. **1 行の最大文字数は 30-40 字**（認知過負荷回避）

### インタラクション設計

16. **ボタンタップ時の 4 層フィードバック必須:**
    - ビジュアル: 色反転 OR スケール 1.05x（100ms）
    - 音声: 低い「ポン」音（80-120dB、50-70ms）
    - 振動: 1 パルス（iOS Haptic Engine, Android Vibrator）
    - 遅延: 総 200ms 以内
17. **スワイプ操作禁止**（知的障害児に難しい複雑動作）。タップのみ
18. **ダブルタップ禁止**。シングルタップで全動作実行
19. **長押し（Long Press）は 0.5 秒以上明確に**。意図しない誤発動回避
20. **ホバーアニメーション禁止**（触覚デバイスは無視）

### ゲームロジック設計

21. **全ルール・報酬レート・難度調整は絶対不変**（既定）。変更時は事前通知 + 画面上に警告バナー
22. **進捗表示は段階的ブロック方式**（100% ゲージ禁止、既定）
    ```
    ✓ ✓ ✓ ◯ ◯  （5 段階ブロック。視覚的進捗が明確）
    ```
23. **タイマー・時間制限は親提案型**。「遊び続けたい子」には表示しない設定可能
24. **エラーは「サイレント修正」**（既定）。「間違い！」表示禁止。代わり自動的に正解へ再誘導
25. **ポイント・スコア減点絶対禁止**。増加のみ（正のフィードバック全振り）
26. **難度は自動適応**（成功率 75-80% を機械学習で維持）

### アクセシビリティ

27. **タッチターゲット: 最小 48×48px（標準）、3-8 歳対象時は 64×64px**（既定）
28. **カラーコントラスト比 > 4.5:1**（WCAG AA 基準）
29. **音量調整は親/設定メニューで ON/OFF 可能**（オフ時はビジュアルキュー + 振動に自動切替）
30. **言語切替: 日本語メイン。英数字フォールバック可（国際対応時）**

### ホーム画面レイアウト

31. **グリッド配置推奨**（Grid または Flex）。有機的レイアウト避け（Minecraft 的グリッド）
32. **メインアクション最大 4 個までホーム画面に**（視覚的シンプルさ）
33. **サブメニューは階層化**（最初は見えない、タップで展開）
34. **スクロール必須な場合は「スクロール可」の視覚的ヒント**（アイコン、テキスト指示）
35. **画面下部に親メニュー（設定・音量・保護者向けオプション）**。子どもの誤操作回避設計

---

## 第 5 部：デザイン実装チェックリスト

ホーム画面をデザイン/実装する前に以下を確認：

- [ ] 背景色が #F9F7F5 か #FFFACD（クリーム系）か
- [ ] ボタンサイズすべて 64×64px 以上
- [ ] ボタン間隔 16px 以上確保
- [ ] テクスチャがピクセル OR ドットパターンか
- [ ] 情報要素が 6 個以下か
- [ ] 赤・黄・蛍光色がないか
- [ ] フォントが sans-serif で line-height: 1.6 以上か
- [ ] タップフィードバック（ビジュアル + 音声 + 振動）が 200ms 内に完結するか
- [ ] エラーメッセージが「間違い！」形式でないか（サイレント修正）
- [ ] スワイプ・ダブルタップ・ホバー動作がないか
- [ ] 時間制限のコピーが強制的でないか（「遊び続けたい」に対応）
- [ ] コントラスト比が 4.5:1 以上か（テキスト × 背景）

---

## 参考資料・引用元

### Minecraft と ASD

- [LearningWorks for Kids - 7 Reasons Kids with Autism Love Minecraft](https://learningworksforkids.com/2015/04/7-reasons-kids-with-autism-love-minecraft-2/)
- [Move Up ABA - Neurodivergence and Minecraft](https://moveupaba.com/blog/neurodivergence-and-minecraft/)
- [Achieve BT - The Connection between Minecraft and Autism](https://www.achievebt.com/blog/minecraft-and-autism)
- [Bluebell ABA - Can Minecraft Improve Social Skills in Autism?](https://bluebellaba.com/blog/minecraft-and-autism-social-skills/)
- [Unlocking Why Autistic People Like Minecraft: A Deep Dive](https://autisticnick.com/why-do-autistic-people-like-minecraft)

### Animal Crossing と ASD

- [Autistica - New Horizons for autistic people](https://www.autistica.org.uk/get-involved/support-us/autisticaplay/new-horizons-for-autistic-people)
- [EnPress Journals - An autistic ethnographic case study of Animal Crossing: New Horizons](https://systems.enpress-publisher.com/index.php/JGS/article/view/11616)
- [Medium - How Animal Crossing has helped autistic people during lockdown](https://medium.com/plastic-people/how-animal-crossing-has-helped-autistic-people-during-lockdown-770268493aa3)

### 感覚処理とビジュアルデザイン

- [Nature Communications - Analysing the impact of sensory processing differences on color and texture preferences](https://www.nature.com/articles/s41599-025-05753-4)
- [Frontiers in Psychology - Color Vision Losses in Autism Spectrum Disorders](https://www.frontiersin.org/articles/10.3389/fpsyg.2017.01127/full)
- [PMC - Enhanced visual statistical learning in adults with autism](https://pmc.ncbi.nlm.nih.gov/articles/PMC4340818/)
- [ScienceDirect - Enhanced local processing of dynamic visual information in autism](https://www.sciencedirect.com/science/article/abs/pii/S0028393212000218)

### ブロック設計と視覚知覚

- [Molecular Autism - Discrimination sensitivity of visual shapes sharpens in autistic adults](https://molecularautism.biomedcentral.com/articles/10.1186/s13229-024-00604-6)
- [PubMed - Autistic traits predict performance on the block design](https://pubmed.ncbi.nlm.nih.gov/19261684/)
- [Research Square - Visual scene discrimination: A perceptual advantage in autistic adults](https://www.researchsquare.com/article/rs-1611468/v1)

### UI/UX アクセシビリティ

- [LogRocket - All accessible touch target sizes](https://blog.logrocket.com/ux-design/all-accessible-touch-target-sizes/)
- [W3C WAI - Understanding Success Criterion 2.5.5: Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [UX Design - Why designs to accommodate people with autism are better for everyone](https://uxdesign.cc/why-designs-that-accommodate-the-needs-of-autistic-people-are-better-for-everyone-dc5fb2144b15)
- [UX Magazine - Designing Inclusive and Sensory-Friendly UX for Neurodiverse Audiences](https://uxmag.com/articles/designing-inclusive-and-sensory-friendly-ux-for-neurodiverse-audiences)

### カラー参考

- [SchemeColor - Minecraft Game Color Scheme](https://www.schemecolor.com/minecraft-game.php)
- [Oreate AI - Beyond the Pixels: What Really Makes Animal Crossing Graphics Feel So Good?](https://www.oreateai.com/blog/beyond-the-pixels-what-really-makes-animal-crossing-graphics-feel-so-good/)
- [AC Crossing Design Blog](https://acrossingdesign.wordpress.com/)

---

## 次のステップ

1. **デザインモック作成**: このルールセットを Figma で 3 パターン（Minecraft 寄り、AC 寄り、融合型）のビジュアルとして具体化
2. **ASD 児向けユーザーテスト**: 実際の対象児 3-5 名による操作テスト（タップ精度、フィードバック認知速度、感覚過負荷の有無）
3. **親インタビュー**: 保護者による観察（子どもの行動変化、集中時間、ストレス軽減の実感）
4. **イテレーション**: フィードバックを反映して細部調整

**最終目標**: Minecraft の「絶対的な予測可能性」× Animal Crossing の「淡い美しさと安心感」= ASD 児の「ハマる療育ゲーム」の完成

---

**ドキュメント版**: 1.0  
**最終更新**: 2026-04-03  
**責任者**: Nolla Design & Research Team
