import { ReactNode } from "react";

export interface IWidgetProps {
    cardTitle: string,
    description?: string,
    children?: ReactNode,
    image?: any
}