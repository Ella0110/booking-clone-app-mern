import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./DetailsSection";
import TypeSction from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

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
};
const ManageHotelForm = () => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit } = formMethods;

    const onSubmit = handleSubmit((formData: HotelFormData) => {
        console.log(formData);
        // create a new FormData Object & call our API
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
                        type="submit"
                        className="bg-bookingtext text-xl text-white font-bold px-3 py-1 rounded hover:bg-bookingtexthover"
                    >
                        Save
                    </button>
                </span>
            </form>
        </FormProvider>
    );
};

export default ManageHotelForm;
