import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router";
import { useAppContext } from "../contexts/AppContext";

const AddHotel = () => {
    const navigate = useNavigate();
    const { showToast } = useAppContext();

    const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
        onSuccess: async () => {
            showToast({ message: "Hotel Saved!", type: "SUCCESS" });
            navigate("/my-hotels");
        },
        onError: () => {
            showToast({ message: "Error Saving Hotel", type: "ERROR" });
        },
    });

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    };

    // isLoading 的作用：当用户点击 save 提交表单时，让 save 按钮不能使用
    return (
        <div className="mx-1 sm:mx-10 md:mx-20 xl:mx-40">
            <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
        </div>
    );
};

export default AddHotel;
