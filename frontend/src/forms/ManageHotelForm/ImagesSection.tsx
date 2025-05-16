import { useFormContext } from "react-hook-form";
import type { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                <input
                    type="file"
                    multiple // 表示可以选多个文件
                    accept="image/*" // 只接受文件类型为图片的文件
                    className="bg-amber-400 text-gray-700 w-full font-normal"
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                            const totalLength = imageFiles.length;

                            if (totalLength === 0) {
                                return "At least one image should be added.";
                            }

                            if (totalLength > 6) {
                                return "Total number of images can not more than 6.";
                            }

                            return true;
                        },
                    })}
                />
            </div>
            {errors.imageFiles && (
                <span className="text-red-500 font-normal text-sm">
                    {errors.imageFiles.message}
                </span>
            )}
        </div>
    );
};

export default ImagesSection;
