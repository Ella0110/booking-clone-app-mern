import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/layout";
import Register from "./pages/Register";
import Header from "./components/Header";
import SignIn from "./pages/Signin";

const App = () => {
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
                            <p>Search Page</p>
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
            </Routes>
        </Router>
    );
};

export default App;
