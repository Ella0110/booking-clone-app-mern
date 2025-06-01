type Props = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    numberOfNights: number;
};

const BookingDetailsSummary = ({
    checkIn,
    checkOut,
    adultCount,
    childCount,
    numberOfNights,
}: Props) => {
    return (
        <div className="grid gap-4 rounded-lg border border-bookingborder p-5 h-fit">
            <h2 className="text-md font-bold">Your Booking Details</h2>
            <div className="flex justify-between">
                <div className="text-sm">
                    Check-in
                    <div className="font-bold text-[16px]">
                        {" "}
                        {checkIn.toDateString()}
                    </div>
                </div>
                <div className=" w-px bg-gray-300 "></div>
                <div className="text-sm">
                    Check-out
                    <div className="font-bold text-[16px]">
                        {" "}
                        {checkOut.toDateString()}
                    </div>
                </div>
            </div>
            <div className="text-sm border-b border-gray-300">
                Total length of stay:
                <div className="font-bold py-2 ">{numberOfNights} nights</div>
            </div>

            <div className="text-sm">
                You selected{" "}
                <div className="font-bold text-[16px] pt-2">
                    {adultCount} adults & {childCount} children
                </div>
            </div>
        </div>
    );
};

export default BookingDetailsSummary;
