import { observer } from "mobx-react-lite"
import { List, Image, Popup } from "semantic-ui-react"
import { Profile } from "../../../app/models/Profile"
import { Link } from "react-router-dom"
import ProfileCard from "../../Profiles/ProfileCard"
interface Props {
    attendees: Profile[]
}
export default observer(function ActivityListItemAttendee({ attendees }: Props) {

    const styles = {
        borderColor: 'orange',
        borderWidth: '2'
    }

    return (
        <List horizontal>
            {
                attendees.map(attendee => (

                    <Popup hoverable
                        key={attendee.username} trigger={
                            <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                                <Image size='mini'
                                    bordered
                                    style={attendee.following ? styles : null}
                                    circular src={attendee?.image || '/assets/user.png'} /></List.Item>

                        }
                    >


                        <Popup.Content>
                            <ProfileCard profile={attendee}></ProfileCard>
                        </Popup.Content>
                    </Popup>


                ))

            }


        </List>
    )

})