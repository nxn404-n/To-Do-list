import ToDo from "../modules/class";

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
});
