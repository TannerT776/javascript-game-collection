// Game Collection App
// This project demonstrates JavaScript, DOM manipulation,
// form validation, arrays, filtering, and localStorage.

// Get elements from the page.
const gameForm = document.querySelector("#gameForm");
const titleInput = document.querySelector("#title");
const platformInput = document.querySelector("#platform");
const statusInput = document.querySelector("#status");
const searchInput = document.querySelector("#searchInput");
const filterStatus = document.querySelector("#filterStatus");
const gameList = document.querySelector("#gameList");
const clearGamesButton = document.querySelector("#clearGames");

// Load saved games or start with an empty array.
let games = getGamesFromStorage();

// Save games to localStorage.
function saveGamesToStorage() {
  localStorage.setItem("gameCollection", JSON.stringify(games));
}

// Get games from localStorage.
function getGamesFromStorage() {
  const storedGames = localStorage.getItem("gameCollection");

  if (storedGames) {
    return JSON.parse(storedGames);
  }

  return [];
}

// Create a new game object.
function createGame(title, platform, status) {
  return {
    id: Date.now(),
    title: title,
    platform: platform,
    status: status
  };
}

// Add a new game to the collection.
function addGame(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const platform = platformInput.value;
  const status = statusInput.value;

  if (title === "" || platform === "" || status === "") {
    alert("Please fill out all fields.");
    return;
  }

  const newGame = createGame(title, platform, status);

  games.push(newGame);
  saveGamesToStorage();
  renderGames();

  gameForm.reset();
}

// Remove a game by ID.
function removeGame(id) {
  games = games.filter(function (game) {
    return game.id !== id;
  });

  saveGamesToStorage();
  renderGames();
}

// Clear the entire collection.
function clearAllGames() {
  const confirmed = confirm("Are you sure you want to clear all games?");

  if (confirmed) {
    games = [];
    saveGamesToStorage();
    renderGames();
  }
}

// Filter games based on search and status.
function getFilteredGames() {
  const searchText = searchInput.value.toLowerCase();
  const selectedStatus = filterStatus.value;

  return games.filter(function (game) {
    const matchesSearch = game.title.toLowerCase().includes(searchText);
    const matchesStatus = selectedStatus === "All" || game.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });
}

// Create HTML for one game card.
function gameTemplate(game) {
  return `
    <article class="game-item">
      <h3>${game.title}</h3>
      <p><strong>Platform:</strong> ${game.platform}</p>
      <p><strong>Status:</strong> ${game.status}</p>
      <button class="remove-btn" data-id="${game.id}">Remove</button>
    </article>
  `;
}

// Display games on the page.
function renderGames() {
  const filteredGames = getFilteredGames();

  if (filteredGames.length === 0) {
    gameList.innerHTML = "<p>No games found.</p>";
    return;
  }

  gameList.innerHTML = filteredGames.map(gameTemplate).join("");
}

// Handle clicks on remove buttons.
function handleGameListClick(event) {
  if (event.target.classList.contains("remove-btn")) {
    const id = Number(event.target.dataset.id);
    removeGame(id);
  }
}

// Event listeners.
gameForm.addEventListener("submit", addGame);
searchInput.addEventListener("input", renderGames);
filterStatus.addEventListener("change", renderGames);
gameList.addEventListener("click", handleGameListClick);
clearGamesButton.addEventListener("click", clearAllGames);

// Render saved games when the page loads.
renderGames();
