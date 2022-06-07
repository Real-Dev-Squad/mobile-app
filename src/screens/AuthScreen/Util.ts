import axios from 'axios';
import { urls } from '../../constants/appConstant/url';

export const getUserData = async (url: string) => {
  if (url === urls.REDIRECT_URL) {
    return axios
      .get(urls.GET_USERS_DATA, {
        headers: {
          cookie: '',
        },
      })

      .then((res) =>
        Promise.resolve({
          id: res.data.id,
          name: res.data.github_display_name,
          profileUrl: res.data.picture.url,
          status:res.data.status

        }),
      )
   
      .catch(err => Promise.reject(null));

  }
  return null;
};

export const updateStatus = async (status: string) => {
  return axios({
      method: 'patch',
      url: urls.GET_USERS_DATA, 
      headers:{
        cookie: '',
      },
      data: {
        status:status
      }
    })
    .then(res =>{
      return Promise.resolve({
          status :res.config.data.status
      }) 
    })
    
    .catch(err => Promise.reject(err));

};

export const updateMarkYourSelfAs_ = async (markStatus: string) => {
  return axios({
      method: 'patch',
      url: urls.GET_USERS_DATA, 
      headers:{
        cookie: '',
      },
      data: {
        status:markStatus
      }
    })

    .then(res =>{
      return Promise.resolve({
          status :res.data.status
      })
    
    })
    
    .catch(err => Promise.reject(err));

};