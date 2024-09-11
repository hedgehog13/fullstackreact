
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button, Divider } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../Users/LoginForm";
import RegisterForm from "../Users/RegisterForm";
import FacebookLogin, { FailResponse, SuccessResponse } from "@greatsumini/react-facebook-login";

export default observer(function HomePage() {

    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    Reactivities
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome' />
                        <Button as={Link} to='/activities' size="huge" inverted>
                            Go to Activities
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size="huge" inverted>
                            Login
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size="huge" inverted>
                            Register
                        </Button>
                        <Divider horizontal inverted>Or</Divider>
                        <FacebookLogin appId="1072894167889303"
                            onSuccess={(response: SuccessResponse) => {
                                userStore.facebookLogin(response.accessToken);
                                console.log('Login success!', response);
                            }}
                            onFail={(response: FailResponse) => {
                                console.log('Login failed!', response);
                            }} 
                            className={`ui button facebook huge inverted ${userStore.fblLoading && 'loading'}`}/>

                    </>
                )}


            </Container>
        </Segment>
    )


})