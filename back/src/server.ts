import express from 'express'
import router from './routes/index'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(router)

app.listen(PORT, () => {
    console.log(`Teu server ta rodando ai chefe, toma o link: https://localhost:${PORT}`)
})