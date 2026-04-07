---
STATUS: ACTIVE
LAST_UPDATED: 2026-04-07
PURPOSE: iOS/Android/PWAデバイス互換性仕様+対応マトリクス+フォールバック戦略（設計書再評価C3対応）
RELATED: nolla_mvp_design_spec_v3.md, nolla_nci_algorithm_design.md, app/src/components/game/feedback-overlay.tsx
SCOPE: MVP + Phase 1-2 予定機能（ハプティクス、SpeechSuper API、MediaPipe Face Mesh、Pointer Events）
---

# Nolla デバイス互換性仕様 v1

## 1. 概要

Nolla は Next.js 15 PWA として実装された ASD+軽度〜重度知的障害児（3-18歳）向けゲーム。タブレット/スマートフォン横向き固定で利用される。本仕様は以下を対象に互換性を定義する:

- **現在実装済み**: 振動フィードバック（Vibration API）
- **Phase 1-2 計画**: SpeechSuper API による発話評価、MediaPipe Face Mesh による視線追跡、Pointer Events拡張（Apple Pencil）

本仕様は、iOS Safari と Android Chrome/Firefox の差異に対する対応マトリクスと、各機能の MVP判断を示す。

---

## 2. Web Vibration API 互換性

### 2.1 現状（2026年版）

| デバイス | ブラウザ | 対応状況 | 備考 |
|---------|---------|--------|------|
| **iPad（全モデル）** | Safari | ❌ 未対応 | iOS版 Safari は WebKit ベース。Vibration API公開 API なし |
| iPad（全モデル） | Chrome | ❌ 未対応 | iOS全ブラウザは WebKit 強制。Vibration API アクセス不可 |
| iPhone | Safari | ❌ 未対応 | iOS版 Safari 同様 |
| iPhone | Chrome | ❌ 未対応 | iOS全ブラウザ WebKit 強制 |
| **Android タブレット** | Chrome | ✅ 完全対応 | Vibrator API へのアクセス可。Navigator.vibrate() 動作確認済み |
| Android タブレット | Firefox | ✅ 完全対応 | Vibrator API 対応 |
| Android タブレット | Samsung Internet | ✅ 完全対応 | Android Chrome ベース。Vibrator API 対応 |
| **Android 電話** | Chrome | ✅ 完全対応 | 同上 |
| Android 電話 | Firefox | ✅ 完全対応 | 同上 |

### 2.2 iOS 18+ チェックボックス switch ワークラウンド

iOS 18.0 以降、`<input type="checkbox" switch>` 要素がハプティックフィードバック（短い振動）を標準で発生させるようになった。これを利用して、label 経由で programmatic な haptic feedback を発動する workaround が報告されている。

**制限事項**:
- 振動パターン（duration、pattern）のカスタマイズ不可
- 固定の短い振動のみ
- iOS 18+ 限定

**判定**: MVP では非推奨。ユーザー体験のバリエーションが限定的すぎる。Phase 2 での評価検討対象。

### 2.3 代替案：視覚＋音声フィードバック

iOS デバイスで Vibration API が使えない場合:

1. **視覚フィードバック強化**
   - グリーングロー + スケールアニメーション（300ms）を既存実装で継続
   - 可能であれば背景フラッシュを追加（ただし ASD児 に配慮し点滅は禁止）

2. **音声フィードバック**
   - Web Audio API で「ポン」という短い効果音を発生
   - マスター音量設定を保護者が調整可能

3. **UI 表示**
   - 正解時に「正解！」の文字は表示しない（文字認識が難しい知的障害児対応）
   - スター報酬の視覚演出を強化

**実装済みコード**: `app/src/components/game/feedback-overlay.tsx` で既に視覚フィードバック実装済み。Android でも iOS でも動作。

---

## 3. PWA 横向き固定（orientation: landscape）互換性

### 3.1 現状（2026年版）

| デバイス | ブラウザ | 対応状況 | 備考 |
|---------|---------|--------|------|
| **iPad** | Safari（PWA） | ⚠️ 部分対応 | manifest.json の `orientation: landscape` は無視される。iOS 側の設定に依存。ユーザーが手動で回転ロック解除必要 |
| iPad | Chrome | ⚠️ 部分対応 | Safari 同様。iPhone/iPad では全ブラウザ制限される |
| iPhone | Safari（PWA） | ⚠️ 部分対応 | 同上 |
| **Android タブレット** | Chrome | ✅ 完全対応 | manifest.json の `orientation: landscape` が効く |
| Android タブレット | Firefox | ✅ 完全対応 | 同上 |
| **Android 電話** | Chrome | ⚠️ 条件付き対応 | 電話のため物理的にも横型にしづらい。ユーザーが回転設定を有効にする必要あり |

### 3.2 iOS PWA フルスクリーン化の制約

iOS PWA は、manifest.json の `display: standalone` を指定してもフルスクリーン化されない。ステータスバーと Safari UI が常に表示される。

### 3.3 対応方針

**MVP 時点での対応**:
- manifest.json: `"orientation": "landscape"`を記載（Android では効く、iOS では無視されても問題ない）
- CSS による responsive デザイン：スマホ横型（812×375 最小）、iPad 横型（1194×834）両対応
- チュートリアル時に「デバイスを横向きにしてください」をアニメーション主導で表示（文字なし。回転アイコン表示）

**補足**: 
- Android 側は manifest orientation が効くため、デバイス自動回転ロック設定でほぼ解決
- iOS 側は物理的な端末設定に依存。アプリケーション側で強制できない API なし

---

## 4. Pointer Events（Apple Pencil / Stylus 入力）互換性

### 4.1 現状（2026年版）

| デバイス | 対応状況 | 圧力感知 | 備考 |
|---------|--------|-------|------|
| **iPad Pro + Apple Pencil** | ✅ 対応 | ⚠️ 限定的 | PointerEvent で detectされる。240Hz レポートレート（Low Power Mode で 120Hz） |
| iPad 無印 + Apple Pencil | ✅ 対応 | ⚠️ 限定的 | 同上。ただし世代による安定性差 |
| iPad Air / iPad mini + Apple Pencil | ✅ 対応 | ⚠️ 限定的 | 同上 |
| Android タブレット + Stylus | ✅ 対応 | ✅ 対応 | PointerEvent、pressure プロパティで圧力値取得可能 |

### 4.2 注意事項

1. **Apple Pencil と Touch の同時入力不可**
   - Safari/WKWebView では Apple Pencil と Touch タッチを同時に使えない
   - Apple Pencil down → Touch block、Touch down → Apple Pencil block
   - Native iOS では可能だが、Web API 制限

2. **Scribble 機能による入力漏れ（iOS 14+）**
   - iOS 14 導入時に多数の PointerEvent が漏れた
   - Settings > Apple Pencil > Scribble をオフにすると改善
   - ユーザー設定頼み

3. **圧力感知（pressure）**
   - Android: touch.force で取得可能（デバイス依存）
   - iOS: Pencil は非ゼロ pressure、Touch は 1.0 固定

### 4.3 MVP 判定

**MVP では Apple Pencil/Stylus は非必須**

理由:
- 標準的なタッチ入力（指タッチ）で十分ゲーム可能
- Stylus 対応は Phase 2 以降の「より使いやすいUX」改善に該当
- 実装コストに対する効果が限定的

---

## 5. 音声認識 API（SpeechSuper、Web Speech、alternatives）互換性

### 5.1 SpeechSuper API

**調査結果**: SpeechSuper は、深層学習ベースの**発話品質評価 API**。子ども向け言語学習（PTE、IELTS）向け。

| 項目 | 詳細 |
|------|------|
| **提供形態** | クラウド REST API + SDK（Java/Python/C#等）。JavaScript SDK は未確認 |
| **ブラウザ/PWA 対応** | 要検証。直接的なブラウザ JS SDK なし。サーバー中継型の実装必要と考えられる |
| **対応言語** | 8言語（英語、中国語、日本語、ドイツ語、フランス語、スペイン語、韓国語、ロシア語） |
| **価格** | 公開情報なし。問い合わせ必要 |
| **子ども音声対応** | 言語学習用で使用実績。ただし MVP 対象の「療育的フィードバック」ではなく「発音スコア」 |

**判定**: **Phase 2 検証対象**。MVP では音声認識を実装しない。

### 5.2 Web Speech API（標準 API）

| ブラウザ | 対応状況 | 備考 |
|---------|--------|------|
| Chrome | ✅ 完全対応 v25+ | Google Speech Recognition エンジン使用 |
| Firefox | ❌ 未対応 | 標準化されておらず非対応 |
| Safari（macOS） | ✅ 部分対応 | Webkit 独自実装 |
| **Safari（iOS）** | ❌ 未対応 | Webkit on iOS では Speech Recognition API 公開なし |
| Edge | ✅ 完全対応 | Chrome ベース |
| Android Chrome | ✅ 完全対応 | Google Speech Recognition |

**子ども音声認識精度**: 研究によると、非ネイティブスピーカー約 65-72%、子ども特有の発話パターンでは未検証。一般精度とのギャップ存在の可能性。

**判定**: **Phase 1-2 での実装検討対象**。ただし、iOS Safari では利用不可。Android/Chrome のみの機能になる可能性。

### 5.3 代替案：Azure Cognitive Services Speech SDK

| 項目 | 詳細 |
|------|------|
| **提供形態** | JavaScript SDK（Node.js + Browser 対応） |
| **ブラウザ対応** | Chrome、Edge、Safari（macOS）対応。iOS Safari は要確認 |
| **価格** | 無料枠 5時間/月。超過分従量課金 |
| **学習モデル適応** | カスタムモデル作成可能。子ども用モデル構築可能 |

**判定**: **SpeechSuper の代替候補**。Phase 2 での詳細評価推奨。

### 5.4 代替案：OpenAI Whisper（オフライン推奨）

| 項目 | 詳細 |
|------|------|
| **提供形態** | REST API + ブラウザ WebAssembly 版（Transformers.js 等） |
| **ブラウザ対応** | WebAssembly サポートあれば動作。iOS Safari（Safari 11+）対応 |
| **価格** | API: 従量課金。ローカル推論：無料（WebAssembly） |
| **精度** | 汎用・高精度。子ども音声に特化していない |
| **プライバシー** | ローカル推論版は完全オフライン。保護者向けプライバシー訴求可能 |

**判定**: **MVP 後のプライバシー重視型オプション**として検討価値あり。

---

## 6. 視線追跡（MediaPipe Face Mesh / TensorFlow.js Face Landmarks）互換性

### 6.1 MediaPipe Face Mesh（Google）

| 環境 | 対応状況 | 要件 | 備考 |
|------|--------|------|------|
| **Android Chrome** | ✅ 良好 | WebGL 2 推奨 | 実装済み、安定動作 |
| **iPad Safari** | ⚠️ 問題多し | WebGL 2 必須だが未対応 | WebGL 1 fallback では精度低下。エラー報告多数 |
| iPad 2017+ | ⚠️ 部分対応 | Safari 11+ 必須 | WebAssembly 対応。ただし GPU メモリ制約 |
| **iPhone Safari** | ⚠️ 同上 | WebGL 制限あり | Face Mesh は 3MB モデル。ただし WebGL 問題同様 |

**WebGL 2 の iOS 対応**: 
- iOS Safari は WebGL 1.0 のみネイティブ対応
- WebGL 2 は Polyfill で擬似サポート可能だが、性能・安定性が大きく低下
- 結論: iOS での Face Mesh 利用は「期待値以下」

### 6.2 TensorFlow.js Face Landmarks + WebAssembly Backend

| 環境 | 対応状況 | 備考 |
|------|--------|------|
| **Android Chrome** | ✅ 良好 | WASM + CPU で安定 |
| **iPad / iPhone Safari** | ✅ 改善版 | WASM Backend > WebGL Backend。32-bit float 精度確保 |

**判定**: **MediaPipe より TensorFlow.js WASM を推奨**（iOS 対応ポイント）。ただし、iPad 2017 モデルではメモリ・CPU 制限の検証必須。

### 6.3 MVP 判定

**視線追跡は Phase 2 以降（実装優先度低い）**

理由:
- MVP では必須機能ではない
- ゲーム操作（タップ/クリック）で十分
- 実装コスト（モデル最適化、Fallback 機構）が大きい
- iOS 対応に大きなギャップ

---

## 7. 対応マトリクス（機能 × デバイス）

```
凡例: ✅ 完全対応 | ⚠️ 部分対応/検証必須 | ❌ 未対応/推奨しない | 🔄 Phase 2+
```

| 機能 | iPad Safari | Android Chrome | iPhone Safari | Android Phone Chrome |
|------|-----------|-----------|-----------|-----------|
| **振動フィードバック** | ❌ | ✅ | ❌ | ✅ |
| 代替：視覚+音声 | ✅ | ✅ | ✅ | ✅ |
| **横向き固定** | ⚠️ 手動設定 | ✅ | ⚠️ 手動設定 | ⚠️ デバイス狭い |
| **Pointer Events** | ✅ | ✅ | ✅ | ✅ |
| Apple Pencil/Stylus | ⚠️ 同時入力不可 | ✅ | ❌ | ✅ |
| **Web Speech API** | ❌ | ✅ | ❌ | ✅ |
| SpeechSuper（サーバー中継） | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Azure Speech SDK | ⚠️ | ✅ | ⚠️ | ✅ |
| OpenAI Whisper（WASM） | ✅ | ✅ | ✅ | ✅ |
| **MediaPipe Face Mesh** | ❌ WebGL問題 | ✅ | ❌ WebGL問題 | ✅ |
| TF.js Face（WASM） | ⚠️ | ✅ | ⚠️ | ✅ |

---

## 8. フォールバック戦略

### 8.1 振動フィードバック不可（iOS）

**ユーザー体験継続方法**:

1. **視覚フィードバック強化** ← 実装済み
   - 正解時: グリーンサークル + スケール（300ms） + スター演出（500ms）
   - 不正解時: 無音で正解に再提示（エラーレス学習）

2. **音声フィードバック追加** ← 実装予定（Phase 1）
   - 正解時: 「ポン」という短い効果音（120dB 未満、安全レベル）
   - プロトタイプ: Web Audio API でサイン波合成

3. **ゲーム継続可能**
   - 振動なし = フィードバック弱化のみ
   - ゲーム進行は 100%変わらない
   - 保護者通知: Settings で「デバイスは振動未対応」と表示

### 8.2 Web Speech API 不可（iOS）

**ユーザー体験継続方法**:

1. **タップ式フォールバック** ← MVP では推奨
   - 正解ボタン表示：子ども が自分で正解を選択
   - 音声認識の手間を省くことで、むしろ UX 向上

2. **Phase 2 でサーバー側音声認識導入**
   - Audio blob を server に送信
   - Azure Speech SDK でサーバー側実装
   - iOS Safari でも利用可能

### 8.3 MediaPipe Face Mesh 不可（iOS）

**ユーザー体験継続方法**:

1. **視線追跡機能をオフ** ← MVP では非実装
   - ゲーム機能に影響なし
   - 保護者向け: Settings で「視線追跡は未対応デバイス」と表示

2. **Phase 2 でオプト機能化**
   - Android ユーザーのみ有効化
   - iOS ユーザーには何も見えない（silent fallback）

---

## 9. MVP 判定（リスク・優先度分析）

| 機能 | MVP 判定 | 理由 | 実装時期 |
|------|--------|------|--------|
| **振動フィードバック** | ❌ 非必須だが実装済み | Android のみ動作。iOS は視覚+音声で補完 | Phase 1（音声追加） |
| **横向き固定** | ✅ 必須 | Manifest + CSS で対応完了 | MVP(完了) |
| **Pointer Events（基本）** | ✅ 必須 | タッチ入力で十分 | MVP(完了) |
| **Web Speech API** | ❌ 非必須 | iOS 未対応。代替: タップ式 | Phase 2 |
| **SpeechSuper / Azure** | 🔄 検証中 | 利用モデル・コスト未定 | Phase 2 |
| **MediaPipe Face Mesh** | ❌ 非必須 | iOS WebGL 問題。効果も限定的 | Phase 2+ |
| **Apple Pencil** | ❌ 非必須 | タッチ入力で十分 | Phase 2+ |

### 9.1 MVP クリティカルパス

**MVP Release 時点で必須**:
- ✅ 基本タッチ入力（Pointer Events）
- ✅ 横向き固定 UI
- ✅ 視覚フィードバック（すべてのデバイス対応）
- ✅ 振動フィードバック（Android のみ動作、iOS は視覚+音声）

**MVP では実装しない**:
- ❌ 音声認識
- ❌ 視線追跡
- ❌ Apple Pencil / Stylus 特化

---

## 10. 推奨ブラウザ・デバイス（MVP）

### 推奨環境

| デバイス | ブラウザ | 推奨度 | 備考 |
|---------|---------|------|------|
| **iPad（第8世代以降、2020+）** | Safari | ★★★★★ | 標準環境。ASD児向けゲーム業界標準 |
| iPad（2017-2019） | Safari | ★★★★ | WebAssembly 対応。ただし GPU 制限 |
| **iPad mini, iPad Air（第5世代以降）** | Safari | ★★★★★ | 同上 |
| Android タブレット（2018+） | Chrome | ★★★★ | 振動 API 完全対応 |
| iPhone（iOS 14+） | Safari | ★★★ | 小画面だが、横型で利用可能 |
| Android スマートフォン | Chrome | ★★★ | 同上 |

### 非推奨・制限環境

| デバイス | ブラウザ | 理由 |
|---------|---------|------|
| iPad 無印（2018以前） | Safari | iOS 12 以前。WebAssembly 未対応の可能性 |
| iPhone 6s 以前 | Safari | iOS 12 以前 |
| Android 7.0 以前 | Chrome | 古い Chrome が Vibration API サポート不完全 |

---

## 11. デバイス別実装チェックリスト

### 11.1 iOS Safari（iPad/iPhone）対応

- [ ] 横向き固定：CSS + responsive design（812×375 最小、1194×834 iPad）
- [ ] Pointer Events: 基本タッチ動作（Apple Pencil 同時入力考慮不要）
- [ ] 視覚フィードバック：緑グロー + スター演出（実装済み）
- [ ] 音声フィードバック：Web Audio API で「ポン」音（実装予定）
- [ ] Settings に「このデバイスは振動非対応」と表示

### 11.2 Android Chrome（タブレット・スマートフォン）対応

- [ ] Vibration API: `navigator.vibrate([100, 50, 100])` で 3段階振動
- [ ] Stylus 入力：Pointer Events で pressure 値取得
- [ ] Web Speech API: `webkitSpeechRecognition` 経由で音声認識（実装時）
- [ ] 他は iOS 同様

### 11.3 共通チェック

- [ ] ゲームフロー通し（開始→プレイ→正解/不正解フィードバック→次問題→ラウンド完了→セッション終了）
- [ ] エラーレス学習：3段階プロンプティング削減
- [ ] 全タップターゲット 48×48px 以上（3-8歳は 64×64px）
- [ ] 画面内要素 5-6個以下（感覚オーバーロード回避）
- [ ] 自動アニメーション・フラッシュなし（ASD 特性対応）

---

## 12. 今後の調査タスク

### Phase 2 向け詳細検証

1. **音声認識精度評価**（子ども音声）
   - Azure Speech vs Google Web Speech vs OpenAI Whisper の比較実装
   - 日本語・子ども特有のピッチ・早口に対する精度測定
   - Quiet environment（学習塾）vs Noisy environment（家庭）での再現テスト

2. **SpeechSuper API 正式契約前リサーチ**
   - JavaScript SDK の有無確認
   - 価格・無料枠詳細
   - 子ども音声用モデルの精度データ

3. **iOS WebGL 対応状況の最新確認**（2026-Q3 以降）
   - Safari 最新版での WebGL 2 状況
   - MediaPipe / TensorFlow.js の iOS 対応改善

4. **iPad 2017 モデル の詳細互換性テスト**
   - WebAssembly 実行速度
   - メモリ使用量（MediaPipe Face Mesh 実行時）
   - バッテリー消費

---

## 13. 制約事項・注記

### 13.1 iOS 制限の本質

Apple が iOS web app に対して実施している制限は、以下の 3つ のセキュリティ/プライバシー理由に基づく:

1. **Fingerprinting 防止**: 過度な device capability 露出は tracking に利用される
2. **プライバシー保護**: 振動、カメラ、マイク、位置情報等の ambient sensor へのアクセス制限
3. **実装簡素化**: WebKit が W3C 標準以外の API を実装しない基本方針

→ 今後も iOS Safari で Vibration API 等の公開は見込み難い。WebAssembly ベースのローカル実装へのシフト推奨。

### 13.2 Android の多様性

Android エコシステムは device fragmentation が激しく、以下の差異を想定：

- Chrome version による機能差（特に古い Android 4.x - 5.x）
- OEM カスタム ROM による unpredictable な挙動
- メモリ制約デバイス（1GB 以下タブレット）での WebAssembly 性能低下

→ MVP では Android 6.0 以降、Chrome 最新版を target に。Graceful degradation 前提。

### 13.3 2026 年版の変化

- **iOS 18+**: checkbox switch workaround で微かな haptic フィードバック可能（但し customizable でない）
- **Safari WKWebView**: 2025年以降、WebContainers など一部 WebAssembly 体験が改善傾向
- **Android**: Chrome 動作が全体的に安定化

---

## 14. 参考資料・出典

### 基本仕様
- [MDN Web Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API)
- [Can I use... Vibration API](https://caniuse.com/vibration)
- [progressier PWA Capabilities: Vibration](https://progressier.com/pwa-capabilities/vibration-api)

### iOS PWA 制約
- [PWA iOS Limitations 2026](https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide)
- [Mobiloud: Do PWAs Work on iOS](https://www.mobiloud.com/blog/progressive-web-apps-ios)

### 音声認識
- [Web Speech API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Can I use... Speech Recognition](https://caniuse.com/speech-recognition)
- [Google Cloud Speech-to-Text](https://cloud.google.com/speech-to-text)
- [Azure Cognitive Services Speech SDK JS](https://github.com/microsoft/cognitive-services-speech-sdk-js)
- [SpeechSuper Platform](https://www.speechsuper.com/)
- [OpenAI Whisper API](https://platform.openai.com/docs/guides/speech-to-text)

### 顔認識・視線追跡
- [MediaPipe Face Mesh](https://developers.google.com/mediapipe/solutions/vision/face_landmarker)
- [TensorFlow.js Face Landmarks](https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection)
- [TensorFlow.js Platform Guide](https://www.tensorflow.org/js/guide/platform_environment)

### Pointer Events
- [Apple Developer Forums: PointerEvents](https://developer.apple.com/forums/thread/773213)
- [iPad Dev Notes: Touch, Mouse, Pencil](https://casualprogrammer.com/blog/2024/02-13-ipad_dev_notes_touch.html)

---

## 変更履歴

| 版 | 日付 | 更新内容 |
|----|------|--------|
| v1 | 2026-04-07 | 初版作成。Web Vibration / PWA orientation / Pointer Events / 音声認識 / Face Mesh の互換性マトリクス完成。MVP 判定完了 |

