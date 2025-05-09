import { Link } from "react-router";

const Header = () => {
    return (
        <div className="bg-bookingblue py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-2xl text-white font-bold tracking-tight">
                    <Link to="/">BookingClone.com</Link>
                </span>
                <span className="flex space-x-2">
                    <Link
                        to="/currency"
                        className="flex items-center text-white px-3 text-base font-bold rounded-sm hover:bg-bookingtexthover"
                    >
                        NZD
                    </Link>
                    <Link
                        to="/translate"
                        className="flex items-center px-3 py-1  text-white text-sm font-medium rounded-full hover:bg-bookingtexthover"
                    >
                        文/A
                    </Link>
                    <Link
                        to="/register"
                        className="flex items-center text-bookingtext px-3 py-1 text-sm font-medium rounded-sm bg-white hover:bg-gray-100"
                    >
                        Register
                    </Link>
                    <Link
                        to="/signin"
                        className="flex items-center text-bookingtext px-3 py-1 text-sm font-medium rounded-sm bg-white hover:bg-gray-100"
                    >
                        Sign In
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default Header;
