import { fetcher } from '../../utils/api';

const getSearchMovieUrl = (terms) =>
  `https://api.themoviedb.org/3/movie/${terms}/credits?api_key=53876badebbba586618edeba5a132260`;

export default async function handler(req, res) {
  const results = await fetcher(getSearchMovieUrl(req.query.terms));

  res.status(200).json(results);
}
