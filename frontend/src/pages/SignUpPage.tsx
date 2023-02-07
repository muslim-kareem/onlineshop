import React, {FormEvent, useCallback, useMemo, useState} from "react";
import {
    useNavigate,
    useSearchParams
} from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";


export default function SignUpPage() {

    // credentials == user
    const [credentialsUser, setCredentialsUser] = useState({
        username: "",
        password: ""
    });
    const [user,setUser] = useAuth();
    const [errors, setErrors] = useState<string[]>([]);
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setCredentialsUser({...credentialsUser, [name]: value});
        },
        [credentialsUser, setCredentialsUser]
    );
    const [searchParams] = useSearchParams();
    const redirect = useMemo(() => searchParams.get("redirect") || "/",
        [searchParams]
    );
    const navigate = useNavigate();
    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setErrors([]);
            try {
                const res = await axios.post("/api/app-users", credentialsUser);
                setUser(res.data)

                await axios.post("/api/app-users/login", null, {
                    headers: {
                        "Authorization": "Basic " + window.btoa(`${credentialsUser.username}:${credentialsUser.password}`)
                    }
                });

                navigate(redirect);
            } catch (e) {
                setErrors((errors) => [
                    ...errors,
                    "The User Name ist already exist please chose another name."
                ]);
            }
        },
        [credentialsUser,navigate, redirect, setUser]
    );
    return (<>
            <NavBar user={user}/>
            <div className={"container-login-page-wrapper"}>
                <div className={"container login-page rounded-4 "}>
                    <h2>Sign Up</h2>
                    {errors.length > 0 && (
                        <div>
                            {errors.map((error) => <p key={error}>{error}</p>)}
                        </div>
                    )}
                    <form onSubmit={onSubmit}>
                        <div className={"input-group mb-3"}>
                            <input
                                className={"form-control"}
                                placeholder={"username"}
                                value={credentialsUser.username}
                                name={"username"}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                                className={"form-control"}
                                placeholder={"password"}
                                type={"password"}
                                name={"password"}
                                value={credentialsUser.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={"d-grid gap-2 col-6 mx-auto "}>
                            <button className={"btn btn-light mb-5 login-button"}>Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
}