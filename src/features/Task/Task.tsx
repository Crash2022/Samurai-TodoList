import React, {ChangeEvent, useCallback, useEffect} from 'react'
import {v1} from 'uuid'
import s from '../../common/styles/Todolist.module.css'
import {EditableSpan} from '../../common/components/EditableSpan/EditableSpan';
import {Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {deleteTaskTC, updateTaskTC} from '../../state/tasks-reducer';
import {TaskAPIType, TaskStatuses} from '../../api/todolistsAPI';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {selectAppStatus} from '../../state/selectors';

type TaskPropsType = {
    todolistId: string
    task: TaskAPIType
}

export const Task: React.FC<TaskPropsType> = React.memo(({todolistId, task}) => {

    console.log('task')

    const dispatch = useAppDispatch();
    const status = useAppSelector(selectAppStatus)

    const removeTaskHandler = useCallback(() => {
        // redux-toolkit
        // dispatch(deleteTaskTC({todolistId: todolistId, taskId: task.id}));

        // react-redux
        dispatch(deleteTaskTC(todolistId, task.id));
    }, [todolistId, task.id])

    const changeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        // redux-toolkit
        // dispatch(updateTaskTC({
        //     todolistId: todolistId, taskId: task.id,
        //     domainModel: {status: event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}
        // }));

        // react-redux
        let newIsDoneValue = event.currentTarget.checked;
        dispatch(updateTaskTC(todolistId, task.id,
            {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New}));
    }, [todolistId, task.id])

    const changeTaskTitleHandler = useCallback((newInputValue: string) => {
        // redux-toolkit
        // dispatch(updateTaskTC({
        //     todolistId: todolistId,
        //     taskId: task.id,
        //     domainModel: {title: newInputValue}
        // }));

        // react-redux
        dispatch(updateTaskTC(todolistId, task.id, {title: newInputValue}));
    }, [todolistId, task.id])

    return (
        <li key={v1()} className={task.status === TaskStatuses.Completed ? s.isDoneTask : ''}>
            <div className={s.taskItem}>
                <div>
                    <Checkbox checked={task.status === TaskStatuses.Completed}
                              onChange={changeStatusHandler}
                              disabled={status === 'loading'}
                    />
                </div>
                <div className={s.taskText}>
                    <EditableSpan title={task.title}
                                  onChangeInput={changeTaskTitleHandler}
                    />
                </div>
                <div className={s.deleteButton}>
                    <IconButton onClick={removeTaskHandler}
                                disabled={status === 'loading'}
                                size='small'
                    >
                        <Delete/>
                    </IconButton>
                </div>
            </div>
        </li>
    );
})
