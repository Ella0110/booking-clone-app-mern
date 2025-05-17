import { useFormContext } from "react-hook-form";
import type { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<HotelFormData>();
    const selectedFiles = watch("imageFiles");

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-2 flex item-center  border-gray-200 gap-1">
                {/* 隐藏原生 input */}
                <input
                    id="imageFiles"
                    type="file"
                    multiple // 表示可以选多个文件
                    accept="image/*" // 只接受文件类型为图片的文件
                    className=" hidden "
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
                {/* 自定义上传按钮 */}
                <label
                    htmlFor="imageFiles"
                    className="flex item-center px-2 py-1 justify-center bg-bookingformbackground  hover:bg-gray-200 
                    text-gray-700 rounded cursor-pointer border border-gray-300"
                >
                    Choose File
                </label>

                {/* 可选：显示已选文件数量 */}
                {selectedFiles && selectedFiles.length > 0 ? (
                    <p className="flex item-center p-2 justify-center  just text-gray-600 text-sm">
                        {selectedFiles.length} files
                    </p>
                ) : (
                    <p className="flex item-center p-2 justify-center  just text-gray-600 text-sm">
                        No file chosen
                    </p>
                )}
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
