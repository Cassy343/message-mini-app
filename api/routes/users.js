var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (req.query.id) {
        db.getUser(req.query.id)
            .then(data => res.send(data))
            .catch(error => console.log(error));
    } else if (req.query.name) {
        const getOrCreate = async () => {
            const data = await db.getUserByName(req.query.name);
            
            if (data) {
                res.send(data);
            } else {
                res.send(await db.makeUser(req.query.name));
            }
        };

        getOrCreate();
    }
});

module.exports = router;
