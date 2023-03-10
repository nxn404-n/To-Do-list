import ToDo from '../modules/class.js';

document.body.innerHTML = `
  <form>
    <input type="text">
  </form>
  <ul></ul>
  <button id="clear-btn">Clear Completed</button>
`;

describe('ToDo', () => {
  let todo;

  beforeEach(() => {
    todo = new ToDo();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('adds a task', () => {
    todo.addTask('Task 1');
    expect(todo.tasks.length).toBe(1);
  });

  test('removes a task', () => {
    todo.addTask('Task 1');
    todo.addTask('Task 2');
    todo.removeTask(0);
    expect(todo.tasks.length).toBe(1);
  });

  test('edit a task', () => {
    todo.addTask('Task 1');
    const index = 0;
    const newDescription = 'Task 2'
    todo.editTask(index, newDescription);
    expect(todo.tasks[0].description).toBe('Task 2');
  });

  test('updating completed status', () => {
    todo.addTask('Task 1');
    todo.addTask('Task 2');
    todo.tasks[0].completed = true;

    expect(todo.tasks[0].completed).toBe(true);
  });
  test('clear all completed', () => {
    todo.addTask('Task 1');
    todo.addTask('Task 2');
    todo.tasks[0].completed =true;
    todo.clearCompleted();
    expect(todo.tasks[0].description).toBe('Task 2');
  })

  
});
