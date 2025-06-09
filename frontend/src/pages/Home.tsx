import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LastestDestinationCard";
import MostPopularCard from "../components/MostPopularCard";
import { Link } from "react-router";

const Home = () => {
    const { data: hotels } = useQuery("fetchQuery", () =>
        apiClient.fetchHotels()
    );

    const topRowHotels = hotels?.slice(0, 2) || [];
    const bottomRowHotels = hotels?.slice(2, 5) || [];
    const OtherHotels = hotels?.slice(5, 10) || [];

    return (
        <div className="my-8 flex flex-col gap-12">
            <div className="space-y-2">
                <h2 className="text-2xl font-extrabold tracking-wide">
                    Browse by prevalent
                </h2>
                <p className="text-gray-600 mb-4">
                    Most popular desinations sorting by star ratings.
                </p>
                <div className="grid gap-4">
                    <div className="grid md:grid-cols-5 gap-4">
                        {OtherHotels.map((hotel) => (
                            <MostPopularCard hotel={hotel} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="space-y-3">
                <h2 className="text-2xl font-extrabold tracking-wide">
                    Latest Destinations
                </h2>
                <p className="text-gray-600">
                    Most recent desinations added by our hosts
                </p>
                <div className="grid gap-4">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        {topRowHotels.map((hotel) => (
                            <LatestDestinationCard hotel={hotel} />
                        ))}
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        {bottomRowHotels.map((hotel) => (
                            <LatestDestinationCard hotel={hotel} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="space-y-3">
                <h2 className="text-2xl font-extrabold tracking-wide">
                    Travel more, spend less
                </h2>
                <div>
                    <div className=" p-4 flex justify-between items-center border border-slate-200 rounded-lg">
                        <div className="flex flex-col gap-2 ">
                            <p className="text-lg font-bold">
                                Sign in, save money
                            </p>
                            <p>
                                Save 10% or more at participating properties -
                                just look for the blue Genius label
                            </p>
                            <div className="flex">
                                <Link
                                    to="/signin"
                                    className="flex items-center self-center text-white p-2  text-sm font-medium rounded-sm bg-bookingbutton hover:bg-bookingbuttonhover cursor-pointer"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex  items-center self-center text-bookingtext p-2 ml-2 text-sm font-medium rounded-sm bg-white hover:bg-bookingwhitebghover cursor-pointer"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                        <div className="w-[200px] ">
                            <img
                                className="h-[100px]"
                                src="/GeniusGenericGiftBox@2x.png"
                                alt="image"
                            />
                        </div>
                    </div>
                </div>
                {/* <div className="grid gap-4">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        {topRowHotels.map((hotel) => (
                            <LatestDestinationCard hotel={hotel} />
                        ))}
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        {bottomRowHotels.map((hotel) => (
                            <LatestDestinationCard hotel={hotel} />
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Home;
