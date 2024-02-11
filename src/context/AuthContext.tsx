import { IUser } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";
export const INITIAL_USER={
    id:'',
    name:'',
    username:'',
    email:'',
    imageUrl:'',
    bio:''
};
const INITIAL_STATE ={
    user: INITIAL_USER,
    isLoading:false,
    setUser:()=>{},
    isAuthenticated: ()=>{},
    checkAuthUser:async()=>false as boolean,
}
const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const [user, setUser]=useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading]=useState(false);
    const [isAuthenticanted, setIsAutoticanted]=useState(false);
    const checkAuthUser=()=>{};
    const value={
        user,
        setUser,
        isLoading,
        isAuthenticanted,
        setIsAutoticanted,
        checkAuthUser
    }
  return( <AuthContext.Provider value={value}>

  </AuthContext.Provider>
)};

export default AuthContext;
