import type { HotelType } from "../../../backend/src/shared/type";

type Props = {
    adultCount: number;
    childCount: number;
    hotel: HotelType;
};

const HotelDetailSummary = ({ adultCount, childCount, hotel }: Props) => {
    return (
        <div className="flex flex-col rounded-lg border border-bookingborder p-5 h-fit gap-2">
            <div className="text-md font-bold">
                Apartment in {hotel.city} for {adultCount + childCount} people
            </div>
            <div className="text-sm">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
            {/* <div className="text-xs text-green-700">Great location —— 8.3</div> */}
            <div className=" flex gap-2 items-center">
                <div className="flex items-center px-[6px] text-sm py-[1px] text-white rounded-br-md rounded-tl-md rounded-tr-md bg-bookingreviewiconbg">
                    {hotel.starRating}
                </div>
                <div className="text-xs">Good</div>
                <div className="text-xs">3 Reviews</div>
            </div>
        </div>
    );
};

export default HotelDetailSummary;
