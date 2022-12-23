import SWRResponse from "swr";
import Layout from "../components/Layout";
import {
  Box,
  Container,
  Heading,
  Wrap,
  Text,
  Progress,
  UnorderedList,
} from "@chakra-ui/react";
import MovieResult from "../components/MovieResult";

const MoviesSectionTitle = ({ children }) => (
  <Heading size="md" mb="5" mt="6">
    {children}
  </Heading>
);

const MoviesWrap = ({ children }) => (
  <Wrap spacing="10px" textAlign="center" justify={"center"}>
    {children}
  </Wrap>
);

export default function whattowatch() {
  const { data, error } = SWRResponse("/api/whattowatch");

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
    <Layout title="Recommended">
      <Container>
      <Box mb="3em" minHeight="100vh">
      <h1 id="pageTitle" as="h1">From your WatchList</h1>
          <MoviesSectionTitle></MoviesSectionTitle>
          <UnorderedList>
            {data.watchlist.map((movie) => (
              <MovieResult key={"movie.id"} movie={movie} />
            ))}
        </UnorderedList>
        <h1 id="pageTitle" as="h1">Watch again</h1>

              <ul>
            {data.history.map((movie) => (
              <MovieResult key={"movie.id"} movie={movie} />
            ))}
            </ul>
      
            <h1 id="pageTitle" as="h1">Now trending</h1>
          <ul>
            {data.trending?.results?.map((movie) => (
              <MovieResult key={"movie.id"} movie={movie} />
            ))}
          
          </ul>
      </Box>
      </Container>
    </Layout>
  );
}