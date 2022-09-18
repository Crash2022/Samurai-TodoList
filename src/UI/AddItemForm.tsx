import React, {useState} from 'react';
import {Input} from "./Input";
import {Button} from "./Button";
import styles from "../components/Todolist.module.css";

export type AddItemFormPropsType = {
    todolistId: string
    addTask: (titleInput:string, todolistId: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const MESSAGE_INPUT_VALUE_REQUIRED = 'Поле обязательно для заполнения!';

    const callBackButtonHandler = () => {

        const trimValue = inputValue.trim()

        if (trimValue) {
            props.addTask(trimValue, props.todolistId)
            setInputValue('')
        } else {
            setError(`${MESSAGE_INPUT_VALUE_REQUIRED}`);
        }
    }

    return (
        <div>
            <Input inputValue={inputValue}
                   setInputValue={setInputValue}
                   onKeyPress={callBackButtonHandler}
                   error={error}
                   setError={setError}/>
            <Button
                name={"+"}
                callBack={callBackButtonHandler} />
            <div className={styles.spanError}><span>{error}</span></div>
        </div>
    );
}