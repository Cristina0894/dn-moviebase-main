import useSWR from "swr";
import { 
  Container,
  Text,
  Progress,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import MovieResult from "../components/MovieResult";
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
export default function Homepage() {
  const recMoviesEl = useRef(null);
  const topRatedEl = useRef(null);
  const upcomingMoviesEl = useRef(null);
  const popularMoviesEl = useRef(null);

  function handleRight(ref) {
    ref.current.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
  }
  
  function handleLeft(ref) {
    ref.current.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
  }


  const { data, error } = useSWR("/api/home");

  if (error) {
    return (
      <Text color="red">
        Error fetching recommended movies for you: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }

  return (
    <Layout title="Moviebase">
      <Container  maxW='90vw'>
          
      <h1 id="pageTitle" as="h1">Recomandations based on your history</h1>
      <div className="movieSection">
      <FontAwesomeIcon className="btnPrev" onClick={() => handleLeft(recMoviesEl)} icon={faCircleArrowLeft} />
          <ul ref={recMoviesEl} id="homeSliders">
            {data.recMovies?.results?.map((movie) => (
              <MovieResult key={"movie.id"} movie={movie} />
            ))}
          </ul>
          <FontAwesomeIcon className="btnNext" onClick={() => handleRight(recMoviesEl)} icon={faCircleArrowRight} />
          </div>
          <br/>
          <h1 id="pageTitle" as="h1">Best rated movies</h1>
          <div className="movieSection">
          <FontAwesomeIcon className="btnPrev" onClick={() => handleLeft(topRatedEl)} icon={faCircleArrowLeft} />
          <ul ref={topRatedEl} id="homeSliders">
          
            {data.topRated?.results?.map((movie) => (
              <MovieResult key={"movie.id"} movie={movie} />
            ))}
            </ul>
            <FontAwesomeIcon className="btnNext" onClick={() => handleRight(topRatedEl)} icon={faCircleArrowRight} />
            </div>
            <br/>
            <h1 id="pageTitle" as="h1">Upcoming movies</h1>
            <div className="movieSection">
            <FontAwesomeIcon className="btnPrev" onClick={() => handleLeft(upcomingMoviesEl)} icon={faCircleArrowLeft} />

            <ul ref={upcomingMoviesEl} id="homeSliders">
            {data.upcomingMovies?.results?.map((movie) => (
              <MovieResult key={"movie.id"} movie={movie} />
            ))}
            </ul>
            <FontAwesomeIcon className="btnNext" onClick={() => handleRight(upcomingMoviesEl)} icon={faCircleArrowRight} />

            </div>
            <br/>
            <h1 id="pageTitle" as="h1">Popular titles</h1>
            <div className="movieSection">
            <FontAwesomeIcon className="btnPrev" onClick={() => handleLeft(popularMoviesEl)} icon={faCircleArrowLeft} />
            <ul ref={popularMoviesEl} id="homeSliders">
            {data.popularMovies?.results?.map((movie) => (
              <MovieResult key={"movie.id"} movie={movie} />
            ))}
          </ul>
            <FontAwesomeIcon className="btnNext" onClick={() => handleRight(popularMoviesEl)} icon={faCircleArrowRight} />
          </div>
        </Container>
    </Layout>
  );
}
