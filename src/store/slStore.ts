import create from 'zustand';


const slStore = (set: any) => ({
    sl:{},
    target:{},
    tslBase:{},
    slIncrement:1,
    targetIncrement:1,
    preferedSl:40,
    preferedTarget:80,
    
    mtmTslBase:null,
    mtmSl:null,
    mtmTarget:null,
    mtmSlIncrement:1,
    mtmTargetIncrement:1,
    mtmPreferedSl:40,
    mtmPreferedTarget:80,
    
    trailingPoints:0,
    mtmTrailingPoints:0,
    updateMtmTslBase: (data: number | null) => {
        set(() => ({
            mtmTslBase: data
        }))
    },
    updateTslBase: (data: {key:string, value:number | null}) => {
        set((state: any) => ({
            tslBase:{...state.tslBase, [data.key]:data.value}
        }))
    },  
    updateMtmSl: (data: number | null) => {
        set(() => ({
            mtmSl: data
        }))
    },
    updateMtmTarget: (data: number | null) => {
        set(() => ({
            mtmTarget: data
        }))
    },
    updateSl: (data: {key:string, value:number | null}) => {
        set((state: any) => ({
            sl:{...state.sl, [data.key]:data.value}
        }))
    },
    updateTarget: (data: {key:string, value:number | null}) => {
        set((state: any) => ({
            target:{...state.target, [data.key]:data.value}
        }))
    },

    increaseSl: (data: {key:string}) => {
        set((state: any) => ({
            sl:{...state.sl, [data.key]:state.sl[data.key]+state.slIncrement}
        }))
    },
    decreaseSl: (data: {key:string}) => {
        set((state: any) => ({
            sl:{...state.sl, [data.key]:state.sl[data.key]-state.slIncrement}
        }))
    },
    increaseTarget: (data: {key:string}) => {
        set((state: any) => ({
            target:{...state.target, [data.key]:state.target[data.key]+state.targetIncrement}
        }))
    },
    decreaseTarget: (data: {key:string}) => {
        set((state: any) => ({
            target:{...state.target, [data.key]:state.target[data.key]-state.targetIncrement}
        }))
    },
})

const useSlStore = create(slStore)


export default useSlStore;