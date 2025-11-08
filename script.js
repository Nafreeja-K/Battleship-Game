const grid = document.querySelector(".grid");
const resetBtn = document.getElementById("resetBtn");

const totalShips = 5;
let shipPositions = [];
let foundShips = 0;
let totalClicks = 0;

// Image resources
const shipImgSrc = "https://as2.ftcdn.net/jpg/03/37/76/23/1000_F_337762387_0vrLy71o000mmOoDBwZ6rxAfRcfbtSWj.jpg";  
const waterImgSrc = "https://www.madeintext.com/wp-content/uploads/2023/10/wave.png"; 

// Create grid
for (let i = 0; i < 16; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  const img = document.createElement("img");
  img.src = waterImgSrc;
  cell.appendChild(img);

  grid.appendChild(cell);
}

// Randomly place ships
function placeShips() {
  shipPositions = [];
  while (shipPositions.length < totalShips) {
    let pos = Math.floor(Math.random() * 16);
    if (!shipPositions.includes(pos)) {
      shipPositions.push(pos);
    }
  }
}

// Game logic
function handleCellClick(e) {
  const cells = document.querySelectorAll(".cell");
  const index = Array.from(cells).indexOf(e.target.closest(".cell"));

  if (!e.target.closest(".cell") || e.target.tagName === "IMG") return;

  totalClicks++;

  const img = e.target.querySelector("img");
  img.style.display = "block";

  if (shipPositions.includes(index)) {
    img.src = shipImgSrc;
    foundShips++;
  } else {
    img.src = waterImgSrc;
  }

  e.target.style.pointerEvents = "none"; // disable re-clicks

  // Win/Lose Conditions
  if (foundShips === totalShips && totalClicks <= 8) {
    setTimeout(() => alert("🎉 You Won!"), 200);
    disableBoard();
  } else if (totalClicks >= 8 && foundShips < totalShips) {
    setTimeout(() => alert("💥 You Lost!"), 200);
    disableBoard();
  }
}

function disableBoard() {
  document.querySelectorAll(".cell").forEach(cell => {
    cell.style.pointerEvents = "none";
  });
}

// Reset game
resetBtn.addEventListener("click", () => {
  const cells = document.querySelectorAll(".cell img");
  cells.forEach(img => (img.style.display = "none"));
  document.querySelectorAll(".cell").forEach(cell => {
    cell.style.pointerEvents = "auto";
  });
  foundShips = 0;
  totalClicks = 0;
  placeShips();
});

// Initialize
placeShips();
grid.addEventListener("click", handleCellClick);
