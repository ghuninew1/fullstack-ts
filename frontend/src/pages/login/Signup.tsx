import { useState } from "react";
// import { cx } from "#/utils";
import { Icon } from '@iconify/react';
import { Link, useNavigate } from "react-router-dom";
import ButtonLogin from "./ButtonLogin";
import { Input, Button } from "#components";
import useLogin from "#hook/useLogin";
import useInput from "#hook/useInput";

const api = import.meta.env.VITE_API_URL;

export default function Login() {
    const usernameProps = useInput("");
    const [passwordProps, setPasswordProps] = useState(useInput(""));
    const [confPassword, setConfPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfPasswordVisible, setIsConfPasswordVisible] = useState(false);
    const [error, setError] = useState("");
    const [getFetch, loading] = useLogin();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = usernameProps.value;
        const password = confPassword;

        if (!username || !password) {
            setError("Please enter username and password");
        }
        try {
            const data = { username, password };
            await getFetch("/auth/register", data).then((res) => {
                if (res && !loading) {
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
                    Signup
                </h1>
                <section className="relative mx-auto flex flex-col items-center justify-center px-9 py-7">

                    <form className="w-full min-w-80" onSubmit={handleSubmit}>
                        {error && (<div className="mb-5 text-red-500">{error}</div>)}
                        <div className=" relative my-5 flex flex-col gap-3">
                            <Input
                                name="username"
                                label={"Username or Email"}
                                className="w-full"
                                {...usernameProps}
                            />
                            <Input
                                name="password"
                                label={"Password"}
                                helperText={isPasswordVisible ? 
                                        <Icon icon="clarity:eye-hide-line" onClick={()=> setIsPasswordVisible(!isPasswordVisible)}/>
                                    :
                                        <Icon icon="clarity:eye-line" onClick={()=> setIsPasswordVisible(!isPasswordVisible)}/>
                                }
                                className={"w-full"}
                                type={isPasswordVisible ? "text" : "password"}
                                onChange={(e) => setPasswordProps(e.target.value)}
                            />
                            <Input
                                name="confirmpassword"
                                label={"Confirm Password"}
                                helperText={isConfPasswordVisible ? 
                                        <Icon icon="clarity:eye-hide-line" onClick={()=> setIsConfPasswordVisible(!isConfPasswordVisible)}/>
                                    :
                                        <Icon icon="clarity:eye-line" onClick={()=> setIsConfPasswordVisible(!isConfPasswordVisible)}/>
                                }
                                className={"my-2"}
                                type={isConfPasswordVisible ? "text" : "password"}
                                onChange={(e) => setConfPassword(e.target.value)}
                                error={confPassword &&confPassword !== passwordProps ? "Password does not match" : ""}
                            /> 
                        </div>
                        <Button
                            type="submit"
                            disabled={confPassword === passwordProps ? false : true}
                            loading={!loading}
                            className="bg-submit hover:bg-submit relative w-full text-xl font-semibold"
                        >
                            Signup
                            <Icon icon="ep:right" className={"animate-arrowIdle absolute right-5 transition-all duration-300 ease-in-out "} />
                        </Button>
                        <div className="mt-5 flex items-center justify-between">
                            <Link
                                to={"#"}
                                className="text-sm text-slate-600 hover:text-slate-400 "
                            >
                                Forgot password ?
                            </Link>
                            <Link
                                to={"/login"}
                                className="text-sm text-slate-600 hover:text-slate-400 "
                            >
                                Already have an account ?
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
                            icon={<Icon icon="devicon:google" />}
                        />
                        <ButtonLogin
                            to={api + "/auth/facebook"}
                            className={"bg-fb hover:bg-fb/50"}
                            text={"Login with Facebook"}
                            icon={<Icon icon="logos:facebook" />}
                        />
                        <ButtonLogin
                            to={api + "/auth/line"}
                            className={"bg-line hover:bg-line/50"}
                            text={"Login with Line"}
                            icon={<Icon icon="uil:line" />}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
