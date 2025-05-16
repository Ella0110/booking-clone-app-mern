import { useFormContext } from "react-hook-form";
import type { HotelFormData } from "./ManageHotelForm";

const HotelDetailsSection = () => {
    // const {
    //     register, // 写 validate，验证内容
    //     watch, // 查看统一表单其他行的输入内容
    //     handleSubmit, // 提交时验证表单
    //     formState: { errors }, // 展示报错到表单
    // } = useForm<RegisterFormData>();

    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>(); // 这是上面的另一种写法，通过 useFormContext 来获取上下文
    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">Basic Infomation</h2>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Name
                <input
                    type="text"
                    className="border border-gray-300 rounded w-full py-1 px-2 font-normal flex-1"
                    {...register("name", {
                        required: "This field is required",
                    })}
                ></input>
                {errors.name && (
                    <span className="text-red-500 font-normal">
                        {errors.name.message}
                    </span>
                )}
            </label>
            <div className="flex gap-4">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    City
                    <input
                        type="text"
                        className="border border-gray-300 rounded w-full py-1 px-2 font-normal flex-1"
                        {...register("city", {
                            required: "This field is required",
                        })}
                    ></input>
                    {errors.city && (
                        <span className="text-red-500 font-normal">
                            {errors.city.message}
                        </span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Country
                    <input
                        type="text"
                        className="border border-gray-300 rounded w-full py-1 px-2 font-normal flex-1"
                        {...register("country", {
                            required: "This field is required",
                        })}
                    ></input>
                    {errors.country && (
                        <span className="text-red-500 font-normal">
                            {errors.country.message}
                        </span>
                    )}
                </label>
            </div>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Description
                <textarea
                    rows={5}
                    className="border border-gray-300 rounded w-full py-1 px-2 font-normal flex-1"
                    {...register("description", {
                        required: "This field is required",
                    })}
                ></textarea>
                {errors.description && (
                    <span className="text-red-500 font-normal">
                        {errors.description.message}
                    </span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold max-w-1/2">
                Price Per Night
                <input
                    type="number"
                    min={1}
                    className="border border-gray-300 rounded w-full py-1 px-2 font-normal flex-1"
                    {...register("pricePerNight", {
                        required: "This field is required",
                    })}
                ></input>
                {errors.pricePerNight && (
                    <span className="text-red-500 font-normal">
                        {errors.pricePerNight.message}
                    </span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold max-w-1/2">
                StarRating
                <select
                    {...register("starRating", {
                        required: "This field is required",
                    })}
                    className="border border-gray-300 rounded w-full p-2 text-gray-700 font-normal"
                >
                    <option value="" className="text-sm font-bold">
                        Select as Rating
                    </option>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
                {errors.starRating && (
                    <span className="text-red-500 font-normal">
                        {errors.starRating.message}
                    </span>
                )}
            </label>
        </div>
    );
};

export default HotelDetailsSection;
