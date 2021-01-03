const express=require("express")
const path=require("path");
// const { static } = require("express");

const app=express();

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(path.dirname(process.mainModule.filename),"public")))

app.get("/",(req,res,next)=>{
    res.render("board");
})
app.listen("3030")