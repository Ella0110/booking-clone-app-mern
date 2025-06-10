import { Link } from "react-router";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import { GrSearch } from "react-icons/gr";
// import { VscAccount } from "react-icons/vsc";
import { FiMenu } from "react-icons/fi";
import { RiAccountCircleFill, RiAccountCircleLine } from "react-icons/ri";

const Header = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <div className="bg-bookingblue py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-2xl text-white font-bold tracking-tight">
                    <Link to="/">BookHub.com</Link>
                </span>
                <span className="flex space-x-2">
                    <Link
                        to="/search"
                        className="flex items-center rounded-full hover:bg-bookingtexthover cursor-pointer px-2 py-1"
                    >
                        <GrSearch size={20} className=" text-white  " />
                    </Link>

                    <Link
                        to="/currency"
                        className="hidden sm:flex items-center text-white px-3 text-base font-bold rounded-full hover:bg-bookingtexthover cursor-pointer"
                    >
                        NZD
                    </Link>
                    <Link
                        to="/translate"
                        className="hidden sm:flex items-center px-3 py-1  text-white text-sm font-medium rounded-full hover:bg-bookingtexthover cursor-pointer"
                    >
                        文/A
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/my-bookings"
                                className="hidden sm:flex items-center px-3 py-1  text-white text-sm font-medium rounded-full hover:bg-bookingtexthover cursor-pointer"
                            >
                                My Booking
                            </Link>
                            <Link
                                to="/my-hotels"
                                className="hidden sm:flex items-center px-3 py-1  text-white text-sm font-medium rounded-full hover:bg-bookingtexthover cursor-pointer"
                            >
                                My Hotel
                            </Link>
                            <SignOutButton />
                            <Link
                                to="/"
                                className="sm:hidden flex items-center rounded-full hover:bg-bookingtexthover cursor-pointer px-2 py-1"
                            >
                                <RiAccountCircleFill
                                    size={20}
                                    className="text-white"
                                />
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/register"
                                className="hidden sm:flex items-center self-center text-bookingtext px-2 py-1 text-sm font-medium rounded-sm bg-white hover:bg-gray-100 cursor-pointer"
                            >
                                Register
                            </Link>
                            <Link
                                to="/signin"
                                className="hidden sm:flex  items-center self-center text-bookingtext px-2 ml-2 py-1 text-sm font-medium rounded-sm bg-white hover:bg-gray-100 cursor-pointer"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signin"
                                className="sm:hidden flex items-center rounded-full hover:bg-bookingtexthover cursor-pointer px-2 py-1"
                            >
                                <RiAccountCircleLine
                                    size={20}
                                    className="text-white"
                                />
                            </Link>
                        </>
                    )}
                    <Link
                        to="/"
                        className="sm:hidden flex items-center rounded-full hover:bg-bookingtexthover cursor-pointer px-2 py-1"
                    >
                        <FiMenu size={20} className="text-white" />
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default Header;
