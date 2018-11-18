import * as constants from '../constants';
import axios from 'axios';

export const getFiles = () => async dispatch => {
   const res = await axios.get('/api/files');
   console.log(res.data)
   dispatch({ type: constants.GET_FILES, payload: res.data})
}

export const addFile = data => async dispatch => {
   const res = await axios.post('/api/file', data, {
      headers: { 
         'Content-Type': 'multipart/form-data',
         'Accept': 'application/json',
         'type': "formData" 
      }
   });
   dispatch({ type: constants.ADD_FILE, payload: res.data})
}

export const deleteFile = _id => async dispatch => {
   const res = await axios.delete(`/api/file/${_id}`);
   dispatch({ type: constants.DELETE_FILE, payload: res.data })
}