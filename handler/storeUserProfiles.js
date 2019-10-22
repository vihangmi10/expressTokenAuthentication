const storeUserCredentials = {};

const checkUser  = (userName) => {
    return userName in storeUserCredentials;
};
const getUserInformation = (userName) => {
    return storeUserCredentials[userName];
};

const storeUserInformation = (userInfo) => {
    let userName = userInfo.username;
    storeUserCredentials[userName] = userInfo;
};

module.exports = {
    checkUser,
    getUserInformation,
    storeUserInformation
};