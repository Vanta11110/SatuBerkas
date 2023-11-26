import { Card, Form } from "react-bootstrap";
import React from "react";
import { AdminLayout } from "@layout";
import { PendudukList } from "../components/Penduduk";
import { useRouter } from "next/router";
import { useEffect } from "react";


const DataPenduduk = () => {
   const router = useRouter();

   useEffect(() => {
     if (typeof window !== "undefined") {
       const storedToken = localStorage.getItem("api_token");

       if (!storedToken) {
         router.push("/login");
       }
     }
   }, [router]);

  return (
    <>
    
      <AdminLayout>
        <Card className="h-min-screen h-full">
          <Card.Header>Data Penduduk</Card.Header>
          <Card.Body>
            <PendudukList />
          </Card.Body>
        </Card>
      </AdminLayout>
    </>
  );
};
export default DataPenduduk;
