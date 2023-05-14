import { server } from './app.js'

import './endpoints/index.js'

async function main() {
  server.listen(3000, () => {
    console.log('listening on http://localhost:3000')
  })
}

main()
