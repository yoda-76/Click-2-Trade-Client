import create from 'zustand';

// import {useStaticStore} from "./staticStore";



const orderParameterStore = (set: any) => ({
    exchange: "NSE",
    base:"",
    expiry:"",
    callStrike:0,
    putStrike:0,
    quantity:0,
    orderType:"MARKET",
    productType:"Intraday",
    triggerPrice:0,
    marketProtection:10,
    preferedStopLossPoints:40,
    preferedTargetPoints:40,
    updateExchange: (data: string) => {
        set(() => ({
            exchange: data
        }))
    },
    updateBase: (data: string) => {
        set(() => ({
            base: data
        }))
        //set expiry List and strike list
        
        //empty expiry and strike
    },
    updateExpiry: (data: string) => {
        set(() => ({
            expiry: data
        }))
        //set call/put symbol and key [conditional]
    },
    updateCallStrike: (data: number) => {
        set(() => ({
            callStrike: data
        }))
        //set call/put symbol and key [conditional]
    },
    updatePutStrike: (data: number) => {
        set(() => ({
            putStrike: data
        }))
        //set call/put symbol and key [conditional]
    },
    updateQuantity: (data: number) => {
        set(() => ({
            quantity: data
        }))
    },
    updateOrderType: (data: string) => {
        set(() => ({
            orderType: data
        }))
    },
    updateProductType: (data: string) => {
        set(() => ({
            productType: data
        }))
    },
    updateTriggerPrice: (data: number) => {
        set(() => ({
            triggerPrice: data
        }))
    },
    updateMarketProtection: (data: number) => {
        set(() => ({
            marketProtection: data
        }))
    },
    updatePreferedStopLossPoints: (data: number) => {
        set(() => ({
            preferedStopLossPoints: data
        }))
    },
    updatePreferedTargetPoints: (data: number) => {
        set(() => ({
            preferedTargetPoints: data
        }))
    }
})

const useOrderParameterStore = create(orderParameterStore)


export default useOrderParameterStore;