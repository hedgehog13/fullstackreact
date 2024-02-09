import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import ActiviyDetailedHeader from "./ActivityDetailedHeader";
import ActiviyDetailedInfo from "./ActivityDetailedInfo";
import ActiviyDetailedChat from "./ActivityDetailedChat";
import ActiviyDetailedSideBar from "./ActivityDetailedSideBar";


export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;

    const { id } = useParams()

    useEffect(() => {
        if (id) loadActivity(id)
    }, [id, loadActivity]);


    if (loadingInitial || !activity) return <LoadingComponent />
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActiviyDetailedHeader activity={activity} />
                <ActiviyDetailedInfo activity={activity}/>
                <ActiviyDetailedChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActiviyDetailedSideBar />

            </Grid.Column>
        </Grid>
    )
})