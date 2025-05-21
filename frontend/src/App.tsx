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

const App = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <p>Home Page</p>
                        </Layout>
                    }
                />
                <Route
                    path="/search"
                    element={
                        <Layout>
                            <Search />
                        </Layout>
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
                            path="/add-hotel"
                            element={
                                <Layout>
                                    <AddHotel />
                                </Layout>
                            }
                        />
                        <Route
                            path="/my-hotels"
                            element={
                                <Layout>
                                    <MyHotels />
                                </Layout>
                            }
                        />
                        <Route
                            path="/edit-hotel/:hotelId"
                            element={
                                <Layout>
                                    <EditHotel />
                                </Layout>
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
