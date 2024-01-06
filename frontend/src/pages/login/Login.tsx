import { useState } from "react";
// import { cx } from "#/utils";
import { Icon } from '@iconify/react';
import { Link, useNavigate } from "react-router-dom";
import ButtonLogin from "./ButtonLogin";
import { Input, Button } from "#components";
import { Auth } from "#contexts/AuthProvider";
import useLogin from "#hook/useLogin";
import useInput from "#hook/useInput";

const api = import.meta.env.VITE_API_URL;

export default function Login() {
    const usernameProps = useInput("");
    const passwordProps = useInput("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState("");
    const [getFetch, loading] = useLogin();
    const navigate = useNavigate();
    const { login } = Auth();

    const handlePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const username = usernameProps.value;
        const password = passwordProps.value;

        if (!username || !password) {
            setError("Please enter username and password");
        }

        try {
            const data = { username, password };
            await getFetch( "/auth/login", data).then((res) => {
                if (!loading) {
                    login({
                        email: res.email,
                        username: res.username,
                        roles: res.roles,
                        img: res.img,
                        isEmail: true,
                        expires: Number(res.expires),
                        timestamp: Date.now(),
                    });
                    navigate("/");
                } else {
                    setError("Username or Password is incorrect");
                }
            });
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="animate-zoomIn flex items-center">
            <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-xl border-2 border-gray-800 shadow-md shadow-gray-900 drop-shadow-md backdrop-blur-lg ">
                <h1 className="mt-5 text-center text-3xl font-bold uppercase tracking-wider">
                    Login
                </h1>

                <section className="relative mx-auto flex flex-col items-center justify-center px-9 py-7">
                    <form className="w-full min-w-80" onSubmit={handleSubmit}>
                        {error && (
                            <div className="mb-5 text-red-500">{error}</div>
                        )}
                        <div className="my-5 flex flex-col gap-2">
                            <Input
                                type={undefined} required={undefined} label={undefined} icon={undefined} error={undefined} helperText={undefined} name="username"
                                placeholder={"Username or Email"}
                                className="w-full"
                                {...usernameProps}                            />
                            <Input
                                required={undefined} label={undefined} icon={undefined} name="password"
                                placeholder={"Password"}
                                helperText={isPasswordVisible ?
                                    <Icon icon="clarity:eye-hide-line" onClick={handlePasswordVisibility} />
                                    :
                                    <Icon icon="clarity:eye-line" onClick={handlePasswordVisibility} />}
                                className={"w-full"}
                                type={isPasswordVisible ? "text" : "password"}
                                error={passwordProps.value && usernameProps.value ? "" : "Please enter username and password"}
                                {...passwordProps}                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={passwordProps.value ? false : true}
                            loading={!loading}
                            className={
                                "bg-submit hover:bg-submit relative w-full text-xl font-semibold"
                            }
                        >
                            LOGIN
                            <Icon icon="ep:right" width={30} className={"animate-arrowIdle absolute right-5"} />
                        </Button>

                        <div className="mt-5 flex items-center justify-between">
                            <Link
                                to={"#"}
                                className="text-sm text-slate-600 hover:text-slate-400 "
                            >
                                Forgot password ?
                            </Link>
                            <Link
                                to={"/signup"}
                                className="text-sm text-slate-600 hover:text-slate-400 "
                            >
                                Create account ?
                            </Link>
                        </div>
                        <div className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                            <p className="mx-4 mb-0 text-center font-semibold ">
                                OR
                            </p>
                        </div>
                    </form>
                    <div className="mt-4 flex w-full flex-col">
                        <ButtonLogin
                            to={api + "/auth/google"}
                            className={"bg-google  hover:bg-google/50"}
                            text={"Login with Google"}
                            icon={<Icon icon="devicon:google" width={25}/>}
                        />
                        <ButtonLogin
                            to={api + "/auth/facebook"}
                            className={"bg-fb hover:bg-fb/50"}
                            text={"Login with Facebook"}
                            icon={<Icon icon="logos:facebook" width={25} />}
                        />
                        <ButtonLogin
                            to={api + "/auth/line"}
                            className={"bg-line hover:bg-line/50"}
                            text={"Login with Line"}
                            icon={<Icon icon="uil:line" width={25}/>}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
