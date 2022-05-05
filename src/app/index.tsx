import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Router from './routes/routes.app';
import Navbar from './components/navbar';
import Notifications from '../notification';

const ContainerStyled = styled(Container)`
  && {
    padding-top: 10px
  }
`
function App() {
  return (
    <div className="App">
      <Navbar/>
      <ContainerStyled maxWidth="lg">
        <Router/>
      </ContainerStyled>
      <Notifications timeout={3000}/>
    </div>
  );
}

export default App;
