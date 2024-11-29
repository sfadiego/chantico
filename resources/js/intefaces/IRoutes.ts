import React from 'react'
import { IUser } from './IUser';

export default interface IRoute {
    path: string
    element: React.ReactNode
    private?: boolean
    hasPermission?: (props: IUser) => boolean
}
