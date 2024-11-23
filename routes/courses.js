const express = require('express')
const {Course , validate } = require('../models/coursesModel') 
const {Category} = require('../models/categoriesModel')

const router = express.Router()






//get the data
router.get('/',async (req,res)=>{
    let course = await Course.find()
    res.send(course)
})


router.post('/',async (req,res)=>{

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const category = await Category.findById(req.body.categoryId)
    if(!category) return res.status(404).send('Invalid Id')

    // from the category Schema inserting a data 
    const course =  new Course( {
        title : req.body.title,
        category : {
            _id : category._id,
            name : category.name

        },
        creator : req.params.creator,
        rating : req.params.rating
        
    })
    await course.save() // save method will store or save the data in db
    res.send(course)
})

//fetch the data individually
router.put('/:id',async (req,res)=>{
    //basically updating using put method
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const category = await Category.findById(req.body.categoryId)
    if(!category) return res.status(404).send('Invalid Id')
    
    const course = await Course.findByIdAndUpdate( req.params.id ,
        { 
            title : req.body.title,
            category : {
                _id : category._id,
                name : category.name
            },
            creator : req.params.creator,
            rating : req.params.rating
            
        }
        ,{new : true}) // name is updated and new will let us know that data is updated


    if(!course) return res.status(404).send('The catogory which has been provided is not found')

    if(error) return res.status(400).send(error.details[0].message)
    
    res.send(course)
  
})


// //delete the data id required
router.delete('/:id',async (req,res)=>{
    const course = await Course.findByIdAndDelete(req.params.id)

    if(!course) return res.status(404).send('The catogory which has been provided is not found')

    res.send(course);
  
})

// //get the specific data
router.get('/:id',async (req,res)=>{
   const course = await Course.findById(req.params.id)

    if(!course) return res.status(404).send('The catogory which has been provided is not found')
    console.log(course);
    
    res.send(course)
  
})

module.exports = router;


