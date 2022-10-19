import {TaskListType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType,
    todolistId1, todolistId2} from "./todolists-reducer";

type ActionTypes =
    RemoveTaskACType |
    AddTaskACType |
    ChangeTaskStatusACType |
    ChangeTaskTitleACType |
    AddTodolistACType |
    RemoveTodolistACType;

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => ({
    type: 'REMOVE_TASK',
    todolistId,
    taskId
} as const )

export type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, titleInput: string) => ({
    type: 'ADD_TASK',
    todolistId,
    titleInput
} as const)

export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => ({
    type: 'CHANGE_TASK_STATUS',
    todolistId,
    taskId,
    isDone
} as const)

export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => ({
    type: 'CHANGE_TASK_TITLE',
    todolistId,
    taskId,
    title
} as const)

/*-----------------------------------------------------------------------------------*/

// иной метод типизации initialState
// type StateType = typeof initialState

/*const initialState: TaskListType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "React Native", isDone: false}
    ],
    [todolistId2]: [
        {id: v1(), title: "Notebook", isDone: true},
        {id: v1(), title: "Bread", isDone: false},
        {id: v1(), title: "Bike", isDone: false},
    ]
}*/

const initialState: TaskListType = { };

export const tasksReducer = (state: TaskListType = initialState, action: ActionTypes): TaskListType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        }
        case 'ADD_TASK': {
            const newTask = {id: v1(), title: action.titleInput, isDone: false};
            return {...state, [action.todolistId]: [newTask,...state[action.todolistId]]};
        }
        case 'CHANGE_TASK_STATUS': {
            return {...state, [action.todolistId]:
                    state[action.todolistId].map( el => el.id === action.taskId ? {...el, isDone: action.isDone} : el)};
        }
        case 'CHANGE_TASK_TITLE': {
            return {...state, [action.todolistId]:
                    state[action.todolistId].map( el => el.id === action.taskId ? {...el, title: action.title} : el)};
        }
        case 'REMOVE_TODOLIST': {
            // const {[action.todolistId]: [], ...rest} = {...state} //другой способ через деструктуризацию

            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        case 'ADD_NEW_TODOLIST': {
            return { ...state, [action.todolistId]: [] };
        }
        default:
            //throw new Error("I don't know action type!");
            return state;
    }
}