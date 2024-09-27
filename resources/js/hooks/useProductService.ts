import { useGet } from "./useApi";

export const getImage = (fileName: string) => useGet({ url: `files/${fileName}` })