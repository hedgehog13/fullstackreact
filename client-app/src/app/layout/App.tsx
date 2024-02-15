

import { observer } from "mobx-react-lite";
import { Container } from 'semantic-ui-react';

import NavBar from './NavBar';



import { Outlet, useLocation } from 'react-router-dom';
import HomePage from "../../features/home/HomePage";
 import { ToastContainer } from "react-toastify";

function App() {
  const locattion = useLocation();
  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
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
