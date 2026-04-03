# Nolla Content Production — Agent System

## 概要

発達支援アニメーション動画の制作に必要な6つのエージェント（役割）を定義する。
各エージェントは `role.md` に記された役割・レギュレーション・チェックリストに従って動作する。

## 設計思想

- **Sesame Workshop CTWモデル**を簡略化して採用（企画→制作→検証→評価）
- **CrewAI パターン**（Role / Goal / Backstory）でエージェントを構造化
- **Ms. Rachelの8つのエビデンスベース手法**をコンテンツ設計原則に組み込み
- **RACI マトリクス**で各工程の責任分担を明確化

## エージェント一覧

| # | エージェント | ディレクトリ | 担当 |
|---|---|---|---|
| 01 | プロデューサー | `01_producer/` | Yuya（創業者） |
| 02 | 療育設計 | `02_therapy_designer/` | ST or BCBA（業務委託） |
| 03 | 脚本・構成 | `03_scriptwriter/` | Claude + 療育設計者 |
| 04 | ビジュアルデザイン | `04_visual_designer/` | Claude + AI画像生成 |
| 05 | サウンドデザイン | `05_sound_designer/` | AI + 外注 |
| 06 | 動画制作・編集 | `06_video_producer/` | Yuya（Kling AI + CapCut） |

## 共有ファイル（`shared/`）

| ファイル | 内容 |
|---|---|
| `workflow.md` | 1本の動画の制作フロー（6ステップ） |
| `quality_checklist.md` | 全エージェント共通の品質チェックリスト |
| `glossary.md` | 専門用語集（療育・制作・AI生成） |
| `raci_matrix.md` | 工程ごとの責任分担マトリクス |

## 制作フロー概要

```
Step 1: 療育設計 → 療育目標シート作成
Step 2: 脚本・構成 → 台本作成（療育設計者がレビュー）
Step 3: ビジュアルデザイン → キャラ・背景・スタイル確定
Step 4: サウンドデザイン → BGM・SE・ナレーション設計
Step 5: 動画制作 → AI生成・編集・仕上げ
Step 6: プロデューサー → 最終チェック・公開判断
```

## 使い方

1. 動画制作時、各エージェントの `role.md` をシステムプロンプトとして読み込む
2. `shared/` の共有ファイルは全エージェントが参照する
3. 各ステップの完了時、`quality_checklist.md` で品質確認を行う
