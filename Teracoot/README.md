# Teracoot

A small browser-based 3D terrain game prototype built with HTML, CSS, and JavaScript using Three.js.

## Run locally

Because `main.js` is loaded as an ES module, run it through a local web server instead of opening `index.html` directly.

### Option 1: Python

```bash
python3 -m http.server 8000
```

Then open:

[http://127.0.0.1:8000/](http://127.0.0.1:8000/)

### Option 2: VS Code Live Server

Open the folder in VS Code and run `Open with Live Server` on `index.html`.

## Upload to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Files

- `index.html` - page structure and HUD
- `style.css` - UI styling
- `main.js` - game logic and rendering
