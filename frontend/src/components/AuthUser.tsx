import React, {ReactNode} from "react";
import useAuth from "../hooks/useAuth";

// @ts-ignore
export const Auth = React.createContext<User>();

export default function AuthUser({children}:{
    children: React.ReactNode
}){
    const [isReady,user,setUser] = useAuth(null);


    return(
        <Auth.Provider value={user}>
            {children}
        </Auth.Provider>
    )
}