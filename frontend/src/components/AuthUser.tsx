import React from "react";
import useAuth from "../hooks/useAuth";

// @ts-ignore
export const Auth = React.createContext<User>();

export default function AuthUser({children}:{
    children: React.ReactNode
}){
    const [user,setUser] = useAuth();


    return(
        <Auth.Provider value={[user,setUser]}>
            {children}
        </Auth.Provider>
    )
}