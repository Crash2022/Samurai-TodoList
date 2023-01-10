import {
    tasksReducer,
    TasksListType,
    getTasksTC,
    deleteTaskTC,
    updateTaskTC,
    createTaskTC,
    deleteTaskAC, createTaskAC, updateTaskAC, setTasksAC
} from './tasks-reducer';
import {
    createTodolistAC,
    createTodolistTC,
    deleteTodolistAC,
    deleteTodolistTC,
    getTodolistsTC, setTodolistsAC
} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolistsAPI';

let startState: TasksListType = {};

beforeEach(() => {
    startState = ({
        'todolistId1': [
            {
                todoListId: 'todolistId1', id: '1', title: 'HTML&CSS',
                status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                description: '', addedDate: '', startDate: '', deadline: '', order: 0
            },
            {
                todoListId: 'todolistId1', id: '2', title: 'React',
                status: TaskStatuses.New, priority: TaskPriorities.Hi,
                description: '', addedDate: '', startDate: '', deadline: '', order: 0
            }
        ],
        'todolistId2': [
            {
                todoListId: 'todolistId2', id: '1', title: 'Notebook',
                status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', addedDate: '', startDate: '', deadline: '', order: 0
            },
            {
                todoListId: 'todolistId2', id: '2', title: 'New Bike',
                status: TaskStatuses.Completed, priority: TaskPriorities.Later,
                description: '', addedDate: '', startDate: '', deadline: '', order: 0
            }
        ]
    })
})

test('correct task should be deleted', () => {

    // react-redux
    const action = deleteTaskAC('todolistId2', '1');
    const endState = tasksReducer(startState, action);

    // redux-toolkit
    // const action = deleteTaskTC.fulfilled({todolistId: 'todolistId2', taskId: '1'},
    //     'requestId', {todolistId: 'todolistId2', taskId: '1'});

    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId2'].length).toBe(1);
    expect(endState['todolistId2'][0].title).toBe('New Bike');
    expect(endState['todolistId2'].every(task => task.id !== '1')).toBeTruthy();
});

test('correct task should be added', () => {

    // react-redux
    const action = createTaskAC(
            {todoListId: 'todolistId1', id: '3', title: 'Angular',
            status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
            description: '', addedDate: '', startDate: '', deadline: '', order: 0}
    );
    const endState = tasksReducer(startState, action);

    // redux-toolkit
    // const action = createTaskTC.fulfilled(
    //     {
    //         task: {
    //             todoListId: 'todolistId1', id: '3', title: 'Angular',
    //             status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
    //             description: '', addedDate: '', startDate: '', deadline: '', order: 0
    //         }
    //     },
    //     'requestId', {
    //         todoListId: 'todolistId1', id: '3', title: 'Angular',
    //         status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
    //         description: '', addedDate: '', startDate: '', deadline: '', order: 0
    //     }
    // );

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId1'][0].title).toBe('Angular');
    expect(endState['todolistId1'][0].id).toBeDefined();
});

test('task status should be updated', () => {

    // react-redux
    const action = updateTaskAC('todolistId1',  '1', {status: TaskStatuses.New});
    const endState = tasksReducer(startState, action);

    // redux-toolkit
    // const action = updateTaskTC.fulfilled({
    //         todolistId: 'todolistId1',
    //         taskId: '1',
    //         domainModel: {status: TaskStatuses.New}
    //     },
    //     'requestId', {todolistId: 'todolistId1', taskId: '1', domainModel: {status: TaskStatuses.New}});


    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New);
    //expect(endState['todolistId1'][0].status).toBeFalsy();
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
    //expect(endState['todolistId2'][0].status).toBeTruthy();
});

test('task title should be updated', () => {

    const title = 'New Title';
    // react-redux
    const action = updateTaskAC('todolistId1',  '1', {title});
    const endState = tasksReducer(startState, action);

    // redux-toolkit
    // const action = updateTaskTC.fulfilled({todolistId: 'todolistId1', taskId: '1', domainModel: {title}},
    //     'requestId', {todolistId: 'todolistId1', taskId: '1', domainModel: {title}});

    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId1'][0].title).toBe('New Title');
    expect(endState['todolistId1'][1].title).toBe('React');

});

/*-----------------------------------------------------------------------------------*/

test('correct array should be added when new todolist was added', () => {

    // react-redux
    let newTodolist = {
        todoListId: 'todolistId1', id: '1', title: 'New Todolist',
        status: TaskStatuses.New, priority: TaskPriorities.Middle,
        description: '', addedDate: '', startDate: '', deadline: '', order: 0
    };
    const endState = tasksReducer(startState, createTodolistAC(newTodolist));

    // redux-toolkit
    // let newTodolist = {
    //     todolist: {
    //         todoListId: 'todolistId1', id: '1', title: 'New Todolist',
    //         status: TaskStatuses.New, priority: TaskPriorities.Middle,
    //         description: '', addedDate: '', startDate: '', deadline: '', order: 0
    //     }
    //
    // };
    // const endState = tasksReducer(startState, createTodolistTC.fulfilled({todolist: newTodolist.todolist},
    //     'requestId', {id: '1', title: 'New Todolist', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'}));

    const keys = Object.keys(endState);
    const newKey = keys.find(el => el != 'todolistId1' && el != 'todolistId2');
    if (!newKey) {
        throw new Error('Error!');
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    // react-redux
    const endState = tasksReducer(startState, deleteTodolistAC( 'todolistId2'));

    // redux-toolkit
    // const endState = tasksReducer(startState, deleteTodolistTC.fulfilled({todolistId: 'todolistId2'},
    //     'requestId', 'todolistId2'));

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});

/*-----------------------------------------------------------------------------------*/

test('empty array should be added when set new todolist', () => {

    // react-redux
    const action = setTodolistsAC([
        {id: 'todolistId1', title: 'Выучить', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'Купить', addedDate: '', order: 0}
    ])

    // redux-toolkit
    // const action = getTodolistsTC.fulfilled({
    //     todolists: [
    //         {id: 'todolistId1', title: 'Выучить', addedDate: '', order: 0},
    //         {id: 'todolistId2', title: 'Купить', addedDate: '', order: 0}
    //     ]
    // }, 'requestId')

    const endState = tasksReducer({}, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['todolistId1']).toStrictEqual([]);
    expect(endState['todolistId2']).toStrictEqual([]);
});

test('tasks should be added to correct todolist', () => {

    // react-redux
    const action = setTasksAC(  'todolistId1', startState['todolistId1']);
    const endState = tasksReducer({'todolistId2': [], 'todolistId1': []}, action);

    // redux-toolkit
    // const action = getTasksTC.fulfilled({todolistId: 'todolistId1', tasks: startState['todolistId1']},
    //     'requestId', 'todolistId1');

    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId2'].length).toBe(0);
});

// export default {}