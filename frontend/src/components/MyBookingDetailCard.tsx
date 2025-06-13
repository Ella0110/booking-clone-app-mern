import type { HotelType } from "../../../backend/src/shared/type";
import { IoMdMore } from "react-icons/io";

type Props = {
    hotel: HotelType;
};

const MyBookingDetailCard = ({ hotel }: Props) => {
    return (
        <>
            {hotel.bookings.map((booking) => (
                <div
                    className="flex flex-col lg:flex-row justify-between items-start
             py-1 "
                >
                    <div className="pb-2 md:pb-0">
                        <div>
                            <span className="font-bold mr-2">Dates: </span>
                            <span className="text-[15px]">
                                {new Date(booking.checkIn).toDateString()} -
                                {new Date(booking.checkOut).toDateString()}
                            </span>
                        </div>
                        <div>
                            <span className="font-bold mr-2">Guests:</span>
                            <span className="text-[15px]">
                                {booking.adultCount} adults,{" "}
                                {booking.childCount} children
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-2xl lg:text-xl text-slate-800 font-bold">
                            £{booking.totalCost}
                        </div>
                        <IoMdMore
                            size={25}
                            className="text-gray-400 hover:text-gray-500"
                        />
                    </div>
                </div>
            ))}
        </>
    );
};

export default MyBookingDetailCard;
