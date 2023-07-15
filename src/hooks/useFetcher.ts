// @see: https://medium.com/@oherterich/creating-a-textarea-with-dynamic-height-using-react-and-typescript-5ed2d78d9848

import { selectToken } from "@/store/authSlice";
import { useSelector } from "react-redux";

// Updates the height of a <textarea> when the value changes.
const useFetcher = () => {

  const token = useSelector(selectToken);

  return async (endpoint: string, data: Object = {}) => {
    
    let response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        token: token,
        ...data
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());

    if (response.message == 'login_required') {
      window.localStorage.clear();
      window.location.reload();
    }

    return response;
  }
};

export default useFetcher;
