import { server } from './app.js'
import { ChatBot } from './services/chatBot.js'

import './endpoints/index.js'

async function main() {
  // await ChatBot.instance.init()

  server.listen(3000, () => {
    console.log('listening on http://localhost:3000')
  })
}

main()
