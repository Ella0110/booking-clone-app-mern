import { Link } from "react-router-dom";
import type { HotelType } from "../../../backend/src/shared/type";

type Props = {
    hotel: HotelType;
};

const MostPopularCard = ({ hotel }: Props) => {
    return (
        <Link
            to={`/detail/${hotel._id}`}
            className="relative cursor-pointer overflow-hidden rounded-md"
        >
            <div className="h-[300px]">
                <img
                    src={hotel.imageUrls[0]}
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div className="absolute bottom-0 p-4  bg-gradient-to-t from-bookingblue  w-full rounded-b-md">
                <span className="text-white font-bold tracking-tight text-xl">
                    {hotel.name}
                </span>
            </div>
        </Link>
    );
};

export default MostPopularCard;
