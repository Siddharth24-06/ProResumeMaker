import jsonServer from 'json-server'
import cors from 'cors'

const { create, defaults, router } = jsonServer

const server = create()
const middlewares = defaults()
const routes = router('db.json')

server.use(cors())        // ✅ enable CORS
server.use(middlewares)
server.use(routes)
server.listen(5000, () => {
  console.log('JSON Server running at http://localhost:5000')
})
