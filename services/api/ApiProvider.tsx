import { createContext, FC, ReactNode } from "react";
import { API } from ".";
import { atom, useAtom, } from "jotai";

export const api = atom(new API())

export const APIContext = createContext<API>(undefined!);

interface APIProviderProps {
    children: ReactNode;
}

export const APIProvider: FC<APIProviderProps> = ({ children }) => {
    const [apiAtom, setApiAtom] = useAtom(api);
    return (
        <APIContext.Provider value={apiAtom}>
            {children}
        </APIContext.Provider>
    );
}