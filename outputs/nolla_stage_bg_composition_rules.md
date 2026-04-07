---
STATUS: ACTIVE
LAST_UPDATED: 2026-04-07
PURPOSE: ステージ背景構成ルール
RELATED: nolla_design_direction.md,nolla_v4d_building_design_rules.md
---

# Nolla Stage Background - Composition Rules (Absolute)

This document defines the EXACT composition rules for generating stage background images.
These rules are derived from quantitative analysis of 4 approved reference images.
ALL future stage background generation MUST follow these rules without exception.

## Canvas

- Aspect ratio: 16:9 (FIXED)
- Resolution: 2K (2048x1152 reference grid)
- All % values below are relative to this canvas size

---

## 1. Ground (FIXED - Never change)

| Property | Value | Pixel (2048x1152) |
|---|---|---|
| Ground surface Y position | **95-96% from top** | Y = 1094-1106px |
| Ground strip height | **4-5% of image height** (extremely thin) | 46-58px |
| Ground extends to | bottom edge (100%) | Y = 1152px |
| Ground color | flat single muted color, matching sky theme | - |
| Ground texture | completely flat, no grass/rocks/details | - |
| Ground-building junction | tiny vegetation dots allowed (max 3-5 small plants) | - |

**CRITICAL**: The ground is an EXTREMELY THIN strip at the very bottom. The building base sits just above it at ~90-93% from top. The ground is barely visible - just a thin line establishing the base level.

---

## 2. Main Building (Center Hero)

| Property | Value | Notes |
|---|---|---|
| Horizontal center | **50%** (exact center) | Never off-center |
| Width | **40-50%** of image width | Varies by building shape. Wide buildings (castles) = 45-50%. Narrow towers = 35-42% |
| Top of highest point | **3-7%** from top edge | Building nearly touches the top of the frame |
| Base | sits just above ground at **90-93%** from top | Building base is very close to bottom |
| Building height | **83-90%** of image height | Building fills almost the entire frame vertically |
| Facing direction | **front-facing** | Entrance/main facade faces viewer |
| Camera angle | **very slight low angle** | Viewer looks slightly upward at building |
| Focus | **sharp, in focus** | Main subject, full detail |

### Main Building Design Constraints
- Built from **uniform micro-voxel bricks** (each brick ~2-3px at 2K resolution)
- Brick size is CONSTANT across the entire building - no large blocks mixed with small blocks
- Must have: round porthole windows OR arched windows with warm yellow light
- Must have: an entrance/door visible at ground level
- Must have: at least one decorative element (spiral staircase, balcony, antenna, flag, etc.)
- Color palette: 2-3 main colors + 1 accent color, all from the Nolla muted-pastel range

---

## 3. Side Buildings (Left & Right)

### Positioning

| Property | Left Side | Right Side |
|---|---|---|
| Horizontal position | **0% to 10-12%** from left edge | **88-90% to 100%** from right edge |
| Cropping by frame | outermost building **30-50% hidden** by frame edge | same |
| Top of tallest building | **50-60%** from top | **50-60%** from top |
| Base | sits on same ground level at **90-93%** from top | same |
| Building height | **30-40%** of image height | same |
| Number of buildings | **2-3 houses** per side | **2-3 houses** per side |

### Size Relationship to Main Building

| Property | Value |
|---|---|
| Side building height / Main building height | **30-35%** (side buildings are roughly 1/3 the height of main) |
| Side building individual width | **4-6%** of image width each |
| Total side group width (per side) | **8-12%** of image width |

### Gap Between Main and Side Buildings

| Property | Value | Notes |
|---|---|---|
| Left gap | **18-22%** of image width | = clear empty space between main building's left edge and right edge of left side group |
| Right gap | **18-22%** of image width | same for right side |
| Gap must be | **visually empty** | Only sky/gradient visible in the gap. No floating objects, no trees, no extra elements |

### Side Building Design Constraints
- **MUST match the world/theme** of the main building (medieval castle = medieval houses, candy tower = candy shops, etc.)
- Same voxel brick size as main building
- Use **2-3 colors from the main building's palette** + 1-2 unique accent colors
- Each house has: a visible roof (pointed or flat) + 1-2 small windows + optionally a door
- Houses are tightly packed together (touching or slight overlap)
- **Slight depth-of-field blur** compared to main building (they are background elements)
- Houses should have varied heights within the group (not all identical height)
- The innermost house is always the tallest in the group, decreasing toward frame edge

---

## 4. Sky & Background

| Property | Value |
|---|---|
| Sky area | top 83% of image (everything above ground line) |
| Sky type | **simple 2-color gradient** |
| Gradient direction | bottom-to-top (warmer/darker at bottom near horizon, lighter at top) |
| Cloud count | **3-5 clouds** total |
| Cloud placement zone | between **8% and 65%** from top |
| Cloud size (large) | **8-12% of image width**, 1-2 clouds |
| Cloud size (small) | **3-5% of image width**, 2-3 clouds |
| Cloud style | soft, puffy, voxel-styled (same brick texture as buildings) |
| Cloud color | white OR slightly tinted to match sky gradient |
| Cloud depth layering | **some clouds OVERLAP in front of side buildings and lower main building** creating atmospheric depth |
| Extra sky elements | moon + stars (night only), low mist/fog for night scenes |

### Sky Theme Presets (per stage)

| Theme | Bottom color | Top color | Cloud tint |
|---|---|---|---|
| Sunset | warm golden (#E8B060) | peach-salmon (#E8A078) | golden-cream |
| Daytime | light cyan (#C8E8F0) | soft blue (#88C8E8) | white |
| Dusk | warm pink (#D89098) | indigo (#584888) | cream-pink |
| Night | purple (#685898) | deep blue (#283858) | none (stars instead) |
| Morning | peach (#F0C8A0) | light blue (#A0D0E8) | white |

---

## 5. Forbidden Elements (NEVER include)

- Trees, bushes, or large vegetation (tiny ground dots OK)
- Animals or characters
- Text or watermarks
- Extra decorative objects in the gap zones (between main and side buildings)
- Multiple ground levels or terrain variation
- Water, paths, or roads (exception: if building theme requires, e.g. lighthouse dock)
- Background mountains or horizon features
- Sun or visible light source
- Shadows on the ground (ambient lighting only)
- Any element that makes the composition feel cluttered

---

## 6. Composition Summary Diagram

```
|<-10-12%->|<--13-18%-->|<------40-50%------>|<--13-18%-->|<-10-12%->|
|           |            |                    |            |           |
| SIDE      |   GAP      |   MAIN BUILDING    |   GAP      |  SIDE     |
| BLDGS     | (sky only) |   (centered)       | (sky only) |  BLDGS    |
| 2-3       |            |                    |            |  2-3      |
| houses    |            |                    |            |  houses   |
|___________|____________|____________________|____________|___________|  ← 90-93% (building base)
|________ EXTREMELY THIN GROUND STRIP (4-5%) ___________________________| ← 95-100%
```

Vertical layout:
```
  0% ─── top of image
  3-7% ── top of main building (spires/flags) - nearly touches top
  5-70% ── cloud zone (clouds overlap buildings for depth)
 50-60% ── top of side buildings
 90-93% ── building bases
 95-96% ── GROUND LINE (thin strip)
100% ──── bottom of image
```

---

## 7. Prompt Template

When generating a stage background, use this exact template structure:

```
Hyper-detailed fine voxel art scene, STRICT RULES: uniform micro-bricks throughout (each brick 2-3 pixels), all buildings sit on a flat ground line at exactly 83% from the top of the image.

CENTER: A tall [BUILDING_TYPE], [BUILDING_DESCRIPTION]. [2-3 main colors]. Round/arched windows with warm golden light. Entrance visible at ground level. [Decorative element]. The building is centered, occupying roughly 40% of the image width, reaching near the top of the frame.

SIDES: On the far left edge, 2-3 small [MATCHING_STYLE] houses partially cropped by the frame, roughly 1/3 the height of the main building. On the far right edge, 2-3 similar small houses also partially cropped. Side buildings use the same color palette and voxel style as the main building. Side buildings are slightly blurred (depth of field).

BETWEEN the main building and side buildings, there is EMPTY SPACE showing only the sky gradient. No trees, no objects, no decorations in these gaps.

GROUND: A flat [GROUND_COLOR] ground strip at the bottom 17% of the image. No texture, no grass, no paths. All buildings sit on the same ground level.

SKY: Simple [SKY_GRADIENT_DESCRIPTION] gradient, [3-5] soft puffy clouds in the sky area. No sun, no extra elements.

16:9 aspect ratio. No text, no people, no animals. Child-friendly game art, Duolingo ABC meets Minecraft aesthetic.
```

---

## 8. Quality Checklist (Post-Generation Verification)

After generating each image, verify ALL of the following:

- [ ] Ground line is at 83% from top (not higher, not lower)
- [ ] Main building is horizontally centered
- [ ] Main building top is within 5-12% from top edge
- [ ] Main building width is 35-48% of image width
- [ ] Side buildings exist on BOTH left AND right edges
- [ ] Side buildings are partially cropped by frame edges
- [ ] Side buildings are 1/3 the height of the main building
- [ ] Side buildings sit on the SAME ground line as main building
- [ ] Clear empty gap between main building and side buildings on both sides
- [ ] Sky is a simple gradient with 3-5 clouds only
- [ ] No forbidden elements present
- [ ] Voxel brick size is uniform throughout (no mixed block sizes)
- [ ] Side building style matches main building theme/world
- [ ] Ground is flat, single color, no texture
