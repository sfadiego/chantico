import { useGet } from "../hooks/useApi"

export const useGetFile = ($fileName: string, enable: boolean) => useGet<Blob>({
    url: `files/${$fileName}`,
    responseType: 'blob',
    enable
})