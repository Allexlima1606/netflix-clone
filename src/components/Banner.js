import React, { useEffect } from "react";
import categories, { getMovies } from "../Api.js";
import "./Banner.css";
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";

function Banner() {
  const [movie, setMovie] = React.useState({});
  const [trailerUrl, setTrailerUrl] = React.useState("");

  const handleOnClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.title || movie.name || movie.original_name || "")
        .then((url) => {
          setTrailerUrl(url);
        })
        .catch((error) => {
          console.log("Error fetching movie trailer: ", error);
        });
    }
  };

  const fetchRandomMovie = async () => {
    try {
      const netflixOriginalsCategory = categories.find(
        (category) => category.name === "netflixOriginals"
      );
      const data = await getMovies(netflixOriginalsCategory.path);
      const movies = data?.results;
      const randomIndex = Math.floor(Math.random() * movies.length);
      setMovie(movies[randomIndex]);
    } catch (error) {
      console.log("Banner fetchRandomMovie error: ", error);
    }
  };

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner-container"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        roundPosition: "center-center",
      }}
    >
      <div className="featured--vertical">
        <div className="featured--horizontal">
            <div className="banner-content">
              <h1 className="banner-title">
                {movie?.title || movie?.name || movie?.original_name}
              </h1>
              <button
                className="banner-button-assistir"
                onClick={() => handleOnClick(movie)}
              >
                ► Assistir
              </button>
              <button className="banner-button-list">✙ Minha Lista</button>
              <div className="banner-description">
                <h2>{truncate(movie?.overview)}</h2>
              </div>
              <div>
                <p className="banner-points">
                  {movie.vote_average}
                  <span className="span"> pontos</span>
                </p>
                <p className="banner-votos">
                  {movie.vote_count}
                  <span className="span"> votos</span>
                </p>
              </div>
              <p className="banner-points-lanca">
                <span className="span"> Lançamento </span>{" "}
                {movie.first_air_date}{" "}
              </p>
              
              {trailerUrl && (
                <ReactPlayer
                  className="video"
                  url={trailerUrl}
                  playing={true}
                />
              )}
            </div>
          </div>
        </div>
     
    </header>
  );
}

export default Banner;
