import { Button, Form, Header, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState, } from "react";
import { useStore } from "../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import {  ActivityFormValues } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { v4 as uuid } from 'uuid';
import { Formik, } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";

import MyTextAreaInput from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/form/options/Category";
import MyDateInput from "../../../app/common/form/MyDateInput";


export default observer(function ActivityForm() {


    const { activityStore } = useStore();
    const { createActivity, updateActivity, loadActivity, loadingInitial } = activityStore;


    const { id } = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());
    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is requered'),
        description: Yup.string().required('The activity description is requered'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is requered').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),


    })
    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)))
    }, [id, loadActivity])

    function handleFormSubmit(activity: ActivityFormValues) {

        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid(),
              
            };
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }

    }



    if (loadingInitial) return <LoadingComponent content="Loading..." />
    return (
        <Segment clearing>
            <Header content='Activity Details' sub color="teal"></Header>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder="title"></MyTextInput>
                        <MyTextAreaInput placeholder='Deascription' name='description' rows={3} />
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <MyDateInput placeholderText='Date' showTimeSelect timeCaption="time" dateFormat='MMMM d, yyyy  h:mm aa' name='date' />
                        <Header content='Location Details' sub color="teal"></Header>
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button
                            disabled={isSubmitting || !isValid || !dirty}
                            floated="right" loading={isSubmitting} positive type='submit' content='Submit' />
                        <Button as={Link} to='/activities' floated="right" type="button" content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})

