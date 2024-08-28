import {configureStore, combineReducers} from "@reduxjs/toolkit"
import updateReducer from "./reducer"
import orderBookReducer from './orderbook-reducer'
const mainReducer = combineReducers({
    updateDetails: updateReducer,
    orderBookDetails:orderBookReducer
})
export const store=configureStore({
    reducer: mainReducer
})
export default store