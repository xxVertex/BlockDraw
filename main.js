const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const blocksContainer = document.getElementById("blocks");
const addBlockBtn = document.getElementById("addBlock");

let activeInput = null;
let draggedBlock = null;

/* =========================
   Mouse coordinates tooltip
========================= */
const coord = document.createElement("div");
coord.className =
  "fixed bg-black text-white text-xs px-2 py-1 rounded pointer-events-none z-50";
coord.style.display = "none";
document.body.appendChild(coord);

canvas.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.round(e.clientX - rect.left);
  const y = Math.round(e.clientY - rect.top);

  coord.textContent = `x:${x} y:${y}`;
  coord.style.left = e.clientX + 8 + "px";
  coord.style.top = e.clientY + 8 + "px";
  coord.style.display = "block";
});

canvas.addEventListener("mouseleave", () => {
  coord.style.display = "none";
});

/* =========================
   Canvas click → set input
========================= */
canvas.addEventListener("click", e => {
  if (!activeInput) return;

  const rect = canvas.getBoundingClientRect();
  const x = Math.round(e.clientX - rect.left);
  const y = Math.round(e.clientY - rect.top);

  if (activeInput.classList.contains("x")) {
    activeInput.value = x;
  } else {
    activeInput.value = y;
  }

  drawAll();
});

/* =========================
   Add block
========================= */
addBlockBtn.onclick = () => {
  const block = document.createElement("div");
  block.className = "bg-gray-800 p-3 rounded relative";
  block.draggable = true;

  block.innerHTML = `
    <div class="drag-handle cursor-move text-gray-400 mb-2 select-none">
      ☰ Drag
    </div>

    <button class="delete absolute top-1 right-1 text-red-400">✕</button>

    <select class="shape w-full mb-2 bg-gray-700 p-1 rounded">
      <option value="line">Line</option>
      <option value="rect">Rectangle</option>
      <option value="square">Square</option>
      <option value="circle">Circle</option>
      <option value="polygon">Polygon</option>
    </select>

    <div class="grid grid-cols-2 gap-2 mb-2">
      <input class="x1 x bg-gray-700 p-1 rounded" placeholder="x1">
      <input class="y1 y bg-gray-700 p-1 rounded" placeholder="y1">
      <input class="x2 x bg-gray-700 p-1 rounded" placeholder="x2">
      <input class="y2 y bg-gray-700 p-1 rounded" placeholder="y2">
    </div>

    <div class="flex gap-2">
      <input type="color" class="color">
      <input type="number" class="thickness w-20 bg-gray-700 p-1 rounded" placeholder="px">
    </div>
  `;

  blocksContainer.appendChild(block);
  setupBlock(block);
  updateInputs(block);
  drawAll();
};

/* =========================
   Block logic
========================= */
function setupBlock(block) {
  const handle = block.querySelector(".drag-handle");

  handle.addEventListener("mousedown", () => {
    block.draggable = true;
  });

  block.addEventListener("dragstart", () => {
    draggedBlock = block;
    block.classList.add("opacity-50");
  });

  block.addEventListener("dragend", () => {
    draggedBlock = null;
    block.classList.remove("opacity-50");
  });

  block.addEventListener("dragover", e => e.preventDefault());

  block.addEventListener("drop", e => {
    e.preventDefault();
    if (!draggedBlock || draggedBlock === block) return;

    const blocks = [...blocksContainer.children];
    const from = blocks.indexOf(draggedBlock);
    const to = blocks.indexOf(block);

    if (from < to) {
      blocksContainer.insertBefore(draggedBlock, block.nextSibling);
    } else {
      blocksContainer.insertBefore(draggedBlock, block);
    }

    drawAll();
  });

  block.querySelector(".delete").onclick = () => {
    block.remove();
    drawAll();
  };

  block.querySelector(".shape").onchange = () => {
    updateInputs(block);
    drawAll();
  };

  block.querySelectorAll("input").forEach(input => {
    input.oninput = drawAll;
    input.onfocus = () => (activeInput = input);
    input.onblur = () => (activeInput = null);
  });
}

/* =========================
   Shape input logic
========================= */
function updateInputs(block) {
  const shape = block.querySelector(".shape").value;
  const x2 = block.querySelector(".x2");
  const y2 = block.querySelector(".y2");

  x2.style.display = "block";
  y2.style.display = "block";

  if (shape === "square" || shape === "circle") {
    x2.placeholder = shape === "square" ? "size" : "radius";
    y2.style.display = "none";
  } else if (shape === "rect") {
    x2.placeholder = "width";
    y2.placeholder = "height";
  } else if (shape === "polygon") {
    x2.placeholder = "radius";
    y2.placeholder = "sides";
  } else {
    x2.placeholder = "x2";
    y2.placeholder = "y2";
  }
}

/* =========================
   Draw all shapes
========================= */
function drawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  document.querySelectorAll("#blocks > div").forEach(block => {
    const shape = block.querySelector(".shape").value;
    const x1 = +block.querySelector(".x1").value;
    const y1 = +block.querySelector(".y1").value;
    const x2 = +block.querySelector(".x2").value;
    const y2 = +block.querySelector(".y2")?.value;
    const color = block.querySelector(".color").value;
    const thickness = +block.querySelector(".thickness").value || 1;

    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.beginPath();

    if (shape === "line") {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    }

    if (shape === "rect") {
      ctx.rect(x1, y1, x2, y2);
    }

    if (shape === "square") {
      ctx.rect(x1, y1, x2, x2);
    }

    if (shape === "circle") {
      ctx.arc(x1, y1, x2, 0, Math.PI * 2);
    }

    if (shape === "polygon") {
      const sides = Math.max(3, y2 || 3);
      for (let i = 0; i <= sides; i++) {
        const a = (i / sides) * Math.PI * 2;
        const px = x1 + Math.cos(a) * x2;
        const py = y1 + Math.sin(a) * x2;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
    }

    ctx.stroke();
  });
}