import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router";

export type RegisterFormData = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const {
        register, // 写 validate，验证内容
        watch, // 查看同一表单其他行的输入内容
        handleSubmit, // 提交时验证表单
        formState: { errors }, // 展示报错到表单
    } = useForm<RegisterFormData>();

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            showToast({ message: "Registration Success!", type: "SUCCESS" });
            navigate("/");
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
                xl:w-96
                mx-auto    /* 水平居中 */
                pt-20"
        >
            <form
                className="flex flex-col gap-5 p-8 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_10px_rgba(0,0,0,0.4)]"
                onSubmit={onSubmit}
            >
                <h2 className="text-3xl font-extrabold pb-2">
                    Create an Account
                </h2>
                <div className="flex flex-col md:flex-row  gap-5">
                    <label className="text-gray-700 text-sm font-bold flex-1">
                        First Name
                        <input
                            className="border border-gray-300 rounded w-full py-1 px-2 font-normal"
                            {...register("firstname", {
                                required: "This field is required",
                                pattern: {
                                    value: /^[A-Za-z][A-Za-z0-9]*$/,
                                    message:
                                        "Must start with a letter and contain only letters and numbers.",
                                },
                            })}
                        ></input>
                        {/* 点击 submit 后如果有报错会显示在表单 */}
                        {errors.firstname && (
                            <span className="text-red-500 font-normal">
                                {errors.firstname.message}
                            </span>
                        )}
                    </label>
                    <label className="text-gray-700 text-sm font-bold flex-1">
                        Last Name
                        <input
                            className="border border-gray-300 rounded w-full py-1 px-2 font-normal"
                            {...register("lastname", {
                                required: "This field is required",
                                pattern: {
                                    value: /^[A-Za-z][A-Za-z0-9]*$/,
                                    message:
                                        "Must start with a letter and contain only letters and numbers.",
                                },
                            })}
                        ></input>
                        {errors.lastname && (
                            <span className="text-red-500 font-normal">
                                {errors.lastname.message}
                            </span>
                        )}
                    </label>
                </div>
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
                <label className="text-gray-700 text-sm font-bold flex-1">
                    ConfirmPassword
                    <input
                        type="password"
                        className="border border-gray-300 rounded w-full py-1 px-2 font-normal flex-1"
                        {...register("confirmPassword", {
                            validate: (val) => {
                                if (!val) {
                                    return "This field is required";
                                    // 使用 watch 来获取 password form 中的数据，进行对比
                                } else if (watch("password") != val) {
                                    return "Your password do not match";
                                }
                            },
                        })}
                    ></input>
                    {errors.confirmPassword && (
                        <span className="text-red-500 font-normal">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </label>
                <span className="flex justify-between">
                    <span className="self-end text-sm">
                        <Link className="underline" to="/signin">
                            Change to Login
                        </Link>
                    </span>
                    <button
                        type="submit"
                        className="bg-bookingtexthover text-white p-2 font-bold hover:bg-bookingblue text-xl rounded-md"
                    >
                        Register
                    </button>
                </span>
            </form>
        </div>
    );
};

export default Register;
