import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const MyBookings = () => {
    const { data: hotels } = useQuery(
        "fetchMyBookings",
        apiClient.fetchMyBookings
    );

    if (!hotels || hotels?.length === 0) {
        return <span>No bookings found</span>;
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">My Bookings</h1>
            <div className="flex flex-col gap-8">
                {hotels.map((hotel) => (
                    <div
                        className="flex flex-col lg:flex-row items-center border border-bookingformbackground rounded-lg 
                    shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_10px_rgba(0,0,0,0.4)] p-8 gap-8"
                    >
                        <div className="lg:w-[150px] lg:h-[150px]">
                            <img
                                src={hotel.imageUrls[0]}
                                className="w-full h-full object-cover rounded-lg object-center"
                            />
                        </div>
                        <div className="flex grow flex-col gap-4 overflow-y-auto max-h-[300px]">
                            <div className="text-xl font-bold">
                                {hotel.name}
                                <div className="text-sm font-normal">
                                    {hotel.city}, {hotel.country}
                                </div>
                            </div>
                            {hotel.bookings.map((booking) => (
                                <div
                                    className="flex flex-col lg:flex-row justify-between items-start 
                                 py-1 "
                                >
                                    <div>
                                        <div>
                                            <span className="font-bold mr-2">
                                                Dates:{" "}
                                            </span>
                                            <span className="text-[15px]">
                                                {new Date(
                                                    booking.checkIn
                                                ).toDateString()}{" "}
                                                -
                                                {new Date(
                                                    booking.checkOut
                                                ).toDateString()}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-bold mr-2">
                                                Guests:
                                            </span>
                                            <span className="text-[15px]">
                                                {booking.adultCount} adults,{" "}
                                                {booking.childCount} children
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-xl text-slate-800 font-bold">
                                        £{booking.totalCost}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookings;
