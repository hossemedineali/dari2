import create from 'zustand'
import { persist } from 'zustand/middleware'




interface MyState {
	
	liked:string[]
	
	
	
	setliked:(x:string[])=>void
	addPost:(x:string)=>void
	deletePost:(x:string)=>void
  }
  
  export const useLikedPosts = create<MyState>()(
	persist(
	  (set, get) => ({
		
		liked:[],
		
		setliked:(x)=>set({liked: x }),
		addPost:(x)=>set({liked:[...get().liked,x]}),
		deletePost:(x)=>set({liked:(get().liked).filter(function(value){return value!=x})})
	}),
	  {
		name: 'likedPosts', // name of item in the storage (must be unique)
		getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
		//partialize: (state) => ({ fishes: state.fishes }),
	  }
	)
  )