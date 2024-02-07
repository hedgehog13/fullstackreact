import { Button, Form, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useState, } from "react";
import { useStore } from "../../../app/stores/store";


export default observer(function ActivityForm() {

    const { activityStore } = useStore();
    const { selectedActivity, closeForm, createActivity, updateActivity, loading } = activityStore;
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''


    }
    const [activity, setActivity] = useState(initialState);
    function handleSubmit() {

        activity.id ? updateActivity(activity) : createActivity(activity)
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Deascription' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input placeholder='Date' type="Date" value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button floated="right" loading={loading} positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated="right" type="button" content='Cancel' />
            </Form>
        </Segment>
    )
})