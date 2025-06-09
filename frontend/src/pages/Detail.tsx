import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import { Link } from "react-router";

const Detail = () => {
    const { hotelId } = useParams();

    const { data: hotel } = useQuery(
        "fetchHotelById",
        () => apiClient.fetchHotelById(hotelId || ""),
        {
            enabled: !!hotelId,
        }
    );

    if (!hotel) {
        return <></>;
    }

    const extraCount = Math.max(0, hotel.imageUrls.length - 3);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="text-white font-bold bg-bookingsymbol text-sm px-1 rounded-xs">
                            Genius
                        </div>
                        <span className="flex">
                            {Array.from({ length: hotel.starRating }).map(
                                (_, index) => (
                                    <AiFillStar
                                        key={index}
                                        className="fill-yellow-400"
                                    />
                                )
                            )}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold">{hotel.name}</h1>
                </div>
                <div className="hidden md:block bg-bookingbutton hover:bg-bookingbuttonhover text-white px-3 py-1 rounded">
                    Reserve
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {hotel.imageUrls.slice(0, 3).map((image, index, array) => (
                    <div key={image} className="relative h-[300px]">
                        <img
                            src={image}
                            alt={hotel.name}
                            className="rounded-md w-full h-full object-cover object-center"
                        />
                        {/* 覆盖层只出现在最后一张且有剩余图片时 */}
                        {index === array.length - 1 && extraCount > 0 && (
                            <Link
                                to="/"
                                // onClick={handleShowAll}
                                aria-label={`Show ${extraCount} more photos`}
                                className="absolute inset-0 flex items-center justify-center 
                         bg-black/50 backdrop-blur text-white text-xl font-semibold
                         rounded-md hover:bg-black/60 underline focus:outline-none"
                            >
                                + {extraCount} photos
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                <div className="flex flex-col gap-4">
                    <div className="whitespace-pre-line">
                        {hotel.description}
                    </div>
                    <h2 className="text-lg font-bold">
                        Most popular facilities
                    </h2>
                    <div className="flex flex-wrap gap-6">
                        {hotel.facilities.map((facility) => (
                            <div
                                key={facility}
                                className="bg-bookingyellow text-bookingblue px-2 py-1 rounded-full text-sm"
                            >
                                {facility}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="h-fit">
                    <GuestInfoForm
                        pricePerNight={hotel.pricePerNight}
                        hotelId={hotel._id}
                    />
                </div>
            </div>
        </div>
    );
};

export default Detail;
