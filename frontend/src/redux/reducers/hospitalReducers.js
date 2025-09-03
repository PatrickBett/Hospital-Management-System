import { ActionTypes } from "../constants/action-Types";
//  the reducer takes the initialstate and the action

const initialstate = {
  departments: [],
  doctors: [],
  appointments: [],
  doctorappointments: [],
  specializations: [],
  messages: [],
};
export const HospitalReducer = (state = initialstate, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_DEPARTMENTS:
      return {
        ...state,
        departments: payload,
      };

    case ActionTypes.SET_DOCTORS:
      return {
        ...state,
        doctors: payload,
      };

    case ActionTypes.SET_APPOINTMENTS:
      return {
        ...state,
        appointments: payload,
      };
    case ActionTypes.SET_DOCTORAPPOINTMENTS:
      return {
        ...state,
        doctorappointments: payload,
      };

    case ActionTypes.SET_SPECIALIZATIONS:
      return {
        ...state,
        specializations: payload,
      };

    case ActionTypes.SET_ROOMS:
      return {
        ...state,
        rooms: payload,
      };
    case ActionTypes.SET_MESSAGES:
      return {
        ...state,
        messages: payload,
      };

    default:
      return state;
  }
};
