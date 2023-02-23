import './style.css';

// Get DOM elements
const form = document.querySelector('form');
const input = document.querySelector('input');
const list = document.querySelector('ul');

// To-Do class
class ToDo {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  addTask(taskDescription) {
    const newTask = {
      description: taskDescription,
      completed: false,
      index: this.tasks.length,
    };

    this.tasks.push(newTask);
    this.updateIndex();
    this.save();
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
    this.updateIndex();
    this.save();
  }

  updateIndex() {
    this.tasks.forEach((task, index) => {
      task.index = index;
    });
  }

  save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  render() {
    list.innerHTML = '';
    this.tasks.forEach((task) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      input.style.order = -1;
      const li = document.createElement('li');
      li.innerHTML = task.description;
      const dots = document.createElement('span');
      dots.className = 'dots';
      dots.innerHTML = '<span class="material-symbols-outlined">more_vert</span>';
      dots.style.order = 1;
      li.appendChild(dots);
      li.appendChild(input);
      list.appendChild(li);
    });
  }

  bindEvents() {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTask(input.value);
      input.value = '';
      this.render();
    });

    list.addEventListener('click', (e) => {
      if (e.target.classList.contains('dots')) {
        const index = e.target.parentElement.getAttribute('data-index');
        this.removeTask(index);
        this.render();
      }
    });
  }

  init() {
    this.bindEvents();
    this.render();
  }
}

const toDo = new ToDo();
toDo.init();