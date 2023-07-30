const express=require("express");
const app=express();
const cors=require("cors");
const bodyparser=require("body-parser")
app.use(bodyparser.json());
app.use(cors());
const mongoose=require("mongoose");
app.use(express.json());
const Result=require("./schema/studentschema");
const Resultmodel=mongoose.model("Result",Result);
app.post("/student/create",async(req,res)=>{
try{
  const newStudent= new Resultmodel (req.body);
  const hasib=await newStudent.save();
  res.status(201).send(hasib);
   }
catch(error){
res.status(201).send({message:error.message});
            }
})
app.get("/student",async(req,res)=>{
const resultm=await Resultmodel.find()
res.status(201).send(resultm);
})
app.put("/update/:id",async(req,res)=>{
try{
  const id=req.params.id;
  const updateresult=await Resultmodel.updateOne(
    {_id:id},{
      $set:{
        title:req.body.title,
        registration:req.body.registration
      }
    },{new:true}
  )
  if(updateresult){
    res.status(404).send({
      success:true,
      message:"updated succesfully",
      data:updateresult
    });
  }
  else{
    res.status(404).send({
      success:false,
      message:" was not updateupdated succesfully",
  });
      }
}
catch(error){
  res.status(404).send({message:error.message})
}
  }); 
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'))
  .catch(()=>{console.log("Disconnected")});
app.delete("/delete/:id",async(req,res)=>{ 
  try{
    const id=req.params.id;
    const product=await Resultmodel.deleteOne({_id:id})
    if(product){
      res.status(404).send({
        success:true,
        message:"deleted succesfully",
        data:product
      });
    }
    else{
      res.status(404).send({
        success:false,
        message:" was not deleted succesfully",    
    });
  }
  }catch(error){
    res.status(404).send({message:error.message})
  }
})
module.exports=app;
