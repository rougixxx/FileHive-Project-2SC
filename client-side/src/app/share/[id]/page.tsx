"use server";
import DownloadNavBar from "../../components/share page/download_navbar";
import axios from "axios";
import NotFoundPage from "@/app/not-found";
export default async function SharePage({
  params,
}: {
  params: { id: string };
}) {
  const data = await fetchFile(params.id);
  return (
    <>
      {data ? (
        <>
          <DownloadNavBar data={data} />
          <div className="bg-background pt-2 h-[89vh]">
            <iframe 
              src={`http://localhost:8000${data.file}`}
              width="100%"
              height="100%"
            >
            </iframe>
          </div>
        </>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}

async function fetchFile(id: string) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/file/retrieve/${id}`,
    );    
    return response.data.data;
  } catch (error: any) {
    return false;
  }
}
