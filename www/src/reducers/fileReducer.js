import {ADD_FILE, DELETE_FILE, GET_FILES } from '../constants';

export default function (state = [], action) {

   switch (action.type) {
      case GET_FILES:
            return action.payload;

      case ADD_FILE:
         return [
            ...state,
            action.payload
         ];

      case DELETE_FILE:
         return state.filter(file => file._id !== action.payload._id);

      default:
         return state;
   }
}