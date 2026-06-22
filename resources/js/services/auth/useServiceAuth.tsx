import { usePOST } from "@/hooks/useApi";
import { ApiRoutes } from "@/enums/ApiRoutesEnum";
import { IAuthResponse } from "@/intefaces/IAuth";

const url = ApiRoutes.Auth;
export const useServiceLogin = () => usePOST<IAuthResponse>({ url: `${url}/login` });
export const useServiceRegister = () => usePOST({ url: `${url}/register` });
