var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuestionSchema = new Schema(
    {
        question: {type: String, required: true},
        reference: {type: String},
        answers: [{type: SchemaTypes.ObjectId, ref: 'Answers'}]
    }
);

// Virtual for question's URL
QuestionSchema
.virtual('url')
.get(function () {
    return '/quiz/question/' + this._id;
});

//Export model
module.exports = mongoose.model('Question', QuestionSchema);
