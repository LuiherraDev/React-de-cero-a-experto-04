import * as z from "zod";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  lenght: number;
  completed: number;
  pending: number;
}

export type TaskAction =
  | { type: 'ADD_TODO', payload: string }
  | { type: 'TOGGLE_TODO', payload: number }
  | { type: 'DELETE_TODO', payload: number }

const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
})

const TaskStateSchema = z.object({
  todos: z.array(TodoSchema),
  lenght: z.number(),
  completed: z.number(),
  pending: z.number(),
})

export const getTaskInitialState = (): TaskState => {
  const localStorageState = localStorage.getItem('tasks-state')

  if (!localStorageState) {
    return {
      todos: [],
      completed: 0,
      pending: 0,
      lenght: 0,
    }
  }
  const result = TaskStateSchema.safeParse(JSON.parse(localStorageState))
  if (result.error) {
    console.log(result.error)
    return {
      todos: [],
      completed: 0,
      pending: 0,
      lenght: 0,
    }
  }
  return result.data
}

export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload.trim(),
        completed: false,
      }
      return {
        ...state,
        todos: [...state.todos, newTodo],
        lenght: state.lenght + 1,
        // completed: state.completed,
        pending: state.pending + 1,
      }
    }

    case 'DELETE_TODO': {
      const currentsTodos = state.todos.filter((todo) => todo.id != action.payload)


      return {
        ...state,
        todos: currentsTodos,
        lenght: currentsTodos.length,
        completed: currentsTodos.filter((todo) => todo.completed).length,
        pending: currentsTodos.filter((todo) => !todo.completed).length,
      }

    }


    case 'TOGGLE_TODO': {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed }
        }
        return todo
      })
      return {
        ...state,
        todos: updatedTodos,
        completed: updatedTodos.filter((todo) => todo.completed).length,
        pending: updatedTodos.filter((todo) => !todo.completed).length,
      }
    }

    default:
      return state
  }
}