'use client';
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext<any>(undefined);

export type State = {
    imageRatio: string,
    size: { width: number, height: number },
    numberOfImage: number,
    imageUrls: [],
    prompt: string,
    isSubmitted: boolean
    imageReceiveType: "downloadedType" | "urlType"
}

export function AppWrapper({ children }: { children: React.ReactNode }) {
    // Initialize state from localStorage or default value
    const [state, setState] = useState<State>(() => {
        if (typeof window !== "undefined") {
            const savedState = localStorage.getItem("appState");
            return savedState ? JSON.parse(savedState) : {
                imageRatio: "16:9",
                size: { width: 1744, height: 981 },
                numberOfImage: 2,
                imageUrls: [],
                prompt: "",
                isSubmitted: false,
                imageReceiveType: "urlType"
            };
        }
        return {
            imageRatio: "16:9",
            size: { width: 1744, height: 981 },
            numberOfImage: 2,
            imageUrls: [],
            prompt: "",
            isSubmitted: false,
            imageReceiveType: "urlType"
        };
    });

    // Sync state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("appState", JSON.stringify(state));
    }, [state]);


    const resetState = () => {
        localStorage.removeItem("appState");
        setState({
            imageRatio: "16:9",
            size: { width: 1744, height: 981 },
            numberOfImage: 2,
            imageUrls: [],
            prompt: "",
            isSubmitted: false,
            imageReceiveType: "urlType"
        });
    };

    return (
        <AppContext.Provider value={{ state, setState, resetState }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}


// 'use client'
// import { createContext, useContext, useState } from "react";

// const AppContext = createContext<any>(undefined);

// export type State = {
//     imageRatio: string,
//     size: { width: number, height: number}
//     numberOfImage:number,
//     imageUrls: [],
//     prompt: string,
//     isSubmitted: boolean
// }

// export function AppWrapper ({children}: {
//     children: React.ReactNode
// }) {
//     const [state, setState] = useState<State>({
//         imageRatio: "16:9",
//         size: { width: 1744, height: 981},
//         numberOfImage: 2,
//         imageUrls: [],
//         prompt: "",
//         isSubmitted: false
//     })

//     return (
//         <AppContext.Provider value={{state, setState}}>
//             {children}
//         </AppContext.Provider>
//     )
// }

// export function useAppContext() {
//     return useContext(AppContext)
// }