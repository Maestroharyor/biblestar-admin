export const actionTypes = {
    ADD_BOOKS: 'ADD_BOOKS',
    CLEAR_BOOKS: 'CLEAR_BOOKS'
    
};

export function addBooks(books) {
    return { type: actionTypes.ADD_BOOKS, books };
}

export function clearBooks() {
    return { type: actionTypes.CLEAR_BOOKS };
}

// export function registeredSuccess(user){
//     return {type: actionTypes.REGISTERED_SUCCESS, user: user}
// }