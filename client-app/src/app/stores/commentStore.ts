import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { ChatComment } from "../models/comment";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import { date } from "yup";

export default class CommentStore {

    comments: ChatComment[] = [];

    hubConnection: HubConnection | null = null;

    /**
     *
     */
    constructor() {
        makeAutoObservable(this);


    }
    createHubConnection = (activityId: string) => {

        if (store.activityStore.selectedActivity) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl('http://localhost:5000/chat?activityId=' + activityId, {
                    accessTokenFactory: (() => store.userStore.user?.token!)
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.hubConnection.start()
                .catch(error => console.error('Error establishing SignalR connection:', error));

            this.hubConnection.on('LoadComments', (comments: ChatComment[]) => {

                runInAction(() => {
                    comments.forEach(comment => {

                        comment.createAt = new Date(comment.createAt + 'Z');
                    });
                    this.comments = comments;
                });
            })

            this.hubConnection.on('RecieveComment', (comment: ChatComment) => {

                runInAction(() => {

                    comment.createAt = new Date(comment.createAt);
                    this.comments.unshift(comment);
                })
            })
        }
    }
    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error));

    }

    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    }
    addComments = async (values: { body: string, activityId?: string }) => {

        values.activityId = store.activityStore.selectedActivity?.id;
        try {
            await this.hubConnection?.invoke('SendComment', values);
        } catch (error) {
            console.log(error);
        }
    }

}