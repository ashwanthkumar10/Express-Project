// const { error } = require('console')
const express = require('express')
const mongoose = require('mongoose')
const categories = require('./routes/categories')
const students = require('./routes/students')
const app = express()

mongoose.connect('mongodb://127.0.0.1/learningPlatform')
.then(()=>console.log('The Connection to database is Successful'))
.catch((err)=>console.error('Couldnt connect to database',err))

app.use(express.json())
app.use('/api/categories',categories)
app.use('/api/students',students)
app.use('/api/courses',courses)



const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`The Server is running on ${port}.....`);
    
})