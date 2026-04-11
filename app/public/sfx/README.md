# SFX Assets

This directory contains the sound effects used by Nolla.

## Files expected

| Filename | ID | Use |
|---|---|---|
| sfx-01-warmup-tap.mp3 | warmup-tap | ウォームアップの星タップ成功 |
| sfx-02-warmup-complete.mp3 | warmup-complete | 星座完成時 |
| sfx-03-game-correct.mp3 | game-correct | ゲーム正解時 |
| sfx-04-star-gain.mp3 | star-gain | 星獲得時 |
| sfx-05-ui-tap.mp3 | ui-tap / hand-demo | UIボタンタップ / デモ内ハンドタップ |

## Sourcing

Primary: https://freesound.org/ (filter: CC0)
Secondary: https://zapsplat.com/ (free tier, attribution required)

When files are added, record their source URL and license in
`docs/credits.md`.

The app is resilient to missing files — `sfx.ts` catches play errors silently,
so the UI will not break if a file is missing during development.
