# SFX

Nolla uses **Web Audio API synthesis** instead of shipping audio files.

`src/lib/feedback/sfx.ts` defines per-SFX synth recipes (oscillator type,
frequency envelope, gain envelope) that are rendered in real time through
a shared `AudioContext`. No network, no licensing, no cold-start delay.

If you want to upgrade to sampled audio in the future, implement a
`PlayerFactory` that fetches MP3/OGG files and call
`__setPlayerFactoryForTests` (rename for prod) to swap it in. The public
`playSfx` API stays the same.
