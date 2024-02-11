import React from "react";
import Header from "../Header";
import MainHome from "./MainHome";
import MovieDetails from "./MovieDetails/MovieDetails";
const Home = () => {
    return <>
        <Header />
        <MovieDetails />
        <MainHome />
    </>
}

export default Home;