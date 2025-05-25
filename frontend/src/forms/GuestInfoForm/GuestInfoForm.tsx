import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router";

type Props = {
    hotelId: string;
    pricePerNight: number;
};

type GuestInfoFormData = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
    const search = useSearchContext();
    const { isLoggedIn } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        watch,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount,
        },
    });

    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const onSignInClick = (data: GuestInfoFormData) => {
        search.saveSearchValues(
            "",
            data.checkIn,
            data.checkOut,
            data.adultCount,
            data.childCount
        );
        navigate("/sign-in", { state: { from: location } });
    };

    const onSubmit = (data: GuestInfoFormData) => {
        search.saveSearchValues(
            "",
            data.checkIn,
            data.checkOut,
            data.adultCount,
            data.childCount
        );
        navigate(`/hotel/${hotelId}/booking`);
    };

    return (
        <div className="flex flex-col  rounded gap-4">
            <div className="flex flex-col gap-4 p-7 text-gray-800 bg-white shadow-lg">
                <div className="flex justify-between">
                    <div className="flex gap-1 items-center">
                        <div className="text-gray-500 font-medium text-lg line-through">
                            £{pricePerNight * 2}
                        </div>
                        <div className="text-gray-700 font-medium text-lg">
                            £{pricePerNight}
                        </div>
                        <div className="text-gray-700">night</div>
                    </div>
                    <div className="flex gap-1 items-center">
                        <AiFillStar className="w-4 h-4 fill-yellow-400" />
                        <div className="text-gray-700 ">8.3 ·</div>
                        <div className="text-gray-500 "> 80</div>
                        <div className="text-gray-500">reviews</div>
                    </div>
                </div>
                {/* Date */}

                <form
                    onSubmit={
                        isLoggedIn
                            ? handleSubmit(onSubmit)
                            : handleSubmit(onSignInClick)
                    }
                    className="rounded-lg border-gray-500 border-[1px]"
                >
                    <div className="grid grid-cols-2 ">
                        <div className="border-gray-500 border-r-[1px] p-3">
                            <label className="text-sm font-bold text-gray-800">
                                CHECK-IN
                            </label>

                            <DatePicker
                                required
                                selected={checkIn}
                                onChange={(date) =>
                                    setValue("checkIn", date as Date)
                                }
                                selectsStart
                                startDate={checkIn}
                                endDate={checkOut}
                                minDate={minDate}
                                maxDate={maxDate}
                                placeholderText="Check-in Date"
                                className="min-w-full text-sm text-gray-600"
                                wrapperClassName="min-w-full"
                            />
                        </div>
                        <div className="p-3">
                            <label className="text-sm font-bold text-gray-800">
                                CHECK-OUT
                            </label>
                            <DatePicker
                                required
                                selected={checkOut}
                                onChange={(date) =>
                                    setValue("checkOut", date as Date)
                                }
                                selectsStart
                                startDate={checkIn}
                                endDate={checkOut}
                                minDate={minDate}
                                maxDate={maxDate}
                                placeholderText="Check-in Date"
                                className="min-w-full text-sm text-gray-600"
                                wrapperClassName="min-w-full"
                            />
                        </div>
                    </div>
                    <div className="flex item-center justify-between border-gray-700 border-t-[1px] p-3 gap-1">
                        <label className="flex items-center text-sm font-bold text-gray-800">
                            ADULTS:
                        </label>
                        <input
                            className="w-full text-sm bg-transparent  hover:text-gray-500 max-w-12 focus:outline-none"
                            type="number"
                            min={1}
                            max={20}
                            {...register("adultCount", {
                                required: "This field is required",
                                min: {
                                    value: 1,
                                    message: "There must be at least one adult",
                                },
                                valueAsNumber: true,
                            })}
                        />
                        <label className="flex items-center  text-sm font-bold text-gray-800">
                            CHILDREN:
                        </label>
                        <input
                            className="w-full bg-transparent text-sm hover:text-gray-500 max-w-12 focus:outline-none"
                            type="number"
                            min={0}
                            max={20}
                            {...register("childCount", {
                                valueAsNumber: true,
                            })}
                        />
                        {errors.adultCount && (
                            <span className="text-red-500 font-semibold text-sm">
                                {errors.adultCount.message}
                            </span>
                        )}
                    </div>
                </form>
                {isLoggedIn ? (
                    <Link
                        to="/booking"
                        className="flex items-center justify-center bg-bookingbutton rounded-lg text-white h-full p-2 font-bold hover:bg-bookingbuttonhover text-lg"
                    >
                        Book Now
                    </Link>
                ) : (
                    <Link
                        to="/signin"
                        className="flex items-center justify-center bg-bookingbutton rounded-lg text-white h-full p-2 font-bold hover:bg-bookingbuttonhover text-lg"
                    >
                        Sign in to Book
                    </Link>
                )}
                <div className="flex items-center justify-center text-sm text-gray-500">
                    You won&apos;t be charged yet
                </div>
                <div className="grid grid-cols-2 gap-1 text-sm">
                    <div className="underline">
                        CurrentPrice * stayDays nights
                    </div>
                    <div className="justify-self-end">184</div>
                    <div className="underline">Long stay discount</div>
                    <div className="justify-self-end text-red-500">-$300</div>
                    <div className="underline">Cleaning fee</div>
                    <div className="justify-self-end">$200</div>
                    <div className="underline">Service fee</div>
                    <div className="justify-self-end">$0</div>
                </div>
                <div className="flex justify-between border-t-[1px] py-3 ">
                    <div>Total before taxes</div>
                    <div>totalPrice</div>
                </div>
            </div>
        </div>
    );
};

export default GuestInfoForm;
