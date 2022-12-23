import { Link,  Image, Button,  Text } from "@chakra-ui/react";

import { buildImageUrl } from "../utils/api";
import React from "react";

export default function MovieResult({ movie }) {
  return (
  
  <li className="css-0">
  <Link movie={movie} href={`/movies/${movie.id}`}
   passHref
   >            
    <Button
      as="a"
      variant="link"
      
    >
      <Image src={buildImageUrl(movie.posterPath || movie["poster_path"], "w300")}
      alt = "Movie poster"
    
     />
      <Text as="h4">{movie.title}
      </Text>
      
      
    </Button>
  </Link>
</li>
  );
}


