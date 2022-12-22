import {
    TodolistDomainType, FilterType, updateTodolistFilterAC,
    todolistsReducer, changeTodolistEntityStatusAC, deleteTodolistTC, createTodolistTC, updateTodolistTitleTC
} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolistsAPI";
import {AppInitialStateStatusType} from "./app-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {

    todolistId1 = v1();
    todolistId2 = v1();

    startState = ([
        {id: todolistId1, title: 'Выучить', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: 'Купить', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
    ])
})

test('correct todolist should be deleted', () => {

    // react-redux
    // const endState = todolistsReducer(startState, deleteTodolistAC({todolistId: todolistId1}));

    // redux-toolkit
    const endState = todolistsReducer(startState, deleteTodolistTC.fulfilled({todolistId: todolistId1},
        'requestId', 'todolistId1'));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    // react-redux
    // let newTodolist = {
    //     todoListId: 'todolistId1', id: '1', title: 'New Todolist',
    //     status: TaskStatuses.New, priority: TaskPriorities.Middle,
    //     description: '', addedDate: '', startDate: '', deadline: '', order: 0
    // };
    // const endState = todolistsReducer(startState, createTodolistAC({todolist: newTodolist}));

    // redux-toolkit
    let newTodolist = {
        todoListId: 'todolistId1', id: '1', title: 'New Todolist',
        status: TaskStatuses.New, priority: TaskPriorities.Middle,
        description: '', addedDate: '', startDate: '', deadline: '', order: 0
    };
    const endState = todolistsReducer(startState, createTodolistTC.fulfilled({todolist: newTodolist},
        'requestId', ''));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('New Todolist');
    expect(endState[0].filter).toBe('all');
});

test('update todolist title', () => {

    let updatedTodolistTitle = 'New Todolist';

    // react-redux
    // const action = updateTodolistTitleAC({id: todolistId1, title: updatedTodolistTitle});
    // const endState = todolistsReducer(startState, action);

    // redux-toolkit
    const action = updateTodolistTitleTC.fulfilled({id: todolistId1, title: updatedTodolistTitle},
        'requestId', {todolistId: 'todolistId1', title: updatedTodolistTitle});
    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe(updatedTodolistTitle);
    expect(endState[1].title).toBe('Купить');
});

test('update todolist filter', () => {

    const updatedTodolistFilter: FilterType = 'active';

    /*const action: ChangeTodolistFilterActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId1,
        filter: changedTodolistFilter
    }*/

    // react-redux
    // const action = updateTodolistFilterAC({id: todolistId1, filter: updatedTodolistFilter});
    // const endState = todolistsReducer(startState, action);

    // redux-toolkit
    const action = updateTodolistFilterAC({id: todolistId1, filter: updatedTodolistFilter});
    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe('all');
    expect(endState[0].filter).toBe(updatedTodolistFilter);
});

test('change todolist entity status', () => {

    const newEntityStatus: AppInitialStateStatusType = 'loading';

    // react-redux
    // const action = changeTodolistEntityStatusAC({id: todolistId1, entityStatus: newEntityStatus});
    // const endState = todolistsReducer(startState, action);

    // redux-toolkit
    const action = changeTodolistEntityStatusAC({id: todolistId1, entityStatus: newEntityStatus});
    const endState = todolistsReducer(startState, action);

    expect(endState[0].entityStatus).toBe(newEntityStatus);
    expect(endState[1].entityStatus).toBe('idle');
});

/*-----------------------------------------------------------------------------------*/

test('todolists should be set to the state', () => {

    // react-redux
    // const endState = todolistsReducer([], setTodolistsAC({todolists: startState}));

    // redux-toolkit
    const endState = todolistsReducer([], setTodolistsAC({todolists: startState}));

    expect(endState.length).toBe(2);
    expect(endState[0].id).toBe(todolistId1);
});

// export default {}