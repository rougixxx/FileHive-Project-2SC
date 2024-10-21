"use server";
import { getUserInfo } from "../server/functions";
import MainProfile from ".";
import NotFoundPage from "@/app/not-found";
import LogoutScreen from "@/app/components/logout_screen";

export default async function Profile() {
  const data = await getUserInfo();
  if(data === "logout"){
    return <LogoutScreen/>
  }
  return (
    <>
      {data? (
        <MainProfile
          user={{
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            profilePic: data.profilePicture,
          }}
        />
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}
