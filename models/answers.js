var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AnswersSchema = new Schema(
    {
        answer: {type: String, required: true},
        correct: {type: String, required: true}
    }
);

// Virtual for question's URL
AnswersSchema
.virtual('url')
.get(function () {
    return '/quiz/answers/' + this._id;
});

//Export model
module.exports = mongoose.model('Answers', AnswersSchema);
