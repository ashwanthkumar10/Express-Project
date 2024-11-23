const Joi = require('joi')
const mongoose = require('mongoose')
const {categorySchema} = require('../models/categoriesModel')


// const courseSchema  = new mongoose.Schema({
//     name : {type : String , required : true , minlength : 3 , maxlength : 30},
//     isEnrolled : {type : Boolean , default :true },
//     phone : { type : String, required : true , minlength : 10 , maxlength :20}
    
// })

//creating a Category model to do all operations 
const Course =  mongoose.model('Course',new mangoose.Schema({
    title : {type : String , required : true ,trim : true , minlength : 3 , maxlength : 20,},
    category : 
    {
        type : categorySchema,
        required : true

    },

    creator : 
    {
        type : String ,
         required : true 
    } ,
    rating : {
       type : Number ,
    required : true
    }

}
))

//Joi is updated we can't use the pervious versions the correct way to use Joi is by this way we dont Joi.validate() method 
// in newer version as it depracted in version 16  
function validateData(course){
    const schema =  Joi.object({
            name : Joi.string().min(3).required(),
            categoryId : Joi.string().required,
            creator : Joi.string().min(5).required(),
            rating : Joi.number().min(0).required()
    })
    
    return schema.validate(course)
}

exports.Course = Course ;
exports.validate = validateData;