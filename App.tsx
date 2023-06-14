import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import Groups from '@screens/groups';
import theme from './src/theme';
import { Loading } from '@components/loading';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'react-native';

export default function App() {

  const [fontsLoad] = useFonts({ Roboto_400Regular, Roboto_700Bold})

  return (
    <ThemeProvider theme={theme}>
      <>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'transparent'}
          translucent
        />
        {fontsLoad ? <Groups/> : <Loading/>}
      </>
    </ThemeProvider>
  );
}
