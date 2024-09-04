import create from 'zustand';


const slStore = (set: any) => ({
    sl:{},
    target:{},
    slIncrement:1,
    targetIncrement:1,
    preferedSl:40,
    preferedTarget:80,
    
    mtmSl:null,
    mtmTarget:null,
    mtmSlIncrement:1,
    mtmTargetIncrement:1,
    mtmPreferedSl:40,
    mtmPreferedTarget:80,
    
    trailingPoints:0,
    mtmTrailingPoints:0,
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
    }
})

const useSlStore = create(slStore)


export default useSlStore;