import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";
import BookingProgress from "../components/BookingProgress";
import HotelDetailSummary from "../components/HotelDetailSummary";
import ReviewHoursRules from "../components/ReviewHoursRules";

const Booking = () => {
    const { stripePromise } = useAppContext();
    const search = useSearchContext();
    const { hotelId } = useParams();

    const [numberOfNights, setNumberOfNights] = useState<number>(0);

    useEffect(() => {
        if (search.checkIn && search.checkOut) {
            const nights =
                Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
                (1000 * 60 * 60 * 24);

            setNumberOfNights(Math.ceil(nights));
        }
    }, [search.checkIn, search.checkOut]);

    const { data: paymentIntentData } = useQuery(
        "createPaymentIntent",
        () =>
            apiClient.createPaymentIntent(
                hotelId as string,
                numberOfNights.toString()
            ),
        {
            enabled: !!hotelId && numberOfNights > 0,
        }
    );

    const { data: hotel } = useQuery(
        "fetchHotelByID",
        () => apiClient.fetchHotelById(hotelId as string),
        {
            enabled: !!hotelId,
        }
    );

    const { data: currentUser } = useQuery(
        "fetchCurrentUser",
        apiClient.fetchCurrentUser
    );

    if (!hotel) {
        return <></>;
    }

    return (
        <div className="flex flex-col gap-8">
            <BookingProgress />
            <div className="grid md:grid-cols-[1fr_2fr] gap-8">
                <div className="flex flex-col gap-4">
                    <HotelDetailSummary
                        adultCount={search.adultCount}
                        childCount={search.childCount}
                        hotel={hotel}
                    />
                    <BookingDetailsSummary
                        checkIn={search.checkIn}
                        checkOut={search.checkOut}
                        adultCount={search.adultCount}
                        childCount={search.childCount}
                        numberOfNights={numberOfNights}
                    />
                    <ReviewHoursRules />
                </div>
                {currentUser && paymentIntentData && (
                    <Elements
                        stripe={stripePromise}
                        options={{
                            clientSecret: paymentIntentData.clientSecret,
                        }}
                    >
                        <BookingForm
                            currentUser={currentUser}
                            paymentIntent={paymentIntentData}
                        />
                    </Elements>
                )}
            </div>
        </div>
    );
};

export default Booking;
