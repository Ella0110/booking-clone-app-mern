import { Link } from "react-router";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { BsMap, BsBuilding } from "react-icons/bs";
import { BiMoney, BiHotel, BiStar } from "react-icons/bi";

const MyHotels = () => {
    const { data: hotelData } = useQuery(
        "fetchMyHotels",
        apiClient.fetchMyHotels,
        {
            onError: () => {
                // show Toast
            },
        }
    );
    if (!hotelData) {
        return <span>No hotel found.</span>;
    }
    // console.log(hotelData);
    return (
        <div className="space-y-5">
            <span className="flex justify-between">
                <h1 className="text-3xl font-bold">My Hotels</h1>
                <Link
                    to="/add-hotel"
                    className="flex text-white rounded text-xl font-bold px-3 py-1 bg-bookingbutton hover:bg-bookingbuttonhover"
                >
                    Add Hotel
                </Link>
            </span>
            <div className="grid grid-cols-1 gap-8">
                {hotelData.map((hotel) => (
                    <div
                        key={hotel._id}
                        className="flex flex-col justify-between  border border-bookingformbackground rounded-lg 
                    shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_10px_rgba(0,0,0,0.4)] p-8 gap-5"
                    >
                        <h2 className="text-2xl font-bold">{hotel.name}</h2>
                        <div className="whitespace-pre-line">
                            {" "}
                            {/*防止 overflow*/}
                            {hotel.description.length > 200
                                ? hotel.description.slice(0, 200) + "..."
                                : hotel.description}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">
                                Most popular facilities
                            </h3>
                            <div className="flex gap-2 flex-wrap">
                                <div className=" rounded-sm p-3 flex items-center text-slate-800 text-sm">
                                    <BsMap className="mr-1  text-blue-600" />
                                    {hotel.city}, {hotel.country}
                                </div>
                                <div className=" rounded-sm p-3 flex items-center text-slate-800 text-sm">
                                    <BsBuilding className="mr-1 text-blue-600" />
                                    {hotel.type}
                                </div>
                                <div className=" rounded-sm p-3 flex items-center text-slate-800 text-sm">
                                    <BiMoney className="mr-1 text-blue-600" />£
                                    {hotel.pricePerNight} per night
                                </div>
                                <div className=" rounded-sm p-3 flex items-center text-slate-800 text-sm">
                                    <BiHotel className="mr-1 text-blue-600" />
                                    {hotel.adultCount} adults,{" "}
                                    {hotel.childCount} children
                                </div>
                                <div className=" rounded-sm p-3 flex items-center text-slate-800 text-sm">
                                    <BiStar className="mr-1 text-blue-600" />
                                    {hotel.starRating} Star Rating
                                </div>
                            </div>
                        </div>
                        <span className="flex justify-start">
                            <Link
                                to={`/edit-hotel/${hotel._id}`}
                                className="flex bg-bookingbutton text-white text-lg font-bold px-3 py-1 rounded hover:bg-bookingbuttonhover"
                            >
                                View Details
                            </Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyHotels;
