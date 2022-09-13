import React, {useState} from 'react'
import {v1} from 'uuid'
import './App.css'
import {TaskType, Todolist} from './components/Todolist'
import styles from './components/Todolist.module.css'

/*https://samuraitodo.herokuapp.com/*/

export type FilterType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

export type TaskListType = {
    [todolistId: string]: Array<TaskType>
}

const App = () => {
    //const title1 = "What 2022-2023";
    //const title2 = "What 2023";

    /*const [tasks1,setTasks1] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "React Native", isDone: false }

    ])*/
    /* let tasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false },
        { id: 3, title: "No", isDone: false }
    ] */

    let todolistId1 = v1();
    let todolistId2 = v1();

    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'}
    ])

    const [tasksObj, setTasks] = useState<TaskListType>({
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
    })

    const [todoEnd, setTodoEnd] = useState<string>('Tasks ended!')

    /*------------------------------------------------*/

    const removeTask = (taskId: string, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let removedTask = tasks.filter(t => t.id !== taskId);
        tasksObj[todolistId] = removedTask;
        setTasks({...tasksObj});

        // Способ в одну строчку
        // setTasks( {...tasksObj, [todolistId]: tasksObj[todolistId].filter(t => t.id !== taskId)} );
    }

    const removeTodoList = (todoListId: string) => {
        let deletedList = todolists.filter(t => t.id !== todoListId);
        setTodolists(deletedList);

        delete tasksObj[todoListId];
        setTasks({...tasksObj});
    }

    /*------------------------------------------------*/

    const filterTask = (filterValue: FilterType, todolistId: string) => {
        let todolist = todolists.find(td => td.id === todolistId);
        if (todolist) {
            todolist.filter = filterValue;
            setTodolists([...todolists]);
        }
    }

    /*------------------------------------------------*/

    const addTask = (titleInput: string, todolistId: string) => {
        let newTask = {id: v1(), title: titleInput, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});
    }

    /*------------------------------------------------*/

    const changeCheckbox = (taskId: string, isDone: boolean, todolistId: string) => {

        // Простой способ
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }

        // Сложный способ из "четверга"
        // (taskId: string, newIsDoneValue: boolean)
        // setTasks1(tasks1.map(el=>el.id===taskId ? {...el, isDone: newIsDoneValue} :el))
    }

    /*------------------------------------------------*/

    // Можно фильтр вынести в отдельную функцию и воспользоваться ей в map
    /*    const getTasksForTodoList = (filter: FilterType, tasks: Array<TaskType>) => {
            switch (filter) {
                case "active":
                    return tasks.filter(t => !t.isDone)
                case "completed":
                    return tasks.filter(t => t.isDone)
                default:
                    return tasks
            }
        }*/

    /*------------------------------------------------*/

    return (

        todolists.length !== 0 ?

            <div className="App">
                {
                    todolists.map(todo => {

                        //const tasks = getTasksForTodoList(todo.filter, tasks[todo.id]);

                        let filteredTasks = tasksObj[todo.id];

                        if (todo.filter === 'active') {
                            filteredTasks = filteredTasks.filter(f => !f.isDone)
                        }
                        if (todo.filter === 'completed') {
                            filteredTasks = filteredTasks.filter(f => f.isDone)
                        }

                        return (
                            <Todolist
                                key={todo.id}
                                id={todo.id}
                                title={todo.title}
                                tasks={filteredTasks}
                                removeTask={removeTask}
                                filterTask={filterTask}
                                addTask={addTask}
                                changeCheckbox={changeCheckbox}
                                filter={todo.filter}
                                removeTodoList={removeTodoList}
                            />
                        )
                    })
                }
            </div>

        : <div className={styles.noTasks}>{todoEnd}</div>
    );
}

export default App;