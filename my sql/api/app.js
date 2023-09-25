const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require("multer")
const maxSize = 10000000;





const app = express();
const jsonParser = bodyParser.json();


app.use(express.static(__dirname + '/public'));




const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
  
    if(file.mimetype === "image/png" || 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"||
    file.mimetype === "image/svg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
 }

 const fileSizeLimitErrorHandler = (err, req, res, next) => {
    if (err) {
      res.send(413)
    } else {
      next()
    }
  }

 const upload = multer({ dest: 'uploads/', limits: { fileSize: maxSize}, fileFilter: fileFilter, storage: storageConfig,})


  
// получение списка данных
app.get('/api/todo', function (req, res) {
    try {
        let content = fs.readFileSync('todoList.json', 'utf8');
        let todoList = JSON.parse(content);
        res.send(todoList);
    }catch (error){
        res.status(401).json({ succes: false, message: error.message})
    }
    
});
// получение одного пользователя по id
app.get('/api/todo/:id', function (req, res) {
    try {
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
        // отправляем пользователя
        if (todo) {
            res.send(todo);
        } else {
            res.status(404).send();
        }
    }catch (error){
        res.status(401).json({ succes: false, message: error.message})
    }
    
});

// получение отправленных данных
app.post('/api/todo', jsonParser, function (req, res) {
    try {
        if (!req.body) return res.sendStatus(400);

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
        res.send(todo);
    }catch (error){
        res.status(401).json({ succes: false, message: error.message})
    }
    
});
// удаление пользователя по id
app.delete('/api/todo/:id', function (req, res) {
    try {
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
        if (index > -1) {
            // удаляем пользователя из массива по индексу
            let todo = todoList.splice(index, 1)[0];
            data = JSON.stringify(todoList);
            fs.writeFileSync('todoList.json', data);
            // отправляем удаленного пользователя
            res.send(todo);
        } else {
            res.status(404).send();
        }
    }catch (error){
        res.status(401).json({ succes: false, message: error.message})
    }
    
});
// изменение пользователя
app.put('/api/todo/:id', jsonParser, function (req, res) {
    try {
        if (!req.body) return res.sendStatus(400);

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
        if (todo) {
            todo.time = todoTime;
            todo.task = todoTask;
            data = JSON.stringify(todoList);
            fs.writeFileSync('todoList.json', data);
            res.send(todo);
        } else {
            res.status(404).send(todo);
        }
    }catch (error){
        res.status(401).json({ succes: false, message: error.message})
    }
    
});


// Сохранить картинку
app.post('/img', upload.single('avatar'),jsonParser, fileSizeLimitErrorHandler , function (req, res, next) {
    const userDateValidate = (req, res, next) => {
        if (!req.file) throw Error("Нет файла")
    }
    try {
        let filedata = req.file;
    
    let img = { filename: filedata.filename, type: filedata.mimetype};

    const todoTaskApi = req.q

    let data = fs.readFileSync('img.json', 'utf8');
    let images = JSON.parse(data);

    // находим максимальный id
    let id = Math.max.apply(
        Math,
        images.map(function (o) {
            return o.id;
        })
    );
    // увеличиваем его на единицу
    img.id = id + 1;
    // добавляем картинку в массив
    images.push(img);
    data = JSON.stringify(images);
    // перезаписываем файл с новыми данными
    fs.writeFileSync('img.json', data);
    res.send("Файл сохранён");
    } catch (error){
        res.status(401).json({ succes: false, message: error.message})
    } 
})

// Получение картинки
app.get('/img/:id', function (req, res) {
    try {
        let id = req.params.id; // получаем id
        let content = fs.readFileSync('img.json', 'utf8');
        let images = JSON.parse(content);
        let img = null;
        // находим в массиве картинку по id
        for (let i = 0; i < images.length; i++) {
            if (images[i].id == id) {
                img = images[i];
                break;
            }
        }
    // отправляем картинку
    if (img) {
        res.send(img);
    } else {
        res.status(404).send();
    } 
}catch (error){
        res.status(401).json({ succes: false, message: error.message})
    }
});
    

// Удаление картинки
app.delete('/img/:id', function (req, res) {
    try{
        let id = req.params.id;
        let data = fs.readFileSync('img.json', 'utf8');
        let todoList = JSON.parse(data);
        let index = -1;
        // находим индекс картинки в массиве
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].id == id) {
                index = i;
                break;
            }else res.send("ID is not defined")
        }
        if (index > -1) {
            // удаляем картинку из массива по индексу
            let todo = todoList.splice(index, 1)[0];
            data = JSON.stringify(todoList);
            fs.writeFileSync('img.json', data);
            // отправляем удаленной  картинки
            res.send("Картинка удалена");
        } else {
            res.status(404).send();
        }
    }catch (error){
        res.status(401).json({ succes: false, message: error.message})
    }
    
});

//изменение картинки
app.put('/img/:id', jsonParser, function (req, res) {
    try {
        if (!req.body) return res.sendStatus(400);

        let imgId = req.params.id;
        let fileName = req.body.filename;
        let fileType = req.body.typlet
        let data = fs.readFileSync('img.json', 'utf8');
        let images = JSON.parse(data);
        let img;
        for (let i = 0; i < images.length; i++) {
            if (images[i].id == imgId) {
                img = images[i];
                break;
            }else{ res.send("ID is not defined")}
        }
        // изменяем данные у картинки
        if (img) {
            img.filename = fileName;
            img.type = fileType;
            data = JSON.stringify(images);
            fs.writeFileSync('img.json', data);
            res.send("Успешно изменено");
        } else {
            res.status(404).send(img);
        }
    }catch (error){
        res.status(401).json({ succes: false, message: error.message})
    }
});

app.listen(3000, function () {
    console.log('Сервер ожидает подключения...');
});
