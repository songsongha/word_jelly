// src/server.js
import path from 'path'
import serve from 'koa-static'
const { Server, Origins } = require('boardgame.io/server')
const WordJellyGame = require("./GameLogic").WordJellyGame

const server = Server({
  // Provide the definitions for your game(s).
  games: [WordJellyGame],

  origins: [
    'https://young-hamlet-81046.herokuapp.com/', Origins.LOCALHOST_IN_DEVELOPMENT
  ],
});

const PORT = process.env.PORT || 8000;

// Build path relative to the server.js file
const frontEndAppBuildPath = path.resolve(__dirname, '../build');
server.app.use(serve(frontEndAppBuildPath))

server.run(PORT, () => {
  server.app.use(
    async (ctx, next) => await serve(frontEndAppBuildPath)(
      Object.assign(ctx, { path: 'index.html' }),
      next
    )
  )
})






