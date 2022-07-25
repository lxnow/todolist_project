const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1; let todo2; let todo3; let list; beforeEach(() => {
    todo1 = new Todo('Buy milk'); todo2 = new Todo('Clean room'); todo3 = new 
    Todo('Go to the gym'); list = new TodoList("Today's Todos"); list.add(todo1); 
    list.add(todo2); list.add(todo3);
  }); test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  }); test('todolist is an array', () => {
    // expect(list.toArray()).toEqual(Array.from(list.todos)); // my answer 
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  }); test('calling first returns the first todo object', () => {
    expect(list.first()).toEqual(todo1);
  }); test('calling last returns the last todo object', () => {
    expect(list.last()).toEqual(todo3);
  }) test('calling shift returns the first todo and removes from list', () => {
    let shiftedItem = list.shift(); expect(shiftedItem).toEqual(todo1); // 
    expect(list.todos.length).toEqual(2); // my answer 
    expect(list.toArray()).toEqual([todo2, todo3]);
  }); test('calling pop returns the last todo and removes it from list', () => {
    let poppedItem = list.pop(); expect(poppedItem).toBe(todo3); 
    expect(list.toArray()).toEqual([todo1, todo2]);
  }); test('calling isDone returns true or false if all tasks are done or not', () 
  => {
    expect(list.isDone()).toEqual(false); todo1.done = true; todo2.done = true; 
    todo3.done = true; expect(list.isDone()).toEqual(true);
  }) test('add throws error when non todo item is added', () => {
    expect(() => list.add(1)).toThrow(TypeError); expect(() => 
    list.add('hi')).toThrow(TypeError);
  }); test('itemAt returns true if an item exist in position, error if not', () => {
    expect(list.itemAt(0)).toEqual(todo1); expect(list.itemAt(1)).toEqual(todo2); 
    expect(list.itemAt(2)).toEqual(todo3); expect(() => 
    list.itemAt(4)).toThrow(ReferenceError);
  }); test('markDoneAt correctly marks tasks done, returns error if not exist', () 
  => {
    list.markDoneAt(0); expect(todo1.done).toBe(true); 
    expect(todo2.done).toBe(false); expect(todo3.done).toBe(false); expect(() => 
    list.markDoneAt(4)).toThrow(ReferenceError);
  }); test('markUndoneAt marks task undone, returns error if not exist', () => {
    todo1.done = true; todo2.done = true; todo3.done = true; list.markUndoneAt(0); 
    expect(todo1.done).toBe(false); expect(todo2.done).toBe(true); 
    expect(todo3.done).toBe(true); expect(() => 
    markUndoneAt(5)).toThrow(ReferenceError);
  }); test('markAllDone marks all tasks done', () => {
    list.markAllDone(); list.todos.forEach(item => {
      expect(item.done).toBe(true);
    });
  }); test('removeAt removes todo, raises error if not exist', () => {
    expect(() => list.removeAt(3)).toThrow(ReferenceError); 
    expect(list.removeAt(1)).toEqual([todo2]); expect(list.todos.length).toEqual(2);
  }); test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----\n[ ] Buy milk\n[ ] Clean room\n[ ] Go to 
the gym`;
    expect(list.toString()).toBe(string); list.markDoneAt(1);
    string = `---- Today's Todos ----\n[ ] Buy milk\n[X] Clean room\n[ ] Go to the 
gym`;
    expect(list.toString()).toBe(string); list.markAllDone();
    string = `---- Today's Todos ----\n[X] Buy milk\n[X] Clean room\n[X] Go to the 
gym`;
    expect(list.toString()).toBe(string);
  }); test('forEach iterates through the todolist', () => {
    let result = []; list.forEach(todo => result.push(todo.title)); 
    expect(result).toEqual([todo1.getTitle(), todo2.getTitle(), todo3.getTitle()]);
  }); test('filter returns new list based on callback fn', () => {
    let filteredList = list.filter(item => item.title.includes('gym')); 
    expect(filteredList.todos).toEqual([todo3]); list.markDoneAt(0); 
    list.markDoneAt(2); filteredList = list.filter(item => item.done === true); 
    expect(filteredList.todos).toEqual([todo1, todo3])
  }) test('allDone returns a list of todo objects that are done', () => {
    list.markDoneAt(0); list.markDoneAt(1); let doneList = list.allDone(); 
    expect(doneList.todos).toEqual([todo1, todo2]);
  }); test('allNotDone returns a list of todo objects that are not done', () => {
    list.markDoneAt(0); let notDoneList = list.allNotDone(); 
    expect(notDoneList.todos).toEqual([todo2, todo3]);
  }); test('findByTitle returns the first todo object with matching title', () => {
    expect(list.findByTitle('Clean room')).toEqual(todo2);
  }) test('markDone(title) sets the argument object to done = true', () => {
    list.markDone('Buy milk'); expect(todo1.done).toBe(true);
  }); test('markAllUndone marks all tasks udone', () => {
    list.markAllDone(); list.markAllUndone(); list.todos.forEach(item => {
      expect(item.done).toBe(false);
    });
  });
});
