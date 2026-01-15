# Heritage Collection

An immersive 3D infinite scroll gallery built with Next.js, featuring smooth wave animations and interactive card pop-outs.

![Heritage Collection](https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=400&fit=crop)

## ✨ Features

- **Infinite Scroll** – Seamless looping gallery with no visible wrap-around
- **3D Perspective** – Cards arranged along a diagonal axis with depth
- **Mexican Hat Wave** – Smooth dip → peak → dip animation on scroll
- **Velocity-Responsive** – Faster scrolling = more dramatic wave height
- **Card Pop-Out** – Click any card to view it in focus with blurred background
- **Matrix Text Reveal** – Hover effect with scrambling text animation
- **Gradient Opacity Fading** – Cards smoothly fade at edges for seamless looping

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the gallery.

## 🎛️ Configuration

Key parameters in `src/components/ScrollPlanes.tsx`:

| Parameter | Value | Description |
|-----------|-------|-------------|
| `spacing` | 390 | Distance between cards |
| `baseAngle` | -55° | Trajectory angle into Z-space |
| `perspective` | 1500px | 3D depth exaggeration |
| `fadeStart` | 2000 | Offset where fade begins |
| `fadeEnd` | 2800 | Offset where cards become invisible |
| `baseWaveHeight` | 180 | Minimum wave amplitude |
| `velocityMultiplier` | 12 | How much speed affects wave |

## 🎨 Wave Animation

The gallery uses a **Mexican Hat Wavelet** formula for the wave effect:

```
waveShape = (1 - t²) × exp(-t²/2)
```

This creates:
- **Dips** on either side of center (negative values)
- **Peak** at center (positive value)
- Smooth return to baseline

## 🖼️ Pop-Out Lightbox

Click any card to:
1. Animate it to the center of the screen
2. Blur and dim the background
3. Display title and sequence metadata
4. Press `Esc` or click outside to close

## 🛠️ Tech Stack

- **Next.js 14** – React framework
- **TypeScript** – Type safety
- **Tailwind CSS** – Styling
- **requestAnimationFrame** – Smooth 60fps animations
- **CSS 3D Transforms** – Hardware-accelerated perspective

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx        # Main page
│   └── globals.css     # Global styles
└── components/
    └── ScrollPlanes.tsx # The 3D gallery component
```

## 📝 License

MIT
