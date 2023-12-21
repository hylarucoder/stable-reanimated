import { API_URL, MEDIA_URL } from "@/consts"

import axios from "axios"

const nfetch = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
})

class ApiClient {
  async get(path: string, params?: any) {
    const res = await nfetch.get(API_URL + path)
    if (res.status >= 400 && res.status < 500) {
      throw new Error("Bad request")
    } else if (res.status >= 500) {
      throw new Error("Internal server error")
    }
    return res.data
  }

  async post(path: string, data?: any, params?: any) {
    const res = await nfetch.post(API_URL + path, {
      ...data,
    })
    if (res.status === 400) {
      const a = await res.data
      throw new Error(a.message)
    }
    if (res.status >= 400 && res.status < 500) {
      throw new Error("Bad request")
    } else if (res.status >= 500) {
      throw new Error("Internal server error")
    }
    return res.data
  }
}

const client = new ApiClient()

export const formatProxyMedia = (path: string) => {
  return MEDIA_URL + "?path=" + path
}

export const getOptions = async (): Promise<any> => {
  return await client.get("/options")
}

export const submitTask = async (data: any): Promise<any> => {
  return await client.post("/pipeline/submit", data)
}

export const getTaskStatus = async (data: any): Promise<any> => {
  return await client.post("/pipeline/status", data)
}

export const interruptTask = async (data: any): Promise<any> => {
  return await client.post("/pipeline/interrupt", data)
}
