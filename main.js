let addTodDoButton = document.getElementById('addtodo');
let toDoContainer = document.getElementById('todocontainer');
let inputField = document.getElementById('inputfield');

document.addEventListener('DOMContentLoaded', loadTodos);

addTodDoButton.addEventListener('click', function() {
    var paragraph = document.createElement('p');
    paragraph.innerText = inputField.value;
    toDoContainer.appendChild(paragraph);
    inputField.value = "";

    saveTodo(paragraph.innerText);

    paragraph.addEventListener('click', function() {
        paragraph.style.textDecoration = "line-through";
        updateTodo(paragraph.innerText, true);
    });

    paragraph.addEventListener('dblclick', function() {
        toDoContainer.removeChild(paragraph);
        deleteTodo(paragraph.innerText);
    });
});

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        let paragraph = document.createElement('p');
        paragraph.innerText = todo.text;
        if (todo.completed) {
            paragraph.style.textDecoration = "line-through";
        }
        toDoContainer.appendChild(paragraph);

        paragraph.addEventListener('click', function() {
            paragraph.style.textDecoration = "line-through";
            updateTodo(paragraph.innerText, true);
        });

        paragraph.addEventListener('dblclick', function() {
            toDoContainer.removeChild(paragraph);
            deleteTodo(paragraph.innerText);
        });
    });
}

function saveTodo(text) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push({ text: text, completed: false });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateTodo(text, completed) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let index = todos.findIndex(todo => todo.text === text);
    if (index !== -1) {
        todos[index].completed = completed;
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

function deleteTodo(text) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(todo => todo.text !== text);
    localStorage.setItem('todos', JSON.stringify(todos));
}