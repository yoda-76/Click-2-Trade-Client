import create from 'zustand';


const orderbookStore = (set: any) => ({
    orderbook : [],
    updateOrderbookk: (data: any[]) => {
        set(() => ({
            orderbook: data
        }))
    }
})

const useOrderbookStore = create(orderbookStore)


export default useOrderbookStore;