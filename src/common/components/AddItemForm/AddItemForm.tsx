import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddComment} from '@material-ui/icons';
import s from './AddItemForm.module.css'

type AddItemFormPropsType = {
    addItem: (titleInput: string) => void
    disabled?: boolean
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({addItem, disabled = false}) => {

    console.log('add item form')

    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const MESSAGE_INPUT_VALUE_REQUIRED = 'Поле обязательно для заполнения!';

    const callBackButtonHandler = () => {

        const trimValue = inputValue.trim()

        if (trimValue) {
            addItem(trimValue);
            setInputValue('');
        } else {
            setError(`${MESSAGE_INPUT_VALUE_REQUIRED}`);
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
                           label="Введите текст"
                           onChange={onChangeInputHandler}
                           onKeyDown={onKeyDownHandler}
                           value={inputValue}
                           error={!!error}
                           helperText={error}
                           disabled={disabled}
                />
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