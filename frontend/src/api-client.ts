/**
 * 连接后端，获取 api
 * - `formData`：从表格中获取用户输入内容
 * - `response`：后端 API 返回数据
 * - `isOperational`：标记是否可预期，便于全局错误处理中区分
 */

import type { RegisterFormData } from "./pages/Register";
import type { SignInFormData } from "./pages/SignIn";
import type { HotelType } from "../../backend/src/shared/type";

//前端导入 env 数据的方式
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/user/register`, {
        method: "POST",
        credentials: "include", // 告诉浏览器设置 cookies
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

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

export const signout = async () => {
    const response = await fetch(`${API_BASE_URL}/api/user/logout`, {
        method: "POST",
        credentials: "include", // 告诉浏览器设置 cookies
    });

    if (!response.ok) {
        throw new Error("Error during sign out");
    }
};

export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include", // 告诉浏览器设置 cookies
        body: hotelFormData,
    });
    if (!response.ok) {
        throw new Error("Failed to add hotel"); // 如果报这个错说明后端出问题，不是前端
    }
    return response.json(); // 留着给以后用
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
    // 指定返回的类型
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch hotels"); // 如果报这个错说明后端出问题，不是前端
    }
    return response.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch hotel by id"); // 如果报这个错说明后端出问题，不是前端
    }
    return response.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
    console.log("hotelId", hotelFormData.get("hotelId"));
    const response = await fetch(
        `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
        {
            method: "PUT",
            credentials: "include", // 告诉浏览器设置 cookies
            body: hotelFormData,
        }
    );
    if (!response.ok) {
        throw new Error("Failed to fetch hotel by id"); // 如果报这个错说明后端出问题，不是前端
    }
    return response.json();
};
