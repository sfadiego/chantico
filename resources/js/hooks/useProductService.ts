import { useGet } from "./useApi";
let url = `/`

export const getImage = (fileName: string) => useGet({ url: `files/${fileName}` })