import { GrSearch } from "react-icons/gr";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { useEffect, useRef, useState } from "react";

interface Props {
    children: React.ReactNode;
    showSearchBar?: boolean;
}

const LayoutSearch = ({ children, showSearchBar = true }: Props) => {
    const [expanded, setExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                expanded &&
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setExpanded(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [expanded]);
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="bg-bookingblue py-3"></div>

            {showSearchBar && (
                <div className="container mx-auto" ref={containerRef}>
                    {/* 手机端 */}
                    <div className="md:hidden block">
                        {expanded ? (
                            <SearchBar />
                        ) : (
                            <form
                                onClick={() => setExpanded(true)}
                                className="-mt-6 p-1 bg-orange-300 rounded shadow-md  flex flex-col md:flex-row item-center gap-1"
                            >
                                <div className="flex flex-row w-full md:w-1/4 items-center flex-1 rounded bg-white p-2">
                                    <GrSearch
                                        size={20}
                                        className=" text-gray-700 mr-2"
                                    />
                                    <div className="flex items-center w-full">
                                        <input
                                            placeholder="Where are you going?"
                                            className="text-md focus:outline-hidden"
                                            // value={destination}
                                            // onChange={(event) => setDestination(event.target.value)}
                                        />
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                    {/* 电脑端 */}
                    <div className="hidden md:block">
                        <SearchBar />
                    </div>
                </div>
            )}

            <div className="container mx-auto py-10 flex-1">{children}</div>
            <Footer />
        </div>
    );
};

export default LayoutSearch;
