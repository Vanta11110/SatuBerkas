
import React, { useEffect, useState } from "react";
import axios from "@lib/axios";

const PendudukInfo = ({ pendudukId }) => {
  const [pendudukData, setPendudukData] = useState({});

  useEffect(() => {
    if (pendudukId) {
      axios
        .get(`/api/penduduk/${pendudukId}`)
        .then((response) => {
          setPendudukData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [pendudukId]);

  return (
    <>
      {pendudukData && (
        <>
          <div>{pendudukData.nama}</div>
          <div>{pendudukData.nik}</div>
          {/* Tambahkan informasi penduduk lainnya sesuai kebutuhan */}
        </>
      )}
    </>
  );
};

export default PendudukInfo;
