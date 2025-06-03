import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./DetailsSection";
import TypeSction from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import type { HotelType } from "../../../../backend/src/shared/type";
import { useEffect } from "react";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string; // 酒店的类型
    adultCount: number; // 酒店房间可以容纳的成人人数
    childCount: number; // 酒店房间可以容纳的小孩人数
    facilities: string[]; // 酒店的设施
    pricePerNight: number; // 每晚的价格
    starRating: number; // 酒店评分
    imageFiles: FileList; // 酒店图片
    imageUrls: string[];
};

type Props = {
    hotel?: HotelType;
    onSave: (hotelFormData: FormData) => void;
    isLoading: boolean;
};
const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit, reset } = formMethods;

    useEffect(() => {
        // 当 hotel 数据变了就 reset 页面
        reset(hotel);
    }, [hotel, reset]);

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        // FormData 它能把键值对（包括 string、Blob/File）打包成 multipart/form-data 编码，通常用来发送带文件的 HTTP 请求。
        const formData = new FormData();
        if (hotel) {
            formData.append("hotelId", hotel._id);
        }
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });

        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
                formData.append(`imageUrls[${index}]`, url);
            });
        }

        if (formDataJson.imageFiles) {
            Array.from(formDataJson.imageFiles).forEach((imageFile) => {
                formData.append(`imageFiles`, imageFile);
            });
        }

        onSave(formData);
    });
    return (
        <FormProvider {...formMethods}>
            <h1 className="text-3xl font-bold mb-3 tracking-normal">
                Add Hotel
            </h1>
            <form
                className="flex flex-col gap-10 px-10 py-5 border-gray-200 border-[1px] rounded-sm"
                onSubmit={onSubmit}
            >
                <HotelDetailsSection />
                <TypeSction />
                <FacilitiesSection />
                <GuestsSection />
                <ImagesSection />
                <span className="flex justify-end">
                    <button
                        disabled={isLoading} // isLoading 的作用：当用户点击 save 提交表单时，让 save 按钮不能使用
                        type="submit"
                        className="bg-bookingbutton text-xl text-white font-bold px-3 py-1 rounded hover:bg-bookingbuttonhover disabled:bg-gray-400"
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </span>
            </form>
        </FormProvider>
    );
};

export default ManageHotelForm;
