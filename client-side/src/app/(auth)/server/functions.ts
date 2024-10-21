import API from "@/lib/utils/api";

export async function verifyReset(params: { id: string; token: string }) {
  try {
    const response = await API.post(`auth/verify-reset/${params.id}/${params.token}`);    
    return response.data.email;
  } catch (error: any) {    
    return false;
  }
}

export async function verify(params: { id: string; token: string }) {
  try {
    await API.get(`auth/verify/${params.id}/${params.token}`);
    return true;
  } catch (error: any) {
    return false;
  }
}
