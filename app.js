var express = require('express');
var session = require('cookie-session'); 
var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

/* On utilise les sessions */
app.use(session({
	secret:'todosecret'
}))

/* Init of the session cookie */
app.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

app.get('/todo', function(req, res) {
	res.render('todo.ejs', {tasks: req.session.todolist});
	console.dir(req.session.todolist)
});

app.post('/todo/add/', urlencodedParser, function(req, res) {
	if (req.body.NewTask != '') {
		console.dir(req.body)
        req.session.todolist.push(req.body.NewTask);
    }
    res.redirect('/todo');
})

app.get('/todo/remove/:id', function(req, res) {
	if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
});

app.listen(3000);