const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// this route is actually /books/:id/reviews/new

router.get('/books/books/:id/reviews/new', (req,res,next) => {
	
	Book.findById(req.params.id)
	.then((theBook) =>  {
		console.log(theBook);
		res.render('bookReview', {book : theBook});
	})
	.catch((daError) => {})
});

router.post('/books/:id/reviews/create', (req,res,next) => {
	
	//const theReview = {reviewer: req.body.reviewer, content: req.body.content};
	//const theReview = req.body;
	
	Book.findByIdAndUpdate(req.params.id, { $push: {review: req.body}})
	.then((response) => {
		res.redirect(`/books/${req.params.id}`);
	})
	.catch((err) => {
		next(err);
	})	
});

module.exports = router;