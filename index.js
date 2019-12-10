const Joi  = require('joi');
const express = require("express");
const app =  express();

app.use(express.json());

const list = [
    {id:1,name:"1st Obj"},
    {id:2,name:"2nd Obj"},
    {id:3,name:"3rd Obj"}
]
app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.get('/list',(req,res)=>{
    res.send(list);
});

app.get('/list/:id',(req,res)=>{
    const obj = list.find(obj=>obj.id===parseInt(req.params.id));
    if(!obj) res.status(404).send("Obj not found");
    else res.send(obj);
})

app.post("/list",(req,res)=>{
    const {error} = validateJSON(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const obj = {
        id:req.body.id,
        name:req.body.name
    }
    list.push(obj);
    res.send(obj);
});

app.put('/list/:id',(req,res)=>{
    const obj = list.find(obj=>obj.id===parseInt(req.params.id));
    if(!obj) res.status(404).send("Obj not found");

    const {error} = validateJSON(req.body); //As good as validateJSON(req.body).error
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    obj.name=req.body.name;
    res.send(obj);
})

function validateJSON(obj){
    const schema = Joi.object().keys({
        id:Joi.number().optional(),
        name: Joi.string().min(3).required()
        });
    return Joi.validate(obj,schema);
}

const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`Listening on port ${port}`));