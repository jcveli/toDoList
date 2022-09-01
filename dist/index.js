"use strict";
const btn = document.getElementById('submit');
const input = document.getElementById('listInput');
const form = document.getElementById('listForm');
const list = document.getElementById('listView');
const toDos = readTodos();
toDos.forEach(createNewTodo);
function saveTodos() {
    localStorage.setItem('toDos', JSON.stringify(toDos));
}
function readTodos() {
    const todosJSON = localStorage.getItem('toDos');
    if (todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
}
function handleSubmit(e) {
    e.preventDefault();
    const toDo = {
        text: input.value,
        completed: false,
    };
    createNewTodo(toDo);
    toDos.push(toDo);
    saveTodos();
    input.value = '';
}
function createNewTodo(newToDo) {
    const newListItem = document.createElement('li');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = newToDo.completed;
    checkBox.addEventListener("change", function () {
        newToDo.completed = checkBox.checked;
        saveTodos();
    });
    newListItem.append(newToDo.text);
    newListItem.append(checkBox);
    list.append(newListItem);
}
form.addEventListener("submit", handleSubmit);
