'use client'
import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(undefined);

export type State = {
    imageRatio: string,
    size: { width: number, height: number}
    numberOfImage:number
}

export function AppWrapper ({children}: {
    children: React.ReactNode
}) {
    const [state, setState] = useState<State>({
        imageRatio: "16:9",
        size: { width: 1744, height: 1088},
        numberOfImage: 2
    })

    return (
        <AppContext.Provider value={{state, setState}}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}