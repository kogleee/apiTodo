var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql      = require('mysql');


var app = express();
var jsonParser = bodyParser.json();

app.use(express.static(__dirname + '/public'));
// получение списка данных
app.get('/api/todo', function (req, res) {
    var content = fs.readFileSync('todoList.json', 'utf8');
    var todoList = JSON.parse(content);
    res.send(todoList);
});
// получение одного пользователя по id
app.get('/api/todo/:id', function (req, res) {
    var id = req.params.id; // получаем id
    var content = fs.readFileSync('todoList.json', 'utf8');
    var todoList = JSON.parse(content);
    var todo = null;
    // находим в массиве пользователя по id
    for (var i = 0; i < todoList.length; i++) {
        if (todoList[i].id == id) {
            todo = todoList[i];
            break;
        }
    }
    // отправляем пользователя
    if (todo) {
        res.send(todo);
    } else {
        res.status(404).send();
    }
});
// получение отправленных данных
app.post('/api/todo', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    var todoTask = req.body.task;
    var todoTime = req.body.time;
    var todo = { task: todoTask, time: todoTime };

    var todoTaskApi = req.q

    var data = fs.readFileSync('todoList.json', 'utf8');
    var todoList = JSON.parse(data);

    // находим максимальный id
    var id = Math.max.apply(
        Math,
        todoList.map(function (o) {
            return o.id;
        })
    );
    // увеличиваем его на единицу
    todo.id = id + 1;
    // добавляем пользователя в массив
    todoList.push(todo);
    var data = JSON.stringify(todoList);
    // перезаписываем файл с новыми данными
    fs.writeFileSync('todoList.json', data);
    res.send(todo);
});
// удаление пользователя по id
app.delete('/api/todo/:id', function (req, res) {
    var id = req.params.id;
    var data = fs.readFileSync('todoList.json', 'utf8');
    var todoList = JSON.parse(data);
    var index = -1;
    // находим индекс пользователя в массиве
    for (var i = 0; i < todoList.length; i++) {
        if (todoList[i].id == id) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        // удаляем пользователя из массива по индексу
        var todo = todoList.splice(index, 1)[0];
        var data = JSON.stringify(todoList);
        fs.writeFileSync('todoList.json', data);
        // отправляем удаленного пользователя
        res.send(todo);
    } else {
        res.status(404).send();
    }
});
// изменение пользователя
app.put('/api/todo/:id', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    var todoId = req.params.id;
    var todoTask = req.body.task;
    var todoTime = req.body.time;

    var data = fs.readFileSync('todoList.json', 'utf8');
    var todoList = JSON.parse(data);
    var todo;
    for (var i = 0; i < todoList.length; i++) {
        if (todoList[i].id == todoId) {
            todo = todoList[i];
            break;
        }
    }
    // изменяем данные у пользователя
    if (todo) {
        todo.time = todoTime;
        todo.task = todoTask;
        var data = JSON.stringify(todoList);
        fs.writeFileSync('todoList.json', data);
        res.send(todo);
    } else {
        res.status(404).send(todo);
    }
});

app.listen(3000, function () {
    console.log('Сервер ожидает подключения...');
});



