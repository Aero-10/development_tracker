import axios from "./axios";

export const fetchItems = () => axios.get("/items").then(res => res.data);
export const createItem = (item) => axios.post("/items", item).then(res => res.data);
export const updateItem = (id, item) => axios.put(`/items/${id}`, item).then(res => res.data);
export const deleteItem = (id) => axios.delete(`/items/${id}`).then(res => res.data);
