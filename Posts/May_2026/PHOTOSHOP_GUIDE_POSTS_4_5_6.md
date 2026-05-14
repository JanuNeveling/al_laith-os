# AL LAITH — Photoshop Step-by-Step Guide
### Posts 4, 5 & 6 — Pure Graphics (no photo needed)
_Full beginner walkthrough. Every click explained._

---

## BEFORE YOU START — One-time setup

### Save your brand colours as Swatches so you can reuse them in every session:
1. Open the **Swatches** panel: go to **Window → Swatches**
2. Click the **three-line menu** (top-right of the Swatches panel) → **New Swatch Preset**
3. Add these one by one (you'll be asked for a hex code each time):

| Swatch name to type | Hex |
|---|---|
| AL Deep Navy | `183057` |
| AL Near-Black | `0C172C` |
| AL Cyan | `329FCD` |
| AL Brand Blue | `0071B7` |
| AL Subtext Grey | `A0A5B2` |
| AL Muted | `39537F` |

> How to enter a hex: when the colour picker opens, look at the bottom — there's a small `#` field. Type the hex there and press **Enter**.

---

## HOW TO POSITION THINGS PRECISELY

You'll need this throughout. Here's how to place a layer at an exact X/Y position:

1. Select the layer in the **Layers panel**
2. Press **V** (Move Tool)
3. Look at the top toolbar — you'll see **X:** and **Y:** fields
4. Type the number you want and press **Tab** to jump to the next field
5. Press **Enter** to confirm

> **Important:** Photoshop measures X/Y from the **top-left corner** of the layer, not the centre. So X 60, Y 690 means the top-left corner of that element sits 60px from the left and 690px from the top.

---

## POST 4 — IPAF Explained
**Colours used:** Deep Navy background · Cyan for IPAF text (ONE cyan use) · Brand Blue for lines and bullets · White for body text · Subtext Grey for supporting copy

---

### STEP 1 — Create the canvas

1. Go to **File → New** (or press **Ctrl+N**)
2. Set:
   - Width: `1080` Pixels
   - Height: `1080` Pixels
   - Resolution: `72` Pixels/Inch
   - Color Mode: **RGB Color, 8 bit**
   - Background Contents: **White** (doesn't matter — we'll fill it)
3. Click **Create**

---

### STEP 2 — Fill the background Deep Navy

1. In the **Layers panel** (bottom-right), you'll see **Layer 1** or **Background**
2. Double-click the layer thumbnail to unlock it if it says "Background" — click **OK**
3. Press **U** to select the **Rectangle Tool**
4. In the top toolbar, make sure the mode is set to **Shape** (not Path or Pixels)
5. Click and drag to draw a rectangle that covers the **entire canvas** — start from the very top-left corner, drag to the bottom-right corner
6. After drawing, look at the top toolbar — set:
   - **W:** `1080 px`
   - **H:** `1080 px`
7. In the top toolbar find **Fill** (the coloured square) → click it → type `183057` in the hex field → press **Enter**
8. Set **Stroke** to **None** (click the stroke square → click the no-stroke icon)
9. Press **V** → set **X: 0**, **Y: 0** so it sits perfectly at the top-left
10. In the Layers panel, **double-click** the layer name and rename it `BG Navy`

---

### STEP 3 — "IPAF" hero text (Cyan)

1. Press **T** (Type Tool)
2. Click anywhere on the canvas
3. Type: `IPAF`
4. Select all the text (Ctrl+A)
5. In the top toolbar, set:
   - Font: **Arial**
   - Style: **Bold**
   - Size: **150 pt**
6. Click the **colour swatch** in the toolbar → type `329FCD` → Enter
   _(This is the ONE cyan use for this graphic — don't use cyan again after this)_
7. Press **V** to switch to Move Tool
8. In the top toolbar, click **Align to Canvas** — look for the alignment icons in the properties bar, click **Align horizontal centres** so the text sits in the middle horizontally
9. Set **Y: 130** in the position field
10. Rename this layer `IPAF Hero`

---

### STEP 4 — Accent line under IPAF

1. Press **U** (Rectangle Tool)
2. Draw a small rectangle anywhere on the canvas
3. In the toolbar set **W: 120 px**, **H: 3 px**
4. Set **Fill** colour to `0071B7` (Brand Blue)
5. Press **V** → click the **Align horizontal centres** button to centre it on the canvas
6. Set **Y: 310**
7. Rename layer `Line — Under IPAF`

---

### STEP 5 — Full name subtitle

1. Press **T** (Type Tool)
2. Click the canvas, type: `International Powered Access Federation`
3. Select all → set:
   - Font: **Arial**, Style: **Regular**, Size: **28 pt**
   - Colour: `FFFFFF` (White)
4. Press **V** → click **Align horizontal centres**
5. Set **Y: 335**
6. Rename layer `Subtitle — Full Name`

---

### STEP 6 — "What it covers:" label

1. Press **T**, click canvas, type: `What it covers:`
2. Select all → Arial, **Regular**, **28 pt**, colour `A0A5B2`
3. Press **V** → set **X: 75**, **Y: 420**
4. Rename layer `Label — What It Covers`

---

### STEP 7 — Short rule under that label

1. Press **U** → draw a rectangle
2. Set **W: 50 px**, **H: 2 px**, Fill: `0071B7`
3. Press **V** → set **X: 75**, **Y: 460**
4. Rename layer `Line — Under Label`

---

### STEP 8 — The 4 bullet items

You'll repeat this process 4 times. Each bullet has two parts: a **small square marker** and a **text line**.

#### Bullet 1 (Y position: 478)

**Square marker:**
1. Press **U**, draw a rectangle
2. Set **W: 13 px**, **H: 13 px**, Fill: `0071B7`
3. Press **V** → set **X: 75**, **Y: 485** (slightly lower than the text so it sits at mid-height)
4. Rename layer `Bullet Square 1`

**Text:**
1. Press **T**, click canvas, type: `Safe operation of MEWPs`
2. Arial, **Bold**, **27 pt**, colour `FFFFFF`
3. Press **V** → set **X: 108**, **Y: 478**
4. Rename layer `Bullet Text 1`

#### Bullet 2 (Y: 546)

Square: X 75, Y 553 · Text: X 108, Y 546
Text content: `Boom lifts  ·  Scissor lifts  ·  Mast climbers`
_(Type two spaces before and after the · dot for spacing)_

#### Bullet 3 (Y: 614)

Square: X 75, Y 621 · Text: X 108, Y 614
Text content: `Theory + practical examination`

#### Bullet 4 (Y: 682)

Square: X 75, Y 689 · Text: X 108, Y 682
Text content: `Internationally recognised certification`

> **Quick tip:** After making Bullet 1, select both its square and text layers in the Layers panel (hold Shift to select both) → right-click → **Duplicate Layers**. Then just move the duplicate down and update the text.

---

### STEP 9 — Divider line before bottom statement

1. Press **U**, draw a rectangle
2. Set **W: 220 px**, **H: 2 px**, Fill: `0071B7`
3. Press **V** → **Align horizontal centres** → set **Y: 760**
4. Rename layer `Line — Divider`

---

### STEP 10 — Bottom statement

1. Press **T**, type: `Our operators are IPAF certified.`
2. Arial, **Bold**, **36 pt**, colour `FFFFFF`
3. Press **V** → **Align horizontal centres** → set **Y: 778**
4. Rename layer `Statement — Main`

---

### STEP 11 — Supporting text

1. Press **T**, type: `Every machine. Every site. Every time.`
2. Arial, **Regular**, **26 pt**, colour `A0A5B2`
3. Press **V** → **Align horizontal centres** → set **Y: 830**
4. Rename layer `Statement — Sub`

---

### STEP 12 — Footer tagline

1. Press **T**, type: `AL LAITH  ·  Whatever It Takes.`
2. Arial, **Regular**, **22 pt**, colour `39537F`
3. Press **V** → **Align horizontal centres** → set **Y: 948**
4. Rename layer `Footer Tagline`

---

### STEP 13 — Place CG Tech logo (top-right)

1. Go to **File → Place Embedded**
2. Navigate to `Shared_Assets/01_Logos/CG_Tech/` and select `CG_Tech_White.jpeg`
3. Press **Enter** to confirm placement
4. Press **V**, then in the top toolbar set **W: 80 px** (make sure the chain-link icon between W and H is locked so it scales proportionally)
5. Set **X:** so the right edge is 50px from the canvas edge. To do this: **X = 1080 − 80 − 50 = 950**. Type **X: 950**
6. Set **Y: 50**
7. Rename layer `Logo — CG Tech`

---

### STEP 14 — Place Al Laith logo (bottom-right)

1. **File → Place Embedded** → navigate to `Shared_Assets/01_Logos/Al_Laith/` → select `Al_Laith_White_Full.png`
2. Press **Enter**
3. Set **W: 110 px**
4. Right edge 50px from canvas: **X = 1080 − 110 − 50 = 920**. Type **X: 920**
5. Bottom edge 50px from canvas: **Y = 1080 − logo height − 50**. After placing, check the logo's height in the properties bar, then calculate accordingly. Aim for the bottom of the logo to sit at around Y 1030 (50px from bottom).
6. Rename layer `Logo — Al Laith`

---

### STEP 15 — Export as JPEG

1. Go to **File → Export → Export As** (or **File → Save for Web** in older versions)
2. Set:
   - Format: **JPEG**
   - Quality: **90–95%**
   - Image Size: 1080 × 1080 (should already be correct)
3. Click **Export All** (or **Save**)
4. Name the file: `post4_IPAF_explained.jpg`

---
---

## POST 5 — "On time. Every time."
**Background: Brand Blue `#0071B7` — NOT Deep Navy. This is intentional to break up the feed.**
**Colours:** Brand Blue background · Pure White for everything · No cyan needed (the blue background IS the colour accent for this post)

> **Why Brand Blue here?** Posts 4 and 6 are both Deep Navy. If Post 5 is also navy, your feed looks like one long dark rectangle. Brand Blue `#0071B7` is an approved brand colour — clean, confident, and gives the eye a break. Think of it like your "You call us." reference post.

---

### STEP 1 — Create the canvas
Same as Post 4: **File → New** → 1080×1080, 72dpi, RGB → **Create**

---

### STEP 2 — Fill background Brand Blue

1. Press **U** (Rectangle Tool)
2. Draw a full-canvas rectangle: W `1080 px`, H `1080 px`
3. Fill: `0071B7` ← Brand Blue, NOT navy
4. Stroke: None
5. Press **V** → X: 0, Y: 0
6. Rename layer `BG Brand Blue`

---

### STEP 3 — "On time." headline

1. Press **T**, click canvas, type: `On time.`
2. Select all → Arial, **Bold**, **108 pt**, colour `FFFFFF`
3. Press **V** → click **Align horizontal centres**
4. Set **Y: 292**
5. Rename layer `Headline 1 — On time`

---

### STEP 4 — "Every time." headline

1. Press **T**, type: `Every time.`
2. Arial, **Bold**, **108 pt**, colour `FFFFFF`
3. Press **V** → **Align horizontal centres** → Y: **418**
4. Rename layer `Headline 2 — Every time`

> These two lines should feel like one unit — same font, same size, same weight. The visual power is in the repetition and the clean blue space around them.

---

### STEP 5 — White separator line

1. Press **U**, draw a rectangle
2. Set **W: 150 px**, **H: 3 px**, Fill: `FFFFFF`, Opacity: **60%**
   _(To set opacity: after placing, look at the top-right of the Layers panel — there's an Opacity field. Type 60.)_
3. Press **V** → **Align horizontal centres** → Y: **548**
4. Rename layer `Separator Line`

> On a blue background we use white at reduced opacity instead of cyan — cyan would fight with the blue. Keep it subtle.

---

### STEP 6 — Subline

1. Press **T**, type: `No excuses. No delays. Just delivery.`
2. Arial, **Regular**, **32 pt**, colour `DCEEFA`
   _(A soft blue-white — readable but clearly secondary to the headline)_
3. Press **V** → **Align horizontal centres** → Y: **578**
4. Rename layer `Subline`

---

### STEP 7 — Footer tagline

1. Press **T**, type: `Whatever It Takes.`
2. Arial, **Regular**, **26 pt**, colour `96C3E6`
   _(Muted blue-white for the footer — quiet, doesn't compete)_
3. Press **V** → **Align horizontal centres** → Y: **930**
4. Rename layer `Footer Tagline`

---

### STEP 8 — CG Tech logo (top-right)
Same as Post 4 Step 13:
- File: `CG_Tech_White.jpeg`, W: 80px, X: 950, Y: 50

---

### STEP 9 — Al Laith logo (bottom-right)
Same as Post 4 Step 14:
- File: `Al_Laith_White_Full.png`, W: 110px, X: 920, bottom-right corner

---

### STEP 10 — Export
File → Export As → JPEG, Quality 90–95 → name: `post5_on_time_every_time.jpg`

---
---

## POST 6 — Sectors Served
**The most complex of the three — uses tiled shapes.**
**Colours:** Deep Navy BG · White headline · Cyan for "Five sectors." (ONE cyan use) · Brand Blue for tiles · Cyan stripe on top of each tile · Subtext Grey for tile descriptions

---

### STEP 1 — Create the canvas
File → New → 1080×1080, 72dpi, RGB → Create

---

### STEP 2 — Fill background Deep Navy

1. Press **U**, draw full canvas rectangle, W: 1080, H: 1080
2. Fill: `183057`, Stroke: None, X: 0, Y: 0
3. Rename `BG Navy`

---

### STEP 3 — "One company." headline

1. Press **T**, type: `One company.`
2. Arial, **Bold**, **66 pt**, colour `FFFFFF`
3. Press **V** → **Align horizontal centres** → Y: **115**
4. Rename `Headline 1 — One company`

---

### STEP 4 — "Five sectors." headline (cyan)

1. Press **T**, type: `Five sectors.`
2. Arial, **Bold**, **66 pt**, colour `329FCD`
3. Press **V** → **Align horizontal centres** → Y: **192**
4. Rename `Headline 2 — Five sectors`

---

### STEP 5 — Accent line under headlines

1. Press **U**, draw rectangle: W: **170 px**, H: **3 px**, Fill: `0071B7`
2. Press **V** → **Align horizontal centres** → Y: **278**
3. Rename `Line — Under Headlines`

---

### STEP 6 — Build the first sector tile (CONSTRUCTION)

This is the tile you'll duplicate for all 5 sectors. Get this one right first.

**6a — Tile background rectangle:**
1. Press **U**, draw a rectangle
2. In toolbar set exactly: **W: 296 px**, **H: 158 px**
3. Fill: `0071B7` (Brand Blue), Stroke: None
4. Press **V** → set **X: 55**, **Y: 304**
5. Rename layer `Tile 1 BG — Construction`

**6b — Cyan top stripe:**
1. Press **U**, draw another rectangle
2. Set exactly: **W: 296 px**, **H: 5 px**, Fill: `329FCD`
3. Press **V** → set **X: 55**, **Y: 304** (same X/Y as the tile — it sits on top of it)
4. Rename layer `Tile 1 Stripe — Construction`

**6c — Sector name text:**
1. Press **T**, type: `CONSTRUCTION`
2. Arial, **Bold**, **25 pt**, colour `FFFFFF`
3. Press **V**
4. To centre the text inside the tile: hold **Shift** and click the tile background layer in the Layers panel so both are selected, then click **Align horizontal centres** in the top toolbar
5. Deselect the tile layer (hold Shift, click it again)
6. Set **Y: 330** (tile top 304 + 26px padding = 330)
7. Rename `Tile 1 Name — Construction`

**6d — Tile description text:**
1. Press **T**, type: `Builds, fit-out, high-rise`
2. Arial, **Regular**, **17 pt**, colour `A0A5B2`
3. Press **V** → centre inside tile (same method as above)
4. Set **Y: 436** (tile bottom 462 − 26 = 436)
5. Rename `Tile 1 Sub — Construction`

---

### STEP 7 — Duplicate tile for all 5 sectors

**Select all 4 tile layers** (hold Shift to select multiple in the Layers panel):
- `Tile 1 BG — Construction`
- `Tile 1 Stripe — Construction`
- `Tile 1 Name — Construction`
- `Tile 1 Sub — Construction`

Right-click → **Duplicate Layers** → click OK

Do this 4 more times so you have 5 groups of 4 layers.

---

### STEP 8 — Position the 5 tiles

**Row 1 — 3 tiles across (Y: 304)**
| Tile | X position |
|---|---|
| Tile 1 (CONSTRUCTION) | `55` |
| Tile 2 (AVIATION) | `373` |
| Tile 3 (EVENTS) | `691` |

**Row 2 — 2 tiles centred (Y: 484)**
| Tile | X position |
|---|---|
| Tile 4 (SPORTING EVENTS) | `214` |
| Tile 5 (FACILITY MGMT) | `532` |

For each duplicated tile group:
1. Select the 4 layers of that tile
2. Press **V** → set the X and Y values above
3. Make sure the stripe layer always has the **same X and Y as its tile BG layer**

> **Shortcut:** Group each tile's 4 layers before duplicating. Select all 4 → Ctrl+G to group. Then duplicate the group. When you move the group, all 4 layers move together.

---

### STEP 9 — Update the text in each tile

For tiles 2–5, double-click the Name text layer and update:

| Tile | Name text | Sub text |
|---|---|---|
| 2 | `AVIATION` | `Ground support & access` |
| 3 | `EVENTS` | `Staging, rigging, logistics` |
| 4 | `SPORTING EVENTS` | `Camera rigs & site access` |
| 5 | `FACILITY MGMT` | `Maintenance & at-height work` |

After updating each tile's text:
- Re-centre the name text within its tile (select name layer + tile BG layer → Align horizontal centres)
- Re-centre the sub text the same way

---

### STEP 10 — Footer text

1. Press **T**, type: `UAE & GCC  ·  allaith.com`
2. Arial, **Regular**, **23 pt**, colour `39537F`
3. Press **V** → **Align horizontal centres** → Y: **944**
4. Rename `Footer`

---

### STEP 11 — CG Tech logo (top-right)
- File: `CG_Tech_White.jpeg`, W: 80px, X: 950, Y: 50

---

### STEP 12 — Al Laith logo (bottom-right)
- File: `Al_Laith_White_Full.png`, W: 110px, X: 920, bottom-right corner

---

### STEP 13 — Export
File → Export As → JPEG, Quality 90–95 → name: `post6_sectors_served.jpg`

---

## LAYER ORDER REFERENCE (bottom to top)

For all three posts, your Layers panel should read roughly like this from bottom to top:

```
Logo — Al Laith          ← always on top, bottom-right
Logo — CG Tech           ← always on top, top-right
Footer Tagline
[post-specific content layers]
BG Navy                  ← always at the bottom
```

> Keep your layers named and in order as you go — it saves a lot of frustration.

---

## COMMON MISTAKES TO AVOID

| Mistake | Fix |
|---|---|
| Text is blurry or pixelated | Make sure you're working at 1080×1080 px, not a smaller size |
| Colour looks slightly off | Always use the hex field — don't eyedrop or guess |
| Logo is stretched | Make sure the chain-link (proportional scale) icon is locked when resizing |
| Can't find X/Y position fields | Press **V** first (Move Tool), then look at the top toolbar |
| Cyan used more than once | Go back and change extras to Brand Blue `0071B7` |
| Tiles look misaligned | Use **View → Snap To → Document Bounds** and turn on Smart Guides (View → Show → Smart Guides) |
