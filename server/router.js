const express=require("express")
const router=express.Router()


//route handler sends back message once we hit the home page
router.get("/",(req,res)=>{
res.send("server is up ")
//res.sendFile(__dirname + "/index.html") -> we could also send back a stlyed html page
})

module.exports=router;