import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
//import {Input} from "./Input";
//import {Button} from "./Button";
import styles from "../components/Todolist.module.css";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddComment} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (titleInput: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const MESSAGE_INPUT_VALUE_REQUIRED = 'Поле обязательно для заполнения!';

    const callBackButtonHandler = () => {

        const trimValue = inputValue.trim()

        if (trimValue) {
            props.addItem(trimValue)
            setInputValue('')
        } else {
            setError(`${MESSAGE_INPUT_VALUE_REQUIRED}`);
        }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError('');
        return event.key === 'Enter' ? callBackButtonHandler() : '';
    }

    return (
        /*<div className={styles.inputBox}>*/
        <div>
            {/*<Input inputValue={inputValue}
                   setInputValue={setInputValue}
                   onKeyPress={callBackButtonHandler}
                   error={error}
                   setError={setError}/>*/}
            <TextField value={inputValue}
                       variant={'outlined'}
                       label={'Введите текст'}
                       onChange={onChangeInputHandler}
                       onKeyDown={onKeyDownHandler}
                       error={!!error}
                       helperText={error}
            />
            {/*<Button
                name={"+"}
                callBack={callBackButtonHandler} />*/}
            <IconButton onClick={callBackButtonHandler}
                    //variant={'contained'}
                    color={'primary'}
                    size={'medium'}
            >
                <AddComment />
            </IconButton >
            {/*<div className={styles.spanError}><span>{error}</span></div>*/}
        </div>
    );
}