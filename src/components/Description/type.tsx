export interface IDescription {
    id: number
    name: string
    description: string
    size: string
    unloadDate: string
    lastLoadDate: string
}

export interface IProps {
    data: IDescription
}