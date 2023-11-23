const express = require("express");
const {getAllTodo, getTodoById, postTodo, deleteTodo, putTodo} = require("../model/model");
const router = express.Router();

const getAll = (req, res) => {
	const todos = getAllTodo();
	// []
	if (!todos || todos.length == 0) return res.status(401).json("Списка дел нет");
	else return res.status(200).json(todos);
};

const getByID = (req, res) => {
    const todo = getTodoById(req);
    if (!todo) return res.status(401).json("Списка дел нет");
	else return res.status(200).json(todo);
}

const post = (req, res) => {
	const todos = postTodo(req);
	if (!todos) return res.status(401).json("Списка дел нет");
	else return res.status(200).json("Успешно добавлено")
};

const deleteById = (req,res) => {
    const todo = deleteTodo(req);
    if (!todo) return res.status(401).json("Списка дел нет");
	else return res.status(200).json("Успешно удалено")
};

const putById = (req,res) => {
    const todo = putTodo(req);
    if (!todo) return res.status(401).json("Списка дел нет");
	else return res.status(200).json("Успешно изменено")
}

const getAllImg = (req,res) => {
	
}


module.exports = { 
	getAll, post, getByID, deleteById, putById,
	getAllImg, postImg, getImgById, deleteImgById, putImgById

};


