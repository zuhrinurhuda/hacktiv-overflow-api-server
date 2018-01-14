const Question = require('../models/questionModel')

class QuestionController {
  static create (req, res) {
    let newQuestion = new Question({
      title: req.body.title,
      content: req.body.content,
      author: req.decoded._id,
      slug: req.body.slug
    })

    newQuestion.save()
    .then(newQuestion => res.status(200).json({
      message: 'Success create new question',
      newQuestion: newQuestion
    }))
    .catch(err => res.status(500).send(err))
  }

  static findAll (req, res) {
    Question.find()
    .then(questions => res.status(200).json({
      message: 'Success find all questions',
      questions: questions
    }))
    .catch(err => res.status(500).send(err))
  }

  static findById (req, res) {
    Question.findById(req.params.id)
    .then(question => res.status(200).json({
      message: 'Success find question',
      question: question
    }))
    .catch(err => res.status(500).send(err))
  }

  static update (req, res) {
    Question.findById(req.params.id)
    .then(question => {
      question.name = req.body.name || question.name
      question.avatar = req.body.avatar || question.avatar
      question.save()
      .then(newQuestionData => res.status(200).json({
        message: 'Success update data question',
        updatedQuestion: newQuestionData
      }))
      .catch(err => res.status(500).send(err))
    })
  }

  static delete (req, res) {
    Question.findByIdAndRemove(req.params.id)
    .then(result => res.status(200).json({
      message: 'Success delete question',
      deletedQuestion: result
    }))
    .catch(err => res.status(500).send(err))
  }
}

module.exports = QuestionController