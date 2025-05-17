import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router";
import { useAppContext } from "../contexts/AppContext";

export type SignInFormData = {
    email: string;
    password: string;
};

const SignIn = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const {
        register, // 对表单输入信息进行数据验证
        handleSubmit, //提交时验证表单
        formState: { errors }, // 展示报错到表单
    } = useForm<SignInFormData>();

    const mutation = useMutation(apiClient.signin, {
        onSuccess: async () => {
            showToast({ message: "Sign In Success!", type: "SUCCESS" });
            navigate("/");
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
        <form
            className="flex flex-col gap-5 container w-3/5 lg:w-2/5 pt-20"
            onSubmit={onSubmit}
        >
            <h2 className="text-4xl font-extrabold">Sign In</h2>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input
                    type="email"
                    className="border border-gray-300 rounded w-full py-1 px-2 font-normal flex-1"
                    {...register("email", {
                        required: "This field is required",
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
                            message: "Password must be at least 8 characters.", // 返回信息
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
    );
};

export default SignIn;
