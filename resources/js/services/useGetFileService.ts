import { useGET } from "../hooks/useApi";

const url = "files";
export const useGetFile = ($fileName: string, enable: boolean) =>
    useGET<Blob>({
        url: `${url}/${$fileName}`,
        responseType: "blob",
        enable,
    });
