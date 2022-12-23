import dbConnect from "../utils/dbConnect";
import Layout from '../components/Layout';
import Link from 'next/link';
import History from "../models/History";

import {
  Container,
  UnorderedList,
  ListItem,  
  Button,
  Image,
  Text,
} from '@chakra-ui/react';


export default function HistoryPage ({ histories }) { 
  
return(
  <Layout>
    <h1 id="pageTitle" as="h1">History</h1>
  <Container>
  <UnorderedList>
    
    {histories.map(history => {
    return(
      <ListItem key={history._id}>
              <Link href={`/movies/${history.id}`}
              passHref
              >            
              <Button
              as="a"
              variant="link"

              >
              <Image src={`https://image.tmdb.org/t/p/w500/${history.posterPath}`}
              alt = "Movie poster"

              />
              <Text as="h4">{history.title}
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
  const result = await History.find({}).sort({ date: -1 });
  const histories = result.map((doc) => {
    const history = doc.toObject();
    history._id = history._id.toString();
    history.title = history.title.toString();


    return history;
  });

  return { props: { histories: histories } };
}
  



  

  