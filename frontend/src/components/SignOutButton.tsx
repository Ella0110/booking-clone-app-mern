import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const mutation = useMutation(apiClient.signout, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            showToast({ message: "Sign Out!", type: "SUCCESS" });
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "SUCCESS" });
        },
    });
    const handleClick = () => {
        mutation.mutate();
    };
    return (
        <button
            onClick={handleClick}
            className="hidden sm:flex items-center self-center text-bookingtext px-2 ml-2 py-1 text-sm font-medium rounded-sm bg-white hover:bg-gray-100 cursor-pointer"
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;
