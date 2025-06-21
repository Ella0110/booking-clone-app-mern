/**
 * 连接后端，获取 api
 * - `response`：后端 API 返回数据
 */

import type { RegisterFormData } from "./pages/Register";
import type { SignInFormData } from "./pages/SignIn";
import type {
    HotelSearchResponse,
    HotelType,
    PaymentIntentResponse,
    UserType,
} from "../../backend/src/shared/type";
import type { BookingFormData } from "./forms/BookingForm/BookingForm";

//前端导入 env 数据的方式
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
    const response = await fetch(`${API_BASE_URL}/api/user/me`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error fetching user");
    }
    return response.json();
};

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
    // console.log("validateTokenResponse", response);
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
    // console.log("hotelId", hotelFormData.get("hotelId"));
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

export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
};

export const searchHotels = async (
    searchParams: SearchParams
): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");

    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");

    searchParams.facilities?.forEach((facility) =>
        queryParams.append("facilities", facility)
    );

    searchParams.types?.forEach((type) => queryParams.append("types", type));
    searchParams.stars?.forEach((star) => queryParams.append("stars", star));

    const response = await fetch(
        `${API_BASE_URL}/api/hotels/search?${queryParams}`
    );

    if (!response.ok) {
        throw new Error("Error searching hotels");
    }

    return response.json();
};

export const fetchHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`);
    if (!response.ok) {
        throw new Error("Error fetching hotels");
    }
    return response.json();
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);

    if (!response.ok) {
        throw new Error("Error fetching hotels by id");
    }

    return response.json();
};

export const createPaymentIntent = async (
    hotelId: string,
    numberOfNights: string
): Promise<PaymentIntentResponse> => {
    const response = await fetch(
        `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
        {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({ numberOfNights }),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    console.log("createPaymentIntentResponse", response);

    if (!response.ok) {
        throw new Error("Error fetching payment intent");
    }

    return response.json();
};

export const createRoomBooking = async (formData: BookingFormData) => {
    const response = await fetch(
        `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        }
    );

    if (!response.ok) {
        throw new Error("Error booking room");
    }
};

export const fetchMyBookings = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error fetching hotels by id");
    }

    return response.json();
};

export const deleteMyBooking = async (hotelId: string, bookingId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/my-bookings/${hotelId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId }),
    });
    if (!response.ok) {
        throw new Error("Error deleting booking by hotelId");
    }

    return;
};
