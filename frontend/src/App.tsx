import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/layout";
import Register from "./pages/Register";
import Header from "./components/Header";
import { Navigate } from "react-router";
import AddHotel from "./pages/AddHotel";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import LayoutSearch from "./layout/LayoutSearch";
import LayoutComm from "./layout/LayoutComm";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import Home from "./pages/Home";
import MyBookings from "./pages/MyBookings";

const App = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />
                <Route
                    path="/detail/:hotelId"
                    element={
                        <LayoutSearch showSearchBar={false}>
                            <Detail />
                        </LayoutSearch>
                    }
                />
                <Route
                    path="/search"
                    element={
                        <LayoutSearch>
                            <Search />
                        </LayoutSearch>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <>
                            <Header />
                            <Register />
                        </>
                    }
                />
                <Route
                    path="/signin"
                    element={
                        <>
                            <Header />
                            <SignIn />
                        </>
                    }
                />
                {isLoggedIn && (
                    <>
                        <Route
                            path="/hotel/:hotelId/booking"
                            element={
                                <LayoutComm>
                                    <Booking />
                                </LayoutComm>
                            }
                        />
                        <Route
                            path="/add-hotel"
                            element={
                                <LayoutComm>
                                    <AddHotel />
                                </LayoutComm>
                            }
                        />
                        <Route
                            path="/my-hotels"
                            element={
                                <LayoutComm>
                                    <MyHotels />
                                </LayoutComm>
                            }
                        />
                        <Route
                            path="/my-bookings"
                            element={
                                <LayoutComm>
                                    <MyBookings />
                                </LayoutComm>
                            }
                        />
                        <Route
                            path="/edit-hotel/:hotelId"
                            element={
                                <LayoutComm>
                                    <EditHotel />
                                </LayoutComm>
                            }
                        />
                    </>
                )}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
