// src/server.js
const Server = require("boardgame.io/server").Server;
const WordJellyGame = require("./GameLogic").WordJellyGame;
const server = Server({ games: [WordJellyGame] });
server.run(8000);