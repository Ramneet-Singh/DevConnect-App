const express = require("express")

const app = express()

const connectDB = require("./config/db")
//Connect to database
connectDB()

//init middleware
app.use(express.json())

app.get("/", (req, res) => res.send("API Running"))

app.use("/api/users", require("./routes/api/users"))
app.use("/api/posts", require("./routes/api/posts"))
app.use("/api/profile", require("./routes/api/profile"))
app.use("/api/auth", require("./routes/api/auth"))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`))
