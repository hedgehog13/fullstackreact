import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import useQuery from "../../app/util/hooks";
import { Button, Header, Segment } from "semantic-ui-react";

export default function RegisterSuccess () {

    const query = useQuery();
    const email = query.get('email') as string;





    function handleConfirmEmailResend() {
      agent.Account.resendEmailConfirm(email).then(() => {
       toast.success("Verification email resent - please check your email");
      }).catch(error => console.log(error));
    }
    return (
        <Segment placeholder textAlign="center">

            <Header icon color="green">
                Successfully registered!
            </Header>
            <p>Please check your email (including spam) for the verification email</p>
            {email &&
                <>
                <p>Didn't receive the email? Click below to resend</p>
                <Button primary onClick={handleConfirmEmailResend}  content ='Resend email' size='huge' />
                </>
                }
        </Segment>
    )
}