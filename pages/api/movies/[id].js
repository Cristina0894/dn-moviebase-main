import { fetcher } from '../../../utils/api';

const getMovieUrl = (id) =>
  `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`;

const getCastFromMovie = (id) =>
  `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`;

const getTrailersFromMovie = (id) =>
  `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`;

export default async function handler(req, res) {
  const movie = await fetcher(getMovieUrl(req.query.id));
  const { cast } = await fetcher(getCastFromMovie(req.query.id));
  const { results: trailers } = await fetcher(getTrailersFromMovie(req.query.id));
  const trailerUrl = `https://www.youtube.com/embed/${trailers[0].key}`;
  const castToDisplay = cast
    
    .filter((actor) => actor.profile_path !== null);
  res.status(200).json({ movie, castToDisplay, trailerUrl });
}