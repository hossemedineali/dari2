import create from 'zustand'

// sign in modal

interface Signin {
    show:boolean,
    mode:string,
    toggleShow:()=>void,
    togglemode:(x:string)=>void
}

const useSignInModal=create<Signin>()(
    (set,get)=>({
        show:false,
        mode:'SignIn',
        toggleShow:()=>set({show:!get().show}),
        togglemode:(x)=>set({mode:x})
    })
)

//language 

interface Luanguage{
        lng:string,
        togglelang:(x:string)=>void
}

const useLanguage=create<Luanguage>()(
        (set)=>({
            lng:'ENG',
            togglelang:(x)=>set({lng:x})
        })
)






export {useSignInModal,useLanguage}