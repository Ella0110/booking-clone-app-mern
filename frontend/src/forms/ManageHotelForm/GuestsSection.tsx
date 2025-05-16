import { useFormContext } from "react-hook-form";
import type { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Guests</h2>
            <div className="flex gap-4 bg-bookingformbackground rounded px-3 pt-2 pb-4">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Adult
                    <input
                        type="number"
                        min={1}
                        className="border border-gray-300 rounded bg-white w-full py-1 px-2 font-normal flex-1"
                        {...register("adultCount", {
                            required: "This field is required",
                        })}
                    ></input>
                    {errors.adultCount?.message && (
                        <span className="text-red-500 font-normal">
                            {errors.adultCount?.message}
                        </span>
                    )}
                </label>
                <label className="text-gray-700 text-sm  font-bold flex-1">
                    Child
                    <input
                        type="number"
                        min={0}
                        className="border border-gray-300 rounded bg-white w-full py-1 px-2 font-normal flex-1"
                        {...register("childCount", {
                            required: "This field is required",
                        })}
                    ></input>
                    {errors.childCount?.message && (
                        <span className="text-red-500 font-normal">
                            {errors.childCount?.message}
                        </span>
                    )}
                </label>
            </div>
        </div>
    );
};

export default GuestsSection;
