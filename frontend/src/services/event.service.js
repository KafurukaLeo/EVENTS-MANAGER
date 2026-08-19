// import api from "./api";

// const eventService = {

//   getAll: async () => {
//     const response = await api.get("/events");
//     return response.data;
//   },

//   getById: async (id) => {
//     const response = await api.get(`/events/${id}`);
//     return response.data;
//   },

//   create: async (data) => {
//     const response = await api.post(
//       "/events",
//       data
//     );

//     return response.data;
//   },

//   update: async (id, data) => {
//     const response = await api.put(
//       `/events/${id}`,
//       data
//     );

//     return response.data;
//   },

//   delete: async (id) => {
//     const response = await api.delete(
//       `/events/${id}`
//     );

//     return response.data;
//   }

// };

// export default eventService;


import api from "./api";

const eventService = {

  // Get all events
  getAll:async() =>{
    const response = await api.get("./events");
    return response.data
  },
  // Get one event

   getById: async (id) =>{
    const response = await api.get(`/events${id}`);
    return response.data
  },

  // create an event

  create: async(data) =>{
    const response = await api.post("/events", data);
    return response.data
  },


  // update an event


  update: async(id, data) =>{
    const response = await api.put(`/events${id}`, data );

    return response.data
  },

  // delete an event

  delete: async(id, data) =>{
    const response = await api.delete(`/events${id}`, data);
    return response.data
  },


};
export default eventService

