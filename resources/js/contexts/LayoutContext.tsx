import { createContext, useContext, useCallback } from "react";

interface ILayoutContext {
    toggleSidebar: () => void;
}

export const LayoutContext = createContext<ILayoutContext>({ toggleSidebar: () => {} });

export const useLayout = () => useContext(LayoutContext);

interface LayoutProviderProps {
    children: React.ReactNode;
    onToggleSidebar: () => void;
}

export const LayoutProvider = ({ children, onToggleSidebar }: LayoutProviderProps) => {
    const toggleSidebar = useCallback(onToggleSidebar, [onToggleSidebar]);
    return (
        <LayoutContext.Provider value={{ toggleSidebar }}>
            {children}
        </LayoutContext.Provider>
    );
};
