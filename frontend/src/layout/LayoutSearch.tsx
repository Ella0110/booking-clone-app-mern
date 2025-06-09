import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

interface Props {
    children: React.ReactNode;
    showSearchBar?: boolean;
}

const LayoutSearch = ({ children, showSearchBar = true }: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="bg-bookingblue py-3"></div>

            {showSearchBar && (
                <div className="container mx-auto">
                    <SearchBar />
                </div>
            )}

            <div className="container mx-auto py-10 flex-1">{children}</div>
            <Footer />
        </div>
    );
};

export default LayoutSearch;
