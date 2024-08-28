import create from 'zustand';

import { equitySymbols } from "@/lib/equity-symbols";

const staticStore = (set: any) => ({
    baseInstruments: [...equitySymbols],
    expiries: [],
    strikes: [],
    updateExpiries: (data: string[]) => {
        set(() => ({
            expiries: data
        }))

    },
    updateStrikes: (data: number[]) => {
        set(() => ({
            strikes: data
        }))
    },
    // updateCall: (data: {symbol:string, token:string}) => {
    //     set(() => ({
    //         call: data,
    //     }))
    // },
    // updatePut: (data: {symbol:string, token:string}) => {
    //     set(() => ({
    //         put: data,
    //     }))
    // }
})

const useStaticStore = create(staticStore)


export default useStaticStore;