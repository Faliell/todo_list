const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const _ = require("lodash")

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set('view engine', 'ejs');


mongoose.connect("mongodb+srv://Faliell:cemkih-mazrAx-ribwy4@cluster0.nnnxc.mongodb.net/todolistDB")


const itemsSchema = new mongoose.Schema({
  name:String
})

const Item = mongoose.model("Item", itemsSchema)

const item1 = new Item({
  name:"Welcome to To Do List!"
})
const item2 = new Item({
  name:"+ for add"
})
const item3= new Item({
  name:"<-- for delete"
})

const itemsDefault = [item1, item2, item3]

const listSchema = new mongoose.Schema({
  name:String,
  items:[itemsSchema]
})

const List = mongoose.model("List", listSchema)


app.get("/", (req, res)=> {

  Item.find({},(err, itemsFound)=> {

    if (itemsFound.length === 0 ) {
      Item.insertMany(itemsDefault, (err)=> err ? console.log(err): console.log("Sucess in DB"))
      res.redirect("/")
    }
    else {
    res.render("list",{listTitle:"Today", newListItems:itemsFound})
    }
  })
})

app.get("/:customListName", (req,res)=> {
  const customListName = _.capitalize(req.params.customListName)

  List.findOne({name: customListName}, (err, foundList)=>{
    if(!err){
      if (foundList){
        res.render("list",{listTitle:foundList.name, newListItems:foundList.items})
      }
      else {
        const list = new List({
          name: customListName,
          items: itemsDefault,
        })
        list.save()
        res.redirect("/" + customListName )

      }
    }
  })

})

app.post("/", (req,res)=> {

  const listName = req.body.list
  const itemName = new Item({
    name:req.body.newItem
  })

  if(listName === "Today") {
    itemName.save()
    res.redirect("/")
  }
  else{
    List.findOne({name:listName}, (err, foundList)=> {
      foundList.items.push(itemName)
      foundList.save()
      res.redirect("/"+listName)
    })
  }
})

app.post("/delete", (req,res)=> {
  const checkedItemId = req.body.checkbox
  const listName = req.body.listName

  if(listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, (err)=> err?console.log(err): res.redirect("/"))
  }
  else{
    List.findOneAndUpdate({name:listName},{$pull: {items: {_id: checkedItemId}}}, (err, foundList)=> {
      if(!err){
        res.redirect("/"+listName)
      }
    })
  }
})



app.get("/about",(req, res)=> {
  res.render("about")
})


app.listen(process.env.PORT || 3000, ()=> console.log("Server working in port 3000"))
