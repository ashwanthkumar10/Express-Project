const express = require('express')
const {Student , validate } = require('../models/studentsModel') 

const router = express.Router()






//get the data
router.get('/',async (req,res)=>{
    let student = await Student.find()
    res.send(student)
})


router.post('/',async (req,res)=>{

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    // from the category Schema inserting a data 
    const student =  new Student( {
        name : req.body.name,
        isEnrolled : req.body.isEnrolled,
        phone : req.body.phone
    })
    await student.save() // save method will store or save the data in db
    res.send(student)
})

//fetch the data individually
router.put('/:id',async (req,res)=>{
    //basically updating using put method
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    
    const student = await Student.findByIdAndUpdate( req.params.id ,
        {name : req.body.name,isEnrolled:req.body.isEnrolled, phone : req.body.phone },{new : true}) // name is updated and new will let us know that data is updated


    if(!student) return res.status(404).send('The catogory which has been provided is not found')

    if(error) return res.status(400).send(error.details[0].message)
    
    res.send(student)
  
})


// //delete the data id required
router.delete('/:id',async (req,res)=>{
    const student = await Student.findByIdAndDelete(req.params.id)

    if(!student) return res.status(404).send('The catogory which has been provided is not found')

    res.send(student);
  
})

// //get the specific data
router.get('/:id',async (req,res)=>{
   const student = await Student.findById(req.params.id)

    if(!student) return res.status(404).send('The catogory which has been provided is not found')
    console.log(student);
    
    res.send(student)
  
})

module.exports = router;


