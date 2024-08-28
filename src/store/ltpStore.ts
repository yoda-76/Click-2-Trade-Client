import create from 'zustand';


const ltpStore = (set: any) => ({
    baseLTP: 0,
    callLTP: 0,
    putLTP: 0,
    positionPnl: [],
    pnl: 0,
    updateBaseLTP: (data: number) => {
        set(() => ({
            baseLTP: data
        }))
    },
    updateCallLTP: (data: number) => {
        set(() => ({
            callLTP: data
        }))
    },
    updatePutLTP: (data: number) => {
        set(() => ({
            putLTP: data
        }))
    },
    updatePositionPnl: (data: number[]) => {
        set(() => ({
            positionPnl: data
        }))
    },
    updatePnl: (data: number) => {
        set(() => ({
            pnl: data
        }))
    }
})

const useLtpStore = create(ltpStore)


export default useLtpStore;