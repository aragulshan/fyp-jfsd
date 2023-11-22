const getCurrentUserData = () => {
    const userDataString = localStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  };
  export default getCurrentUserData