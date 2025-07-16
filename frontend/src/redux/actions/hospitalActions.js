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
export const setdoctorappointments = (doctorappointments) => {
  return {
    type: ActionTypes.SET_DOCTORAPPOINTMENTS,
    payload: doctorappointments,
  };
};
export const setspecializations = (specializations) => {
  return {
    type: ActionTypes.SET_SPECIALIZATIONS,
    payload: specializations,
  };
};

export const setrooms = (rooms) => {
  return {
    type: ActionTypes.SET_ROOMS,
    payload: rooms,
  };
};

export const setmessages = (messages) => {
  return {
    type: ActionTypes.SET_MESSAGES,
    payload: messages,
  };
};
