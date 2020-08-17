const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({

    id: {type:String},
    category: {type: String, unique:true},
    tasks:[{
        id: {type:String},
        content: {type: String},
        assigned: {type: String},
        date: {type: String},
        color: {type: String},
        image: {type: String}
    }]
    
})

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
