import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Register from "./components/Register/Register";
import Login from './components/Login/Login';
import {AuthProvider} from './context/AuthContext';
import Create from "./components/Create/Create";
import AllFigures from "./components/AllFigures/AllFigures";
import Details from "./components/Details/Details";
import Edit from "./components/Edit/Edit";
import Logout from "./components/Logout/Logout";
import LoginGuard from "./components/RouteCommon/LoginGuard";

function App() {
    return (
        <>
            <AuthProvider>
                <Header/>
                <main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/all-figures" element={<AllFigures/>}/>
                        <Route path="/details/:id" element={<Details/>}/>
                        <Route path="/register" element={<Register/>}/>

                        <Route element={<LoginGuard/>}>
                            <Route path="/create" element={<Create/>}/>
                            <Route path="/logout" element={<Logout/>}/>
                            <Route path="/edit/:id" element={<Edit/>}/>
                        </Route>
                    </Routes>
                </main>
            </AuthProvider>
        </>
    );
}

export default App;
