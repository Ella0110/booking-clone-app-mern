import { useFormContext } from "react-hook-form";
import type { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<HotelFormData>();
    const selectedFiles = watch("imageFiles");
    const existingImageUrls = watch("imageUrls");
    const totalImageLength =
        (selectedFiles?.length || 0) + (existingImageUrls?.length || 0);

    // console.log(
    //     "totalImageLength",
    //     totalImageLength,
    //     selectedFiles.length,
    //     existingImageUrls.length
    // );

    // 点击 Delete 按钮删除图片
    const handleDelete = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        imageUrl: string
    ) => {
        event.preventDefault(); // 防止点击 button 提交表单
        setValue(
            "imageUrls",
            existingImageUrls.filter((url) => url !== imageUrl)
        );
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-2 flex flex-col  border-gray-200 gap-2">
                {existingImageUrls && (
                    <div className="grid grid-cols-6 gap-2">
                        {existingImageUrls.map((url) => (
                            <div key={url} className="relative group">
                                <img
                                    src={url}
                                    className="min-h-full object-cover"
                                />
                                <button
                                    onClick={(event) =>
                                        handleDelete(event, url)
                                    }
                                    className="absolute inset-0 flex items-center justify-center bg-black 
                                opacity-0 group-hover:opacity-70 text-white font-bold "
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {/* 隐藏原生 input */}
                <div className="flex">
                    <input
                        id="imageFiles"
                        type="file"
                        multiple // 表示可以选多个文件
                        accept="image/*" // 只接受文件类型为图片的文件
                        className=" hidden "
                        {...register("imageFiles", {
                            validate: (imageFiles) => {
                                const totalLength =
                                    imageFiles?.length +
                                    (existingImageUrls?.length || 0);

                                if (totalLength < 3) {
                                    return "At least 3 image should be added.";
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
                    {totalImageLength && totalImageLength > 0 ? (
                        <p className="flex item-center p-2 justify-center  just text-gray-600 text-sm">
                            {totalImageLength} files
                        </p>
                    ) : (
                        <p className="flex item-center p-2 justify-center  just text-gray-600 text-sm">
                            No file chosen
                        </p>
                    )}
                </div>
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
