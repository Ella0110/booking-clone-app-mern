import { useEffect, useRef, useState } from "react";
import type { HotelType } from "../../../backend/src/shared/type";
import { IoMdMore } from "react-icons/io";
import { deleteMyBooking } from "../api-client";

type Props = {
    hotel: HotelType;
};

const MyBookingDetailCard = ({ hotel }: Props) => {
    const [bookings, setBookings] = useState(hotel.bookings);
    const [openBookingId, setOpenBookingId] = useState<string | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setBookings(hotel.bookings);
    }, [hotel.bookings]);

    const handleDelete = async (bookingId: string) => {
        try {
            await deleteMyBooking(hotel._id, bookingId);
            setBookings((prev) => prev.filter((b) => b._id !== bookingId));
        } catch (err) {
            console.error(err);
        } finally {
            setOpenBookingId(null);
        }
    };

    return (
        <>
            {bookings.map((booking) => (
                <div
                    key={booking._id}
                    className="flex flex-col lg:flex-row justify-between items-start
             py-1 "
                >
                    <div className="pb-2 md:pb-0">
                        <div>
                            <span className="font-bold mr-2">Dates: </span>
                            <span className="text-[13px] lg:text-[15px]">
                                {new Date(booking.checkIn).toDateString()} -
                                {new Date(booking.checkOut).toDateString()}
                            </span>
                        </div>
                        <div>
                            <span className="font-bold mr-2">Guests:</span>
                            <span className="text-[13px] lg:text-[15px]">
                                {booking.adultCount} adults,{" "}
                                {booking.childCount} children
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-xl text-slate-800 font-bold">
                            £{booking.totalCost}
                        </div>
                        <div className="relative" ref={ref}>
                            <button
                                className="cursor-pointer flex items-center justify-center"
                                onClick={() =>
                                    setOpenBookingId(
                                        openBookingId === booking._id
                                            ? null
                                            : booking._id
                                    )
                                }
                            >
                                <IoMdMore
                                    size={25}
                                    className="text-gray-400 hover:text-gray-500"
                                />
                            </button>
                            {openBookingId === booking._id && (
                                <div className="absolute -top-1 left-8 md:-left-16 md:top-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden z-10">
                                    <button
                                        className=" px-2 py-1/2 w-full flex items-center justify-center active:bg-gray-100 focus:bg-gray-100 "
                                        onClick={() =>
                                            handleDelete(booking._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default MyBookingDetailCard;
