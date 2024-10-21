import { cookies } from "next/headers";
import axios from "axios";

export async function getUserInfo() {
  try {
    const cookieStore = cookies();
    const auth_token = cookieStore.get("auth_token");
    const response = await axios.get(`http://localhost:8000/auth/my`, {
      headers: {
        Authorization: `Bearer ${auth_token?.value}`,
      },
    });
    return response.data.user;
  } catch (error: any) {
    if (error.response.status === 401 || error.response.status === 403) {
      return "logout";
    }
    return false;
  }
}

export async function fetchUserFiles() {
  try {
    const cookieStore = cookies();
    const auth_token = cookieStore.get("auth_token");
    const response = await axios.get(`http://localhost:8000/api/file/list/`, {
      headers: {
        Authorization: `Bearer ${auth_token?.value}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    if (error.response.status === 401 || error.response.status === 403) {
      return "logout";
    }
    return false;
  }
}
