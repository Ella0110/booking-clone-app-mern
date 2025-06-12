import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
    const { hotelId } = useParams(); // 从链接中获取 id
    const { showToast } = useAppContext();
    const { data: hotel } = useQuery(
        "fetchMyHotelById",
        () => apiClient.fetchMyHotelById(hotelId || ""),
        {
            enabled: !!hotelId, // 只有存在 hotelId 时才运行这条 query
        }
    );

    const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
        onSuccess: () => {
            showToast({ message: "Hotel Saved!", type: "SUCCESS" });
        },
        onError: () => {
            showToast({ message: "Error Saving Hotel", type: "ERROR" });
        },
    });

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    };
    return (
        <div className="mx-1 sm:mx-10 md:mx-20 xl:mx-40">
            <ManageHotelForm
                hotel={hotel}
                onSave={handleSave}
                isLoading={isLoading}
            />
        </div>
    );
};

export default EditHotel;
