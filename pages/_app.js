import { ChakraProvider } from '@chakra-ui/react';
import theme from '../utils/theme';
import { SWRConfig } from 'swr';
import { swrOptions } from '../utils/api';
import './styles.css';
import 'semantic-ui-css/semantic.min.css'



function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <SWRConfig value={swrOptions}>
        <Component {...pageProps} />
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;
