import type { NextPage } from 'next'
import {Card} from 'react-bootstrap'
import {
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import React from 'react'
import { AdminLayout } from '@layout'
import User from "../components/User/TableUser"
import JumlahPenduduk from "../components/Data/JumlahPenduduk"
import Surat from "../components/Data/Surat"
import Admin from "../components/Data/Admin"
import SuratNow from "../components/Data/SuratNow"
import { useAuth } from '@hooks/auth'
import { useRouter } from "next/router";
import { useEffect } from "react";


Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Filler)


const Home: NextPage = () => {
   const router = useRouter();
   const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    if (!storedToken) {
      router.push("/login")
    }
  }, [storedToken, router]);

  return(

    <AdminLayout>
    <div className="row">
      <JumlahPenduduk />
      <Surat />
      <Admin />
      <SuratNow />

    </div>

    <div className="row">
      <div className="col-md-12">
        <Card>
          <Card.Header>
            User Account
          </Card.Header>
          <Card.Body>
            <User />
          </Card.Body>
        </Card>
      </div>
    </div>
  </AdminLayout>
)
  }

export default Home
