const Joi = require('joi');

const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 4, name: 'course3'},
    { id: 4, name: 'course4'},
];

app.get('/', (req, res) => {
    res.send('Hello world!!')
});


app.get('/api/courses',(req,res) => {
    res.send(courses);

});

app.get('/api/courses/:id', (req, res) => {

    res.send(req.params)
});

//HTTP POST REQUEST
app.post('/api/courses', (req,res) => {

    //{error } object disructure syntax
    const {error} =validateCourse(req.body);
    //If invalid, return 400 - Bad request
    if (error){
        res.status(400).send(error.details[0].message);
        return; 
    } 
    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course)
});
// HTTP PUT REQUEST
app.put('/api/cousres/:id', (req, res) => {
    
    //look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    //If not exits , return 404
    if (!course) res.status(404).send('The couse with the given ID was not found')

    //Validate
   
   const {error} =validateCourse(req.body);
    //If invalid, return 400 - Bad request
    if (error){
        res.status(400).send(error.details[0].message);
        return;  
    } 
    course.name = req.body.name;
    res.send(course); 

});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(req.body, schema);
}
app.delete('/api/couses/:id', (res, req) =>{
    //look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    //If not exits , return 404
    if (!course) {
        res.status(404).send('The couse with the given ID was not found')
        return;
    }
    const index = courses.indexOf(course);
    courses.splice(index, 1)
    // return course
    res.send(course)
    
});


//nodemon index.js
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`listen in ${port} ...`))