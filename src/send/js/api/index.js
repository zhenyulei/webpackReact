import axios from 'axios';


function handleResponse (response) {
  response = response.data;
  return new Promise((resolve, reject) => {
    if (!response.success) {
      reject({
        code: response.resultCode,
        msg: response.message
      });
    }
    resolve(response.result);
  });
}


export function getData() {
  const url = '//json.diao.li/getjson/5b9234ace6da184a056cecaa';
  return axios.get(url).then(handleResponse);
}