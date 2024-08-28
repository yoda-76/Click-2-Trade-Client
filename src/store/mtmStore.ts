import create from 'zustand';


const mtmStore = (set: any) => ({
    mtm:0,
    updateMtm: (data: number) => {
        set(() => ({
            mtm: data
        }))
    }
})

const useMtmStore = create(mtmStore)


export default useMtmStore;