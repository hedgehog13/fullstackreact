import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity, ActivityFormValues } from "../models/activity";
import { toast } from "react-toastify";
import { router } from "../router/Routers";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/User";
import { Photo, Profile, UserActivity } from "../models/Profile";
import { PaginatedResult } from "../models/pagination";


const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
axios.interceptors.response.use(
  async (response) => {
    if (import.meta.env.DEV) await sleep(1000);

    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(
        response.data,
        JSON.parse(pagination)
      );
      return response as AxiosResponse<PaginatedResult<unknown>>;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config, headers } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (
          config.method === "get" &&
          Object.prototype.hasOwnProperty.call(data.errors, "id")
        ) {
          router.navigate("/not-foundd");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }

          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }

        break;
      case 401:
        if ( status === 401 && headers["www-authenticate"]?.startsWith('Bearer error="invalid_token"')) {
        
          store.userStore.logout();
          toast.error("session expired, please login again");
        } else {
          toast.error("unautorozed");
        }
        break;
      case 403:
        toast.error("forbbiden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        store.commonStore.serverError = data;
        router.navigate("/server-error");
        break;
    }

    return Promise.reject(error);
  }
);
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Activity[]>>("/Activities", { params })
      .then(responseBody),
  details: (id: string) => requests.get<Activity>(`/Activities/${id}`),
  create: (activity: ActivityFormValues) =>
    requests.post<void>(`/Activities/`, activity),
  update: (activity: ActivityFormValues) =>
    requests.put<void>(`/Activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete<void>(`/Activities/${id}`),
  attend: (id: string) => requests.post<void>(`/Activities/${id}/attend`, {}),
};

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>  requests.post<User>("/account/register", user),
  fbLogin: (accessToken: string) => requests.post<User>(`/account/fbLogin?accessToken=${accessToken}`, {}),
   
  refreshToken: () => requests.post<User>("/account/refreshToken", {}),
};
const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
  uploadPhoto: (file: Blob) => {
    const formData = new FormData();
    formData.append("File", file);
    return axios.post<Photo>("photos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => requests.delete(`/photos/${id}`),
  updateProfile: (profile: Partial<Profile>) =>
    requests.put(`/profiles`, profile),
  updateFollowing: (username: string) =>
    requests.post(`/follow/${username}`, {}),
  listFollowings: (username: string, predicate: string) =>
    requests.get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
  listActivities: (username: string, predicate: string) =>
    requests.get<UserActivity[]>(
      `/profiles/${username}/activities?predicate=${predicate}`
    ),
};
const agent = {
  Activities,
  Account,
  Profiles,
};
export default agent;
