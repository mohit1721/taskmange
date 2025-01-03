// const BASE_URL = process.env.REACT_APP_BASE_URL;
// const BASE_URL=""
// const BASE_URL="http://localhost:5000/api/v1"
const BASE_URL= "https://taskmanagenbe.onrender.com/api/v1"
export const authENDPOINTS={
    SIGNUP_API: BASE_URL + "/auth/register",
    LOGIN_API: BASE_URL + "/auth/login",
}
export const taskENDPOINTS={
    CREATE_TASK_API: `${BASE_URL}/create-task`,
    EDIT_TASK_API:`${BASE_URL}/task`,
    DELETE_TASK_API:`${BASE_URL}/task`,
    GET_DASHBOARD_STATS_API : BASE_URL+"/dashboard/stats",
    GET_TASKSLISTS_API: BASE_URL+"/tasklists"
    
}


