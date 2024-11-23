const express = require('express')
const { Category , validate} = require('../models/categoriesModel')

const router = express.Router()





//get the data
router.get('/',async (req,res)=>{
    let category = await Category.find()
    res.send(category)
})


router.post('/',async (req,res)=>{

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    // from the category Schema inserting a data 
    const category =  new Category( {
        name : req.body.name
    })
    await category.save() // save method will store or save the data in db
    res.send(category)
})

//fetch the data individually
router.put('/:id',async (req,res)=>{
    //basically updating using put method
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    
    const category = await Category.findByIdAndUpdate( req.params.id,{name : req.body.name },{new : true}) // name is updated and new will let us know that data is updated


    if(!category) return res.status(404).send('The catogory which has been provided is not found')

    if(error) return res.status(400).send(error.details[0].message)
    
    res.send(category)
  
})


// //delete the data id required
router.delete('/:id',async (req,res)=>{
    const category = await Category.findByIdAndDelete(req.params.id)

    if(!category) return res.status(404).send('The catogory which has been provided is not found')

    res.send(category);
  
})

// //get the specific data
router.get('/:id',async (req,res)=>{
   const category = await Category.findById(req.params.id)

    if(!category) return res.status(404).send('The catogory which has been provided is not found')
    console.log(category);
    
    res.send(category)
  
})

module.exports = router;


//Joi is updated we can't use the pervious versions the correct way to use Joi is by this way we dont Joi.validate() method 
// in newer version as it depracted in version 16  
