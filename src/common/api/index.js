export const apiUrl = import.meta.env.VITE_SERVER_DOMAIN;

// Blog Apis -------------
export const getLatestBlogsApi = `${apiUrl}/latest-blogs`;
export const getTrendingBlogsApi = `${apiUrl}/trending-blogs`;
export const getSearchedBlogsApi = `${apiUrl}/search-blogs`;
export const getBlogDetailsApi = `${apiUrl}/get-blog`;
export const getUserWrittenBlogsApi = `${apiUrl}/user-written-blogs`;

// Notification Apis -------------
export const getNotificationsApi = `${apiUrl}/notifications`;

// User Apis -------------
export const searchUsersAPI = `${apiUrl}/search-users`;

// Profile Apis -------------
export const changePasswordApi = `${apiUrl}/change-password`;
export const getProfileDetailsApi = `${apiUrl}/get-profile`;
export const updateProfileImageApi = `${apiUrl}/update-profile-image`;
export const updateProfileApi = `${apiUrl}/update-profile`;
