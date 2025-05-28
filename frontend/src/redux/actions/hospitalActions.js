import { ActionTypes } from "../constants/action-types";

export const setdepartments = (departments) => {
  return {
    type: ActionTypes.SET_DEPARTMENTS,
    payload: departments,
  };
};

export const setdoctors = (doctors) => {
  return {
    type: ActionTypes.SET_DOCTORS,
    payload: doctors,
  };
};

export const setappointments = (appointments) => {
  return {
    type: ActionTypes.SET_APPOINTMENTS,
    payload: appointments,
  };
};

export const specializations = (specializations) => {
  return {
    type: ActionTypes.SET_SPECIALIZATIONS,
    payload: specializations,
  };
};

export const rooms = (rooms) => {
  return {
    type: ActionTypes.SET_ROOMS,
    payload: rooms,
  };
};
