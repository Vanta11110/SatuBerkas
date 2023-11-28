import React, { useEffect, useState } from "react";

import HeadCustom from "../layout/AdminLayout/Header/head";
import { Card, Table } from "react-bootstrap";
import { AdminLayout } from "@layout";
import axios from "@lib/axios"
import { useRouter } from "next/router";
import ToastComp from "@components/Toast/Toast";
import PendudukInfo from "@components/Penduduk/PendudukInfo";

const History = () => {
  const [softDeletedData, setSoftDeletedData] = useState([]);
  const [pendudukData, setPendudukData] = useState({});
  // const pendudukIds = softDeletedData.map((data) => data.penduduk_id);
  const router = useRouter();
  const [toast, setToast] = useState({
    show: false,
    message: "",
    success: true,
  });

   useEffect(() => {
     if (typeof window !== "undefined") {
       const storedToken = sessionStorage.getItem("api_token");

       if (!storedToken) {
         router.push("/login");
       }
     }
   }, [router]);

  useEffect(() => {
    axios.get("/api/soft-deleted-data").then((response) => {
      setSoftDeletedData(response.data);
      fetchPenduduk(response.data);
    });

  }, []);

 function fetchPenduduk(deletedData) {
   const pendudukIds = deletedData.map((data) => data.penduduk_id);
   let url = `/api/penduduk/${pendudukIds.join(",")}`;
   axios
     .get(url)
     .then((response) => {
       if (Array.isArray(response.data)) {
         const pendudukMap = response.data.reduce((map, penduduk) => {
           map[penduduk.id] = penduduk;
           return map;
         }, {});
         setPendudukData(pendudukMap);
       } else {
         console.error("Invalid response structure for penduduk data");
       }
     })
     .catch((error) => {
       console.error(error);
     });
 }


  function formatDeletedAt(createdAt) {
    const date = new Date(createdAt);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function handleRestore(id) {
    const url = `/api/restore/${id}`; 
    axios
      .post(url)
      .then((response) => {
        console.log("Data berhasil direstore");
        setToast({
          show: true,
          message: "Data Berhasil Direstore",
          success: true,
        });
        console.log("Toast should show for success");
        setTimeout(() => {
          setToast(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Gagal melakukan restore data", error.response.data);
        setToast({
          show: true,
          message: "Data Gagal Direstore",
          success: false,
        });
        setTimeout(() => {
          setToast(false);
        }, 2000);
      });
  }
  return (
    <>
      <HeadCustom title={"Riwayat Penghapusan"} />
      {toast.show && (
        <ToastComp message={toast.message} success={toast.success} />
      )}
      <AdminLayout>
        <Card className="h-min-screen h-full">
          <Card.Header>History Penghapusan Surat</Card.Header>
          <Card.Body>
            {/* Konten */}
            <div className="flex-grow flex justify-center bg-white">
              <div className=" border border-gray-300 rounded-md p-6 overflow-x-auto">
                <h1 className="text-2xl font-bold mb-4 text-black">
                  Riwayat Penghapusan
                </h1>

                <Table responsive bordered hover>
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-center">
                        No
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center">
                        Nama
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center">
                        NIK
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center">
                        Nama Surat
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center">
                        Jenis Surat
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center">
                        Waktu Penghapusan
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {softDeletedData.map((item, index) => (
                      <tr key={item.id}>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <PendudukInfo pendudukId={item.penduduk_id} />
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {item.nama_surat}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {item.jenis_surat}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {formatDeletedAt(item.deleted_at)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <button
                            onClick={() => handleRestore(item.id)}
                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                          >
                            Restore
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Card.Body>
        </Card>
      </AdminLayout>
    </>
  );
};

export default History;
