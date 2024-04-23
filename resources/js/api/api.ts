import axios, { Cancel } from "axios";

import { UserTypeWithMiddleware, DocsType } from "../redux/user/types";

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://topdom-doc.ru/",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const authAPI = {
  getToken() {
    return instance.get("sanctum/csrf-cookie");
  },
  async me() {
    // return instance.get("api/user");
    try {
      const response = await instance.get("api/user");
      return response;
    } catch (error) {
      if (axios.isCancel(error)) return Promise.reject(error as Cancel);
      throw error;
    }
  },
  async signUp(formData: Record<string, string>) {
    try {
      const response = await instance.post("register", formData);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) return Promise.reject(error as Cancel);
      throw error;
    }
  },
  async signIn(formData: Record<string, string>) {
    try {
      const response = await instance.post("login", formData);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data); // Access the error response message
      }
      if (axios.isCancel(error)) return Promise.reject(error as Cancel);
      throw error;
    }
  },
  async signOut(): Promise<UserTypeWithMiddleware> {
    try {
      const response = await instance.post("logout");
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) return Promise.reject(error as Cancel);
      throw error;
    }
  },
  // login(email, password, rememberMe, captcha) {
  //   return instance.post("auth/login", {
  //     email,
  //     password,
  //     rememberMe,
  //     captcha,
  //   });
  // },
  // logout() {
  //   return instance.delete("auth/login");
  // },
};

export const docsAPI = {
  async sendDocs(formData: FormData) {
    try {
      console.log(formData);
      const response = await instance.post(`api/documents_add`, formData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) return;
    }
  },
  // TODO: доделать
  async getDocById(id: number) {
    try {
      const response = await instance.post(`api/document`, { id });
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) return;
    }
  },
  async getDocs(page = 1) {
    try {
      const response = await instance.get(`api/documents_list?page=${page}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) return;
    }
  },
  async updateStage(id: number, status: string) {
    try {
      const response = await instance.post(`api/update_stage`, { id, status });
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) return;
    }
  },

  // async filter(platform, sort, order) {
  //   const sortBy = sort ? `sortBy=${sort}` : ''
  //   const orderBy = order ? `order=${order}` : ''
  //   try {
  //     const response = await instance.get(`items?${sortBy}${orderBy}`)
  //     // console.log(response.data)
  //     return response.data
  //   } catch (error) {
  //     if (axios.isCancel(error)) return
  //   }
  // },
};

// export const settingsAPI = {
//   getUserInfo(userId = 2) {
//     return instance.get(`profile/${userId}`);
//   },
//   getUserStatus(userId = 2) {
//     return instance.get(`profile/status/${userId}`);
//   },
//   updateUserStatus(status) {
//     console.log("put", status);
//     return instance.put(`profile/status`, { status });
//   },
//   savePhoto(file) {
//     console.log("put", file);
//     const formData = new FormData();
//     formData.append("image", file);
//     return instance.put(`profile/photo`, formData, {
//       "Content-Type": "multipart/form-data",
//     });
//   },
//   saveProfile(profile) {
//     console.log("put", profile);
//     return instance.put(`profile`, profile);
//   },
// };
