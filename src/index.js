import './style.css';

// Get DOM elements
const list = document.querySelector('ul');

// Define a Todo class
class Todo {
      constructor() {
        this.tasks = [
          { description: 'Do laundry', completed: false, index: 1 },
          { description: 'Buy groceries', completed: false, index: 2 },
          { description: 'Clean room', completed: false, index: 3 },
          { description: 'Study for exam', completed: false, index: 4 },
        ];
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

      init() {
        this.render();
      };
};

// Create a new Todo object
const todo = new Todo();
todo.init();
