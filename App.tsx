import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import Groups from '@screens/groups';
import theme from './src/theme';
import { Loading } from '@components/loading';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'react-native';
import Routes from '@routes/index';

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
        {fontsLoad ? <Routes/> : <Loading/>}
      </>
    </ThemeProvider>
  );
}
