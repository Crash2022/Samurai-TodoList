import {todolistReducer} from "./todolist-reducer";
import {v1} from "uuid";
import {TodoListType} from "../App";

test('correct todolist should be removed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState = <Array<TodoListType>>([
        {id: todolistId1, title: 'Выучить', filter: 'all'},
        {id: todolistId2, title: 'Купить', filter: 'all'}
    ])

    const endState = todolistReducer(startState,
        {type: 'REMOVE-TODOLIST',
            id: todolistId1
        })

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState = <Array<TodoListType>>([
        {id: todolistId1, title: 'Выучить', filter: 'all'},
        {id: todolistId2, title: 'Купить', filter: 'all'}
    ])

    let newTodolistTitle = 'New Todolist'

    const endState = todolistReducer(startState,
        {type: 'ADD-NEW-TODOLIST',
            id: v1(),
            title: newTodolistTitle
        })

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('all');
});