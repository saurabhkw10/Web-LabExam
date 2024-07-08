const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/product')
  .then(() => console.log('Connected to MongoDB...!'));

  const Schema = mongoose.Schema;

  const usersSchema = new Schema({
    empid : Number, name : String, email : String, pass : String
  });
  const productsSchema = new Schema({
    id:Number, name:String, cat:String, rating:String, price:Number
  });

  const usersModel = mongoose.model('user', usersSchema);
  const productsModel = mongoose.model('product', productsSchema);

  app.get('/users',async(req,res)=>{
    try{
    let usersData = await usersModel.find({})
    res.send(usersData);
    }catch(e){
        console.log(e);
    }
  })

  app.get('/products',async(req,res)=>{
    try{
        let productsData =await productsModel.find({});
        res.send(productsData);
    }catch(e){console.log(e);}
  })

  app.post('/users',async (req,res)=>{
    try{
    let instance =new usersModel(req.body)
    await instance.save();
    res.send({message:"data posted"});
    }catch(e){
        console.log(e);
    }
  })

  app.post('/products',async (req,res)=>{
    try{
        let instance =new productsModel(req.body)
        await instance.save();
        res.send({message:"data posted"});
        }catch(e){
            console.log(e);
        }
  })

  app.delete('/users/:id',(req,res)=>{
    usersModel.findByIdAndDelete(req.params.id,(err,data)=>{
      if(err){
        console.log(err);
      }
      else{
        res.send(data);
      }
    })
  })

  app.delete('/products/:id',(req,res)=>{
      usersModel.findByIdAndDelete(req.params.id,(err,data)=>{
        if(err){
          console.log(err);
        }
        else{
          res.send(data);
        }
      })
    })


app.listen(1819,()=>{console.log("server connected")})






