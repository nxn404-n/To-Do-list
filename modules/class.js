import { form, input, list } from './DOMelements.js';
import { clearCompletedEvent } from './checkboxFunction.js';

class ToDo {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  addTask(taskDescription) {
    const newTask = {
      description: taskDescription,
      completed: false,
      index: this.updateIndex(),
    };
    this.tasks.push(newTask);
    this.save();
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
    this.updateIndex();
    this.save();
  }

  editTask(index, newDescription) {
    this.tasks[index].description = newDescription;
    this.save();
  }

  updateIndex() {
    this.tasks.forEach((task, index) => {
      task.index = index + 1;
    });
    return this.tasks.length;
  }

  save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  render() {
    list.innerHTML = '';
    this.tasks.forEach((task) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      input.checked = task.completed; // new
      input.addEventListener('change', (e) => { // new
        const index = e.target.parentElement.getAttribute('data-index');
        this.tasks[index].completed = e.target.checked;
        this.save();
      });
      const description = document.createElement('span');
      description.innerHTML = task.description;
      description.contentEditable = true;
      description.addEventListener('blur', (e) => {
        const index = e.target.parentElement.getAttribute('data-index');
        this.editTask(index, e.target.textContent);
        this.render();
      });
      const li = document.createElement('li');
      const dots = document.createElement('div');
      dots.className = 'dots';
      dots.style.cursor = 'pointer';
      dots.style.width = '20px';
      dots.innerHTML = '<span class="material-symbols-outlined">delete</span>';
      dots.addEventListener('click', (e) => {
        e.stopPropagation();
        this.updateIndex();
        const index = e.currentTarget.parentElement.getAttribute('data-index');
        this.removeTask(index);
        this.render();
      });
      li.appendChild(input);
      li.appendChild(description);
      li.appendChild(dots);
      li.setAttribute('data-index', task.index - 1);
      li.classList.toggle('completed', task.completed); // new
      list.appendChild(li);
    });
  }

  clearCompleted() {
    this.tasks = this.tasks.filter((task) => !task.completed);
    this.updateIndex();
    this.save();
    this.render();
  }

  bindEvents() {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTask(input.value);
      input.value = '';
      this.render();
    });

    clearCompletedEvent.call(this);
  }

  init() {
    this.bindEvents();
    this.render();
  }
}

export default ToDo;