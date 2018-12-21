var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuizSchema = new Schema(
    {
        name: {type:String, required: true},
        summary: {type:String},
        reference: {type:String},
        creator: [{type: Schema.Types.ObjectId, ref: 'Creator'}],
        questions: [{type: SchemaTypes.ObjectId, ref: 'Questions'}]
        created: {type: Date, default: Date.now},
        last_updated: {type: Date, default: Date.now},
        active: {type: Boolean}
    }
);

// Virtual for quiz's URL
QuizSchema
.virtual('url')
.get(function () {
    return '/quiz/' + this._id;
});

//Export model
module.exports = mongoose.model('Quiz', BookSchema);
