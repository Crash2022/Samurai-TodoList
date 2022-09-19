import React, {useState} from 'react';
import {Input} from "./Input";
//import {Button} from "./Button";
import styles from "../components/Todolist.module.css";
import {Button} from "@material-ui/core";

export type AddItemFormPropsType = {
    addItem: (titleInput:string) => void
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

    return (
        <div>
            <Input inputValue={inputValue}
                   setInputValue={setInputValue}
                   onKeyPress={callBackButtonHandler}
                   error={error}
                   setError={setError}/>
            {/*<Button
                name={"+"}
                callBack={callBackButtonHandler} />*/}
            <Button onClick={callBackButtonHandler}
                    variant={'contained'}
                    color={'primary'}
                    size={'small'}
            >
                +
            </Button>
            <div className={styles.spanError}><span>{error}</span></div>
        </div>
    );
}