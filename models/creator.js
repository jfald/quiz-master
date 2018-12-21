var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CreatorSchema = new Schema(
    {
        name: {type: String, required: true, default: 'unknown' }
    }
);

// Virtual for question's URL
CreatorSchema
.virtual('url')
.get(function () {
    return '/quiz/creator/' + this._id;
});

//Export model
module.exports = mongoose.model('Creator', CreatorSchema);
