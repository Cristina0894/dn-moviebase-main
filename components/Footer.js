import {
    Box,
    Container,
    Stack,
    SimpleGrid,
    Text,
    Link,
    VisuallyHidden,
    chakra,
    useColorModeValue,
  } from "@chakra-ui/react";

  const ListHeader = ({ children }) => {
    return (
      <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
        {children}
      </Text>
    );
  };
  
  const SocialButton = ({ children, label, href }) => {
    return (
      <chakra.button
        bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
        color={"teal"}
        rounded={"full"}
        w={8}
        h={8}
        cursor={"pointer"}
        as={"a"}
        href={href}
        display={"inline-flex"}
        alignItems={"center"}
        justifyContent={"center"}
        transition={"background 0.3s ease"}
        _hover={{
          bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
        }}
      >
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    );
  };
  
  export default function Footer() {
    return (
      <Box bg="purple.500" fontSize="1em" marginTop={"4em"}>
        <Container as={Stack} maxW={"6xl"} py={5}>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
            <Stack align={["center", "flex-start"]}>
              <ListHeader>LinkList1</ListHeader>
              <Link href={"#"}>link1</Link>
              <Link href={"#"}>link2</Link>
              <Link href={"#"}>link3</Link>
            </Stack>
  
            <Stack align={["center", "flex-start"]}>
              <ListHeader>LinkList2</ListHeader>
              <Link href={"#"}>link1</Link>
              <Link href={"#"}>link2</Link>
              <Link href={"#"}>link3</Link>
            </Stack>
  
            <Stack align={["center", "flex-start"]}>
              <ListHeader>LinkList3</ListHeader>
              <Link href={"#"}>link1</Link>
              <Link href={"#"}>link2</Link>
              <Link href={"#"}>link3</Link>
            </Stack>
  
            <Stack align={["center", "flex-start"]}>
              <Box pb={3} fontWeight={"bold"}>
                <Text>Final Project DN-MovieBase <br/> Cristina Pavel</Text>
              </Box>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    );
  }