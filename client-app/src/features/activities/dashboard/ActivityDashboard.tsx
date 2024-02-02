
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";



interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectedActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (activityId: string) => void;
    submitting:boolean;
}
export default function ActivityDashboard({ activities, selectedActivity, editMode,submitting, selectActivity, cancelSelectedActivity, openForm,
    closeForm, createOrEdit, deleteActivity }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                    submitting={submitting} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails activity={selectedActivity}
                        cancelSelectedActivity={cancelSelectedActivity}
                        openForm={openForm}

                    />}
                {editMode &&
                    <ActivityForm 
                    closeForm={closeForm} 
                    activity={selectedActivity} 
                    createOrEdit={createOrEdit} 
                    submitting={submitting}/>}
            </Grid.Column>
        </Grid>
    )
}