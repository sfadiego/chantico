import { useGET } from "../hooks/useApi"

export const useGetFile = ($fileName: string, enable: boolean) => useGET<Blob>({
    url: `files/${$fileName}`,
    responseType: 'blob',
    enable
})