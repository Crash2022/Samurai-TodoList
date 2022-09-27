import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core'
//import Typography from '@material-ui/core/Typography'
import React, {useState} from 'react'
import {v1} from 'uuid'
import './App.css'
import {TaskType, Todolist} from './components/Todolist'
//import styles from './components/Todolist.module.css'
import {AddItemForm} from "./UI/AddItemForm";
import {Menu} from "@material-ui/icons";

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

    let todolistId1 = v1();
    let todolistId2 = v1();

    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: 'Выучить', filter: 'all'},
        {id: todolistId2, title: 'Купить', filter: 'all'}
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

    const MESSAGE_TASKS_END = 'Списки задач закончились!';
    const [todoEnd, setTodoEnd] = useState<string>(`${MESSAGE_TASKS_END}`);

    /*------------------------------------------------*/

    const addTask = (titleInput: string, todolistId: string) => {
        /*let newTask = {id: v1(), title: titleInput, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});*/

        let newTask = {id: v1(), title: titleInput, isDone: false};
        setTasks({...tasksObj, [todolistId]: [newTask, ...tasksObj[todolistId]]});
    }

    const removeTask = (taskId: string, todolistId: string) => {
        /*let tasks = tasksObj[todolistId];
        let removedTask = tasks.filter(t => t.id !== taskId);
        tasksObj[todolistId] = removedTask;
        setTasks({...tasksObj});*/

        setTasks({...tasksObj, [todolistId]: tasksObj[todolistId].filter(t => t.id !== taskId)});
    }

    const changeTaskTitle = (todolistId: string, taskId: string, newInputValue: string) => {
        setTasks({
            ...tasksObj,
            [todolistId]: tasksObj[todolistId].map(el => el.id === taskId ? {...el, title: newInputValue} : el)
        })
    }

    /*------------------------------------------------*/

    const filterTask = (todolistId: string, filterValue: FilterType) => {
        /*let todolist = todolists.find(td => td.id === todolistId);
        if (todolist) {
            todolist.filter = filterValue;
            setTodolists([...todolists]);
        }*/

        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: filterValue} : el))
    }

    /*------------------------------------------------*/

    const changeCheckbox = (todolistId: string, taskId: string, newIsDone: boolean) => {

        /*let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }*/

        setTasks({
            ...tasksObj,
            [todolistId]: tasksObj[todolistId].map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)
        })
    }

    /*------------------------------------------------*/

    const addNewTodoList = (titleInput: string) => {
        let newTodoList: TodoListType = {id: v1(), title: titleInput, filter: 'all'};
        setTodolists([...todolists, newTodoList]);
        setTasks({...tasksObj, [newTodoList.id]: []});
    }

    const removeTodoList = (todoListId: string) => {
        let deletedList = todolists.filter(t => t.id !== todoListId);
        setTodolists(deletedList);

        delete tasksObj[todoListId];
        setTasks({...tasksObj});
    }

    const changeTodolistTitle = (todolistId: string, newTitleValue: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: newTitleValue} : el));
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
        <div className="App">

            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            TodoLists
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>

            <Container fixed>
                {/*<div className={styles.todolistHeader}>*/}
                    <Grid container style={{padding: '20px', textAlign: 'center'}} direction={'column'}>
                        <Grid item style={{padding: '10px'}}>
                            Добавить новый список
                        </Grid>
                        <Grid item>
                            <AddItemForm addItem={addNewTodoList}/>
                        </Grid>
                    </Grid>
                {
                    todolists.length !== 0 ?

                        /*<div className="App">*/
                        /*<div className={styles.todolistMain}>*/
                        <Grid container spacing={5} justifyContent={'center'}>
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
                                        <Grid item key={todo.id}>
                                            <Paper style={{padding: '15px'}} elevation={8}>
                                                <Todolist
                                                    todolistId={todo.id}
                                                    title={todo.title}
                                                    tasks={filteredTasks}
                                                    addTask={addTask}
                                                    removeTask={removeTask}
                                                    filterTask={filterTask}
                                                    filter={todo.filter}
                                                    changeCheckbox={changeCheckbox}
                                                    removeTodoList={removeTodoList}
                                                    changeTaskTitle={changeTaskTitle}
                                                    changeTodolistTitle={changeTodolistTitle}
                                                />
                                            </Paper>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                        /*</div>*/
                        /*: <div className={styles.noTasksList}>{todoEnd}</div>*/
                        : <div>{todoEnd}</div>
                }
            </Container>

        </div>
    );
}

export default App;