import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
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

    const MESSAGE_INPUT_VALUE_LENGTH = 'Text length must be 1-100 symbols';

    const [editMode, setEditMode] = useState<boolean>(false);
    const [inputTitle, setInputTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [label, setLabel] = useState<string>('Change text');

    const onClickEditSpanHandler = () => {
        setEditMode(true);
        setInputTitle(title);
    }
    // const onClickNotEditSpanHandler = () => {
    //     onChangeInput(inputTitle);
    //     setEditMode(false);
    // }

    const onClickNotEditSpanHandler = () => {
        if (inputTitle.length > 0 && inputTitle.length < 100) {
            onChangeInput(inputTitle);
            setEditMode(false);
        } else {
            setError(`${MESSAGE_INPUT_VALUE_LENGTH}`);
            setLabel(`${MESSAGE_INPUT_VALUE_LENGTH}`);
        }

    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(event.currentTarget.value);
    }

    const enterChangeTitle = (event: KeyboardEvent<HTMLInputElement>) => {
        return event.key === 'Enter' ? onClickNotEditSpanHandler() : '';
    }

    useEffect(() => {
        if (inputTitle.length < 1 && inputTitle.length > 100) {
            setError(`${MESSAGE_INPUT_VALUE_LENGTH}`);
            setLabel(`${MESSAGE_INPUT_VALUE_LENGTH}`);
        }
    }, [])

    return (
        editMode
            ? <TextField
                // label="Измените текст"
                label={label}
                variant="standard"
                autoFocus
                value={inputTitle}
                error={!!error}
                onChange={onChangeInputHandler}
                onBlur={onClickNotEditSpanHandler}
                onKeyDown={enterChangeTitle}
                disabled={status === 'loading'}
                className={s.editableSpan}
            />
            : <span onDoubleClick={onClickEditSpanHandler} className={s.textSpan}>{title}</span>
    );
})