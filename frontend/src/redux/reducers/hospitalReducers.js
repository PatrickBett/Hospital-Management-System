import { ActionTypes } from "../constants/action-types";
//  the reducer takes the initialstate and the action

const initialstate = {
  departments: [
    {
      id: 1,
      name: "Patrick Bett",
    },
  ],
  doctors: [
    {
      id: 1,
      name: "Patrick Bett",
    },
    {
      id: 2,
      name: "Patrick kip Bett",
    },
  ],
  appointments: [
    {
      id: 1,
      name: "Patrick Bett",
    },
  ],
  specializations: [
    {
      id: 1,
      name: "Surgeon",
    },
  ],
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

    default:
      return state;
  }
};
