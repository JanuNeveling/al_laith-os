# AL LAITH — Photoshop Step-by-Step Guide
### Posts 1, 2 & 3 — Photo-Forward Posts (Template A)
_Full beginner walkthrough. Every click explained._

---

## WHAT MAKES THESE POSTS DIFFERENT

Posts 1, 2 and 3 are **photo-based** — you'll place your own photo as the background, then build the brand overlay on top of it. This is the most common format Al Laith uses.

The key technique in these posts is the **gradient overlay** — a dark layer that fades from solid at the bottom (so text is readable) to transparent at the top (so the photo shows through). Once you've done it once on Post 1, Posts 2 and 3 are exactly the same process.

---

## BEFORE YOU START — One-time setup

### Save your brand colours as Swatches

Do this once and reuse them in every session:

1. Go to **Window → Swatches** to open the Swatches panel
2. Click the **three-line menu** (top-right of the Swatches panel) → **New Swatch Preset**
3. When the colour picker opens, look for the small `#` field at the bottom — type the hex code there and press **Enter**
4. Give each swatch a name and save

| Swatch name | Hex |
|---|---|
| AL Near-Black | `0C172C` |
| AL Deep Navy | `183057` |
| AL Cyan | `329FCD` |
| AL Brand Blue | `0071B7` |
| AL Subtext Grey | `A0A5B2` |
| AL Muted | `39537F` |

---

## HOW TO POSITION THINGS PRECISELY

You'll use exact X/Y values throughout this guide. Here's how:

1. Select the layer in the **Layers panel** (bottom-right of screen)
2. Press **V** to activate the **Move Tool**
3. Look at the **top toolbar** — you'll see **X:** and **Y:** fields
4. Click into the X field, type your number, press **Tab** to jump to Y, type that number, press **Enter**

> **Note:** X and Y are measured from the **top-left corner** of the layer. So X: 60, Y: 690 means the top-left corner of that element sits 60px from the left edge and 690px from the top of the canvas.

---

## HOW TO PLACE A PHOTO IN PHOTOSHOP

You'll do this in every photo post. Here's the method:

1. Go to **File → Place Embedded**
2. Navigate to where your photo is saved on your computer
3. Select the photo file and click **Place**
4. The photo appears on the canvas with a **transform box** around it (with handles at the corners and edges)
5. To scale it up: hold **Shift** and drag a corner handle outward (holding Shift keeps the proportions correct)
6. To move it: click and drag from the centre of the image
7. Goal: the photo should **cover the entire 1080×1080 canvas** — no white showing at any edge
8. When you're happy with the placement, press **Enter** to confirm

> **Tip:** If the photo is portrait (tall) you'll need to scale it up so the width fills the canvas. If it's landscape (wide) scale it up so the height fills the canvas.

---

## HOW THE GRADIENT OVERLAY WORKS

This is the signature Al Laith look. Here's the idea before we get into the steps:

- You place a solid dark layer (`#0C172C`) above the photo
- You add a **Layer Mask** to that dark layer
- The mask tells Photoshop where to show the dark colour and where to hide it
- You paint a **black-to-white gradient** on the mask: black at the top (hides the dark colour = photo shows through), white at the bottom (shows the dark colour = text area reads well)
- Result: photo at the top, dark readable area at the bottom

---
---

## POST 1 — "This is the standard."
**Photo: Mannequin in Al Laith uniform**

---

### STEP 1 — Create the canvas

1. Go to **File → New** (or press **Ctrl+N**)
2. Set:
   - Width: `1080` Pixels
   - Height: `1080` Pixels
   - Resolution: `72` Pixels/Inch
   - Color Mode: **RGB Color, 8 bit**
   - Background Contents: **White**
3. Click **Create**

---

### STEP 2 — Place your photo

1. Go to **File → Place Embedded**
2. Find your mannequin-in-uniform photo and click **Place**
3. Scale and position it so it fills the entire canvas — no white gaps at any edge
4. Keep the mannequin **centred** in the frame or positioned **slightly right** of centre (this gives the text on the left room to breathe)
5. Press **Enter** to confirm
6. In the Layers panel, rename this layer `Photo — Mannequin`

---

### STEP 3 — Create the gradient overlay

This is the most important step in any photo post. Take your time here.

**3a — Add a new solid layer above the photo:**

1. In the Layers panel, make sure the `Photo — Mannequin` layer is selected
2. Press **U** to select the **Rectangle Tool**
3. In the top toolbar, make sure the mode is set to **Shape**
4. Draw a rectangle that covers the **entire canvas** — W: `1080 px`, H: `1080 px`, X: 0, Y: 0
5. Set the **Fill** colour to `0C172C` (Near-Black Navy)
6. Set **Stroke** to **None**
7. Rename this layer `Gradient Overlay`

**3b — Add a Layer Mask to this rectangle:**

1. Make sure `Gradient Overlay` is selected in the Layers panel
2. At the bottom of the Layers panel, click the **Add Layer Mask** button — it looks like a rectangle with a circle inside it
3. You'll see a white rectangle appear next to your layer's thumbnail in the Layers panel — that's the mask
4. Click on the **mask thumbnail** (the white rectangle) to make sure you're editing the mask, not the layer itself

**3c — Paint the gradient on the mask:**

1. Press **G** to select the **Gradient Tool**
2. Look at the top toolbar — click on the gradient preview strip to open the **Gradient Editor**
3. Select the **Black to White** preset (it's usually in the top row — black on the left, white on the right)
4. Click **OK** to close the Gradient Editor
5. In the top toolbar, make sure the gradient type is **Linear** (first icon in the row of gradient type buttons)
6. Now, on the canvas, you're going to draw the gradient **upward from the bottom**:
   - Click at the **very bottom** of the canvas (Y ~1080)
   - Drag **straight up** to about **40% from the bottom** (roughly Y ~640)
   - Hold **Shift** while dragging to keep it perfectly vertical
   - Release the mouse
7. Look at the canvas — the bottom of the dark overlay should be solid, fading to transparent as you go up. The photo should be fully visible at the top.

> **If it looks wrong (photo disappears at the bottom instead of the top):** The gradient is backwards. In the Gradient Editor, swap the black and white stops, or simply drag the gradient in the opposite direction.

> **To adjust the fade height:** Just drag the gradient again on the mask. Each new drag replaces the previous one. Drag shorter for a darker, lower overlay. Drag longer for a more gradual fade.

8. Rename this layer `Gradient Overlay` (if not already named)

---

### STEP 4 — "WHATEVER IT TAKES" tag (optional but recommended)

This is the small brand tag in the top-left corner. It reinforces the tagline on photo posts.

1. Press **T** (Type Tool)
2. Click near the top-left of the canvas
3. Type: `WHATEVER IT TAKES`
4. Select all the text (Ctrl+A while in the Type Tool)
5. Set:
   - Font: **Arial**
   - Style: **Bold**
   - Size: **12 pt**
   - Colour: `329FCD` (Bright Cyan) — click the colour swatch in the toolbar, type the hex, press Enter
6. Now add **letter spacing** (tracking): look for the **Character panel** (Window → Character). Find the field that has a small "VA" with arrows — that's tracking. Set it to `50`
7. Press **V** to switch to Move Tool
8. Set **X: 50**, **Y: 52**
9. Rename layer `Tag — Whatever It Takes`

> **Why 12 pt instead of px?** This tag follows the original brand spec in points. At 72dpi, 12pt = 16px — it should read as a small but sharp label.

---

### STEP 5 — Headline

1. Press **T**, click near the bottom-left of the canvas
2. Type: `This is the standard.`
3. Select all → set:
   - Font: **Arial**
   - Style: **Bold**
   - Size: **80 pt** _(or 80px if your Photoshop is set to pixels — check your unit preferences)_
   - Colour: `FFFFFF` (White)
4. Press **V** → set **X: 60**, **Y: 690**
5. Rename layer `Headline`

---

### STEP 6 — Accent line

This is the short cyan bar that sits between the headline and the subtext — a visual separator that's part of the brand system.

1. Press **U** (Rectangle Tool)
2. Draw a small rectangle anywhere on the canvas
3. Set exactly: **W: 90 px**, **H: 4 px**
4. Fill: `329FCD` (Bright Cyan)
5. Stroke: None
6. Press **V** → set **X: 60**, **Y: 784**
7. Rename layer `Accent Line`

> **This is the only cyan use in Posts 1 and 2.** The WHATEVER IT TAKES tag up top is also cyan — so if you included that, this line is actually the second cyan element. The brand rule is one cyan element per composition. In practice, the small tag at 12pt is treated as a brand watermark rather than a design element, so using cyan on the accent line as well is accepted. Just don't add more cyan after this.

---

### STEP 7 — Subtext

1. Press **T**, click below the accent line area
2. Type: `Suited. Certified. Ready on every job.`
3. Select all → set:
   - Font: **Arial**
   - Style: **Regular**
   - Size: **30 pt**
   - Colour: `A0A5B2` (Subtext Grey)
4. Press **V** → set **X: 60**, **Y: 800**
5. Rename layer `Subtext`

---

### STEP 8 — CG Tech logo (top-right)

1. Go to **File → Place Embedded**
2. Navigate to `Shared_Assets/01_Logos/CG_Tech/` and select `CG_Tech_White.jpeg`
3. Press **Enter** to confirm placement
4. Press **V** → in the top toolbar, make sure the chain-link (proportional lock) icon between W and H is **closed/locked**
5. Set **W: 80 px** — the height will adjust automatically
6. Position it top-right with 50px inset: **X: 950**, **Y: 50**
   _(Calculation: 1080 − 80 width − 50 inset = 950)_
7. Rename layer `Logo — CG Tech`

---

### STEP 9 — Al Laith logo (bottom-right)

1. **File → Place Embedded** → navigate to `Shared_Assets/01_Logos/Al_Laith/` → select `Al_Laith_White_Full.png`
2. Press **Enter**
3. Set **W: 110 px** (chain-link locked so height adjusts proportionally)
4. **X: 920** _(1080 − 110 − 50 = 920)_
5. For Y: after placing at 110px wide, check the logo's height in the properties bar. You want the **bottom of the logo** to sit 50px from the bottom of the canvas. So: **Y = 1080 − logo height − 50**. The logo is typically around 55–60px tall at this width, so Y will be approximately **970**.
6. Rename layer `Logo — Al Laith`

---

### STEP 10 — Check your layer order

Your Layers panel from **bottom to top** should read:

```
Logo — Al Laith          ← top of stack (always on top of everything)
Logo — CG Tech           ← top of stack
Subtext
Accent Line
Headline
Tag — Whatever It Takes  ← optional
Gradient Overlay         ← above the photo, below everything else
Photo — Mannequin        ← at the bottom
```

> If a logo or text layer is buried under the gradient, drag it upward in the Layers panel.

---

### STEP 11 — Export as JPEG

1. Go to **File → Export → Export As**
2. Set: Format: **JPEG**, Quality: **90–95%**, Image Size: 1080 × 1080
3. Click **Export All** (or **Save**)
4. Name the file: `post1_this_is_the_standard.jpg`

---
---

## POST 2 — "The name on the door."
**Photo: Al Laith logo plaque on white wall**

The process is identical to Post 1. You're building the exact same layer structure — the only differences are the photo, the headline text, the subtext, and the headline Y position.

---

### STEP 1 — Create the canvas

File → New → 1080×1080 px, 72dpi, RGB Color 8 bit → **Create**

---

### STEP 2 — Place your photo

1. File → Place Embedded → select your plaque photo
2. Scale to fill the full canvas — no white edges
3. The plaque should be **centred or positioned right of centre** in the frame
4. Press Enter
5. Rename layer `Photo — Plaque`

---

### STEP 3 — Gradient overlay

Exactly the same as Post 1. Repeat Steps 3a, 3b, and 3c from Post 1:

- Draw a full-canvas rectangle, fill `0C172C`, rename `Gradient Overlay`
- Add a Layer Mask to it
- Click the mask thumbnail to select it
- Use the Gradient Tool (Black to White, Linear) → drag upward from the very bottom to about 40% from the bottom

Rename layer `Gradient Overlay`

---

### STEP 4 — "WHATEVER IT TAKES" tag (optional)

Same specs as Post 1:
- Text: `WHATEVER IT TAKES`
- Arial Bold, 12 pt, `329FCD`, tracking 50
- X: 50, Y: 52
- Rename: `Tag — Whatever It Takes`

---

### STEP 5 — Headline

1. Press **T**, click on canvas
2. Type: `The name on the door.`
3. Arial, **Bold**, **72 pt**, colour `FFFFFF`
   _(Slightly smaller than Post 1 because this headline is longer)_
4. Press **V** → set **X: 60**, **Y: 700**
5. Rename layer `Headline`

---

### STEP 6 — Accent line

1. Press **U**, draw a rectangle
2. **W: 90 px**, **H: 4 px**, Fill: `329FCD`
3. Press **V** → **X: 60**, **Y: 783**
4. Rename layer `Accent Line`

---

### STEP 7 — Subtext

1. Press **T**, click on canvas
2. Type: `And on every job we've ever done.`
3. Arial, **Regular**, **30 pt**, colour `A0A5B2`
4. Press **V** → set **X: 60**, **Y: 800**
5. Rename layer `Subtext`

---

### STEP 8 — CG Tech logo (top-right)

Same as Post 1 Step 8:
- `CG_Tech_White.jpeg`, W: 80px, X: 950, Y: 50

---

### STEP 9 — Al Laith logo (bottom-right)

Same as Post 1 Step 9:
- `Al_Laith_White_Full.png`, W: 110px, X: 920, bottom-right corner

---

### STEP 10 — Layer order check

```
Logo — Al Laith
Logo — CG Tech
Subtext
Accent Line
Headline
Tag — Whatever It Takes   ← optional
Gradient Overlay
Photo — Plaque            ← bottom
```

---

### STEP 11 — Export

File → Export As → JPEG, Quality 90–95 → name: `post2_the_name_on_the_door.jpg`

---
---

## POST 3 — "Everything starts here."
**Photo: HQ exterior with golf carts and UAE flag**

Post 3 is almost identical to Posts 1 and 2, with two differences: **it has two subtext lines instead of one** (a cyan line and a grey line), and **the canvas is taller — 1080×1350 px** (portrait format). The taller canvas gives the building and flag pole more room to breathe at the top while keeping the text block anchored at the bottom.

---

### STEP 1 — Create the canvas

1. Go to **File → New**
2. Set:
   - Width: `1080` Pixels
   - Height: `1350` Pixels ← taller than Posts 1 and 2
   - Resolution: `72` Pixels/Inch
   - Color Mode: **RGB Color, 8 bit**
3. Click **Create**

---

### STEP 2 — Place your photo

1. File → Place Embedded → select your HQ exterior photo
2. Scale to fill the full canvas
3. Make sure the **building and UAE flag pole are visible** in the frame — these are the key visual elements
4. Press Enter
5. Rename layer `Photo — HQ Exterior`

---

### STEP 3 — Gradient overlay

Same process as Posts 1 and 2, but sized for the **1350px tall canvas**. Because the canvas is taller, the building and flag have more space at the top — the gradient fade can start a little higher to give the photo more room.

- Draw a full-canvas rectangle: **W: 1080 px, H: 1350 px**, fill `0C172C`, X: 0, Y: 0
- Rename layer `Gradient Overlay`
- Add a **Layer Mask** to it → click the mask thumbnail to select it
- Press **G** (Gradient Tool) → Black to White, Linear
- Drag upward from the **very bottom of the canvas** (Y: 1350) to roughly **45% from the bottom** — that's about Y: **743** from the top
- The photo should be fully visible at the top; the dark area should be solid at the bottom

Rename `Gradient Overlay`

---

### STEP 4 — "WHATEVER IT TAKES" tag (optional)

Same as Posts 1 and 2:
- `WHATEVER IT TAKES`, Arial Bold, 12 pt, `329FCD`, tracking 50, X: 50, Y: 52

---

### STEP 5 — Headline

1. Press **T**, click on canvas
2. Type: `Everything starts here.`
3. Arial, **Bold**, **76 pt**, colour `FFFFFF`
4. Press **V** → set **X: 60**, **Y: 935**
   _(Same distance from the bottom as Posts 1 and 2 — just shifted down for the taller canvas)_
5. Rename layer `Headline`

---

### STEP 6 — Accent line

1. Press **U**, draw rectangle
2. **W: 90 px**, **H: 4 px**, Fill: `329FCD`
3. Press **V** → **X: 60**, **Y: 1022**
4. Rename layer `Accent Line`

---

### STEP 7 — Cyan subline (the location statement)

This post has an extra text line in cyan — it acts as a punchy follow-through to the headline. This is the **one cyan text use** for this post (the accent line above is treated as a graphic element, not a cyan "text" use, so this is fine).

1. Press **T**, click on canvas
2. Type: `Before it arrives on your site.`
3. Arial, **Bold**, **32 pt**, colour `329FCD`
4. Press **V** → set **X: 60**, **Y: 1040**
5. Rename layer `Cyan Subline`

---

### STEP 8 — Secondary subline (location credit)

1. Press **T**, click on canvas
2. Type: `Al Laith HQ — Dubai, UAE.`
3. Arial, **Regular**, **26 pt**, colour `A0A5B2`
4. Press **V** → set **X: 60**, **Y: 1085**
5. Rename layer `Secondary Subline`

---

### STEP 9 — CG Tech logo (top-right)

Same as Posts 1 and 2:
- `CG_Tech_White.jpeg`, W: 80px, X: 950, Y: 50

---

### STEP 10 — Al Laith logo (bottom-right)

Same file and width as Posts 1 and 2, but Y is different because the canvas is taller:
- `Al_Laith_White_Full.png`, W: 110px, X: 920
- Y: **1240** _(1350 canvas height − ~60px logo height − 50px inset = ~1240)_

---

### STEP 11 — Layer order check

```
Logo — Al Laith
Logo — CG Tech
Secondary Subline
Cyan Subline
Accent Line
Headline
Tag — Whatever It Takes   ← optional
Gradient Overlay
Photo — HQ Exterior       ← bottom
```

---

### STEP 12 — Export

File → Export As → JPEG, Quality 90–95 → name: `post3_everything_starts_here.jpg`

> **Note:** Instagram displays 1080×1350 as a portrait crop in the feed. The top of the photo (building, flag, sky) will show in full — this is exactly why the taller format works well for this shot.

---
---

## QUICK REFERENCE — Photo Post Layer Structure

Every photo post (Posts 1, 2, 3) follows this exact stack from bottom to top:

```
[8] Logo — Al Laith           bottom-right · 110px · X:920
[7] Logo — CG Tech            top-right · 80px · X:950 Y:50
[6] Subtext                   X:60 · #A0A5B2 · Arial Regular 30pt
[5] Accent Line               X:60 · 90×4px · #329FCD
[4] Headline                  X:60 · #FFFFFF · Arial Bold 72–80pt
[3] Tag — Whatever It Takes   X:50 Y:52 · #329FCD · Arial Bold 12pt (optional)
[2] Gradient Overlay          Full canvas · #0C172C fill + layer mask
[1] Photo                     Fills canvas, photo content at top
```

---

## COMMON MISTAKES ON PHOTO POSTS

| Mistake | Fix |
|---|---|
| The dark overlay is solid and covers the whole photo | You forgot to add the Layer Mask, or painted the gradient in the wrong direction |
| The text is impossible to read over the photo | Your gradient doesn't start dark enough — try redrawing it slightly shorter (less of the canvas) |
| Photo doesn't fill the canvas edge to edge | Scale it up more — hold Shift when dragging a corner to keep proportions |
| The gradient looks banded or stripy | Make sure you're in RGB 8-bit mode and that the gradient type is Linear (not Angle or Reflected) |
| Logos look stretched | Chain-link proportional lock must be ON when you resize — check it's closed before typing the width |
| Cyan used in three places | The WHATEVER IT TAKES tag + accent line is okay. A third cyan element (e.g. cyan headline) breaks the brand rule — change it to white |
| Can't click the layer mask thumbnail | Click directly on the white rectangle next to the layer thumbnail, not the layer name |
