"use server";
import "react-toastify/dist/ReactToastify.css";
import ResetPasswordComp from ".";
import NotFoundPage from "@/app/not-found";
import { verifyReset } from "@/app/(auth)/server/functions";

export default async function ResetPassword({
  params,
}: {
  params: { id: string; token: string };
}) {
  const data = await verifyReset(params);

  return <>{data ? <ResetPasswordComp email={data} /> : <NotFoundPage />}</>;
}
