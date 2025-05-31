import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { loadStripe, type Stripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
};

type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
    stripePromise: Promise<Stripe | null>;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: false,
    });

    return (
        <AppContext.Provider
            value={{
                showToast: (toastMessage) => {
                    setToast(toastMessage);
                },

                isLoggedIn: !isError,
                stripePromise,
            }}
        >
            {/* 每次时间结束，会调用 setToast 设置为 undefined，重新 render 后 toast 为 undefined，不会再进入这个 Toast 组件 */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(undefined)}
                />
            )}
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
};
