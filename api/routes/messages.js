var express = require('express');
var router = express.Router();
const db = require('../db');

router.get('/', (req, res, next) => {
    db.getAllMessages()
        .then(messages => res.send(messages))
        .catch(error => console.log(error));
});

router.post('/', (req, res, next) => {
    db.makeMessage(req.body.authorId, req.body.content, req.body.timeSent)
        .then(msg => res.send(msg));
});

router.put('/', (req, res, next) => {
    db.updateMessage(req.query.id, req.body.content, req.body.timeEdited);
});

router.delete('/', (req, res, next) => {
    db.deleteMessage(req.query.id);
});

router.get('/replies', (req, res, next) => {
    db.getReplies(req.query.id)
        .then(messages => res.send(messages));
});

router.post('/replies', (req, res, next) => {
    db.makeReply(req.body.authorId, req.body.messageId, req.body.content, req.body.timeSent)
        .then(msg => res.send(msg));
});

module.exports = router;
