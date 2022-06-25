import { combineReducers } from 'redux';
import auth from './auth/reducer';
import books from './books/reducer';
// import theme from './theme/reducer';

export default combineReducers({
    auth,
    books
    // theme
});
