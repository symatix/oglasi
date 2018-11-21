import * as constants from '../constants';
import axios from 'axios';

export const getFiles = () => async dispatch => {
   const res = await axios.get('/api/files');
   dispatch({ type: constants.GET_FILES, payload: res.data})
}