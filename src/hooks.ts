// типизацию Dispatch и Selector можно вынести в отдельный файл
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppRootStateType, TypedDispatch} from "./state/store";

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;