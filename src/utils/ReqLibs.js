import Axios from "axios";
const baseUrl = "http://localhost";

export const ReqErrorType = {
  HTTPERROR : "HTTPERROR",
  RESULTERROR : "RESULTERROR"
}
export let headers = {
 
};
const responseHandle = (response, resolve, reject) => {
  if(response.status === 200){
    let result = response.data;
    resolve(result);
  }else{
    reject({type: ReqErrorType.HTTPERROR, content: {status: response.status, data: response.data}});
  }
}

export function reqHanyuSearchlist(wd, pn, filters, from="home") {
  return new Promise((resolve, reject) => {
    Axios.get(baseUrl+ '/hanyu/hanyu/ajax/search_list',
      {
        params: {
          wd,
          pn,
          from,
          ...filters
        },
        headers
      })
      .then((response) => {
        responseHandle(response, resolve, reject);
      });
  });
}