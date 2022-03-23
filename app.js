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

app.listen(process.env.PORT || 3000, ()=> console.log("Server working in port 3000"))
