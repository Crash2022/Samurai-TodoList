import {TaskListType} from "../App";
import {removeTaskAC, taskReducer} from "./task-reducer";

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
            {id: '3', title: "Bike", isDone: false},
        ]
    })

    const action = removeTaskAC('todolistId1', '1');
    const endState = taskReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId1'][0].title).toBe('JS');
    expect(endState['todolistId1'].every(task => task.id !== '1')).toBeTruthy();
});
