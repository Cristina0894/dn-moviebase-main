import dbConnect from "../utils/dbConnect";
import Layout from '../components/Layout';
import Link from 'next/link';
import Watchlist from "../models/Watchlist";

import {
  Container,
  UnorderedList,
  ListItem,  
  Button,
  Image,
  Text,
} from '@chakra-ui/react';


export default function HistoryPage ({ watchlists }) { 
  
return(
  <Layout>
    <h1 id="pageTitle" as="h1">Watchlist</h1>
  <Container>
  <UnorderedList>
    
    {watchlists.map(watchlist => {
    return(
      <ListItem key={watchlist._id}>
              <Link href={`/movies/${watchlist.id}`}
              passHref
              >            
              <Button
              as="a"
              variant="link"

              >
              <Image src={`https://image.tmdb.org/t/p/w500/${watchlist.posterPath}`}
              alt = "Movie poster"

              />
              <Text as="h4">{watchlist.title}
              </Text>


              </Button>
              </Link>




      </ListItem>
    )
  })}
  </UnorderedList>
  </Container>
  </Layout>
)




  
}


export async function getServerSideProps() {
  await dbConnect();
  const result = await Watchlist.find({}).sort({ date: -1 });
  const watchlists = result.map((doc) => {
    const watchlist = doc.toObject();
    watchlist._id = watchlist._id.toString();
    watchlist.title = watchlist.title.toString();
    // console.log(movie);

    return watchlist;
  });

  return { props: { watchlists: watchlists } };
}
  



  

  