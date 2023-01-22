import {Dispatch, SetStateAction, useEffect, useState} from "react";
import axios from "axios";
import {User} from "../model/User";

export default function useAuth(initialState: User | null): [boolean,User, Dispatch<SetStateAction<User>>] {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {

    (async () => {
      try {
        const user = await axios.get("/api/app-users/me");
        setUser(user.data);
      } catch (e) {
        console.error("You are not logged in!", e);
      } finally {
          setIsReady(true);
      }
    })();

  }, []);

  return[isReady,user,setUser];
}