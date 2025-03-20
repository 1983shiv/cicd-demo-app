import express from "express"
const PORT = 3000

const app = express();

app.get("/", (req, res) => {
    res.send({message: "Hello from CI CD Demo App"})
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})