import React, {ChangeEvent, useState} from 'react';

export type EditItemPropsType = {
    title: string
    onChangeInput: (newInputValue: string) => void
}

export const EditInputItem: React.FC<EditItemPropsType> = (props) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState('');

    const onClickEditSpanHandler = () => {
        setEditMode(!editMode);
        setTitle(props.title);
    }
    const onClickNotEditSpanHandler = () => {
        setEditMode(!editMode);
        props.onChangeInput(title);
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    return (
            editMode
            ? <input value={title}
                     autoFocus
                     onBlur={onClickNotEditSpanHandler}
                     onChange={onChangeInputHandler}/>
            : <span onDoubleClick={onClickEditSpanHandler}>{props.title}</span>
    );
}