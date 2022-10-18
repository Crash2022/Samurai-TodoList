import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type EditItemPropsType = {
    title: string
    onChangeInput: (newInputValue: string) => void
}

export const EditInputItem = React.memo((props: EditItemPropsType) => {

    console.log('editable span')

    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');

    const onClickEditSpanHandler = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const onClickNotEditSpanHandler = () => {
        props.onChangeInput(title);
        setEditMode(false);
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    const enterChangeTitle = (event: KeyboardEvent<HTMLInputElement>) => {
        return event.key === 'Enter' ? onClickNotEditSpanHandler() : '' ;
    }

    return (
            editMode
            ? <input value={title}
                     autoFocus
                     onBlur={onClickNotEditSpanHandler}
                     onChange={onChangeInputHandler}
                     onKeyDown={enterChangeTitle}
              />
            : <span onDoubleClick={onClickEditSpanHandler}>{props.title}</span>
    );
})