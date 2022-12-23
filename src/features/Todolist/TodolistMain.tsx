import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectAuthIsLoggedIn, selectTodolists} from "../../state/selectors";
import {Grid, Paper} from "@material-ui/core";
import {Todolist} from "./Todolist";
import styles from "./Todolist.module.css";
import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {createTodolistTC} from "../../state/todolists-reducer";
import {v1} from "uuid";
import {PATH} from "../../api/path";
import {useNavigate} from "react-router-dom";

type TodolistMainType = {
    demo?: boolean
}

export const TodolistMain: React.FC<TodolistMainType> = ({demo = false}) => {

    const MESSAGE_TODOS_END = 'Список задач пуст!';

    // const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const todolists = useAppSelector(selectTodolists);
    // const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

    const addNewTodoList = useCallback((title: string) => {
        dispatch(createTodolistTC({
            id: v1(), title: title, filter: 'all',
            entityStatus: 'idle', addedDate: '', order: 0
        }));
    }, [dispatch])

    // редирект на логин, если не залогинились
    // useEffect(() => {
    //     !isLoggedIn && navigate(PATH.COMMON.LOGIN);
    // }, [isLoggedIn])

    return (
        <>
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
                                                todolist={todo}
                                                demo={demo}
                                            />
                                        </Paper>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    : <div className={styles.todoEnd}>{MESSAGE_TODOS_END}</div>
            }
        </>
    )
}