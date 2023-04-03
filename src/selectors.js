export const getUserName = (state) => state.user.name;

export const getLoggedIn = (state) => state.user.isAuth;

export const getAuthorsList = (state) => state.authors;

export const getCoursesList = (state) => state.courses;

export const getUserRole = (state) => state.user.role;

export const getUserToken = (state) => state.user.token;
