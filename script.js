'use strict';

const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUl = document.getElementById('todos');

// date from localStorage
const todos = JSON.parse(localStorage.getItem('todos'));

// add date in localStorage
const updateLS = function () {
  const todosEl = document.querySelectorAll('li');

  const todos = [];

  todosEl.forEach(todoEl => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed'),
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
};

// make todo
const addTodo = function (todo) {
  let todoText = input.value;

  if (todo) todoText = todo.text;

  if (todoText) {
    const todoEl = document.createElement('li');

    if (todo && todo.completed) todoEl.classList.add('completed');

    todoEl.innerText = todoText;

    // add class 'completed' for todo
    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed');

      updateLS();
    });

    // remove element todo
    todoEl.addEventListener('contextmenu', e => {
      e.preventDefault();
      todoEl.remove();

      updateLS();
    });

    todosUl.appendChild(todoEl);

    input.value = '';

    // localStorage update
    updateLS();
  }
};

if (todos) {
  todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', e => {
  e.preventDefault();

  addTodo();
});
