import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/User";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routers";
import { isAxiosError } from "axios";

export default class UserStore {
  user: User | null = null;
  fblLoading = false;
  refreshTokenTimeout?: number;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    const user = await agent.Account.login(creds);
    store.commonStore.setToken(user.token);
    this.startRefreshTokenTimer(user);
    runInAction(() => (this.user = user));
    router.navigate("/activities");
    store.modalStore.closeModal();
  };
  register = async (creds: UserFormValues) => {
    try {
      await agent.Account.register(creds);
      router.navigate("/account/RegisterSuccess?email=" + creds.email);
      store.modalStore.closeModal();
    } catch (error) {
      if (isAxiosError(error) && error?.response?.status === 400) throw error;
      store.modalStore.closeModal();
      console.log(500);
    }
  };
  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate("/");
  };
  getUser = async () => {
    try {
      const user = await agent.Account.current();

      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
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

  facebookLogin = async (accessToken: string) => {
    try {
      this.fblLoading = true;
      const user = await agent.Account.fbLogin(accessToken);
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
      runInAction(() => {
        this.startRefreshTokenTimer(user);
        this.user = user;
        this.fblLoading = false;
      });
      router.navigate("/activities");
    } catch (error) {
      runInAction(() => {
        this.fblLoading = false;
      });
      console.log(error);
    }
  };
  refreshToken = async () => {
    this.stopRefreshTokenTimer();
    try {
      const user = await agent.Account.refreshToken();
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      this.startRefreshTokenTimer(user);
    } catch (error) {
      console.log(error);
    }
  };
  private startRefreshTokenTimer(user: User) {
    const jwtToken = JSON.parse(atob(user.token.split(".")[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
  }
  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
