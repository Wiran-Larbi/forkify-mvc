import { API_URL,TIMEOUT_SEC } from "./config";


const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const getJSON = async (url) => {

    try {
        const res = await Promise.race([fetch(url,{headers:{'Cross-Origin-Resource-Policy':'same-site'}}),timeout(TIMEOUT_SEC)]);
      
          const data = await res.json();
          if(!res.ok) throw new Error(`${data.message} (status : ${res.status})`);
          
          return data;
    } catch (error) {
        throw error;
        
    }
    
}

export const sendJSON = async (url,recipeData) => {

  try {
      const dataSTR = JSON.stringify(recipeData);
      const fetchPro = fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: dataSTR
      });

      const res = await Promise.race([fetchPro,timeout(TIMEOUT_SEC)]);
      const data = await res.json();
      if(!res.ok) throw new Error(`${data.message} (status : ${res.status})`);
      return data;
    
  } catch (error) {
    throw error;
    
  }
}

export const UpdateURLId = function(newId) {
      window.history.pushState(null, '', `#${newId}`);
}