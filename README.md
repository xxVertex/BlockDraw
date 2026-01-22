# 🎨 Block-Based Drawing Game

A **block-based drawing application** built with **HTML, JavaScript, Canvas API, and Tailwind CSS**.

The project lets users create drawings by adding and configuring **visual blocks**, similar to visual programming tools like Blockly or Scratch — but focused on **geometry and drawing**.

---

## ✨ Features

* 🧱 **Modular blocks** for each shape
* 🔀 **Drag & drop blocks** to reorder drawing layers
* 🖱️ **Click canvas to set coordinates**
* 📍 **Live mouse coordinates** shown on hover
* 🧮 Supports multiple shapes:

  * Line
  * Rectangle
  * Square
  * Circle
  * Polygon (N sides)
* 🎨 Color & stroke thickness controls
* ❌ Delete blocks at any time
* ⚡ Real-time redraw of canvas

---

## 🧠 How It Works (High Level)

1. Each **block** represents a shape
2. Blocks store:

   * Shape type
   * Coordinates
   * Color
   * Stroke thickness
3. The **order of blocks** determines the **draw order**
4. Every change triggers a full redraw of the canvas

---

## 🖼️ Canvas Interaction

### Mouse hover

* Shows live `(x, y)` coordinates next to the cursor

### Click-to-set coordinates

1. Click on an input field (`x1`, `y1`, etc.)
2. Click anywhere on the canvas
3. The coordinate is automatically filled

---

## 🧱 Block System

Each block includes:

* Shape selector
* Coordinate inputs (context-aware)
* Color picker
* Stroke thickness
* Drag handle
* Delete button

### Input behavior by shape

| Shape     | Required Inputs       |
| --------- | --------------------- |
| Line      | x1, y1, x2, y2        |
| Rectangle | x1, y1, width, height |
| Square    | x1, y1, size          |
| Circle    | x1, y1, radius        |
| Polygon   | x1, y1, radius, sides |

Unused inputs are automatically hidden.

---

## 🧰 Tech Stack

* **HTML5**
* **JavaScript (Vanilla)**
* **Canvas API**
* **Tailwind CSS (CDN)**

No frameworks, no build tools.

---

## 📁 Project Structure

```
/
├── index.html
├── main.js
└── README.md
```

---

## 🚀 Getting Started

1. Clone the repository

```bash
git clone https://github.com/xxVertex/BlockDraw.git
```

2. Open `index.html` in your browser
   (No server required)

---

## 🛠️ Future Improvements (Planned)

* Fill vs Stroke toggle
* Undo / Redo
* Export canvas as PNG
* Save / load drawings (JSON)
* Snap-to-grid
* True Blockly-style drag blocks

---

## 📜 License

This project is open-source and free to use for learning and experimentation.

---

## 🙌 Author

Built as a **learning + experimentation project** to explore:

* Canvas rendering
* Visual programming concepts
* UI/UX interaction design