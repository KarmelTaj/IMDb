import React from "react";
import { useLoaderData } from "react-router-dom";
import { getID } from "../../utils/httpClient";

const MovieDetailsPage = () =>{
    const { movie } = useLoaderData();
    
     // Check if movie is an array and get the first element
    const theMovie = Array.isArray(movie) ? movie[0] : movie;
    
    return <div>
        {theMovie.title}
    </div>
}

export default MovieDetailsPage


export async function loader({ params }) {
    const movie = await getID(`/movies/${params.movieID}`);
    return  { movie } ;
  }