const express = require('express');
 const app = express();
 const PORT = 8000;
 const cors = require('cors');
 const pool = require('./db');
const Joi = require('joi')
const bodyParser = require('body-parser');

const courses = [
    { id:1 , name: "course1"} ,
    { id:2 , name: "course2"} ,
    { id:3 , name: "course3"}
];

//middleware
app.use(cors());
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


///////////////    READ  \\\\\\\\\\\\\\\\\\\\\\\\\
///////////////    READ  \\\\\\\\\\\\\\\\\\\\\\\\\
app.get("/hello",(req,res)=>{
    const userAge = req.query['age']
    res.send("hello world " + userAge)
})

app.get("/count/:id",(req,res)=>{
    res.send("count number :" + req.params.id)
})


app.get("/courses/:id",(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found !');
    res.send(course);
})
///////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\


///////////////    CREATE  \\\\\\\\\\\\\\\\\\\\\\\\\
///////////////    CREATE  \\\\\\\\\\\\\\\\\\\\\\\\\
app.post("/hellopost",(req,res)=>{
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    res.send("your first name is: " + firstname + " and your lastname is : " + lastname)
})


app.post('/coursespost',(req,res) =>{

    const schema = {
        name : Joi.string().min(3).required(),
        age : Joi.number().required()
    }
    const result = Joi.validate(req.body,schema)   
        
    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return
    }

    const course = {
        id : courses.length + 1,
        name : req.body.name,
        age : req.body.age
    }


    courses.push(course)
    res.send('last course was added with the id : ' + course.id + " and the name under :" + course.name+'and he is ' + course.age + 'years old')
})

 /// using get inside POST block just to verify :
app.get('/coursesget', (req,res)=>{
    res.send(courses)
})
///////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\


///////////////    UPDATE  \\\\\\\\\\\\\\\\\\\\\\\\\
///////////////    UPDATE  \\\\\\\\\\\\\\\\\\\\\\\\\
app.put('/coursesget/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('The course with the given ID was not found !');

    const schema = {
        name : Joi.string().min(3).required(),
    }
    const result = Joi.validate(req.body,schema)   
        
    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return
    }


    course.name = req.body.name
    res.send(course)

})
///////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\


///////////////    DELETE  \\\\\\\\\\\\\\\\\\\\\\\\\
///////////////    DELETE  \\\\\\\\\\\\\\\\\\\\\\\\\
app.delete('/coursesget/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('The course with the given ID was not found !');

    const index = courses.indexOf(course)
    courses.splice(index,1)

    res.send(course)
})
///////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\


   // ROUTES //

   // create a todo //

   // get all todos //

   // get a todo  //
   
   // update a todo //

   // delete a todo //



app.listen(PORT,()=>{
    console.log('server launching in port ' + PORT + ' !!')
})