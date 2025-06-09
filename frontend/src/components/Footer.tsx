const Footer = () => {
    return (
        <div className="bg-bookingblue py-10">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-xl md:text-3xl  text-white font-bold tracking-tight">
                    BookHub
                </span>
                <span className="text-sm md:text-md text-white font-bold tracking-tight flex gap-4">
                    <p className="cursor-pointer">Privacy Policy</p>
                    <p className="cursor-pointer">Term of Service</p>
                </span>
            </div>
        </div>
    );
};

export default Footer;
