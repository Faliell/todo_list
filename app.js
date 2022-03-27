const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")

console.log()

const app = express()

const items = ["Buy food","Cook food","Eat food"]
const workItems = []

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.set('view engine', 'ejs');

app.get("/", (req, res)=> {

const day =date.getDate()

res.render("list",{listTitle:day, newListItems:items})
})

app.post("/", (req,res)=> {
  const item = req.body.newItem

  if(req.body.list === "Work") {
    workItems.push(item)
    res.redirect("/work")
  }
  else{
  items.push(item)
  res.redirect("/")
}

})

app.get("/work",(req, res)=> {
  res.render("list",{listTitle:"Work List", newListItems:workItems})
  const item = res.body.newItem
  workItems.push(item)
  re.redirect("/work")
})

app.get("/about",(req, res)=> {
  res.render("about")
})


app.listen(process.env.PORT || 3000, ()=> console.log("Server working in port 3000"))
