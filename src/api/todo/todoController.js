const express = require('express');
const bodyParser = require('body-parser');
const Todo = require('./todo');

const router = express.Router()
router.use(bodyParser.json({ extender: true }));

// Create todo.
router.post('/', (req, res) => {
    Todo.create({
        text: req.body.text,
        done: req.body.done,
    },
    (err, todo) => {
        if (err) {
            return res.status(500)
                      .send('Problem adding todo item.');
        }

        res.status(200).send(todo);
    });
});

// Get all todos.
router.get('/', (req, res) => {
    Todo.find({}, (err, todos) => {
        if (err) {
            return res.status(500)
                      .send("There was a problem getting todos.");
        }

        res.status(200).send(todos);
    });
});

// Get todo.
router.get('/:id', (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (!todo) {
            return res.status(404).send('No todo found.');
        }

        res.status(200).send(todo);
    });
});

// Delete todo.
router.delete('/:id', (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, todo) => {
        if (err) {
            return res.status(500).send("Problem deleting todo.")
        }

        res.status(200).send(`Todo: ${todo.text} has been deleted.`);
    });
});

// Update todo.
router.put('/:id', (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body, {new: true},
        (err, todo) => {
            if (err) {
                return res.status(500).send('Problem updating todo.');
            }

            res.status(200).send(todo);
    });
});

module.exports = router;