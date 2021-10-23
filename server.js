const express  =require('express');
const cors = require('cors');
const instance = express();
instance.use(express.urlencoded({extended:false}));
instance.use(express.json());
let port = process.env.PORT || 9087;

let data = [
    {id:1,name:'A'},
    {id:2,name:'B'},
    {id:3,name:'C'},
    {id:4,name:'E'},
    {id:5,name:'F'}
];

instance.get('/api/data',(req,resp)=>{
    resp.status(200).send({message:'Sending the Data', record:data});
});

instance.post('/api/data',(req,resp)=>{
    data.push(req.body);
    resp.status(200).send({message:'Sending the Data', record:data});
});

instance.listen(port,()=>{
    console.log(`server started on port ${port}`);
});