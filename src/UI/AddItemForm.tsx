import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddComment} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (titleInput: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    console.log('add item form')

    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const MESSAGE_INPUT_VALUE_REQUIRED = 'Поле обязательно для заполнения!';

    const callBackButtonHandler = () => {

        const trimValue = inputValue.trim()

        if (trimValue) {
            props.addItem(trimValue);
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
        <div>
            <TextField variant="outlined"
                       label="Введите текст"
                       onChange={onChangeInputHandler}
                       onKeyDown={onKeyDownHandler}
                       value={inputValue}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={callBackButtonHandler}
                        color="primary"
                        size="medium"
            >
                <AddComment />
            </IconButton >
        </div>
    );
})