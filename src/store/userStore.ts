import create from 'zustand';


const userStore = (set: any) => ({
    name:null,
    email:null,
    verified:null,
    accounts:[],

    updateAccounts:(data: any) => {
        set(() => ({
            accounts: data
        }))
    },
    updateName: (data: string|null) => {
        set(() => ({
            name: data
        }))
    },
    updateEmail: (data: string|null) => {
        set(() => ({
            email: data
        }))
    },
    updateVerified: (data: boolean|null) => {
        set(() => ({
            verified: data
        }))
    }
})

const useUserStore = create(userStore)


export default useUserStore;