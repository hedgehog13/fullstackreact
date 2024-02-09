

import { observer } from "mobx-react-lite";
import { Container } from 'semantic-ui-react';

import NavBar from './NavBar';



import { Outlet, useLocation } from 'react-router-dom';
import HomePage from "../../features/home/HomePage";

function App() {
  const locattion = useLocation();
  return (
    <>
      {locattion.pathname === '/' ? <HomePage /> : (
        <>
          < NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Outlet />
          </Container>
        </>
      )}

    </>
  )
}

export default observer(App);
