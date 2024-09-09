import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/User";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routers";

export default class UserStore {
  
  user: User | null = null;
  fblLoading = false;
  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }
  // login = async (creds: UserFormValues) => {
  //     try {
  //         const user = await agent.Account.login(creds);
  //         store.commonStore.setToken(user.token)
  //         runInAction(() => this.user = user);
  //         router.navigate('/activities');
  //         store.modalStore.closeModal();

  //     } catch (error) {
  //         throw error;
  //     }
  // }
  login = async (creds: UserFormValues) => {
    const user = await agent.Account.login(creds);
    store.commonStore.setToken(user.token);
    runInAction(() => (this.user = user));
    router.navigate("/activities");
    store.modalStore.closeModal();
  };
  register = async (creds: UserFormValues) => {
    const user = await agent.Account.register(creds);
    store.commonStore.setToken(user.token);
    runInAction(() => (this.user = user));
    router.navigate("/activities");
    store.modalStore.closeModal();
  };
  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate("/");
  };
  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };
  setImage = (image: string) => {
    if (this.user) this.user.image = image;
  };

  setDisplayName = (name: string) => {
    if (this.user) this.user.displayName = name;
  };

  facebookLogin = async(accessToken: string) => {
   
    try {
        this.fblLoading = true;
      const user = await agent.Account.fbLogin(accessToken);
      store.commonStore.setToken(user.token);
      runInAction(() => {
        this.user = user;
        this.fblLoading = false;
      });
      router.navigate('/activities');
    
    }catch(error){
        runInAction(() => {
            this.fblLoading = false;
        });
        console.log(error);
    }   
  }
}
