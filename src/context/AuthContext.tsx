import { getCurrentUser } from "@/lib/appwrite/api";
import { IUser } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};
const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  setUser: () => {},
  isAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};
const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticanted, setIsAuthenticanted] = useState(false);
  const navigate = useNavigate();
  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAutoticanted(true);
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(()=>{
    if(
        localStorage.getItem('coockieFallback')==='[]' ||
        localStorage.getItem('coockiefallback')===null
    )navigate('/sign-in')
    checkAuthUser;
  },[]);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticanted,
    setIsAuthenticanted,
    checkAuthUser
  }
  return( <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>)
}

export default AuthProvider;

export const useUserContext=()=>useContext(AuthContext);
