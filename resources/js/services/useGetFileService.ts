import { useGET } from "../hooks/useApi";
import { ApiRoutes } from "@/enums/ApiRoutesEnum";

const url = ApiRoutes.Files;
export const useGetFile = ($fileName: string, enable: boolean) =>
    useGET<Blob>({
        url: `${url}/${$fileName}`,
        responseType: "blob",
        enable,
    });
