export const storeEmail = (email) => {
    sessionStorage.setItem('email', email);
};

export const getEmail = () => {
    return sessionStorage.getItem('email'); 
    console.log(sessionStorage)
};

export const removeEmail = () => {
    sessionStorage.removeItem('email');
};
