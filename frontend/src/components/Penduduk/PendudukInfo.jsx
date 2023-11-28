// components/PendudukInfo.jsx
import React, { useEffect, useState } from "react";
import axios from "@lib/axios";

const PendudukInfo = ({ pendudukId, infoType }) => {
  const [pendudukData, setPendudukData] = useState(null);

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

  const renderInfo = () => {
    switch (infoType) {
      case "nama":
        return <div>{pendudukData?.nama}</div>;
      case "nik":
        return <div>{pendudukData?.nik}</div>;
      default:
        return null;
    }
  };

  return <>{pendudukData && renderInfo()}</>;
};

export default PendudukInfo;
