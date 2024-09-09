function fetchMethod(url, callback, method = "GET", data = null, token = null) {
  console.log("fetchMethod: ", url, method, data, token);

  const headers = {
      'Authorization': `Bearer ${token}`
  };

  if (data instanceof FormData) {
    // If data is FormData, set the Content-Type header as is
  } else if (data) {
        headers["Content-Type"] = "application/json";
        data = JSON.stringify(data);
  }
  if (token) {
      headers["Authorization"] = `Bearer ${token}`;
  }

  let options = {
      method: method.toUpperCase(),
      headers: headers
  };

  if (method !== "GET" && data !== null) {
      options.body = data; 
  }

  fetch(url, options)
      .then((response) => {
          if (response.status == 204) {
              callback(response.status, {});
          } else {
              response.json().then((responseData) => callback(response.status, responseData));
          }
      })
      .catch((error) => console.error(`Error from ${method} ${url}:`, error));
}