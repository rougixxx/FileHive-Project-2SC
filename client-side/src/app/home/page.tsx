"use server";
import NotFoundPage from "@/app/not-found";
import { fetchUserFiles, getUserInfo } from "../(dashboard)/server/functions";
import HomePageMain from ".";
import LogoutScreen from "../components/logout_screen";

export default async function Home() {
  const data = await fetchUserFiles();
  if (data === "logout") {
    return <LogoutScreen />;
  }
  const user = await getUserInfo();
  return (
    <>
      {user !== false ? (
        <HomePageMain files={data} userPic={user.profilePicture} />
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}
