export interface IDescription {
    id: number
    name: string
    created_by?: any
    description: string
    size: string
    unload_date: string
    last_load_date: string
    file?: string
}

export interface IProps {
    data: IDescription
}

export interface IPropsList {
    data: IDescription[]
}

export interface SendChangeForm {
    name: string,
    description: string
}