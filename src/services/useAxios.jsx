import axios from 'axios'
import React from 'react'

const useAxios = () => {


const axiosInstance = axios.create({
    withCredentials:true
})

  return {axiosInstance}
}

export default useAxios