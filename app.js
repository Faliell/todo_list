const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.get("/", (req, res)=> {
var today = new Date()
var currentDay = today.getDay()

if (currentDay === 6 || currentDay === 0) {
  res.send("<h1>weekend</h1>")
}
else {
  res.sendFile(__dirname + "/index.html")
}
})

app.listen(3000 || process.env.PORT, ()=> console.log("Server working in port 3000"))
