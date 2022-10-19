import {AppBar, Button, Container, Grid, IconButton,
    Paper, Toolbar, Typography} from '@material-ui/core';
import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {AddItemForm} from "./UI/AddItemForm";
import {Menu} from "@material-ui/icons";
import {addTodolistAC,changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import styles from './components/Todolist.module.css'

/*https://samuraitodo.herokuapp.com/*/

export type FilterType = 'all' | 'active' | 'completed';

export type TaskListType = {
    [todolistId: string]: Array<TaskType>
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const AppWithRedux = React.memo(() => {

    console.log('app')

    const MESSAGE_TODOS_END = 'Список задач пуст!';

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists);

    /*------------------------------------------------*/

    const addNewTodoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
    },[dispatch])

    // const removeTodoList = useCallback((todolistId: string) => {
    //     const action = removeTodolistAC(todolistId); // памятка про экшн
    //     dispatch(action);
    // },[dispatch])

    // const changeTodolistTitle = useCallback((todolistId: string, newInputValue: string) => {
    //     dispatch(changeTodolistTitleAC(todolistId, newInputValue));
    // },[dispatch])

    // const filterTasks = useCallback((todolistId: string, filterValue: FilterType) => {
    //     dispatch(changeTodolistFilterAC(todolistId, filterValue));
    // },[dispatch])

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

                        <Grid container spacing={5} justifyContent={'center'}>
                            {
                                todolists.map(todo => {
                                    return (
                                        <Grid item key={todo.id}>
                                            <Paper style={{padding: '15px'}} elevation={8}>
                                                <Todolist
                                                    todolistId={todo.id}
                                                    title={todo.title}
                                                    filter={todo.filter}
                                                    //filterTasks={filterTasks}
                                                    //removeTodoList={removeTodoList}
                                                    //changeTodolistTitle={changeTodolistTitle}
                                                />
                                            </Paper>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                        : <div className={styles.todoEnd}>{MESSAGE_TODOS_END}</div>
                }
            </Container>

        </div>
    );
})