import { server } from './infra/server'

server.listen(process.env.PORT, () => {
  console.log('Server running 🔥')
  console.log(`Server listen http://localhost:${process.env.PORT}`)
})
