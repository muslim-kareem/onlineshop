import React, {FormEvent, useCallback, useMemo, useState} from "react";
import {
    Link,
    useLocation,
    useNavigate,
    useSearchParams
} from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";



export default function LoginPage() {

    // credentials == user
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [user,setUser] = useAuth();

    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setCredentials({...credentials, [name]: value});
        },
        [credentials, setCredentials]
    );

    const [searchParams] = useSearchParams();
    const redirect = useMemo(() => searchParams.get("redirect") || "/",
        [searchParams]
    );
    const navigate = useNavigate();

    const location = useLocation();

    const onLogin = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setErrors([]);

            try {

                    const res = await axios.post("/api/app-users/login", null, {
                        headers: {
                            "Authorization": "Basic " + window.btoa(`${credentials.username}:${credentials.password}`)
                        }
                    });
                    setUser(res.data)
                navigate(redirect);
            } catch (e) {
                setErrors((errors) => [
                    ...errors,
                    "Invalid username or password"
                ]);
            }
        },
        [credentials.password, credentials.username, navigate, redirect, setUser]
    );

    return (<>
            <NavBar user={user}/>
            <div className={"container-login-page-wrapper"}>
                <div className={"container login-page rounded-4 "}>
                    <h2>Login</h2>

                    {errors.length > 0 && (
                        <div>
                            {errors.map((error) => <p key={error}>{error}</p>)}
                        </div>
                    )}

                    <form onSubmit={onLogin}>
                        <div className={"input-group mb-3"}>
                            <input
                                className={"form-control"}
                                placeholder={"username"}
                                value={credentials.username}
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
                                value={credentials.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={"d-grid gap-2 col-6 mx-auto "}>
                            <button className={"btn btn-light login-button"}>Login</button>
                            or <Link to={"/signup" + location.search}>sign up here</Link>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
}