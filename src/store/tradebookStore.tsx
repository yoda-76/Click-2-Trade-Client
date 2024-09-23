import create from 'zustand';


const tradebookStore = (set: any) => ({
    tradebook : [],
    updateTradebook: (data: any[]) => {
        set(() => ({
            tradebook: data
        }))
    }
})

const useTradebookStore = create(tradebookStore)


export default useTradebookStore;