import { combineReducers } from 'redux';
import fileReducer from './fileReducer';
import uiReducer from './uiReducer';

export default combineReducers({
   ui: uiReducer,
   files: fileReducer
})