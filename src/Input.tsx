import React, {ChangeEvent, KeyboardEvent} from 'react';

export type InputPropsType = {
    inputValue: string
    setInputValue: (title: string)=>void
<<<<<<< HEAD
    //callBackButtonHandler: (event: KeyboardEvent<HTMLInputElement>) => void
=======
    keyEnter: ()=> void
>>>>>>> e6b84df863bb50ff35b5af8d16d0527b1d7a27c4
}

export const Input = (props: InputPropsType) => {

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setInputValue(event.currentTarget.value)
    }
    const onKeyInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            props.keyEnter()
        }
    }

    /*const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key = "Enter") {
            props.callBackButtonHandler
        }
    }*/

    return (
<<<<<<< HEAD
        <input value={props.inputValue} onChange={onChangeInputHandler} />
=======
        <input value={props.inputValue} onChange={onChangeInputHandler} onKeyPress={onKeyInputHandler}/>
>>>>>>> e6b84df863bb50ff35b5af8d16d0527b1d7a27c4
    );
}