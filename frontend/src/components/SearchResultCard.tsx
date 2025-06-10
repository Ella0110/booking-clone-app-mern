import { Link } from "react-router";
import type { HotelType } from "../../../backend/src/shared/type";
import { AiFillStar } from "react-icons/ai";

type Props = {
    hotel: HotelType;
};

const SearchResultCard = ({ hotel }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-4 gap-4">
            <div className="w-full h-[240px]">
                <img
                    src={hotel.imageUrls[0]}
                    className="w-full h-full object-cover object-center rounded-lg"
                />
            </div>
            {/* Hotel Detail */}
            <div className="flex flex-col gap-2">
                <div className="flex flex-col md:flex-row justify-between gap-1">
                    <div className="flex flex-col md:flex-row  gap-1 md:gap-2">
                        <Link
                            to={`/detail/${hotel._id}`}
                            className="text-2xl font-bold tracking-wide text-bookingtext"
                        >
                            {hotel.name}
                        </Link>
                        <div className="hidden md:flex items-center">
                            <span className="flex items-center">
                                {Array.from({ length: hotel.starRating }).map(
                                    () => (
                                        <AiFillStar className="text-amber-400" />
                                    )
                                )}
                            </span>
                        </div>
                    </div>
                    {/* 电脑端 */}
                    <div className="hidden md:flex items-center gap-1 ">
                        <div className="flex flex-col">
                            <div className="font-semibold">{hotel.type}</div>
                            <div className="flex  justify-end text-xs text-gray-500">
                                8 reviews
                            </div>
                        </div>
                        <div className="flex items-center px-3 py-1 font-bold text-white rounded-br-lg rounded-tl-lg rounded-tr-lg bg-bookingreviewiconbg">
                            {hotel.starRating}
                        </div>
                    </div>
                    {/* 手机端 */}
                    <div className="md:hidden flex items-center justify-between gap-2 ">
                        <div className="md:hidden flex items-center justify-between gap-2">
                            <div className="flex items-center text-sm px-2 py-1 font-bold text-white rounded-br-md rounded-tl-md rounded-tr-md bg-bookingreviewiconbg">
                                {hotel.starRating}
                            </div>
                            <div className="text-sm font-semibold">
                                {hotel.type} ·
                            </div>
                            <div className="flex  justify-end text-sm text-gray-500">
                                8 reviews
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="flex items-center">
                                {Array.from({ length: hotel.starRating }).map(
                                    () => (
                                        <AiFillStar className="text-amber-400" />
                                    )
                                )}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between gap-2">
                    <div className="w-2/3 text-sm line-clamp-4">
                        {hotel.description}
                    </div>
                    <div className="flex flex-col justify-end">
                        <div className="flex justify-end text-xs text-gray-500 mb-1 ">
                            1 night, 2 adults
                        </div>
                        <div className="flex justify-end text-xs text-red-600 line-through">
                            CNY {hotel.pricePerNight * 1 * 1.5}
                        </div>
                        <div className="flex justify-end text-lg font-semibold">
                            CNY {hotel.pricePerNight}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col  md:flex-row gap-4 md:justify-between mt-8">
                    <div className="flex gap-1 items-center">
                        {hotel.facilities.slice(0, 2).map((facility) => (
                            <span className="flex items-center font-semibold px-2 py-1 bg-bookingyellow text-bookingblue rounded-full text-xs whitespace-nowrap">
                                {facility}
                            </span>
                        ))}
                        <span className="text-gray-500 text-xs">
                            {hotel.facilities.length > 2 &&
                                ` + ${hotel.facilities.length - 2} more`}
                        </span>
                    </div>
                    <div className="">
                        <Link
                            type="submit"
                            to={`/detail/${hotel._id}`}
                            className="flex justify-center items-center  bg-bookingbutton text-md text-white font-semibold px-3 py-1 rounded hover:bg-bookingbuttonhover disabled:bg-gray-400"
                        >
                            See availability
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultCard;
