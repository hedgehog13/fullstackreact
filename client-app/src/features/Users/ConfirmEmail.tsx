import { useEffect, useState } from "react";
import { useStore } from "../../app/stores/store";
import useQuery from "../../app/util/hooks";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import LoginForm from "./LoginForm";

const Confirm =  ()=>{
    const { modalStore } = useStore();
    const email = useQuery().get('email') as string;
    const token = useQuery().get('token') as string;

    const Status = {
        Varifaing: 'Verifying...',
        Failed: 'Failed',
        Sucsees: 'Success'
    }
    const [status, setStatus] = useState(Status.Varifaing);

    function handleConfirmEmailResend() {
        agent.Account.resendEmailConfirm(email).then(() => {
            toast.success("Verification email resent - please check your email");
        }).catch(error => console.log(error));
    }
    useEffect(() => {
        agent.Account.verifyEmail(token, email).then(() => {
            setStatus(Status.Sucsees);
        }).catch(() => {
            setStatus(Status.Failed);
        })
    }, [Status.Failed, Status.Sucsees, token, email])



    function getBody() {
        switch (status) {
            case Status.Varifaing:
                return (
                    <p>
                        Verifying email...
                    </p>
                )
            case Status.Failed:
                return (
                    <div>
                        Verification failed - please resend the verification email
                        <Button primary onClick={handleConfirmEmailResend} content='Resend email' size='huge' />
                    </div>
                )
            case Status.Sucsees:
                return (
                    <div>
                        Verification successful - you can now login
                        <Button primary onClick={() => modalStore.openModal(<LoginForm />)} content='Login' size='huge' />
                    </div>
                )
        }

      
    }

    return (
        <Segment placeholder textAlign='center'>
            <Header icon >
                <Icon name='envelope'>
                    Email verification
                </Icon>

            </Header>
            <Segment.Inline>
                {getBody()}
            </Segment.Inline>

        </Segment>
    )
}
export default Confirm;