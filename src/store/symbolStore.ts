import create from 'zustand';


const symbolStore = (set: any) => ({
    base:{
        symbol:"",
        key:""
    },
    call:{
        symbol:"",
        key:""
    },
    put:{
        symbol:"",
        key:""
    },
    updateBase: (data: {symbol:string, key:string}) => {
        set(() => ({
            base: data,
            put: {
                symbol: "",
                key: ""
            },
            call: {
                symbol: "",
                key: ""
            }
        }))

        // const {optionsData} = useOptionsDataStore((state) => ({optionsData: state.optionsData}));
        // const {updateExpiries} = useStaticStore((state) => ({updateExpiries:state.updateExpiries}));

        // if (!data || !optionsData.data) return;
        // console.log(optionsData);
        // let tempExpiryDates: string[] = [];
        // Object.keys(optionsData.data[index.name]).map((op) => {
        // const result = extractExpiryAndStrike(op);
        // if (!tempExpiryDates.includes(result.expiryDate))
        //     tempExpiryDates.push(result.expiryDate);
        // });
        // tempExpiryDates.sort((date1: string, date2: string) => new Date(date1).getTime() - new Date(date2).getTime());
        // setExpiryDates(tempExpiryDates);
        // const newIndexLtp = feed[index?.symbol]?.ff.indexFF.ltpc.ltp
        // if(newIndexLtp){
        // setIndexLtp(newIndexLtp);
        // }else{
        // // console.log("no index ltp");
        // setIndexLtp(0);

        // }

    },
    updateCall: (data: {symbol:string, key:string}) => {
        set(() => ({
            call: data,
        }))
    },
    updatePut: (data: {symbol:string, key:string}) => {
        set(() => ({
            put: data,
        }))
    }
})

const useSymbolStore = create(symbolStore)


export default useSymbolStore;