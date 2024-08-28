import create from 'zustand';


const positionStore = (set: any) => ({
    position : [],
    updatePosition: (data: any[]) => {
        set(() => ({
            position: data
        }))
    }
})

const usePositionStore = create(positionStore)


export default usePositionStore;