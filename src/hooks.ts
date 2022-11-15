// типизацию Dispatch и Selector можно вынести в отдельный файл
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppRootStateType, AppDispatch} from "./state/store";

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;