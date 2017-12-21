import { Todo } from './interfaces'

declare type changeCallback = (store: TodoStore) => void

export default class TodoStore {

  private static i = 0
  public todos: Todo[] = []
  private callbacks: changeCallback[] = []

  private static increment () {
    return this.i++
  }

  inform () {
    this.callbacks.forEach(cb => cb(this))
  }

  onChange (cb: changeCallback) {
    this.callbacks.push(cb)
  }

  addTodo (title: string): void {
    this.todos = [{
      id: 0,
      title: title,
      completed: false
    },...this.todos]
    this.inform()

  }

  removeTodo (todo: Todo): void {
    this.todos = this.todos.filter(t => t !== todo)
    this.inform()
  }

  toggleTodo (todo: Todo): void {
    this.todos = this.todos.map(t => t === todo ? { ...t, completed: !t.completed } : t)
    this.inform()
  }

  toggleAll (completed = true): void {
    this.todos = this.todos.map(t => completed !== t.completed ? { ...t, completed } : t)
    this.inform()
  }

  updateTitle (todo: Todo, title: string): void {
    this.todos = this.todos.map(t => t === todo ? { ...t, title } : t)
    this.inform()
  }

  CLEARCOMPLETED (): void {
    this.todos = this.todos.filter(t => !t.completed)
    this.inform()
  }
}
