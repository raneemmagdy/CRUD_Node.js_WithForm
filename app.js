const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path=require('path')
const app = express()
app.use(express.static(path.join(__dirname,'/public')))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
mongoose.connect("mongodb://0.0.0.0:27017/students")
.then(()=>{
    console.log('connected')
}).then(()=>{
  // updatestudent()
  //updatematerial()
   //updatelevel()
}).catch((err)=>{
    console.log(err)
})
const studentSchema = new mongoose.Schema({
    name: String,
    level:Number,
    email: String
})
const Student = mongoose.model('Student', studentSchema)

const levelSchema = new mongoose.Schema({
    level_number: Number,
    semester_number:Number,
    subject_number: Number
})
const Level = mongoose.model('level',levelSchema)
const materialSchema = new mongoose.Schema({
    author_name: String,
    page_number:Number,
    book_name: String
})
const Material = mongoose.model('material',materialSchema)

app.get('/newstudent',(req,res)=>{
   
    res.sendfile('./public/index.html')

})

app.post('/student', (req, res) => {
    let student = new Student(req.body);
    student.save()
        .then(doc => {
            res.send("saved !!")
            console.log("saved!")
        })
        .catch(err => console.log(err))
})

app.get('/students',async(req,res)=>{
    let allstudents=await Student.find()
    res.status(200)
    res.json(allstudents)
})

const updatestudent=async()=>{
    
    await Student.updateOne({email:"raneem1023@gmail.com"},{$set:{level:"3"}})
    console.log("changed !")

}
app.patch('/student/:id', async(req,res)=>{
    
    await Student.updateOne({_id:req.params.id},req.body)
    let newstu=await Student.findOne({_id: req.params.id})
    res.status(200)
    res.json(newstu)

})

///////////////////////////////////////////////////////////////////////////////////////////
app.get('/newlevel',(req,res)=>{
   
    res.sendfile('./public/index2.html')

})
app.post('/level', (req, res) => {
    let level = new Level(req.body);
    level.save()
        .then(doc => {
            res.send("saved level !!")
            console.log("saved level!")
        })
        .catch(err => console.log(err))
})

app.get('/levels',async(req,res)=>{
    let alllevels=await Level.find()
    res.status(200)
    res.json(alllevels)
})

const updatelevel=async()=>{
    
    await Level.updateOne({_id:"6438611146d43f6d4a5d821f"},{$set:{subject_number:"10"}})
    console.log("changed !")

}
app.patch('/level/:id', async(req,res)=>{
    
    await Level.updateOne({_id:req.params.id},req.body)
    let newlvl=await Level.findOne({_id: req.params.id})
    res.status(200)
    res.json(newlvl)

})
//////////////////////////////////////////////////////////////////////////////////////
app.get('/newmaterial',(req,res)=>{
   
    res.sendfile('./public/index3.html')

})
app.post('/material', (req, res) => {
    let material = new Material(req.body)
    material.save()
        .then(doc => {
            res.send("saved in materials !!")
            console.log("saved in materials!")
        })
        .catch(err => console.log(err))
})

app.get('/materials',async(req,res)=>{
    let allmaterials=await Material.find()
    res.status(200)
    res.json(allmaterials)
})
app.patch('/material/:id', async(req,res)=>{
    
    await Material.updateOne({_id:req.params.id},req.body)
    let newmat=await Material.findOne({_id: req.params.id})
    res.status(200)
    res.json(newmat)

})

const updatematerial=async()=>{
    
    await Material.updateOne({_id:"645a845b0ac3c4297c732407"},{$set:{book_name:"Dart"}})
    console.log("changed !")

}

app.listen(8000, (res) => {
    console.log('server is running....')
})







