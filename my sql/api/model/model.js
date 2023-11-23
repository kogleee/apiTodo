const fs = require("fs")


const getAllTodo = () => {
    let content = fs.readFileSync('todoList.json', 'utf8');
    let todoList = JSON.parse(content);
    console.log(todoList)
    return todoList
  

}

const getTodoById = (req) => {
    
        let id = req.params.id; // получаем id
        let content = fs.readFileSync('todoList.json', 'utf8');
        let todoList = JSON.parse(content);
        let todo = null;
        // находим в массиве пользователя по id
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].id == id) {
                todo = todoList[i];
                break;
            }
        }
        return todo
}

const postTodo = (req) => {
        let todoTask = req.body.task;
        let todoTime = req.body.time;
        const todo = { task: todoTask, time: todoTime };

        const todoTaskApi = req.q

        let data = fs.readFileSync('todoList.json', 'utf8');
        let todoList = JSON.parse(data);

        // находим максимальный id
        let id = Math.max.apply(
            Math,
            todoList.map(function (o) {
                return o.id;
            })
        );
        // увеличиваем его на единицу
        todo.id = id + 1;
        // добавляем пользователя в массив
        todoList.push(todo);
        data = JSON.stringify(todoList);
        // перезаписываем файл с новыми данными
        fs.writeFileSync('todoList.json', data);
        return todo
}

const deleteTodo = (req) => {
        let id = req.params.id;
        let data = fs.readFileSync('todoList.json', 'utf8');
        let todoList = JSON.parse(data);
        let index = -1;
        // находим индекс пользователя в массиве
        for (var i = 0; i < todoList.length; i++) {
            if (todoList[i].id == id) {
                index = i;
                break;
            }
        }
            // удаляем пользователя из массива по индексу
            let todo = todoList.splice(index, 1)[0];
            data = JSON.stringify(todoList);
            fs.writeFileSync('todoList.json', data);
            // отправляем удаленного пользователя
            return todo;
    }

const putTodo = (req) => {
        let todoId = req.params.id;
        let todoTask = req.body.task;
        let todoTime = req.body.time;
    
        let data = fs.readFileSync('todoList.json', 'utf8');
        let todoList = JSON.parse(data);
        let todo;
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].id == todoId) {
                todo = todoList[i];
                break;
            }
        }
        // изменяем данные у пользователя
   
        todo.time = todoTime;
        todo.task = todoTask;
        data = JSON.stringify(todoList);
        fs.writeFileSync('todoList.json', data);
        return todo;
}

module.exports = {getAllTodo, getTodoById, postTodo, deleteTodo, putTodo}