import axios from "axios";

export const httpClientPlugin = {
  get: async (url: string) => {
    // Con fetch
    // const resp = await fetch(url);
    // return data = await resp.json();

    // Con axios
    const { data } = await axios.get(url);
    return data;
  },
  post: async (url: string, body: any) => { 
    throw new Error("Not implemented");
  },
  put: async (url: string, body: any) => { 
    throw new Error("Not implemented");
  },
  delete: async (url: string) => { 
    throw new Error("Not implemented");
  },
}
