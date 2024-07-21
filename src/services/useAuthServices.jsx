import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { fetchLoginFail, fetchLoginStart, fetchLoginSuccess, fetchLogoutSuccess, fetchRegisterSuccess, fetchUsersSuccess } from "../app/features/loginSlice";
import axios from "axios";
import { toastError, toastSuccess } from "../helpers/toastify";
import { fetchMoviesLogout } from "../app/features/movieSlice";
import useAxios from "./useAxios";

 
const useAuthServices = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const base_url = process.env.REACT_APP_BASE_URL;
const {axiosInstance} = useAxios();

    const getUsers = async() => {
        const url = base_url+"/users";
        console.log(url);
        try {
            dispatch(fetchLoginStart());
            const response = await axios({
                method: 'get',
                url,
                headers:{
                    "Content-Type":"application/json",
                },
                withCredentials: true
              }) 
              console.log('response getUsers', response)
            // toastSuccess(response?.data.message)
            dispatch(fetchUsersSuccess(response?.data?.result))
        } catch (error) {
            toastError('Listing Users is failed! ',error.message)
            dispatch(fetchLoginFail());
        }
    }
    const loginApi = async(body) => {
        const url = base_url+"/auth/login";
        console.log(url);
        try {
            dispatch(fetchLoginStart());
            const response = await axiosInstance({
                method: 'post',
                url,
                headers:{
                    'Access-Control-Allow-Origin': 'https://movielist-cookie-auth-frontend.vercel.app', 
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                },
                data: body,
                // withCredentials: true
              }) 
              console.log('response login', response)
            toastSuccess(response?.data.message)
            dispatch(fetchLoginSuccess(response?.data))
            navigate("/")
        } catch (error) {
            toastError('Login is failed! - - Password should be at least 8 char, and should contain 1 upppercase, 1 lowercase, 1 special char(@$!%*?&)  ',error.message)
            dispatch(fetchLoginFail());
        }
    }
    const registerApi = async(body) => {
        const url = base_url+"/users";
        console.log(url);
        try {
            dispatch(fetchLoginStart());
            const response = await axios({
                method: 'post',
                url,
                headers:{
                    "Content-Type":"application/json",
                },
                data: body,
              }) 
              console.log('response register', response)
            toastSuccess(response?.data.message)
            dispatch(fetchRegisterSuccess())
            navigate("/login")
        } catch (error) {
            toastError('Register is failed! - - Password should be at least 8 char, and should contain 1 upppercase, 1 lowercase, 1 special char(@$!%*?&)  ',error.message)
            dispatch(fetchLoginFail());
        }
    }

    const logout = async() => {
        const url = base_url+"/auth/logout";
        console.log(url);
        try {
            dispatch(fetchLoginStart());
            const response = await axios({
                method: 'get',
                url,
                headers:{
                    "Content-Type":"application/json",
                },
                withCredentials: true
              }) 

              console.log('response logout', response)
            toastSuccess(response?.data?.message)
            dispatch(fetchLogoutSuccess());
            dispatch(fetchMoviesLogout());
            navigate("/login")

        } catch (error) {
            toastError('Loggin out is failed! - ',error.message)
            dispatch(fetchLoginFail());
        }


    }



  return {loginApi,registerApi,logout, getUsers}
}

export default useAuthServices