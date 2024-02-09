import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";

interface Props {
    activity: Activity
}
export default function ActivityListItem({ activity }: Props) {



    return (
      <Segment.Group>

        <Segment>
            <Item.Group>
                <Item>
                    <Item.Image size='tiny' circular src='/assets/user.png'/>
                </Item>
                <Item.Content as ={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Content>
                <Item.Description>Hosted By someine</Item.Description>
            </Item.Group>
        </Segment>
        <Segment>
            <span>
                <Icon name='clock' />{activity.date}
                <Icon name='marker' />{activity.venue}
            </span>
        </Segment>
        <Segment secondary>
            Attendence go here

        </Segment>
        <Segment clearing>
            <span>{activity.description}</span>
            <Button as={Link} to={`/activities/${activity.id}`} color = 'teal' floated='right' content='view' />
        </Segment>
      </Segment.Group>
    )
}