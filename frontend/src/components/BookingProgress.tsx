import { CgCheck } from "react-icons/cg";

const BookingProgress = () => {
    return (
        <div className="hidden md:flex justify-between items-center">
            <div className="flex items-cemter gap-2 justify-center">
                <CgCheck
                    size={24}
                    className="bg-bookingbutton text-white rounded-full"
                />

                <div className="text-sm font-bold flex items-center">
                    Your selection
                </div>
            </div>

            <div className="flex-1 h-px bg-gray-400 mx-2"></div>
            <div className="flex items-center gap-2 justify-center">
                <div
                    className="flex items-center justify-center w-7 h-7 rounded-full border-2 text-white font-bold 
                bg-bookingbutton "
                >
                    2
                </div>
                <div className="text-sm font-bold flex items-center">
                    Your details
                </div>
            </div>
            <div className="flex-1 h-px bg-gray-400 mx-2"></div>
            <div className="flex items-cemter gap-2 justify-center">
                <div
                    className="flex items-center justify-center w-6 h-6 rounded-full border-2 text-gray-500 font-bold 
                border-gray-500 "
                >
                    3
                </div>
                <div className="text-sm font-bold flex text-gray-500 items-center">
                    Finish booking
                </div>
            </div>
        </div>
    );
};

export default BookingProgress;
