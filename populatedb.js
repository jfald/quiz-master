#! /usr/bin/env node
// Lots to do still!

console.log('This script populates some test quizs, questions, answers and creators to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Quiz = require('./models/quiz')
var Question = require('./models/question')
var Answers = require('./models/answers')
var Creator = require('./models/creator')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var creators = []
var quizs = []
var questions = []
var answers = []

function creatorCreate(name, cb) {
  creatordetail = { name:name }
  
  var creator = new Creator(creatordetail);
       
  creator.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Creator: ' + creator);
    creators.push(creator)
    cb(null, creator)
  }  );
}

function quizCreate(name, summary, reference, creator, questions, created, last_updated, cb) {
  quizdetail = {
      name: name,
      summary: summary,
      questions: questions
  }
  if (reference != false) quizdetail.reference = reference
  if (creator != false) quizdetail.creator = creator
  if (created != false) quizdetail.created = created
  if (last_updated != false) quizdetail.last_updated = last_updated 
    
       
  quiz.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New quiz: ' + quiz);
    quizs.push(quiz)
    cb(null, quiz);
  }   );
}

function questionCreate(question, reference, answers, cb) {
  questiondetail = { 
    question: question,
    reference: reference,
    answers: answers
  }
    
  var question = new Quiz(questiondetail);    
  question.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Question: ' + question);
    questions.push(question)
    cb(null, question)
  }  );
}


function answerCreate(answer, correct, cb) {
  answerdetail = { 
    answer: answer,
    correct: correct 
  }    
    
  var answer = new Answer(answerdetail);    
  answer.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Creator: ' + answer);
      cb(err, null)
      return
    }
    console.log('New Creator: ' + answer);
    answers.push(answer)
    cb(null, question)
  }  );
}


function createCreators(cb) {
    async.parallel([
        function(callback) {
          quizCreate("Admin", callback);
        }
        ],
        // optional callback
        cb);
}


function createQuizs(cb) {
    async.parallel([
        function(callback) {
          questionCreate('', '', [answers[0],], callback);
        },
        function(callback) {
          questionCreate('', '', [answers[0],], callback);
        },
        ],
        // optional callback
        cb);
}


function createAnswers(cb) {
    async.parallel([
        function(callback) {
          answerCreate(questions[0], 'London Gollancz, 2014.', false, 'Available', callback)
        },
        function(callback) {
          answerCreate(questions[1], ' Gollancz, 2011.', false, 'Loaned', callback)
        },
        function(callback) {
          answerCreate(questions[2], ' Gollancz, 2015.', false, false, callback)
        },
        function(callback) {
          answerCreate(questions[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          answerCreate(questions[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          answerCreate(questions[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          answerCreate(questions[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Available', callback)
        },
        function(callback) {
          answerCreate(questions[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Maintenance', callback)
        },
        function(callback) {
          answerCreate(questions[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Loaned', callback)
        },
        function(callback) {
          answerCreate(questions[0], 'Imprint XXX2', false, false, callback)
        },
        function(callback) {
          answerCreate(questions[1], 'Imprint XXX3', false, false, callback)
        }
        ],
        // Optional callback
        cb);
}



async.series([
    createAnswers,
    createCreators,
    createQuestions,
    createQuizs
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('AnswerInstances: '+answers);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




