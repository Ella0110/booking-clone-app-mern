import { useForm } from "react-hook-form";
import type {
    PaymentIntentResponse,
    UserType,
} from "../../../../backend/src/shared/type";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { type StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router";
import { CgCheck } from "react-icons/cg";

type Props = {
    currentUser: UserType;
    paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
    firstname: string;
    lastname: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: string;
    checkOut: string;
    hotelId: string;
    paymentIntentId: string;
    totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const search = useSearchContext();
    const { hotelId } = useParams();

    const { showToast } = useAppContext();

    const { mutate: bookRoom, isLoading } = useMutation(
        apiClient.createRoomBooking,
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries("fetchMyBookings");
                showToast({ message: "Booking Saved!", type: "SUCCESS" });
                navigate("/my-bookings");
            },
            onError: () => {
                showToast({ message: "Error saving booking", type: "ERROR" });
            },
        }
    );

    const { handleSubmit, register } = useForm<BookingFormData>({
        defaultValues: {
            firstname: currentUser.firstname,
            lastname: currentUser.lastname,
            email: currentUser.email,
            adultCount: search.adultCount,
            childCount: search.childCount,
            checkIn: search.checkIn.toISOString(),
            checkOut: search.checkOut.toISOString(),
            hotelId: hotelId,
            totalCost: paymentIntent.totalCost,
            paymentIntentId: paymentIntent.paymentIntentId,
        },
    });

    const onSubmit = async (formData: BookingFormData) => {
        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmCardPayment(
            paymentIntent.clientSecret,
            {
                payment_method: {
                    card: elements.getElement(CardElement) as StripeCardElement,
                },
            }
        );

        if (result.paymentIntent?.status === "succeeded") {
            bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
        }
    };
    // console.log(paymentIntent.totalCost);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4"
        >
            <div className="grid grid-cols-1 gap-5 rounded-lg border border-bookingborder p-5">
                <span className="text-xl font-bold">Confirm Your Details</span>
                <div className="grid grid-cols-2 gap-6">
                    <label className=" text-sm  flex-1">
                        First name
                        <input
                            className="mt-1 border border-gray-500 rounded w-full py-2 px-3 text-gray-700 bg-gray-100 font-normal"
                            type="text"
                            readOnly
                            disabled
                            {...register("firstname")}
                        />
                    </label>
                    <label className="text-sm  flex-1">
                        Last name
                        <input
                            className="mt-1 border border-gray-500 rounded w-full py-2 px-3 text-gray-700 bg-gray-100 font-normal"
                            type="text"
                            readOnly
                            disabled
                            {...register("lastname")}
                        />
                    </label>
                    <label className=" text-sm flex-1">
                        Email address
                        <input
                            className="mt-1 border border-gray-500 rounded w-full py-2 px-3 text-gray-700 bg-gray-100 font-normal"
                            type="text"
                            readOnly
                            disabled
                            {...register("email")}
                        />
                        <div className="text-xs text-gray-600 mt-1">
                            Confirmation email goes to this address
                        </div>
                    </label>
                </div>

                <div className="space-y-2">
                    <h2 className="text-lg font-bold">Your Price Summary</h2>

                    <div className="bg-blue-50 px-8 py-4 rounded-md flex flex-col items-end gap-2">
                        <div className="text-red-700 line-through text-lg">
                            £{(paymentIntent.totalCost * 1.5).toFixed(2)}{" "}
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <div className="text-3xl font-bold">Price</div>
                            <div className="text-3xl font-bold ">
                                £{paymentIntent.totalCost.toFixed(2)}
                            </div>
                        </div>
                        <div className="text-sm text-gray-600">
                            Includes taxes and charges
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-1 rounded-lg border border-bookingborder p-5">
                <h3 className="text-lg font-bold mb-1">Good to know</h3>
                <div className="grid grid-cols-[1fr_9fr] md:grid-cols-[1fr_15fr] xl:grid-cols-[1fr_30fr]  items-center">
                    <CgCheck
                        size={16}
                        className="bg-green-600  w-4 text-white rounded-full"
                    />
                    <div className="text-sm">
                        Stay flexible: You can cancel for free before 5 June
                        2025, so lock in this great price today.
                    </div>
                    <CgCheck
                        size={16}
                        className="bg-green-600 w-4 text-white rounded-full"
                    />
                    <div className="text-sm">
                        You'll get the entire apartment to yourself!
                    </div>
                </div>
            </div>

            <div className="rounded-lg border border-bookingborder p-5 space-y-2">
                <h3 className="text-lg font-bold"> Payment Details</h3>
                <CardElement
                    id="payment-element"
                    className="border rounded-md p-2 text-sm"
                />
            </div>

            <div className="flex justify-end">
                <button
                    disabled={isLoading}
                    type="submit"
                    className="bg-bookingbutton rounded-lg text-white px-4 py-2 font-semibold hover:bg-bookingbuttonhover 
                    text-md disabled:bg-gray-500"
                >
                    {isLoading ? "Saving..." : "Confirm Booking"}
                </button>
            </div>
        </form>
    );
};

export default BookingForm;
