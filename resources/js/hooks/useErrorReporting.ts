import { useEffect } from "react";
import axios from "axios";

const sendError = (message: string, stack?: string) => {
    const payload = {
        message: message.slice(0, 1000),
        stack: stack?.slice(0, 5000),
        url: window.location.href,
    };
    // sendBeacon para no bloquear y funcionar incluso si la página se está cerrando
    navigator.sendBeacon("/api/client-error", JSON.stringify(payload));
};

export const useErrorReporting = () => {
    useEffect(() => {
        const onUnhandledRejection = (e: PromiseRejectionEvent) => {
            const error = e.reason;
            if (axios.isAxiosError(error)) return; // Los errores HTTP ya los captura el middleware
            sendError(error?.message ?? String(error), error?.stack);
        };

        const onError = (_msg: Event | string, _src?: string, _line?: number, _col?: number, error?: Error) => {
            sendError(error?.message ?? String(_msg), error?.stack);
        };

        window.addEventListener("unhandledrejection", onUnhandledRejection);
        window.addEventListener("error", onError as EventListener);

        return () => {
            window.removeEventListener("unhandledrejection", onUnhandledRejection);
            window.removeEventListener("error", onError as EventListener);
        };
    }, []);
};
