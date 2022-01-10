import axios from 'axios';

class ApiClient {
  apiclient = null;

  constructor(config) {
    let axiosInstance = axios.create({
      baseURL: 'https://f2a8b123-adbb-4c6a-beba-f3d3d42eea86.mock.pstmn.io',
      timeout: 600000,
    });

    this.apiclient = axiosInstance;
  }

  request = async config => {
    try {
      const res = await this.apiclient.request(config);
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  get = (url, params = {}) => {
    return this.request({
      method: 'GET',
      url,
      params,
    });
  };
}

const apiClient = new ApiClient({});

export {apiClient as ApiClient};
