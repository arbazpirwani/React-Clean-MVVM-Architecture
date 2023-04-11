import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import BookHomeView from '../pages/books/BookHomeView';
import LoginView from '../pages/login/LoginView';
import React, {useState} from 'react';
import {STORAGE_KEYS} from '../../data/constant/Constants';
import SharedPreferences from "../../core/utils/SharedPreferences";
import {ROUTE_ENDPOINTS} from "../../data/constant/RouteConstants";
import BookDetailView from "../pages/books/BookDetailView";

export default function Router() {
    const getLoginToken = () => SharedPreferences.getString(STORAGE_KEYS.TOKEN) !== null

    const [isLoggedIn, setIsLoggedIn] = useState(getLoginToken());

    window.addEventListener(STORAGE_KEYS.TOKEN, () => {
        setIsLoggedIn(getLoginToken())
    })

    function PublicRoute(path: string, element: React.ReactNode) {
        return (
            <Route
                path={path}
                element={isLoggedIn ? <Navigate to={ROUTE_ENDPOINTS.HOME}/> : element}
            />
        );
    }

    function AuthRoute(path: string, element: React.ReactNode) {
        return (
            <Route
                path={path}
                element={isLoggedIn ? element : <Navigate to={ROUTE_ENDPOINTS.LOGIN}/>}
            />
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                {PublicRoute(ROUTE_ENDPOINTS.LOGIN, <LoginView/>)}
                {AuthRoute(ROUTE_ENDPOINTS.HOME, <BookHomeView/>)}
                {AuthRoute(ROUTE_ENDPOINTS.BOOK, <BookDetailView/>)}
                <Route path="*" element={<Navigate to={ROUTE_ENDPOINTS.LOGIN}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

