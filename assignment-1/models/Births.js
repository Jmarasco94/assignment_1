var mongoose = require ('mongoose');

var BirthSchema = new mongoose.Schema ({
    STATE: String,
    BIRTHS: Number,
},
{
    collection: 'state_births_collection'
});
mongoose.model('Births', BirthSchema);

// JavaScript File