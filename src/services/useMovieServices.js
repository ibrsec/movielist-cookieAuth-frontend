import axios from "axios"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovieStart,fetchMoviesFail,fetchMoviesSuccess,fetchOneMovieSuccess,fetchMoviesSuccessWithOutpayload,fetchMoviesLogout } from "../app/features/movieSlice";
import { toastError, toastSuccess, toastWarn } from "../helpers/toastify";
import useAuthServices from "./useAuthServices";

const useMovieServices = () => {
  const dispatch = useDispatch();
  const {logout} = useAuthServices();
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BASE_URL;
  // const token = useSelector((state) => state.login.token);

 

  //!######## - LIST BLOGS
  const getMovies = async () => {
    const url = base_url + "/movies";
    dispatch(fetchMovieStart());
    try {
      const response = await axios(url,{
        headers:{
          'Access-Control-Allow-Origin': 'https://movielist-cookie-auth-frontend.vercel.app', 
          "Content-Type":"application/json",
          "Accept":"application/json",
      },
        withCredentials: true // Bu ayar çerezlerin gönderilmesini sağlar
      });
      console.log(response); 
      dispatch(fetchMoviesSuccess(response?.data?.result))
    } catch (error) {
        console.log(error);
        toastError('Listing blogs is failed - '+error.message)
        dispatch(fetchMoviesFail());
    }
  };



  //!######## - GET ONE BLOG
  const getOneMovie = async (id) => {
    const url = base_url + "/movies/"+id;
    dispatch(fetchMovieStart());
    try {
      const response = await axios(url,{withCredentials: true});

      // expiredSession(response?.status, logout,toastWarn)
      console.log(response); 
      dispatch(fetchOneMovieSuccess(response?.data?.result))
    } catch (error) {
        console.log(error);
        toastError('Listing One blog is failed - '+error.message)
        dispatch(fetchMoviesFail());
    }
  };


  //!######## - POST NEW BLOG
  const createMovie = async (body) => {
    const url = base_url + "/movies";
    dispatch(fetchMovieStart());
    try {
      const response = await axios({
        method: 'post',
        url,
        headers:{
            "Content-Type":"application/json",
            // "Authorization":"Bearer "+token,
        },
        data: body,
        withCredentials: true
      });
      console.log(response?.status); 
      console.log(response); 
      dispatch(fetchMoviesSuccessWithOutpayload())
      toastSuccess(response?.data?.message)
      getMovies();
    } catch (error) {
      console.log(error);
      toastError('Posting new movie is failed - '+error.message)
      dispatch(fetchMoviesFail());
      // expiredSession(error, logout,toastWarn)
    }
  };


  //!######## - UPDATE A BLOG
  const updateMovie = async (id,body) => {
    const url = base_url + "/movies/"+id;
    dispatch(fetchMovieStart());
    try {
      const response = await axios({
        method: 'put',
        url,
        headers:{
            "Content-Type":"application/json",
            // "Authorization":"Bearer "+token,
        },
        data: body,
        withCredentials: true
      });
      // expiredSession(response?.status, logout,toastWarn)
      console.log(response); 
      dispatch(fetchMoviesSuccessWithOutpayload())
      toastSuccess(response?.data?.message)
      getOneMovie(id);
    } catch (error) {
        console.log(error);
        toastError('Updating movie is failed - '+error.message)
        dispatch(fetchMoviesFail());
    }
  };

  //!######## - DELETE A MOVIE
  const deleteMovie = async (id) => {
    const url = base_url + "/movies/"+id;
    dispatch(fetchMovieStart());
    try {
      const response = await axios({
        method: 'delete',
        url,
        headers:{
            "Content-Type":"application/json",
            // "Authorization":"Bearer "+token,
        },
        withCredentials: true
      });
      // expiredSession(response?.status, logout,toastWarn)
      console.log(response); 
      dispatch(fetchMoviesSuccessWithOutpayload())
      toastSuccess("Movie is deleted!")
      navigate('/');
    } catch (error) {
        console.log(error);
        toastError('Deleting movie is failed - '+error.message)
        dispatch(fetchMoviesFail());
    }
  };

  return { getMovies,getOneMovie,createMovie, updateMovie, deleteMovie };
};

export default useMovieServices;


const expiredSession = (error,logout,toastWarn) => {
  if(error?.response?.status === 401  && error?.response?.data?.message.includes("Invalid Token")) {
    toastWarn("Session expired!")
    logout();
    return;
  }

}