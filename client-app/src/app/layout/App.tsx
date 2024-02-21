

import { observer } from "mobx-react-lite";
import { Container } from 'semantic-ui-react';

import NavBar from './NavBar';



import { Outlet, useLocation } from 'react-router-dom';
import HomePage from "../../features/home/HomePage";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useStore } from "../stores/store";
import LoadingComponent from "./loadingComponent";
import ModalContainer from "../common/modals/ModalContainer";

function App() {
  const locattion = useLocation();

  const { commonStore, userStore } = useStore();

  useEffect(()=>{
    if(commonStore.token){
      userStore.getUser().finally(()=>commonStore.setAppLoaded())
    }else{
      commonStore.setAppLoaded()
    }
  },  [commonStore, userStore]);
  if(!commonStore.appLoaded) return <LoadingComponent content="Loading..."/>
  return (
    <>
    <ModalContainer />
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
