import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {selectTodolists} from '../../state/selectors';
import {Grid, Paper} from '@material-ui/core';
import {Todolist} from './Todolist';
import s from '../../common/styles/Todolist.module.css';
import React, {useCallback} from 'react';
import {AddItemForm} from '../../common/components/AddItemForm/AddItemForm';
import {createTodolistTC} from '../../state/todolists-reducer';
import {v1} from 'uuid';
// import {gridStyle} from './TodolistMainStyles'

// const gridStyle = {
//     flexWrap: 'nowrap',
//     overflowX: 'scroll'
// }

type TodolistMainType = {
    demo?: boolean
}

export const TodolistMain: React.FC<TodolistMainType> = ({demo = false}) => {

    // const MESSAGE_TODOS_END = 'Список задач пуст!';
    const MESSAGE_TODOS_END = 'No todolists';

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
            <Grid container direction={'column'} className={s.todolistAddForm}>
                <Grid item className={s.todolistAddForm_item}>
                    Add new todolist
                </Grid>
                <Grid item>
                    <AddItemForm addItem={addNewTodoList}/>
                </Grid>
            </Grid>

            {
                todolists.length !== 0 ?

                    <Grid container spacing={5}
                        /*justifyContent={'center'}*/
                        /*className={s.todolistGridWrapper}*/
                          style={{flexWrap: 'nowrap', overflowX: 'scroll'}}
                          // style={gridStyle}
                    >
                        {
                            todolists.map(todo => {
                                return (
                                    <Grid item key={todo.id}>
                                        {/*<Paper elevation={8} className={s.todolistPaper}>*/}
                                        <div>
                                            <Todolist
                                                todolist={todo}
                                                demo={demo}
                                            />
                                        </div>
                                        {/*</Paper>*/}
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    : <div className={s.todoEnd}>{MESSAGE_TODOS_END}</div>
            }
        </>
    )
}