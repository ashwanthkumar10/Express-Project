const Joi = require('joi')
const mongoose = require('mongoose')


const studentSchema  = new mongoose.Schema({
    name : {type : String , required : true , minlength : 3 , maxlength : 30},
    isEnrolled : {type : Boolean , default :true },
    phone : { type : String, required : true , minlength : 10 , maxlength :20}
    
})

//creating a Category model to do all operations 
const Student =  mongoose.model('StudentsData',studentSchema)

//Joi is updated we can't use the pervious versions the correct way to use Joi is by this way we dont Joi.validate() method 
// in newer version as it depracted in version 16  
function validateData(student){
    const schema =  Joi.object({
            name : Joi.string().min(3).required(),
            isEnrolled : Joi.boolean().required(),
            phone : Joi.string().min(10).max(20).required()
    })
    
    return schema.validate(student)
}

exports.Student = Student ;
exports.validate = validateData;