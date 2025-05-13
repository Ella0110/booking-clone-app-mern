/**
 * 连接后端，获取 api
 * - `formData`：从表格中获取用户输入内容
 * - `response`：后端 API 返回数据
 * - `isOperational`：标记是否可预期，便于全局错误处理中区分
 */

import type { RegisterFormData } from "./pages/Register";
import type { SignInFormData } from "./pages/Signin";

//前端导入 env 数据的方式
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API_BASE_URL", API_BASE_URL);
export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/user/register`, {
        method: "POST",
        credentials: "include", // 告诉浏览器设置 cookies
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    console.log(response);
    // 返回错误
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }
};

export const signin = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/user/signin`, {
        method: "POST",
        credentials: "include", // 告诉浏览器设置 cookies
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    console.log(response);

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }
    return responseBody;
};

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/user/validate-token`, {
        credentials: "include",
    });
    console.log("validateTokenResponse", response);
    if (!response.ok) {
        throw new Error("Token invalid");
    }
};
