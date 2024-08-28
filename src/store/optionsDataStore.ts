import create from 'zustand';

import {devtools, persist} from 'zustand/middleware'
import useOrderParameterStore from './orderParameterStore';
const optionsDataStore = (set: any) => ({
    optionsData: {},
    setOptionsData: (data:any) => {
        set(() => ({
            optionsData: data,
        }))
        // const {updateBase} = useOrderParameterStore((state) => ({updateBase:state.updateBase}));
        // updateBase("NIFTY")
        //set base instrument
        
    }
})

const useOptionsDataStore = create(
    optionsDataStore
)


export default useOptionsDataStore;