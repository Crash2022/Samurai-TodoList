import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from '@material-ui/core';
import {useAppSelector} from '../../hooks/useAppSelector';
import {selectAppStatus} from '../../../state/selectors';
import s from '../../styles/Todolist.module.css'

type EditableSpanPropsType = {
    title: string
    onChangeInput: (newInputValue: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({title, onChangeInput}) => {

    console.log('editable span')

    const status = useAppSelector(selectAppStatus)

    const [editMode, setEditMode] = useState<boolean>(false);
    const [inputTitle, setInputTitle] = useState<string>('');

    const onClickEditSpanHandler = () => {
        setEditMode(true);
        setInputTitle(title);
    }
    const onClickNotEditSpanHandler = () => {
        onChangeInput(inputTitle);
        setEditMode(false);
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(event.currentTarget.value);
    }

    const enterChangeTitle = (event: KeyboardEvent<HTMLInputElement>) => {
        return event.key === 'Enter' ? onClickNotEditSpanHandler() : '';
    }

    return (
        editMode
            ? <TextField
                label="Измените текст"
                variant="standard"
                autoFocus
                value={inputTitle}
                onChange={onChangeInputHandler}
                onBlur={onClickNotEditSpanHandler}
                onKeyDown={enterChangeTitle}
                disabled={status === 'loading'}
            />
            : <span onDoubleClick={onClickEditSpanHandler} className={s.textSpan}>{title}</span>
    );
})