3D Portfolio (Alireza-style) — Setup & Install

Quick steps to make the full three.js-based immersive site work locally.

1) Open a plain Windows PowerShell or CMD (not MSYS/WSL wrapper) and run:

```bash
cd "C:\Users\hp\OneDrive\Desktop\portfolio\3d-portfolio"
npm install three @react-three/fiber @react-three/drei --legacy-peer-deps
```

2) Verify packages installed:

```bash
npm ls three @react-three/fiber @react-three/drei --depth=0
dir node_modules\@react-three
```

3) Add a `.glb` model into `public/models/scene.glb` (create the folder). Free sources:
- Sketchfab (filter for downloadable, CC0/CC-BY)
- Poly Haven / AmbientCG (some assets)
- Khronos glTF Sample Models (https://github.com/KhronosGroup/glTF-Sample-Models)

4) Enable the three scene:
- Import `ThreeScene` in `src/App.jsx` and render it as the background element (replace the `canvas-bg` placeholder).

Example import and usage in `src/App.jsx` (after install):

```js
import ThreeScene from './ThreeScene';

export default function App() {
  return (
    <div className="app-shell">
      <ThreeScene />
      <div className="overlays"> ... </div>
    </div>
  );
}
```

5) Run dev server:

```bash
npm run dev
```

If `npm install` silently fails in this environment, capture output to a file and share it:

```bash
npm install three @react-three/fiber @react-three/drei --legacy-peer-deps > install-log.txt 2>&1
```

If you want, I can patch `src/App.jsx` to import `ThreeScene` and wire the `.glb` automatically — but it will produce Vite import errors until the packages are installed. Tell me if you'd like me to do that now.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
