import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import useSWR from "swr";
import { buildImageUrl } from "../../utils/api";
import {
  Badge,
  Box,
  Center,
  CircularProgress,
  Container,
  Heading,
  HStack,
  ListItem,
  Stack,
  Tag,
  Text,
  UnorderedList,
  Link,
  VStack,
  Button,
} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import HistoryButton from "../../components/HistoryButton";
import WatchlistButton from "../../components/WatchlistButton";
import { useEffect , useState } from "react";



const ACTORS_PER_PAGE = 10;


const MovieContent = () => {
  let castNodeChildren = 0;
const { id } = useRouter().query;
const { data, error } = useSWR(id && `/api/movies/${id}`);
const [page, setPage] = useState(2);
const [actors, setActors] = useState([]);

function loadInitialActors() {
  if (data && data.castToDisplay) {
    setActors(data.castToDisplay.slice(0, 10));
  }
}

useEffect(() => {
  loadInitialActors();
}, [data]);

const loadMoreActors = () => {
  const start = (page - 1) * ACTORS_PER_PAGE;
  const end = page * ACTORS_PER_PAGE;
  setActors([...actors, ...data.castToDisplay.slice(start, end)]);
  setPage(page + 1);

  castNodeChildren = document.querySelector('#castList > div').children.length;
  if (data.castToDisplay.length-10 <= castNodeChildren ){
    document.querySelector('#loadMoreBtn').remove();
  }
};

 
  
  if (error) {
    return (
      <Text color="red">
        Error fetching movie with ID {id}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
   
  return (
    <>
      <Stack direction={["column", "row"]} spacing={4}>
        <Head>
          <title>{data.movie.title}</title>
        </Head>
        <Box minW="300px" pos="relative">
          <HStack pos="absolute" zIndex={1} top={2} right={2}>
            <WatchlistButton />
            <HistoryButton />
          </HStack>
          <Image
            src={buildImageUrl(data.movie.poster_path, "w300")}
            alt="Movie poster"
            layout="responsive"
            width="300"
            height="450"
            objectFit="contain"
            unoptimized            
          />
        </Box>
        <Stack marginBottom="0" border="1px solid #805ad5" padding="20px">
          <VStack align="flex-start" >
            <Heading as="h2" mt="1em">
              {data.movie.title}
            </Heading>
            <Tag>
              Released on: {data.movie.release_date}
            </Tag> 
            <Tag>
              An average of {data.movie.vote_average} out of {data.movie.vote_count} votes
            </Tag>
            <Link target="_blank" rel="noopener noreferrer" href={`https://imdb.com/title/${data.movie.imdb_id}`}><Image src="/imdblogo.png" width="60px" height="25px" /></Link>                  
          </VStack>

          <Stack direction="row" pt="1em">
            {data.movie.genres?.map((genre) => (
              <Badge key={genre.id} colorScheme="purple" variant="outline">
                {genre.name}
              </Badge>
            ))}
          </Stack>
          <Box pt="2em">{data.movie.overview || data.movie.plot}</Box>
          <div style={{ width: '100%', position: 'relative', paddingBottom: '56.25%' }}>
            <iframe style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} src={data.trailerUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </Stack>
      </Stack>
      <Heading
            as="h3"
            textAlign={["center", "center"]}
            mb="2em"
            mt="1em"
          >
            Actors
          </Heading>
          <UnorderedList id="castList" stylePosition="inside">
          <Stack
            display={"flex"}
            flexWrap={"wrap"}
            direction={["column", "row"]}
            justify-content={["center", "flex-start"]}
            alignItems={["center", "flex-start"]}
          >
            {actors.map((actor) => (
             <ListItem id="castListMember" key={actor.id} listStyleType={"none"}>
             <Box
               minW="200px"
               minHeight={"250"}
               mb="1em"
               mt="1em"
               display={"flex"}
               justify={["center", "flex-start"]}
               alignItems={["center", "flex-start"]}
              
             >
               <Image
                 id="actorImage"
                 src={buildImageUrl(actor.profile_path, "w200")}
                 alt="Actor picture"
                 layout="intrinsic"
                 width="200"
                 height="250"
                 objectFit="cover"
                 unoptimized
               />
             </Box>                
               <Text maxW="200px" textAlign="center" fontSize="1em">{actor.name}</Text>                             
               <Text maxW="200px" textAlign="center" fontSize="1em">as {actor.character}</Text>
             
           </ListItem>
            ))}
            </Stack>
          </UnorderedList>

              
            
          <div style={{ display: "flex", justifyContent: "center" }}>
  {data.castToDisplay.length != castNodeChildren && (
    <Button id="loadMoreBtn" onClick={loadMoreActors}>Load more</Button>
  )}
</div>
    </>
  );
};
export default function Movie() {
  return (
    <Layout>
      <Container h="full" mb="3em">
        <MovieContent />
      </Container>
    </Layout>
  );
}