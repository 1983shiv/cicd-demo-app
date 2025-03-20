import express from "express"
const PORT = 3000

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello from CI CD Demo App")
})

app.post("/api/hello", (req, res) => {
    const name = req.query.name || "Shiv"
    res.json({ message : `Hello ${name}`})
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})