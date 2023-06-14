import {tasksReducer, TasksListType, tasksThunks} from './tasks-reducer';
import {todolistsThunks} from './todolists-reducer';
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

    const action = tasksThunks.deleteTaskTC.fulfilled({todolistId: 'todolistId2', taskId: '1'},
        'requestId', {todolistId: 'todolistId2', taskId: '1'});
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId2'].length).toBe(1);
    expect(endState['todolistId2'][0].title).toBe('New Bike');
    expect(endState['todolistId2'].every(task => task.id !== '1')).toBeTruthy();
});

test('correct task should be added', () => {

    const action = tasksThunks.createTaskTC.fulfilled(
        {
            task: {
                todoListId: 'todolistId1', id: '3', title: 'Angular',
                status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                description: '', addedDate: '', startDate: '', deadline: '', order: 0
            }
        },
        'requestId', {
            todoListId: 'todolistId1', id: '3', title: 'Angular',
            status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
            description: '', addedDate: '', startDate: '', deadline: '', order: 0
        }
    );
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId1'][0].title).toBe('Angular');
    expect(endState['todolistId1'][0].id).toBeDefined();
});

test('task status should be updated', () => {

    const action = tasksThunks.updateTaskTC.fulfilled({
            todolistId: 'todolistId1',
            taskId: '1',
            domainModel: {status: TaskStatuses.New}
        },
        'requestId', {todolistId: 'todolistId1', taskId: '1', domainModel: {status: TaskStatuses.New}});
    const endState = tasksReducer(startState, action);


    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New);
    //expect(endState['todolistId1'][0].status).toBeFalsy();
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
    //expect(endState['todolistId2'][0].status).toBeTruthy();
});

test('task title should be updated', () => {

    const title = 'New Title';

    const action = tasksThunks.updateTaskTC.fulfilled({todolistId: 'todolistId1', taskId: '1', domainModel: {title}},
        'requestId', {todolistId: 'todolistId1', taskId: '1', domainModel: {title}});
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId1'][0].title).toBe('New Title');
    expect(endState['todolistId1'][1].title).toBe('React');

});

/*-----------------------------------------------------------------------------------*/

test('correct array should be added when new todolist was added', () => {

    let newTodolist = {
        todolist: {
            todoListId: 'todolistId1', id: '1', title: 'New Todolist',
            status: TaskStatuses.New, priority: TaskPriorities.Middle,
            description: '', addedDate: '', startDate: '', deadline: '', order: 0
        }

    };
    const endState = tasksReducer(startState, todolistsThunks.createTodolistTC.fulfilled({todolist: newTodolist.todolist},
        'requestId', {id: '1', title: 'New Todolist', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'}));

    const keys = Object.keys(endState);
    const newKey = keys.find(el => el != 'todolistId1' && el != 'todolistId2');
    if (!newKey) {
        throw new Error('Error!');
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const endState = tasksReducer(startState, todolistsThunks.deleteTodolistTC.fulfilled({todolistId: 'todolistId2'},
        'requestId', 'todolistId2'));

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});

/*-----------------------------------------------------------------------------------*/

test('empty array should be added when set new todolist', () => {

    const action = todolistsThunks.getTodolistsTC.fulfilled({
        todolists: [
            {id: 'todolistId1', title: 'Выучить', addedDate: '', order: 0},
            {id: 'todolistId2', title: 'Купить', addedDate: '', order: 0}
        ]
    }, 'requestId')

    const endState = tasksReducer({}, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['todolistId1']).toStrictEqual([]);
    expect(endState['todolistId2']).toStrictEqual([]);
});

test('tasks should be added to correct todolist', () => {

    const action = tasksThunks.getTasksTC.fulfilled({todolistId: 'todolistId1', tasks: startState['todolistId1']},
        'requestId', 'todolistId1');
    const endState = tasksReducer({'todolistId2': [], 'todolistId1': []}, action);

    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId2'].length).toBe(0);
});