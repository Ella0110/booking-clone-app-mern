import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-option-config";
import type { HotelFormData } from "./ManageHotelForm";

const TypeSction = () => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<HotelFormData>();
    const typeWatch = watch("type"); // 当 type 变化时，我们就会得到一个变量
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3 ">Type</h2>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {hotelTypes.map((type) => (
                    <label
                        key={type}
                        className={
                            typeWatch === type
                                ? "cursor-pointer bg-blue-300 text-sm rounded-full px-2 py-2 font-semibold"
                                : "cursor-pointer bg-bookingformbackground text-sm rounded-full px-2 py-2 font-semibold"
                        }
                    >
                        <input
                            type="radio"
                            value={type}
                            {...register("type", {
                                required: "This field is required",
                            })}
                            className="hidden"
                        />
                        <span className="flex items-center justify-center">
                            {type}
                        </span>
                    </label>
                ))}
            </div>
            {errors.type && (
                <span className="text-red-500 font-normal text-sm">
                    {errors.type.message}
                </span>
            )}
        </div>
    );
};

export default TypeSction;
