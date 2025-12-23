# Zen Flow Garden: Game Design Document

**Role:** Senior Mobile Game Designer & Somatic Psychology Consultant  
**Project:** Calm Elevation  
**Version:** 1.0  

---

## 1. Therapeutic Rationale

**Why This Works:**
Zen Flow Garden utilizes **somatic resourcing**—using the body's senses to anchor the mind. The core mechanic relies on:
*   **Touch-Action Consistency:** The direct 1:1 correlation between finger movement and sand displacement bridges the gap between digital and physical, grounding the user.
*   **Bilateral Stimulation (Simulated):** The flowing, screen-crossing movements often mimic EMDR (Eye Movement Desensitization and Reprocessing) tracking patterns, which are proven to reduce emotional distress.
*   **Parasympathetic Activation:** By rewarding *slow* movement, we physically force the user to decelerate their motor functions. This bio-feedback loop signals safety to the amygdala, shifting the nervous system from Fight/Flight (Sympathetic) to Rest/Digest (Parasympathetic).
*   **Cognitive Unloading:** The absence of scores, timers, or fail states removes "performance anxiety," allowing the Prefrontal Cortex to rest.

---

## 2. Core Game Loop

### A. Entry (The "Breath" Before)
*   **Transition:** Upon opening the activity, the screen fades in from white (or dark gray in dark mode) slowly (2s).
*   **First Prompt:** A subtle text appears: *"Move slowly to shape the sand."* It fades away after the first touch.

### B. The Interaction (The Flow)
*   **Action:** User touches the screen. The "sand" ripples slightly at the contact point.
*   **Movement:** Dragging the finger creates a trail (the Rake). 
*   **Flow:** The trail is not just a line; it is a displacement of texture. It stays until erased or overwritten.
*   **Pausing:** Holding the finger still creates a gentle "breathing" pulse in the sand around the finger, syncing with a visual breath guide (optional).

### C. Feedback (The Senses)
*   **Visual:** The sand particles/texture shift smoothly. The line edges are soft, not jagged.
*   **Audio:** A white-noise "sandy" friction sound plays when moving. Pitch/Volume modulates simply with speed (Slower = Deeper/Richer, Faster = Thinner/Quieter or Silence).
*   **Haptic:** Very faint vibrations (ImpactLight) occur as "grains" are moved.

### D. Regulation (The Reward)
*   **The "Flow State" Mechanic:** If the user maintains a consistent, slow speed for >3 seconds, the trail begins to glow faintly or emit small particles/petals.
*   **Overspeed Correction:** If the user moves too fast (anxious swiping), the rake "lifts" off the sand. No line is drawn. The audio fades. This is a gentle refusal to engage with chaos, subtly teaching the user to slow down to make an impact.

### E. Completion (Natural End)
*   **No "Game Over".**
*   **Exit:** A small, unobtrusive "breathe" icon in the corner can be tapped to bring up the "Finish" menu: "Save Garden to Journal" or "Clear & Restart" or "Return Home".

---

## 3. Interaction Design

*   **Speed Sensitivity:**
    *   *Velocity < 100px/s:* Deep, wide grooves. Rich audio.
    *   *Velocity 100-500px/s:* Standard grooves.
    *   *Velocity > 500px/s:* Physics "skips" the surface. Tool lifts up. Feedback diminishes.
*   **Smoothing:** Raw input points are interpolated (Bézier curves) to ensure no matter how shaky the user's hand is, the result is beautiful and curved. This creates a sense of "competence" and "grace."
*   **Multi-touch:** Two fingers create parallel rails (double rake).
*   **Tilt (Optional):** Tilting the phone slightly creates a subtle parallax effect on the stones/shadows, adding depth.

---

## 4. Visual Design System

*   **Palette (Calming & Premium):**
    *   *Sand Base:* Warm Beige (`#E6DEC7`) or Deep Slate (`#1E293B` for Dark Mode).
    *   *Shadows:* Soft Taupe (`#C7BCA5`) or Charcoal (`#0F172A`).
    *   *Highlights:* Cream (`#FFFBF0`) or Soft Blue-Grey (`#334155`).
    *   *Accent:* Muted Teal or Sage Green (only for "Flow State" particles).
*   **Texture:** NOT realistic grainy noise (too busy). Use widely spaced, soft gradients to imply sand ridges.
*   **Animation:** Styles should simulate fluid dynamics. Sand doesn't "break"; it *flows* around the finger.

---

## 5. Sound & Haptics

*   **Audio Engine:**
    *   *Base Layer:* Low-volume ambient organic drone (wind or distant stream).
    *   *Interaction Layer:* Granular synthesis sound—like salt pouring or silk rubbing on paper.
    *   *Pitch Mapping:* Vertical screen position controls pitch (High = Top, Low = Bottom) subtly.
*   **Haptics:** 
    *   Uses system "Light" impacts. 
    *   Frequency of haptics matches the "grain" distance. Slow movement = distinct ticks. Fast movement = smooth buzz (or fade out).

---

## 6. Session Modes (The Contexts)

1.  **"Just a Moment" (30s - 1m):**
    *   Quick reset. Pre-placed stones. User just clears/rakes around them. Use for panic button situations.
2.  **"Deep Grounding" (Open-ended):**
    *   Blank canvas. User places stones first, then rakes. Best for evening wind-down.
3.  **"Guided Flow" (Audio-led):**
    *   Voiceover: *"Find a space in the center... draw a circle slowly... breathe in..."*

---

## 7. Progression (States, Not Stats)

*   **Rationale:** Gamification (XP, Levels) triggers dopamine/craving loops, which is anti-calm.
*   **Unlockable "Elements":**
    *   After 5 sessions: Unlock "Black Sand" mode.
    *   After 10 sessions: Unlock "River Stones" (smooth vs rough).
    *   *Framing:* "You have discovered a new texture" (Discovery, not Achievement).

---

## 8. Accessibility & Safety

*   **Motion Sensitivity:** Option to disable parallax/tilt.
*   **One-Handed:** All controls (tool switching) available at the bottom thumb arc.
*   **Trigger Safety:** No insect-like movements or patterns (trypophobia awareness in sand texture).

---

## 9. Technical Implementation (High-Level)

**Stack:** React Native (Expo) + Skia (optional) or SVG + Reanimated.

**Proposed Architecture (SVG Approach - Lightweight):**
1.  **State:** `paths` array containing SVG Path data strings.
2.  **Input:** `PanResponder` or `GestureDetector` tracks touches.
3.  **Processing:**
    *   On `move`: Calculate velocity.
    *   If `velocity > threshold`, ignore or fade opacity.
    *   Append point to `currentPath`. Apply `catmullRom` smoothing to points to generate `d` string live.
4.  **Rendering:** `<Svg>` surface. `<Path>` elements with `strokeLinecap="round"`.
    *   Shadow duplication: Render each path twice—once in dark offset (shadow) and once in light color (ridge)—to create 3D depth.
5.  **Performance:** `useMemo` for completed paths. Only re-render the `currentPath` actively.

**Optimization:**
*   Limit total paths to ~50 (auto-fade old ones if needed or merge to bitmap if Skia).
*   Throttle frame rate to 60fps locked.
