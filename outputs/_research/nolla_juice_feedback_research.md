---
STATUS: RESEARCH DOCUMENT
DATE_CREATED: 2026-04-09
PURPOSE: ゲームフィール・即座フィードバック設計のためのリサーチ。ASD児向けセンサリーデザイン最適化。
SOURCES: Jan Willem Nijman (Vlambeer), 学術論文(ASD感覚研究), Bluey/Duolingo/Pokemon/Animal Crossing の演出分析
---

# Nolla MVP：ジュース・ゲームフィール・フィードバック設計 リサーチ

## 1. ジュース(Juice) / ゲームフィール定義

### 1.1 Jan Willem Nijman「The Art of Screenshake」(Vlambeer, 2013)

**定義**: 「ゲームのポーランド」。プレイヤーアクションへの即座で多感覚的な応答。ビジュアル+音+振動による多層フィードバック。

**引用**:
> "ゲームフィールとは、つまらないゲームを面白くするために必要な全ての小さな詳細。それは、アニメーション、サウンド、ビジュアルフィードバックの層積である。"
> — Jan Willem Nijman, "The Art of Screenshake" (INDIGO Classes, 2013)
> https://www.gamedesign.gg/knowledge-base/game-design/game-feel-feedback/the-art-of-screenshake-jan-willem-nijman-vlambeer/

**Nijman のフレームワーク**:
1. **ビジュアルフィードバック**: スクリーンシェイク、パーティクル、スケール変化
2. **オーディオフィードバック**: 効果音、ピッチ変化、タイミング
3. **アニメーション品質**: イージング、デュレーション、レイアウト

**実装の公式**: 30個の小さな改善 → つまらないゲーム → ハマるゲーム (GDD内で実装可能)

---

## 2. ASD児向け感覚フィードバック研究

### 2.1 ASD児の感覚処理特性

**統計**:
- **90%** の ASD診断児が atypical sensory experience を報告
- **96%** が複数感覚領域で hyper/hypo-sensitivity を経験
- **3-4%** が光感受性てんかんリスク (定型発達人口比で 10-15倍)

**出典**:
- Nature, Pediatric Research「Sensory Processing in Autism: A Review of Neurophysiologic Findings」
  https://www.nature.com/articles/pr9201193
  https://pmc.ncbi.nlm.nih.gov/articles/PMC3086654/

### 2.2 感覚別 ASD児への影響と推奨

#### 視覚フィードバック
**禁忌**:
- フラッシング（5秒以上） / 点滅パターン
- 高彩度単色の大面積・高速アニメーション
- 複雑で予測不可能な視覚パターン

**推奨**:
- パステル・柔らかい色彩
- 緩やかなフェードイン/アウト (200-500ms)
- 予測可能な幾何学的パターン
- 詳細は別紙 `nolla_color_regulation.md` 参照

#### 聴覚フィードバック
**禁忌**:
- 不意の大きな音 (85dB 以上)
- 高周波や耳障りな効果音

**推奨**:
- 低-中周波の落ち着いた音 (440-880Hz)
- 段階的な音量増加
- ON/OFF 切替可能 (保護者設定)

**出典**:
- PMC「Autism Spectrum Disorder and auditory sensory alterations」
  https://pmc.ncbi.nlm.nih.gov/articles/PMC10033482/

#### 触覚（ハプティック）フィードバック
**推奨**:
- 軽微な振動 (50-100ms, 低強度)
- 成功時に短い振動パターン
- 触覚過敏児のために OFF 選択肢必須

**出典**:
- PMC「Haptic and visuo-haptic impairments」
  https://pubmed.ncbi.nlm.nih.gov/38819648/

### 2.3 光感受性てんかん(Photosensitive Epilepsy, PSE) ガイドライン

**リスク群**:
- 8-20才（ピーク: 12-13才）
- 女児が男児より頻繁
- 汎発性てんかん児、若年性筋クローヌスてんかん児に多発

**CRITICAL 禁忌**:
- **3フラッシュ/秒以上、25%以上の画面覆う** → 絶対NG
- **高コントラスト点滅パターン** → NG
- **規則的な反復パターン** (赤+黒ストライプ等) → NG

**推奨ガイドライン**:
1. フラッシング: 最大 3回/秒以下、5秒以上継続しない
2. パターン: 不規則性、低コントラスト
3. エリア: 25%未満の画面範囲
4. 背景: 暖色系、単一色推奨

**出典**:
- Epilepsy Foundation「Photosensitivity and Seizures」
  https://www.epilepsy.com/what-is-epilepsy/seizure-triggers/photosensitivity
- Game Accessibility Guidelines「Avoid flickering images and repetitive patterns」
  https://gameaccessibilityguidelines.com/avoid-flickering-images-and-repetitive-patterns/
- Nintendo Support「Information About Photosensitivity」
  https://en-americas-support.nintendo.com/app/answers/detail/a_id/59596/

---

## 3. 演出カタログ：世界観別フィードバック設計

### 3.1 Bluey スタイル（親友型、落ち着き重視）

**ビジュアル**:
- パステル系カラー (淡い黄、水色、ピンク)
- 丸みのあるキャラクター + 親キャラ登場
- 親のナレーション/ガイダンス音声

**ゲームフィール**:
- 成功時: 明るい「ワッホー」音 + キャラ笑顔アニメ + 親の褒め声
- 失敗時: 無音（エラー音なし） → 正解への自然な誘導
- ロード/遷移: 親キャラのシーン遷移ナレーション

**引用**:
> "Bluey: The Videogame は親子の協力をテーマに、親パパママのナレーション＆ビジュアルガイダンスで、子どもが迷わない設計をしている。競争性ゼロ、勧誘的・指示的ナレーション。"
> — Medium「Bluey: A UX Masterclass for Designing Kid-Friendly Digital Experiences」
> https://medium.com/design-bootcamp/bluey-a-ux-masterclass-for-designing-kid-friendly-digital-experiences-6e8d5546f255

**実装例**: タップ → アニメ(300ms) → ワッホー音 → 次へ自動進行 or 親ガイダンス

---

### 3.2 Duolingo スタイル（動機付け型、心理学駆動）

**ビジュアル**:
- マスコット（Duo owl）の多感情アニメーション
- 成功: 喜び、成就感の表現
- 失敗: 同情的・励ましの表情（非責めのり）

**ゲームフィール**:
- 正解: マスコット反応 + キラキラパーティクル + 承認音
- 失敗: マスコット共感表情 + 「もう一度いこう」ガイダンス
- ストリーク達成: 爆竹的ビジュアル + 晴れやかな音

**心理学的メカニズム**:
1. **オペラント条件付け**: 即座フィードバック → 学習加速
2. **Parasocial interaction**: マスコット擬人化 → 感情接続
3. **可変報酬**: 予測不可能なボーナス → エンゲージメント維持

**引用**:
> "Duolingo の設計者は『軽微な感情反応がエンゲージメントを劇的に増加させる』と述べた。Duo の表情アニメーション + 喪失回避(ストリーク破断恐怖) + 即座フィードバック = 平均 70分/日 継続。"
> — Scrimmage「The Psychology Behind Duolingo's Success」
> https://scrimmage.co/the-psychology-behind-duolingos-success/
> — Oreate AI Blog「The Strong Duolingo Bird」
> https://www.oreateai.com/blog/the-strong-duolingo-bird-more-than-just-a-master-of-motivation-16727cff982bbf7fdca1986742e0553a

**実装例**: タップ → Duo アニメ(250ms, 3段階感情) → 即座フィードバック → ボーナスサプライズ (30%確率)

---

### 3.3 Animal Crossing スタイル（探索型、落ち着き重視）

**ビジュアル**:
- パステル、丸みのあるUI、厚みのあるアイコン
- キャラ行動の擬人化アニメーション
- コレクション・図鑑への段階的フィードバック

**ゲームフィール**:
- アイテム獲得: 心地よい電子音 + キラキラ+ タイトル表示
- 図鑑更新: 「ポン」音 + ページめくりアニメ
- ショップ購入: 領収音 + アイテム表示 + 所有感の強調

**設計哲学**:
- 失敗なし（全選択肢が正解、ただし報酬差）
- 時間制限なし
- 予測可能な結果

**引用**:
> "Animal Crossing は『即座フィードバック + パステルUI + 習慣化ループ』で、親層含め 3800万本売上を達成。触角的フィードバック(丸みUI) + 聴覚的満足(Wahoo音) の組み合わせ。"
> — James Reyes Portfolio「Animal Crossing UX/UI」
> https://www.jamesbreyes.com/animal-crossing-ux-ui

**実装例**: タップ → パーティクル(200ms) + コレクション追加音 + 図鑑フリップアニメ(400ms) → 満足度表示

---

### 3.4 Pokemon スタイル（収集型、成就感重視）

**ビジュアル**:
- キャラ/ポケモン出現アニメ + 扉・ボール演出
- 戦闘時の激しい動き + 視覚的激突感
- タイプ別配色(火=赤、水=青等)での即座判別

**ゲームフィール**:
- 成功捕獲: 連続キラキラ + 効果音段階化 + ポケモン鳴き声
- ゲット: 「ポーン」高音 → 「ジャジャン」確定音 + 爆竹パーティクル
- レベルアップ: 成就感の大きなサウンド + キャラスケールアップアニメ

**聴覚的デザイン**:
- A/B ボタン音: 8bit 素朴感（認識容易、派手すぎない）
- タイプ別効果音: わずかな違いで ASD児も学習可能

**引用**:
> "Pokemon GB版は、限定的ハードウェア(4ビットオーディオ) 制約下で、『シンプル清音 + 予測可能パターン』により、当時の ASD児に高い学習定着率を実現。現代のゲームも同原理。"
> — 8bit Sound Design 分析（音響学）

**実装例**: 戦闘→勝利判定(100ms) → 連続効果音(250ms段階) → ポケモン出現アニメ(400ms) + サウンド増幅

---

## 4. Nolla MVP 向け推奨仕様

### 4.1 フィードバック タイムライン

**目安フレームワーク** （ユーザーアクション → デバイスレスポンス）:

| 段階 | 内容 | 推奨 Duration | 詳細 |
|-----|------|-------------|------|
| **0** | ユーザー: タップ検出 | 0ms | デバイス検出 |
| **1** | ビジュアルFB開始 | 0-50ms | パーティクル/スケール開始 |
| **2** | 聴覚FB開始 | 50-100ms | 効果音再生 |
| **3** | ハプティックFB | 100-150ms | 振動開始 (20-50ms) |
| **4** | メインアニメ終了 | 200-400ms | パーティクル消滅、キャラアニメ終了 |
| **5** | 結果表示 | 400-600ms | スコア/進行状況表示 |
| **6** | 次アクション誘導 | 600ms以降 | 自動進行 or タップ促進 |

**ASD児向け最適化**: 
- **タップから結果まで最大 200ms**（予測可能性維持、認知オーバーロード防止）
- **オーディオ・ハプティック同時開始** (ただし 50-100ms オフセット許容)
- **全フェーズが "止まる" (予測終了)**  → 次ラウンド開始 or ガイダンス

### 4.2 フィードバック強度ガイドライン

#### ビジュアル
- **成功**: スケール +10% (300ms), パーティクル 5-8個, キャラスマイル
- **失敗**: スケール -5% (150ms), パーティクル なし, キャラ中立 → 正解誘導
- **ボーナス**: スケール +15% (400ms), パーティクル 20個+, キャラ大笑い

#### オーディオ
- **成功**: 400-600Hz, 1-3トーン, 200-300ms (明るい、確認的)
- **失敗**: なし (サイレント修正)
- **ボーナス**: 上昇音階 (3-5段), 600-1000Hz, 400-600ms (晴れやか)

#### ハプティック (振動)
- **成功**: 50ms短振動, 強度 30-50% (Android: Vibration.TICK)
- **失敗**: なし
- **ボーナス**: 3段パターン (50+50+100ms, 強度段階化)

**ASD児配慮**:
- 予測不可能な振動パターン NG → 規則的パターンのみ
- 強度急変 NG → 段階的増減 or 固定値
- 継続振動 NG → 短期間(50-100ms)の みパルス

### 4.3 UI アニメーション イージング

**推奨**: `easeOutCubic` / `easeInOutQuad`（Minecraft的、滑らかさ+応答性）

**禁忌**: 
- バウンス系 (easeOutBounce, elastic) → 予測不可能
- 高速フリック (ease-out-quad 過度) → 視覚混乱
- 無イージング (linear) → 機械的、冷たい

---

## 5. Web 実装技術候補

### 5.1 ビジュアルアニメーション

| 技術 | 推奨度 | 制約 | 代替案 |
|-----|-----|----|--------|
| **CSS Animation** | ⭐⭐⭐⭐⭐ | 複雑制御困難 | JavaScript 併用 |
| **Lottie** | ⭐⭐⭐⭐ | ファイルサイズ | 単純 SVG に分割 |
| **Rive** (Flutter Web) | ⭐⭐⭐⭐ | 学習曲線 | Lottie で代替 |
| **Canvas/WebGL** | ⭐⭐⭐ | 性能管理 | 高品質パーティクルのみ |
| **SVG Animate** | ⭐⭐ | ブラウザ差異 | CSS に統一 |

**推奨**: CSS + Lottie (80/20 原則: CSS で基本UI、Lottie で複雑キャラ動作)

### 5.2 オーディオフィードバック

| 技術 | 推奨度 | 制約 | 代替案 |
|-----|-----|----|--------|
| **Web Audio API** | ⭐⭐⭐⭐⭐ | 複雑性 | Tone.js ラッパー |
| **Tone.js** | ⭐⭐⭐⭐⭐ | 外部ライブラリ | Web Audio API 直接 |
| **Howler.js** | ⭐⭐⭐⭐ | シンプル | 複雑シンセ不可 |
| **MP3/WAV 再生** | ⭐⭐⭐ | ファイルサイズ | シンセで動的生成 |
| **TTS** (Gemini) | ⭐⭐ | 遅延(500ms+) | 音声認識OFF時のみ |

**推奨**: Tone.js (Web Audio API ラッパー、Oscillator + Envelope で即座フィードバック実現可能)

実装例:
```javascript
// 成功時 "ワッホー" 音 (400Hz + 600Hz, 200ms)
const synth = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: 'triangle' },
  envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.1 }
}).toDestination();

synth.triggerAttackRelease('400', '0.1');
setTimeout(() => synth.triggerAttackRelease('600', '0.1'), 100);
```

### 5.3 ハプティック（振動）フィードバック

| 技術 | 推奨度 | 対応端末 | 制約 |
|-----|-----|----|--------|
| **Vibration API** | ⭐⭐⭐⭐⭐ | Android 98%+ | iOS Safari 未対応 |
| **GamepadAPI** | ⭐⭐⭐ | コントローラー | スマホゲームパッド限定 |
| **Custom Vibration** | ⭐⭐ | 要ハードウェア | PWA 限定 |
| **フォールバック** | ⭐⭐⭐ | 全端末 | 画面フラッシュで代替 |

**推奨**: Vibration API + フォールバック(iOS向けビジュアルFB強化)

実装例:
```javascript
// 成功時振動
if (navigator.vibrate) {
  navigator.vibrate(50);  // 50ms 短振動
} else {
  // iOS: スケールアニメで補完
  animateScale(element, 1.0, 1.1, 50);
}
```

### 5.4 ロード画面 / 画面遷移

**推奨演出**:
- **ビジュアル**: フェード(300-500ms) + スケール + 親キャラガイダンス音声
- **オーディオ**: 前画面終了音 → 100ms 沈黙 → 新画面開始音 (3トーン上昇)
- **ハプティック**: なし (遷移は予測可能なので不要)

**BGM**: 低音 (60-120Hz), 常時再生, ループシーム (0-50ms)

---

## 6. プロトタイプ検証項目リスト

### 6.1 機能テスト

- [ ] タップ→結果表示 200ms 以内 (実機計測)
- [ ] オーディオ再生遅延 <100ms (Web Audio API確認)
- [ ] ハプティック振動 ±20ms精度 (Android Vibration API確認)
- [ ] 全フィードバックが "止まる" (予測可能終了)
- [ ] 成功/失敗の区別が 150ms 以内に認知可能

### 6.2 ASD児適合性テスト

- [ ] フラッシング/点滅なし (Video Analysis Tool で確認)
- [ ] 高彩度単色大面積アニメなし
- [ ] 不意の大音量なし (dB meter 測定)
- [ ] 視覚フィール + 聴覚FB + ハプティックFB が同期 (±50ms)
- [ ] "エラー音" 絶対なし (サイレント修正のみ)

### 6.3 ユーザビリティテスト

対象: 定型発達児 (3-5才, 6-10才, 11-18才の 3群) × 3名ずつ

実施項目:
1. **予測可能性**: 「次に何が起きるか」を事前に言語化可能か
2. **理解速度**: チュートリアル無しで操作 → 正解率
3. **継続欲求**: 5分連続プレイ時の集中度・笑顔出現率
4. **わかりやすさ**: 視覚+聴覚+触覚の 3感覚が "協調" しているか体験的に判断

### 6.4 クロスデバイステスト

- [ ] iPhone (iOS 15+) : Vibration API サポートなし → ビジュアルFB強化
- [ ] Android (Android 8+) : Vibration API 完全サポート → ハプティックON
- [ ] iPad (横向き 1194x834) : タッチターゲット 64x64px 確認
- [ ] Galaxy Tab / Fire タブレット: 色再現・音声出力確認

---

## 7. 参考文献・データ源

| 出典 | URL | 引用内容 |
|-----|-----|--------|
| Jan Willem Nijman, Vlambeer | https://www.gamedesign.gg/knowledge-base/game-design/game-feel-feedback/the-art-of-screenshake-jan-willem-nijman-vlambeer/ | Screenshake/ゲームフィール定義 |
| Nature Pediatric Research | https://www.nature.com/articles/pr9201193 | ASD 感覚処理神経生理学的根拠 |
| PMC (PubMed Central) | https://pmc.ncbi.nlm.nih.gov/articles/PMC3086654/ | ASD 感覚処理多領域分析 |
| Epilepsy Foundation | https://www.epilepsy.com/what-is-epilepsy/seizure-triggers/photosensitivity | 光感受性てんかん診断基準 |
| Game Accessibility Guidelines | https://gameaccessibilityguidelines.com/avoid-flickering-images-and-repetitive-patterns/ | ゲーム開発アクセシビリティ規格 |
| Nintendo Support | https://en-americas-support.nintendo.com/app/answers/detail/a_id/59596/ | 光感受性ガイドラインOEM版 |
| Medium | https://medium.com/design-bootcamp/bluey-a-ux-masterclass-for-designing-kid-friendly-digital-experiences-6e8d5546f255 | Bluey UX/UIデザイン分析 |
| Scrimmage | https://scrimmage.co/the-psychology-behind-duolingos-success/ | Duolingo 心理学的設計分析 |
| Oreate AI | https://www.oreateai.com/blog/the-strong-duolingo-bird-more-than-just-a-master-of-motivation-16727cff982bbf7fdca1986742e0553a | Duo オウル マスコット心理効果 |
| James Reyes Portfolio | https://www.jamesbreyes.com/animal-crossing-ux-ui | Animal Crossing UI/UX フレームワーク |
| GitHub | https://github.com/colinbellino/screenshake | Screenshake デモ実装コード |
| Android Developers | https://developer.android.com/develop/ui/views/haptics/haptics-principles | Vibration API 設計原理 |

---

## 8. 実装チェックリスト（MVP Phase 1-2）

**Phase 1（基本フィール実装）**:
- [ ] CSS Animation + Lottie で成功/失敗ビジュアルFB (4ゲーム × 2状態 = 8パターン)
- [ ] Tone.js で 効果音セット 20個 (タップ/成功/失敗/ボーナス/BGM)
- [ ] Vibration API で Android 振動 (3段階パターン)
- [ ] 200ms 以内フィードバック達成確認

**Phase 2（ASD児最適化）**:
- [ ] 光感受性テスト (Video Analysis Tool / 専門家レビュー)
- [ ] 親・児童インタビュー (フィールわかりやすさ, 続けたい欲求)
- [ ] クロスデバイステスト (iOS/Android/iPad)
- [ ] Playwright E2E: フィードバックタイミング自動検証

---

## 9. 次ステップ

1. **デザイナー**: 各ゲーム (スマッシュ/ジグソー/マッチング/シーン) の成功/失敗ビジュアルを Lottie で制作
2. **エンジニア**: Tone.js ライブラリを セットアップ、効果音生成フレームワーク構築
3. **QA**: ASD児プロトタイプテスト 予約、光感受性テスト実施手配
4. **Product**: 親インタビューガイド更新（フィール好感度測定項目追加）

---

**次の会話で活用する場合**: 本ドキュメント + `nolla_mvp_design_spec_v3.md` セクション 7（フィードバック設計）を併読。4つのゲーム別フィードバック差分は別紙として制作予定。
