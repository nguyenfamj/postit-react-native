import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigator/RootNavigator';
import { useFonts } from 'expo-font';
import { Nunito_500Medium, Nunito_400Regular, Nunito_600SemiBold } from '@expo-google-fonts/nunito';
('@expo-google-fonts/nunito');
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
import { APP_GRAPHQL_TOKEN, APP_GRAPHQL_URI } from './env';

import { QueryClient, QueryClientProvider } from 'react-query';

// Setup API Link
const httpLink = createHttpLink({
  uri: APP_GRAPHQL_URI,
  headers: {
    Authorization: APP_GRAPHQL_TOKEN,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  headers: {},
});

export default function App() {
  const [loadedFont] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
  });

  const queryClient = new QueryClient();

  if (!loadedFont) {
    return null;
  }

  return (
    // @ts-ignore
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </QueryClientProvider>
      </ApolloProvider>
    </TailwindProvider>
  );
}
