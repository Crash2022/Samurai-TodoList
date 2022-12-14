import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddComment} from '@material-ui/icons';
import s from '../../styles/Todolist.module.css'

type AddItemFormPropsType = {
    addItem: (titleInput: string) => void
    disabled?: boolean
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({addItem, disabled = false}) => {

    console.log('add item form')

    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    // const MESSAGE_INPUT_VALUE_REQUIRED = 'Поле обязательно для заполнения!';
    const MESSAGE_INPUT_VALUE_REQUIRED = 'Field is required!';
    const MESSAGE_INPUT_VALUE_LENGTH = 'Text length must be 1-100 symbols';

    /*const callBackButtonHandler = () => {

        const trimValue = inputValue.trim()

        if (trimValue) {
            addItem(trimValue);
            setInputValue('');
        } else {
            setError(`${MESSAGE_INPUT_VALUE_REQUIRED}`);
        }
    }*/

    const callBackButtonHandler = () => {

        const trimValue = inputValue.trim()

        if (trimValue && trimValue.length <= 100) {
            addItem(trimValue);
            setInputValue('');
        } else {
            setError(`${MESSAGE_INPUT_VALUE_LENGTH}`);
        }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError('');
        }
        return event.key === 'Enter' ? callBackButtonHandler() : '';
    }

    return (
        <div className={s.addItemForm}>
            <div>
                <TextField variant="outlined"
                           // label="Введите текст"
                           label="Enter text here..."
                           onChange={onChangeInputHandler}
                           onKeyDown={onKeyDownHandler}
                           value={inputValue}
                           error={!!error}
                           helperText={error}
                           disabled={disabled}
                />
                <div className={s.addItemForm_length}>
                    Text length: {inputValue.length} symbols, max - 100
                </div>
            </div>
            <div>
                <IconButton onClick={callBackButtonHandler}
                            color="primary"
                            size="medium"
                            disabled={disabled}
                            style={{marginLeft: '5px'}}
                >
                    <AddComment/>
                </IconButton>
            </div>
        </div>
    );
})