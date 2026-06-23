import { DataTableColumn } from "mantine-datatable";

export type ColumnProperties<T> = Partial<Record<string, Partial<DataTableColumn<T>>>>;
