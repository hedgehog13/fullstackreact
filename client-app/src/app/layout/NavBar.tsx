
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src='assets/logo.png' alt='logo' style={{marginRight:'10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='activities'/>
                <Menu.Item name='activities'>
                    <Button positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}