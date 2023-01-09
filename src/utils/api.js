import axios from "axios";
import { API_ENDPOINT } from "./constants";

const instance = axios.create({
  baseURL: API_ENDPOINT,
});

export const getPosts = async () => {
  const { data } = await instance.get("/posts");

  return data;
};

export const getPostById = async (id) => {
  const { data } = await instance.get(`/posts/${id}`);

  return data;
};

export const createPost = async (post) => {
  const { data } = await instance.post("/posts", {
    ...post,
    createdAt: new Date().getTime(),
  });

  return data;
};

export const editPost = async (id, post) => {
  await instance.put(`/posts/${id}`, post);
};

export const deletePost = async (id) => {
  await instance.delete(`/posts/${id}`);
};
