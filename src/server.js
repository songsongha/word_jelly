// src/server.js
const { Server, Origins } = require('boardgame.io/server');
const WordJellyGame = require("./GameLogic").WordJellyGame;

const server = Server({
  // Provide the definitions for your game(s).
  games: [WordJellyGame],

  origins: [
    // // Allow your game site to connect.
    // 'https://www.mygame.domain',

    // Allow localhost to connect, except when NODE_ENV is 'production'.
    Origins.LOCALHOST_IN_DEVELOPMENT
  ],
});

server.run(8000);