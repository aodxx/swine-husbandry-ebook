# Flipbook Core Requirements

Owner feedback 2026-08-24

- Book Mode must use a real page-turn metaphor, not horizontal slide/scroll.
- Page turn must visibly rotate a paper leaf around the book spine with front/back faces, moving shadow, and edge highlight.
- Pointer/touch drag from page edges must control turn progress; releasing past threshold commits the turn, otherwise the page returns.
- Buttons and swipe gestures must use the same page-turn animation.
- Page-flip sound must play on successful turns and work offline. Sound remains user-controllable but defaults ON for Book Mode.
- Reading Mode remains the accessibility/performance fallback.
- `prefers-reduced-motion` disables 3D animation while preserving navigation.
- No external audio/network dependency is required; sound is synthesized with Web Audio API.
