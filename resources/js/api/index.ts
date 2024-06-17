import axios, { Cancel } from "axios";

import { UserTypeWithMiddleware } from "../redux/user/types";
import {
  CheckUploadResponse,
  DocsResponse,
  DocumentResponse,
} from "../redux/docs/types";

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
    } catch (error) {
      // if (error.response) {
      //   console.log(error.response.data); // Access the error response message
      // }
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
      const response = await instance.post(`api/documents_add`, formData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) return;
    }
  },
  async getDocById(id: number): Promise<DocumentResponse> {
    try {
      const response = await instance.post(`api/document`, { id });
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) return Promise.reject(error as Cancel);
      throw error;
    }
  },
  async getDocs(page = 1): Promise<DocsResponse> {
    try {
      const response = await instance.get(`api/documents_list?page=${page}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) return Promise.reject(error as Cancel);
      throw error;
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
  // TODO: доделать
  async uploadCheck(formData: FormData): Promise<CheckUploadResponse> {
    try {
      console.log(formData);
      const response = await instance.post(`api/checks_add`, formData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) return Promise.reject(error as Cancel);
      throw error;
    }
  },
  async deleteTempFiles(formData: FormData) {
    try {
      const response = await instance.post(`api/del_tmp`, formData);
      console.log(response);
      // return response.data;
    } catch (error) {
      if (axios.isCancel(error)) return Promise.reject(error as Cancel);
      throw error;
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

export const bossAPI = {
  async changeRole(formData: FormData) {
    try {
      const response = await instance.post(`api/change_role`, formData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) return Promise.reject(error as Cancel);
      throw error;
    }
  },
  async removeDoc(id: number) {
    try {
      const response = await instance.post(`api/remove_doc`, { id });
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) return Promise.reject(error as Cancel);
      throw error;
    }
  },
};
