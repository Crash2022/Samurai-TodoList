import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {selectTodolists} from "../../state/selectors";
import {Grid, Paper} from "@material-ui/core";
import {Todolist} from "./Todolist";
import styles from "./Todolist.module.css";
import React, {useCallback} from "react";
import {AddItemForm} from "../../common/components/AddItemForm/AddItemForm";
import {createTodolistTC} from "../../state/todolists-reducer";
import {v1} from "uuid";

type TodolistMainType = {
    demo?: boolean
}

export const TodolistMain: React.FC<TodolistMainType> = ({demo = false}) => {

    const MESSAGE_TODOS_END = 'Список задач пуст!';

    const dispatch = useAppDispatch();
    const todolists = useAppSelector(selectTodolists);

    const addNewTodoList = useCallback((title: string) => {
        dispatch(createTodolistTC({
            id: v1(), title: title, filter: 'all',
            entityStatus: 'idle', addedDate: '', order: 0
        }));
    }, [dispatch])

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