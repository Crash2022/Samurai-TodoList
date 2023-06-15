import { UpdateDomainTaskModelType } from "../../state/tasks-reducer"

export type DeleteTaskArgType = {
    todolistId: string
    taskId: string
}

export type UpdateTaskArgType = {
    todolistId: string
    taskId: string
    domainModel: UpdateDomainTaskModelType
}