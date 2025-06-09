import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useMutation, useQueryClient } from "react-query";
import { Link, useLocation, useNavigate } from "react-router";
import { useAppContext } from "../contexts/AppContext";

export type SignInFormData = {
    email: string;
    password: string;
};

const SignIn = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const location = useLocation();
    const {
        register, // 对表单输入信息进行数据验证
        handleSubmit, //提交时验证表单
        formState: { errors }, // 展示报错到表单
    } = useForm<SignInFormData>();

    const mutation = useMutation(apiClient.signin, {
        onSuccess: async () => {
            showToast({ message: "Sign In Success!", type: "SUCCESS" });
            navigate(location.state?.from?.pathname || "/");
            await queryClient.invalidateQueries("validateToken");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        },
    });
    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });
    return (
        <div
            className="w-[90%]   /* 手机 90% 宽度 */
                md:w-3/5   /* ≥768px 时 60% */
                lg:w-2/5   /* ≥1024px 时 40% */
                xl:w-80
                mx-auto    /* 水平居中 */
                pt-20"
        >
            <form
                className="flex flex-col gap-5 p-8 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_10px_rgba(0,0,0,0.4)]"
                onSubmit={onSubmit}
            >
                <h2 className="text-3xl pb-2 font-extrabold">Sign In</h2>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input
                        type="email"
                        className="border border-gray-300 rounded w-full py-1 px-2 font-normal flex-1"
                        {...register("email", {
                            required: "This field is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please enter a valid email address.",
                            },
                        })}
                    ></input>
                    {errors.email && (
                        <span className="text-red-500 font-normal">
                            {errors.email.message}
                        </span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Password
                    <input
                        type="password"
                        className="border border-gray-300 rounded w-full py-1 px-2 font-normal flex-1"
                        {...register("password", {
                            required: "This field is required",
                            minLength: {
                                value: 8, // 密码最短长度
                                message:
                                    "Password must be at least 8 characters.", // 返回信息
                            },
                        })}
                    ></input>
                    {errors.password && (
                        <span className="text-red-500 font-normal">
                            {errors.password.message}
                        </span>
                    )}
                </label>
                <span className="flex items-center  justify-between">
                    <span className="self-end text-sm">
                        <Link className="underline" to="/register">
                            Create an account here
                        </Link>
                    </span>
                    <button
                        type="submit"
                        className="bg-bookingtexthover text-white p-2 font-bold hover:bg-bookingblue text-xl rounded-md"
                    >
                        Login
                    </button>
                </span>
            </form>
        </div>
    );
};

export default SignIn;
