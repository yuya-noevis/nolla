---
STATUS: ACTIVE
LAST_UPDATED: 2026-04-10
PURPOSE: Mario Galaxy Movie ビジュアル分析 + Nolla UIモック用プロンプト
RELATED: nolla_color_regulation.md,nolla_stage_bg_composition_rules.md,nolla_design_direction.md
---

# Mario Galaxy Movie — ビジュアル言語分析 & Nolla UIモックプロンプト

## 1. リファレンス4枚から抽出したビジュアル文法

### 1A. カラー構造（最重要）

Mario Galaxy Movieの色は「暗い宇宙の中に宝石が浮かんでいる」構造。背景が暗いからこそ発光要素が映える。

| レイヤー | 色域 | HEX参考値 | 役割 |
|---------|------|-----------|------|
| **深宇宙ベース** | ダークネイビー〜インディゴ | #0A0A2E → #1A1A4E | 画面の60-70%。安定感の土台 |
| **ネビュラ中間層** | ティール / マゼンタ / ディープパープル | #1B6B6B / #8B2A6B / #3A1A6B | グラデーションで混ざり合う。画面の20-25% |
| **発光アクセント** | シアン / ゴールド / ライムグリーン | #00D4FF / #FFD700 / #7BFF3A | 星、パーティクル、リムライト。画面の5-10% |
| **暖色スポット** | アンバー / ウォームイエロー | #FFB347 / #FFF4C1 | 窓の光、ランタン、キャラの肌。安心感の源 |
| **草・惑星の緑** | ライムグリーン〜エメラルド | #5DBB3D / #3A8F3A | 小惑星の地表。生命感の象徴 |

**色の遷移ルール**: 隣り合う色は必ずグラデーションでなめらかに接続される。ハードエッジの色境界は存在しない。ネビュラ層は最低3色が同時に溶け合っている。

### 1B. ライティング（世界観の核）

ライティングが「怖くない夜空」を成立させている最大の要因。

| 技法 | 詳細 | 再現指示 |
|------|------|----------|
| **リムライト** | 全オブジェクトの輪郭に薄いシアン〜ホワイトの縁取り光 | 建物・UIパネルの外周に1-2pxのグロウ |
| **ポイントライト散在** | ランタン、窓の暖色光、浮遊する星チモテが画面全体に点在 | 5-8個の小光源。暖色と寒色を混在 |
| **ボリュメトリック雲** | ピンク〜ラベンダーの半透明雲が光を透過 | 画面端や下部に柔らかいグロウ雲 |
| **流れ星/光跡** | 斜め45°前後の細い光線が2-4本 | シアン〜ホワイトの細線。動きの暗示 |
| **星のボケ** | 大小の星が被写界深度でボケている | 手前に大きいボケ星、奥に小さいシャープ星 |
| **水面/反射面** | 暗い水面に光が反射し、揺らいでいる | 地面やUI下部にかすかな反射グロウ |

**ライティングの感情効果**: 暗い背景 + 多数の小光源 = 「夜のお祭り」「星を見に来た」感覚。恐怖ではなく好奇心を喚起。ASD児の予測可能性ニーズにも合致（星空は毎晩同じ構造）。

### 1C. 空間構成

| 要素 | 配置ルール |
|------|-----------|
| **前景** | 画面下10-15%。暗めのシルエット or ボケた浮遊物。額縁効果 |
| **中景** | 画面中央。メインの被写体（建物、キャラ）。最もシャープ |
| **遠景** | 画面上30-40%。小惑星、遠い星雲、ぼんやりした建造物。奥行き |
| **被写界深度** | 極端に浅い。前景と遠景は必ずボケる。中景だけシャープ |
| **スケール感** | 小さな球体惑星（画面の15-20%サイズ）に建物が載っている。宇宙的スケール感 |

### 1D. テクスチャ / マテリアル

| 素材 | 表現 |
|------|------|
| **建物の壁面** | なめらかだが微細なノイズあり。磨かれた石 or 漆喰の質感 |
| **木材** | 帆船の木材のような暖色。年輪のかすかな模様 |
| **金属** | ゴールド〜ブロンズ。強いスペキュラハイライト |
| **草・植物** | 低ポリ風にデフォルメされた丸い葉。鮮やかなライムグリーン |
| **雲・ネビュラ** | サブサーフェススキャタリング。光が内部を透過して発光して見える |
| **水・液面** | ダークな鏡面。ライトの反射のみで存在を示す |
| **星・パーティクル** | 円形ボケ。サイズ3段階（1px, 3px, 6px相当） |

### 1E. 構図パターン（4枚共通）

1. **中央主題**: メイン被写体は必ず画面中央〜中央やや下
2. **放射構図**: 光源 or 主題を中心に放射状に要素が広がる
3. **S字動線**: 視線が左下→中央→右上に流れる配置
4. **フレーム内フレーム**: 帆船のマスト、雲の切れ間、浮遊岩がフレームを形成
5. **非対称バランス**: 左右対称ではないが重量感は均等

---

## 2. Nolla世界への翻訳ルール

Mario Galaxy Movieのビジュアルを「そのまま」使うのではなく、Nollaの設計制約と融合させる。

### 2A. 採用する要素

| Galaxy要素 | Nollaでの適用 |
|-----------|--------------|
| ダークネイビー宇宙背景 | ホーム画面・ゲーム選択画面のベース |
| ネビュラグラデーション | 各ゲーム建物のテーマカラーとして使い分け |
| リムライト | 建物・UIボタンの輪郭グロウ |
| ポイントライト（ランタン/星） | 画面の賑やかし。密度は控えめ |
| 小惑星に建物が載る構図 | 各ゲーム建物を小さな球体惑星に配置 |
| 暖色の窓光 | 建物に「入りたくなる」感覚を付与 |
| 流れ星 | 画面遷移時のトランジション要素 |

### 2B. 採用しない要素

| Galaxy要素 | 不採用理由 |
|-----------|-----------|
| キャラクターデザイン | Nolla独自キャラを別途設計 |
| リアルな水面表現 | 処理負荷+子ども向けにはデフォルメが適切 |
| 暗すぎるシーン | 恐怖につながる暗さは回避。ネイビーの最暗値を#0A0A2Eに制限 |
| 複雑な帆船など | 認知負荷。Nollaの建物はシンプルな幾何学 |

### 2C. ゲーム星（球体惑星）×ネビュラカラーの対応

**コンセプト**: 建物を廃止し、各ゲームを象徴する**テーマ球体惑星（星）**に変更。Mario Galaxyの小惑星を参照。子どもは「星を選ぶ」＝「ゲームを選ぶ」。

**重要な方針**: 星の**上にオブジェを載せる**のではなく、**球体自体の形状・テクスチャ・色・光り方でそのゲームの本質を表現する**。球体は完全な球である必要はなく、多少のくぼみ・突起・有機的な歪みがあってよい。装飾（小さなキノコ、結晶、光の粒など）もOK、ただし球体の一部として自然に生えている/存在しているもの。

| 星の名前 | ゲーム | 球体の表現 | ネビュラ主色 | アクセント光 |
|---------|--------|-----------|-------------|-------------|
| カード星 | 神経衰弱 | 球体表面がラベンダー〜ディープパープルのベルベット質感。表面にスート模様（ハート/ダイヤ/スペード/クラブ）が地紋のように浮き彫りになっている。模様は球面に沿って湾曲。所々から小さな金色の結晶が生えている。球体全体がかすかに内側から紫に発光 | ディープパープル→マゼンタ | ゴールドの結晶光 |
| いろわけ星 | 分類ソーティング | 球体が**パッチワーク状に3-4色に色分け**されている（オレンジ/ライムグリーン/スカイブルー/ピンク）。各色のセクション境界は柔らかいカーブ。各セクションの質感が微妙に異なる（草地/砂地/苔/花畑）。球体はやや扁平で温かみのある形 | ティール→エメラルド | アンバーの境界光 |
| さがし星 | 視覚探索 | 球体は深いティール〜エメラルドの密生した草地。しかし草の中に**よく見ると小さな色違いのモノ（花、石、光点）が隠れている** — 「探す」行為を球体自体が体現。表面は少し凸凹があり、小さな丘やくぼみがある。片側にレンズ状の透明な結晶が1つ、球面から半分顔を出している（虫めがねの暗示） | シアン→ディープブルー | ホワイトの結晶レンズ光 |
| ひかり星 | Corsi Block | 球体が**ダークネイビーの岩質で、表面にグリッド状の光の脈（筋）が走っている**。脈はシアン〜コバルトに柔らかく発光し、ゆっくり明滅を暗示する配色。所々にキューブ状の結晶がわずかに突出（球体の一部として）。他の星と比べて最もクリスタル/鉱物的な質感 | インディゴ→コバルト | シアンのグリッド脈光 |

**球体惑星の共通ルール**（参考画像 img_visual03.webp の球体惑星を参照）:
- 直径: 画面高さの50-60%（ホーム画面表示時）
- 球体の周囲に**薄いアトモスフィアリング**（大気圏のグロウ。色は各星のテーマ色。10-15% opacity）が球体を囲むように発光
- 球体の低高度に**2-3個の小さな雲**が漂っている（球体に纏わりつくように。ピンク〜白、半透明）
- 球体は完全な真球でなくてよい。微妙な歪み・凸凹が個性になる
- 小さな装飾（結晶、キノコ、草、光の粒など）は球面から自然に生えている/存在している表現ならOK
- 重力は星ごと（全ての表面要素が球体中心に向かって生えている）
- 星の周囲に1-2個の小さな衛星岩が浮遊

---

## 3. UIモック画像生成プロンプト

### プロンプト1: M1 ホーム画面（カルーセル — 「カード星」にフォーカス）

リファレンス: Super Mario Galaxy Movie img_visual03.webp の構図・球体惑星の表現を直接参照。Yoshiに乗ったMarioが見上げる球体惑星のシーンと同じ空気感。

```
A cinematic 3D-rendered UI mockup for a children's app, landscape 16:9 aspect ratio. The visual quality matches Illumination Studios' Super Mario Galaxy Movie — lush, volumetric, warm-yet-cosmic.

=== BACKGROUND (reference: img_visual03.webp sky) ===
- The entire background is a deep cosmic sky, NOT black but a rich gradient:
  Top edge: dark navy-indigo (#0B0B30)
  Center: transitions through deep blue-purple (#1E1550)
  Lower third: warms into dusty rose-violet (#3A2050) before the planetoid
- Nebula clouds: TWO distinct cloud masses, painted in the style of the Mario Galaxy Movie posters:
  Upper-left quadrant: a large, soft magenta-to-pink nebula mass (#B84A8A → #E8A0C0), edges dissolving into transparency. This cloud has visible internal luminosity — lighter at center, darker at edges, as if lit from within (subsurface scattering look)
  Lower-right: a smaller teal-to-cyan nebula wisp (#1A8A7A → #40D0D0), elongated horizontally, more transparent (30% opacity)
- Stars: Exactly 3 layers of depth:
  Layer 1 (far): ~50 tiny pinpoint white dots, evenly scattered, sharp
  Layer 2 (mid): ~15 slightly larger stars (3px), some with a soft 4-point twinkle shape, pale cyan tint
  Layer 3 (near): 3-4 large circular bokeh orbs (8-12px), very soft edges, positioned at screen margins, warm gold or cool cyan. These create the shallow depth-of-field look from the reference
- 1-2 shooting stars: thin diagonal streaks (upper-right → center-left), cyan-to-white with a fading tail, ~200px long at 2048px reference width

=== THE PLANETOID — "Card Star" (カード星) ===
Reference: the spherical planet in img_visual03.webp — same scale, atmosphere ring, and cloud wrapping. But the surface is NOT green grass. This star's identity IS the surface.

- Position: centered horizontally, vertically placed so the planetoid's equator is at ~55% from the top of the screen. The planet is the hero element
- Diameter: approximately 55% of screen height (at 1152px reference = ~634px diameter)
- Shape: NOT a perfect sphere. Slightly organic — gentle undulations on the surface, like a well-worn velvet cushion. 2-3 subtle bumps/hills break the silhouette

SURFACE (this IS the game identity — no separate objects on top):
- The sphere is covered in a RICH VELVET-LIKE texture, deep lavender-to-purple (#9B7BBD base, #7B5A9D in shadow areas, #BEA0D8 where rim-lit)
- Across the velvet surface, CARD SUIT SYMBOLS (hearts, diamonds, clubs, spades) are embossed as a repeating relief pattern — they rise ~2-3px from the surface, subtly catching light. The symbols are the SAME purple as the base, only visible through light and shadow. Think of debossed leather or jacquard fabric
- The suit symbols follow the sphere's curvature — they distort naturally around the edges as perspective demands
- Scattered across the surface: 5-8 small GOLDEN CRYSTALS growing from the velvet, like mineral formations. Heights vary (8-20px). They're faceted, warm gold (#DAA520 base, #FFD700 highlights), each casting a tiny warm light pool on the surrounding purple velvet
- The golden crystals are concentrated more toward the "north pole" but a few dot the equator too
- The entire sphere has a very faint inner glow — the purple seems slightly luminous from within, as if the planet itself is a gemstone

ATMOSPHERE:
- Atmosphere ring: a thin, luminous purple-pink halo (#C080E0 at 12% opacity) wrapping the entire sphere, extending ~15px beyond the surface. Brighter on the upper-left (key light side)
- Clouds on planet: 2-3 small wispy clouds at the equator. Pink-white (#FFE0F0 → #FFFFFF), 40-60% opacity, partially obscuring the velvet surface behind them. Reference: the clouds in img_visual03.webp

=== SECONDARY STARS (carousel neighbors, visible but not focused) ===
- Far left (15% from left edge, vertically centered): a MUCH smaller planetoid (~12% of screen height), slightly blurred (bokeh). This is "Sorting Star" — its surface is PATCHWORK: 3-4 distinct color sections (orange/green/blue) visible even at small size and blur. It has its own faint warm-toned atmosphere ring
- Far right (mirrored position): "Search Star" — a smaller blurred planetoid with a deep teal-green surface. Even blurred, you can sense small colorful dots hidden across its surface. Faint cyan atmosphere ring
- 2-3 small floating rocks/asteroids scattered in the mid-ground between the main and secondary planets. These rocks have patches of grass on them (reference: Mario Galaxy's grassy asteroids). They're small (20-30px) and slightly out of focus
- Bottom 5% of screen: a very subtle dark gradient (vignette), grounding the composition

=== UI OVERLAY (minimal, NO text) ===
- Bottom-center: 4 pagination dots. Dot 1 is bright white (active), dots 2-4 are white at 25% opacity. Each dot ~10px diameter, 20px spacing between centers. The dots sit on a very subtle dark pill-shaped backdrop (#000000 at 15% opacity, ~120px wide, 24px tall, 12px corner radius)
- Left edge (vertically centered): a subtle chevron-left icon, white at 35% opacity, 48x48px. Indicates swipe direction
- Right edge: matching chevron-right icon
- Top-right corner: a small lock icon (padlock silhouette), white at 30% opacity, 36x36px. For parent access
- Top-left corner: a small star icon (golden, #FFD700) followed by a cluster of 12 tiny dot-stars arranged in a 3x4 micro-grid (representing star count without using numerals). Total element size ~60x36px
- ALL UI elements have NO text, NO numbers, NO labels

=== LIGHTING (reference: the warm-cool contrast in all 4 reference images) ===
- Primary light: from upper-left, cool white-blue. This creates:
  - Bright rim light on the planetoid's upper-left grass edge
  - Rim light on the playing cards' left edges
  - Highlights on the secondary planets' upper-left curves
- Secondary light: warm ambient from the golden star motif on the planet surface, casting a localized warm pool on the grass
- Fill light: very subtle purple-blue ambient (#1A1A3E tint) preventing any area from going pure black
- The nebula clouds themselves are light sources — the magenta cloud casts a faint pink tint on nearby objects
- Overall color grading: teal-shifted shadows, gold-shifted highlights (cinematic color science matching the movie's grade)

=== STYLE (CRITICAL) ===
- Illumination Studios / Super Mario Galaxy Movie rendering quality
- Soft, volumetric, CINEMATIC — NOT flat, NOT pixel art, NOT low-poly, NOT cartoon-cell-shaded
- Subsurface scattering on clouds (light glows through them)
- Physically plausible materials: grass has specular micro-highlights, cards have subtle surface reflection, metallic star has strong specular
- Shallow depth of field: main planetoid SHARP, secondary planets and foreground elements SOFT
- Chromatic aberration: extremely subtle (1px) at screen edges only
- Anti-aliased edges everywhere. Smooth, premium feel
- The mood is MAGICAL, SAFE, WONDROUS — a child looking at this should feel "I want to go there", never "that looks scary"

=== TECHNICAL ===
- Output: 2048x1152px (or equivalent 16:9)
- Static UI mockup render, not an in-engine screenshot
- No characters, no mascots, no people, no animals
- Absolutely no text, typography, or readable writing of any kind anywhere in the image
```

### プロンプト2: M4 ゲームプレイ画面（神経衰弱 — 「カード星」の上でプレイ中）

リファレンス: Mario Galaxy Movieのシーンで惑星の上に立って見上げた時の視点。img_visual04.webp のダイナミックな宇宙背景 + thumbnail_AeiZ.jpg の浮遊感。

```
A cinematic 3D-rendered UI mockup for a children's memory card matching game, landscape 16:9. We have "landed" on the Card Star planetoid and are now playing the game ON its surface. The visual quality matches Illumination Studios' Super Mario Galaxy Movie.

=== CAMERA & PERSPECTIVE ===
- We are standing ON the surface of the spherical planetoid, looking slightly upward
- The camera is at a low angle (~15° above the grass surface), creating a sense of being small on a curved world
- The grass horizon curves VISIBLY — at the far left and right edges of the screen, the grass surface curves downward and away, revealing the cosmic sky beyond the planet's edge. This curved horizon is the KEY visual signature (reference: standing on a small Mario Galaxy planet)
- The curve is gentle — not a fisheye distortion, but a natural perspective of standing on a ~50-meter-diameter sphere

=== GROUND SURFACE (bottom 25% of screen) ===
Reference: the Card Star's surface, but seen from surface level. We have "landed" on the purple velvet planet.

- The bottom 20-25% of the screen is the Card Star's PURPLE VELVET SURFACE, seen from standing height
- The surface texture: rich, plush velvet in lavender-purple (#9B7BBD base), with the embossed card suit symbols visible as subtle relief patterns stretching toward the horizon. The symbols are foreshortened by perspective
- The surface follows the spherical curvature — at the far left and right edges, the velvet curves downward and away, revealing the cosmic sky beyond the planet's edge. This curved horizon is the KEY visual signature
- Scattered across the surface: 3-4 of the small golden crystals growing from the velvet, casting warm gold light pools. They catch the player's peripheral vision but don't interfere with gameplay
- Where the game cards sit, the velvet is slightly compressed/dimpled, as if the cards have weight
- The overall ground color is DARKER than the sky area's brightest nebula, ensuring the cream-colored game cards pop against it

=== COSMIC SKY (top 75% of screen) ===
Reference: img_visual04.webp's vibrant nebula sky — the most colorful of the 4 references.

- The sky occupies the upper 75% of the screen but is SUBDUED compared to the home screen — desaturated by ~30% and darkened slightly, so the game cards remain the visual focus
- Gradient: from deep indigo (#0E0E35) at the zenith (top-center) through muted purple (#251845) to dusty mauve (#352040) near the grass horizon
- Nebula: a single large, diffuse purple-magenta cloud mass in the upper-left quadrant, very soft, at 50% of the home screen's opacity. It provides color without competing with the cards
- Stars: reduced density (~30 total), dimmer, mostly small pinpoints. 1-2 medium bokeh orbs only. The sky should feel present but QUIET
- NO shooting stars in this view (would distract from gameplay)

=== GAME CARDS (the primary focus) ===
- A 3x4 grid of 12 cards, arranged on the curved grass surface
- The grid is centered horizontally and placed so the bottom card row sits at ~30% from screen bottom, top row at ~75% from bottom
- Grid width: ~55% of screen width. Grid height: ~45% of screen height
- Card spacing: 14px equivalent gaps (consistent all directions)
- Because we're on a curved surface, the top row of cards appears SLIGHTLY smaller (subtle perspective) and the bottom row SLIGHTLY larger. This is very gentle — ~5% size difference, not dramatic. The rows also follow the surface curve — the left and right columns angle very slightly inward

INDIVIDUAL CARD RENDERING (every card follows this specification):
- Shape: rounded rectangle, corner radius 10px. Portrait orientation (width:height ≈ 5:6.5)
- Physical thickness: 4px visible on the bottom/right edge (the card is a 3D slab, not a flat plane)
- ALL cards have a subtle shadow cast downward-right onto the grass (shadow: #000000 at 20% opacity, 6px offset, 8px blur)

FACE-DOWN cards (8 of 12):
- Front face: deep space indigo (#161640)
- Surface texture: a very subtle embossed pattern — tiny repeating star/diamond shapes at 8% lighter than the base color, barely perceptible. This gives the surface a "premium card back" feel rather than flat color
- Border: 1.5px line, soft purple glow (#7B5ABF at 40% opacity)
- Center decoration: a single small 4-pointed star shape, muted gold (#C4A030 at 50% opacity), ~16px across
- The top-left edge catches the ambient light — a subtle lighter strip (#1E1E50) implying the surface isn't perfectly matte
- Card edge (4px thickness): slightly lighter than face (#1E1E4A), giving dimensionality

FACE-UP cards (4 of 12 — 2 matched pairs already found):
- Front face: warm cream-ivory (#FFF5E6), very slightly warm-tinted
- Each card shows a centered ICON — simple, geometric, child-friendly:
  Pair A (positions: row 1 col 2, row 2 col 3): a round red apple shape (#CC3333) with a small green leaf (#44AA44). The apple is a simple ovoid, ~40% of card face area
  Pair B (positions: row 2 col 1, row 3 col 4): a blue fish shape (#3366BB), stylized with rounded fins and a dot eye. ~45% of card face area
- Matched cards have a SUCCESS GLOW: 3px border of soft green (#5DBB5D) with an outer bloom (8px feathered glow, same green at 30% opacity)
- Matched cards appear 2px higher (elevated) — their shadow is larger (10px offset, 12px blur) than face-down cards

=== CORRECT MATCH FEEDBACK (active on Pair B — the most recently matched) ===
- The 2 fish cards (row 2 col 1, row 3 col 4) have JUST been matched
- 6-8 small star particles burst outward from each card: gold (#FFD700) and white, sizes 3-7px, scattered in a 60px radius from each card center
- A soft radial glow (gold, 25% opacity, 50px radius) sits behind each of the 2 cards
- 2-3 of the particles are mid-flight — positioned at varying distances from the cards, implying motion (the burst happened ~0.3 seconds ago)
- The nearby grass blades directly below these cards are lit slightly warmer (gold tint) from the feedback glow
- This feedback is CONTAINED and GENTLE — it does not dominate the screen. It occupies roughly 15% of the visual field

=== BACKGROUND CONTEXT ELEMENTS ===
- Upper-left corner area: 2 very small, very blurry planetoids (~3-4% of screen height each) floating in the distant sky. One is the patchwork-colored Sorting Star, one is the teal Search Star. Heavily bokeh'd — just soft colored circles with a hint of atmosphere ring. They remind the child "there are other stars to visit"
- 1-2 tiny floating rocks in the mid-sky, also blurred. A couple have small golden crystals catching light (tying back to the Card Star's identity). Establishing the Mario Galaxy universe feel without cluttering the play space

=== UI OVERLAY (absolute minimum during gameplay) ===
- Top-left: home/return icon. A simple rounded-square with an upward-pointing chevron inside (indicating "back to space/home"). White at 40% opacity, 44x44px. Sits on a pill-shaped dark backdrop (#000000 at 20% opacity)
- Top-right: session progress. 5 small circles in a horizontal row: 3 filled (soft green #5DBB5D, solid), 2 empty (white outline at 30% opacity). Each circle 14px diameter, 18px center-to-center spacing. Also on a dark pill backdrop
- NO timer anywhere. NO score counter. NO text. NO numbers. NO labels
- NO bottom UI bar. The bottom of the screen is pure grass

=== LIGHTING ===
- Primary: upper-left cool light (matching home screen continuity), creating:
  - Rim light on card left/top edges
  - Grass highlight on the left side of frame
  - Slight shadow direction (lower-right)
- Secondary: warm gold from the match feedback, localized to the Pair B area
- Ambient: muted purple-blue fill from the sky, preventing harsh shadows
- The card grid area is the BRIGHTEST zone — a soft, invisible spotlight effect. Screen edges are 20% darker (natural vignette)
- Color grading: teal shadows, gold highlights, consistent with home screen

=== STYLE ===
- Illumination Studios / Super Mario Galaxy Movie rendering quality
- Cards feel like PHYSICAL OBJECTS with real weight, thickness, and material properties
- The purple velvet surface is RICH and tactile — not a flat color plane. The embossed suit patterns and golden crystals add depth
- Shallow DOF: cards are razor-sharp, distant sky planets are creamy bokeh, the velvet surface in the immediate foreground (bottom 3% of screen) has slight softness
- The curved purple horizon is the signature element — it immediately communicates "you're on the Card Star"
- Mood: focused concentration wrapped in cosmic wonder. Safe, predictable, beautiful

=== TECHNICAL ===
- Output: 2048x1152px (or equivalent 16:9)
- Static UI mockup showing a mid-game state (round 3 of 5, 2 pairs found, 8 cards remaining face-down)
- No characters, mascots, hands, or living creatures visible
- Absolutely no text, typography, numbers, or readable writing anywhere
- Card grid: 3 columns x 4 rows, 12 cards total (8 face-down, 4 face-up as 2 matched pairs)
```

---

## 4. 既存設計との差分・移行ノート

### カラーパレット変更

| 要素 | 旧（MC+AC風） | 新（Galaxy風） |
|------|--------------|---------------|
| 背景ベース | #F5F5F5 ライトグレー or パステル空 | #0B0B30 → #1E1550 ダークネイビー宇宙 |
| ゲーム選択 | くすんだパステルの建物 | テーマ球体惑星（星） |
| アクセント | #D4A574 ウォームベージュ | #FFD700 ゴールド + #00D4FF シアン（発光） |
| 地面 | #7CBA5D MC風草ブロック | #5DBB3D 球体惑星の草 |
| UI要素 | フラットカラーボタン | グロウ付きアイコン（テキストなし） |

### 建物→球体惑星（星）への変更

| 要素 | 旧 | 新 |
|------|-----|-----|
| ゲーム選択UI | 建物をカルーセルで選ぶ | テーマ球体惑星（星）をカルーセルで選ぶ |
| 質感 | マイクロボクセルブロック | CG草地の球体 + ゲーム象徴モチーフ |
| 配置 | 地面に建つ | 宇宙空間に浮かぶ |
| 周囲 | サイドビルディング2-3棟 | 浮遊岩・星・ネビュラ雲 + 隣の星が遠くにボケて見える |
| ライティング | 昼間の自然光 | 宇宙空間 + リムライト + 暖色ポイントライト |

### `nolla_stage_bg_composition_rules.md` への影響

旧ルール（地面Y=95%、サイドビルディング配置等）はMC風前提で設計されている。Galaxy風に移行する場合、球体惑星構図に合わせて**全面改訂が必要**。ただし基本原則（中央配置・16:9・主役が画面を支配する）は維持。

### ASD配慮との整合性

| 配慮項目 | 判定 | 理由 |
|---------|------|------|
| 蛍光色禁止 | ✅ OK | 発光はグロウ（拡散光）であり蛍光色ではない |
| 点滅禁止 | ✅ OK | 星は静止 or ゆっくりフェード。フラッシュなし |
| 予測可能性 | ✅ OK | 宇宙空間は常に同じ構造。星の配置は固定 |
| 視覚シンプルさ | ⚠️ 要注意 | ネビュラ+星の密度が高すぎると情報過多。密度は控えめに |
| 恐怖回避 | ✅ OK | 暖色光源が多く「夜祭り」感覚。暗さ≠怖さ |
