var express = require('express');
var router = express.Router();

var todolistController = require('../controllers/todolist_controller.js');

router.get('/', todolistController.readAllToDoList);
router.get('/:id', todolistController.readToDoList);
router.delete('/:id', todolistController.deleteToDoList);

router.post('/', todolistController.createToDoList);    

module.exports = router;