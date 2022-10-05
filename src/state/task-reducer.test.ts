import {TaskListType, TodoListType} from "../App";
import {taskReducer, addTaskAC, removeTaskAC,
    changeTaskStatusAC, changeTaskTitleAC} from "./task-reducer";
//import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC, todolistReducer} from "./todolist-reducer";

test('correct task should be removed', () => {

    const startState = <TaskListType>({
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "React Native", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "Notebook", isDone: true},
            {id: '2', title: "Bread", isDone: false},
            {id: '3', title: "Bike", isDone: false}
        ]
    })

    const action = removeTaskAC('todolistId2', '1');
    const endState = taskReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(4);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'][0].title).toBe('Bread');
    expect(endState['todolistId2'].every(task => task.id !== '1')).toBeTruthy();
});

test('correct task should be added', () => {

    const startState = <TaskListType>({
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "React Native", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "Notebook", isDone: true},
            {id: '2', title: "Bread", isDone: false},
            {id: '3', title: "Bike", isDone: false}
        ]
    })

    const action = addTaskAC('todolistId1', 'New Task');
    const endState = taskReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(5);
    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId1'][0].title).toBe('New Task');
    expect(endState['todolistId1'][0].id).toBeDefined();
});

test('task status should be changed', () => {

    const startState = <TaskListType>({
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "React Native", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "Notebook", isDone: true},
            {id: '2', title: "Bread", isDone: false},
            {id: '3', title: "Bike", isDone: false}
        ]
    })

    const action = changeTaskStatusAC('todolistId1', '1', false);
    const endState = taskReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(4);
    expect(endState['todolistId2'].length).toBe(3);
    //expect(endState['todolistId1'][0].isDone).toBe(false);
    expect(endState['todolistId1'][0].isDone).toBeFalsy();
    //expect(endState['todolistId2'][0].isDone).toBe(true);
    expect(endState['todolistId2'][0].isDone).toBeTruthy();
});

test('task title should be changed', () => {

    const startState = <TaskListType>({
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "React Native", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "Notebook", isDone: true},
            {id: '2', title: "Bread", isDone: false},
            {id: '3', title: "Bike", isDone: false}
        ]
    })

    const newTitle = 'New Title';
    const action = changeTaskTitleAC('todolistId1', '1', newTitle);
    const endState = taskReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(4);
    expect(endState['todolistId1'][0].title).toBe(newTitle);

});

test('correct array should be added when new todolist was added', () => {

    const startState = <TaskListType>({
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "React Native", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "Notebook", isDone: true},
            {id: '2', title: "Bread", isDone: false},
            {id: '3', title: "Bike", isDone: false}
        ]
    })

    let newTodolistTitle = 'New Todolist';
    const endState = taskReducer(startState, addTodolistAC(newTodolistTitle));

    const keys = Object.keys(endState);
    const newKey = keys.find( el => el != 'todolistId1' && el != 'todolistId2');
    if (!newKey) {
        throw new Error('Error!');
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const startState = <TaskListType>({
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "React Native", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "Notebook", isDone: true},
            {id: '2', title: "Bread", isDone: false},
            {id: '3', title: "Bike", isDone: false}
        ]
    })

    const endState = taskReducer(startState, removeTodolistAC('todolistId2'));

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});