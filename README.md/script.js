const games = [];

function addGame() {
  const input = document.getElementById("gameInput");
  const gameName = input.value;

  if (gameName === "") {
    alert("Please enter a game name");
    return;
  }

  games.push(gameName);

  displayGames();

  input.value = "";
}

function displayGames() {
  const gameList = document.getElementById("gameList");

  gameList.innerHTML = "";

  games.forEach((game, index) => {
    const li = document.createElement("li");

    li.textContent = game;

    const removeButton = document.createElement("button");

    removeButton.textContent = "Remove";

    removeButton.onclick = function () {
      removeGame(index);
    };

    li.appendChild(removeButton);

    gameList.appendChild(li);
  });
}

function removeGame(index) {
  games.splice(index, 1);

  displayGames();
}

function clearGames() {
  games.length = 0;

  displayGames();
}
