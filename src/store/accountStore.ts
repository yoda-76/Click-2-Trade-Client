import create from 'zustand';

import {devtools, persist} from 'zustand/middleware'

const accountStore = (set: any) => ({
    master: {},
    child:[],
    selected:"",
    updateMaster: (acc:any) => {
        set(() => ({
            master: acc,
        }))
    },
    updateChild: (acc:any[]) => {
        set(() => ({
            child: acc,
        }))
    },
    setSelectedAccount: (acc:any) => {
        set(() => ({
            selected: acc,
        }))
    },
    reset: () => set({master: {}, child: []})
})

const useAccountStore = create(
    devtools(
        persist(accountStore, {
            name: "active-accounts",
        })
    )
)


export default useAccountStore;