import { AdminLayout } from "@layout";
import React, { useEffect, useState } from "react";
import axios from "@lib/axios";
import { Card, Form, Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Modal from "@components/Modal/Modal";
import ToastComp from "@components/Toast/Toast"
import { useRouter } from "next/router";
import PendudukInfo from "@components/Penduduk/PendudukInfo";

function RekapSurat() {
  const [uploadedSurat, setUploadedSurat] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedJenisSurat, setSelectedJenisSurat] = useState("");
   const [activeDropdown, setActiveDropdown] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [deleteId, setDeleteId] = useState(null);
     const [currentPage, setCurrentPage] = useState(1);
     const [paginate, setPaginate] = useState(100);
     const [to, setTo] = useState("");
     const [from, setFrom] = useState(1);
     const [total, setTotal] = useState("");
     const [lastPages, setLastPages] = useState("");
   const [toast, setToast] = useState({
     show: false,
     message: "",
     success: true,
   });
   const router = useRouter();

   function formatDate(createdAt) {
     const date = new Date(createdAt);
     return date.toLocaleString("en-US", {
       year: "numeric",
       month: "2-digit",
       day: "2-digit",
       hour: "2-digit",
       minute: "2-digit",
     });
   }

   useEffect(() => {
     if (typeof window !== "undefined") {
       const storedToken = sessionStorage.getItem("api_token");

       if (!storedToken) {
         router.push("/login");
       }
     }
   }, [router]);
  
  useEffect(() => {
    fetchBerkas();
  }, [selectedYear, selectedMonth, selectedJenisSurat]);

  

  function fetchBerkas() {
    
    let url = `/api/file`;
    const queryParams = {page : currentPage};
    if (selectedYear) {
      queryParams.year = selectedYear;
    }
    if (selectedMonth) {
      queryParams.month = selectedMonth;

    }
    if (selectedJenisSurat) {
      queryParams.jenisSurat = selectedJenisSurat;
    }
    if (paginate) {
      queryParams.Paginate = paginate;
    }
    queryParams.page = currentPage;
    axios
      .get(url, { params: queryParams })
      .then((response) => {
        setUploadedSurat(response.data.data);
        setFrom(response.data.from);
        setTo(response.data.to);
        setTotal(response.data.total);
        setLastPages(response.data.last_page);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleFilterChange(event) {
    const { name, value } = event.target;
    if (name === "year") {
      setSelectedYear(value);
    } else if (name === "month") {
      setSelectedMonth(value);
    } else if (name === "jenisSurat") {
      setSelectedJenisSurat(value);
    }
    if (name === "Paginate") {
      setPaginate(value);
    }
  }
  function handleClearFilter() {
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedJenisSurat("");
    fetchBerkas();
  }

  const handleChange = (id) => {
    fetchFile(id);
  };
  
  function fetchFile(id) {
    let url = `/api/file/${id}`;
    axios
      .get(url)
      .then((response) => {
        fetchPath(response.data.file_path);
      })
      .catch((error) => {
        console.log("error");
      });
  }

  function fetchPath(file_path) {

    let url = `/api/berkas/${file_path}`;
    axios
      .get(url, { responseType: "blob" })
      .then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        const newTab = window.open();
        newTab.document.write(
          `<iframe src="${fileURL}" width="100%" height="100%"></iframe>`
        );
      })
      .catch((error) => {
        console.log("path");
      });
  }

  const handleDelete = (id) => {
    setShowModal(true);
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    deleteData(deleteId);
    setShowModal(false);
    setActiveDropdown(null);
    
  };

  const deleteData = (id) => {
    axios
      .delete(`/api/file/${id}`)
      .then((response) => {
        setActiveDropdown(null);
        setToast({
          show: true,
          message: "Data Berhasil Dihapus",
          success: true,
        });
        console.log("Toast should show for success");
        setTimeout(() => {
          setToast(false);
        }, 2000);
        fetchBerkas();
      })
      .catch((error) => {
        setToast({
          show: true,
          message: "Data Gagal Dihapus",
          success: false,
        });
        console.log("Toast should show for success");
        setTimeout(() => {
          setToast(false);
        }, 2000);
        console.log("gagal hapus");
      });
  };

  const toggleDropdown = (pendudukId) => {
    if (activeDropdown === pendudukId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(pendudukId);
    }
  };


  return (
    <>
      <AdminLayout>
        {toast.show && (
          <ToastComp message={toast.message} success={toast.success} />
        )}
        <Card className="h-full min-h-screen">
          <Card.Header>Rekap Surat</Card.Header>
          <Card.Body>
            <Form className="flex text-sm gap-1 mb-2 items-center">
              <div className="font-semibold">Filter : </div>
              <Form.Group className="col-md-3 w-auto">
                <Form.Control
                  as="select"
                  name="year"
                  value={selectedYear}
                  onChange={handleFilterChange}
                  className="text-sm"
                >
                  {Array.from(
                    { length: new Date().getFullYear() - 2018 },
                    (v, k) => k + 2023
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className="col-md-3 w-auto">
                <Form.Control
                  as="select"
                  name="month"
                  value={selectedMonth}
                  onChange={handleFilterChange}
                  className="text-sm"
                >
                  <option value="">Bulan</option>
                  <option value="1">Januari</option>
                  <option value="2">Februari</option>
                  <option value="3">Maret</option>
                  <option value="4">April</option>
                  <option value="5">Mei</option>
                  <option value="6">Juni</option>
                  <option value="7">Juli</option>
                  <option value="8">Agustus</option>
                  <option value="9">September</option>
                  <option value="10">Oktober</option>
                  <option value="11">November</option>
                  <option value="12">Desember</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="col-md-3 w-auto">
                <Form.Control
                  as="select"
                  name="jenisSurat"
                  value={selectedJenisSurat}
                  onChange={handleFilterChange}
                  className="text-sm"
                >
                  <option value="">Jenis Surat</option>
                  <option value="Surat Pengantar Nikah">
                    Surat Pengantar Nikah
                  </option>
                  <option value="Surat Pengantar Cerai">
                    Surat Pengantar Cerai
                  </option>
                  <option value="Surat Pengantar Rujuk">
                    Surat Pengantar Rujuk
                  </option>
                  <option value="Surat Surat Keterangan Kelahiran">
                    Surat Keterangan Kelahiran
                  </option>
                  <option value="Surat Keterangan Kematian">
                    Surat Keterangan Kematian
                  </option>
                  <option value="Surat Keterangan Tidak Mampu/keringanan Biaya Sekolahn">
                    Surat Keterangan Tidak Mampu/keringanan Biaya Sekolah
                  </option>
                  <option value="Surat Keterangan Belum Menikah">
                    Surat Keterangan Belum Menikah
                  </option>
                  <option value="Surat Keterangan Janda">
                    Surat Keterangan Janda
                  </option>
                  <option value="Surat Keterangan Wali Nikah">
                    Surat Keterangan Wali Nikah
                  </option>
                  <option value="Surat Pengantar SKCK">
                    Surat Pengantar SKCK
                  </option>
                  <option value="Surat Kuasa Ahli Waris">
                    Surat Kuasa Ahli Waris
                  </option>
                  <option value="Surat Pernyataan Ahli Waris">
                    Surat Pernyataan Ahli Waris
                  </option>
                  <option value="Surat Keterangan Beda Nama">
                    Surat Keterangan Beda Nama
                  </option>
                  <option value="Surat Keterangan Ghoib">
                    Surat Keterangan Ghoib
                  </option>
                  <option value="Surat Bertempat Tinggal Sementara">
                    Surat Bertempat Tinggal Sementara
                  </option>
                  <option value="Surat Domisili Usaha Perusahaan">
                    Surat Domisili Usaha Perusahaan
                  </option>
                  <option value="Surat Keterangan Domisili">
                    Surat Keterangan Domisili
                  </option>
                  <option value="Surat Keterangan Bangunan">
                    Surat Keterangan Bangunan
                  </option>
                </Form.Control>
              </Form.Group>
              <Button
                variant="secondary"
                onClick={handleClearFilter}
                className="text-sm bg-blue-500 "
              >
                Reset Filter
              </Button>
              <div className="font-semibold ml-5">Show List : </div>
              <Form.Group className="col-md-3 w-auto">
                <Form.Control
                  as="select"
                  name="Paginate"
                  value={paginate}
                  onChange={handleFilterChange}
                  className="text-sm"
                >
                  <option value="100">100</option>
                  <option value="75">75</option>
                  <option value="50">50</option>
                  <option value="25">25</option>
                  <option value="10">10</option>
                </Form.Control>
              </Form.Group>
            </Form>
            <Table responsive bordered hover className="rounded-md">
              <thead className="bg-light">
                <tr>
                  <th className="text-center">No</th>
                  <th className="text-center">Nama Penduduk</th>
                  <th className="text-center">NIK</th>
                  <th className="text-center">Nama Surat</th>
                  <th className="text-center">Jenis Surat</th>
                  <th className="text-center">Tanggal Upload</th>
                  <th aria-label="Action" />
                </tr>
              </thead>
              <tbody>
                {uploadedSurat ? (
                  uploadedSurat.map((surat, index) => (
                    <tr key={surat}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">
                        <PendudukInfo
                          pendudukId={surat.penduduk_id}
                          infoType="nama"
                        />
                      </td>
                      <td className="text-center">
                        <PendudukInfo
                          pendudukId={surat.penduduk_id}
                          infoType="nik"
                        />
                      </td>
                      <td className="text-center">{surat.nama_surat}</td>
                      <td className="text-center">{surat.jenis_surat}</td>
                      <td className="text-center">
                        {formatDate(surat.created_at)}
                      </td>
                      <td className="border border-gray-300 px-3 align-middle">
                        <button
                          id={`dropdownButton-${surat.id}`}
                          data-dropdown-toggle={`dropdown-${surat.id}`}
                          className=" hover:text-amber-500"
                          type="button"
                          onClick={() => toggleDropdown(surat.id)}
                        >
                          <FontAwesomeIcon fixedWidth icon={faSlidersH} />
                        </button>
                      </td>
                      <div
                        id={`dropdown-${surat.id}`}
                        className={`z-10 right-1 ${
                          activeDropdown === surat.id ? "block" : "hidden"
                        }  absolute mt-10 rounded-lg shadow w-auto border border-solid border-gray-800`}
                      >
                        <ul
                          className="text-sm bg-white text-gray-700"
                          aria-labelledby={`dropdownButton-${surat.id}`}
                        >
                          <li>
                            <Link
                              href={`/detail_penduduk?id=${surat.penduduk_id}`}
                              className="block text-start p-2 rounded-md hover:bg-gray-200 hover:text-gray-700"
                            >
                              Detail
                            </Link>
                          </li>
                          <li>
                            <a
                              onClick={() => handleDelete(surat.id)}
                              className="block text-start rounded-md p-2 hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
                            >
                              Hapus Data
                            </a>
                          </li>
                          <li>
                            <a
                              className=" block text-start rounded-md p-2 hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
                              onClick={() => handleChange(surat.id)}
                            >
                              Lihat PDF
                            </a>
                          </li>
                        </ul>
                        {showModal && (
                          <Modal
                            isOpen={showModal}
                            message="Hapus Data Ini?"
                            onCancel={() => setShowModal(false)}
                            onClose={() => setShowModal(false)}
                            onConfirm={handleConfirmDelete}
                            confirmText={"Hapus"}
                          />
                        )}
                        {toast.show && (
                          <ToastComp
                            message={toast.message}
                            success={toast.success}
                          />
                        )}
                      </div>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">Tidak ada data surat yang diunggah.</td>
                  </tr>
                )}
              </tbody>
            </Table>
            {total > paginate && (
              <div className="flex flex-col mt-3 mb-1 items-center">
                <span className="text-sm text-gray-700">
                  Menampilkan{" "}
                  <span className="font-semibold text-gray-900">{from}</span>{" "}
                  sampai{" "}
                  <span className="font-semibold text-gray-900">{to}</span> dari{" "}
                  <span className="font-semibold text-gray-900">{total}</span>{" "}
                  Penduduk
                </span>
                <div className="inline-flex gap-1 mt-2 xs:mt-0">
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-800 bg-white rounded-l hover:text-orange-500"
                  >
                    <FontAwesomeIcon icon={faAnglesLeft} />
                  </button>
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-800 bg-white rounded-l hover:text-orange-500"
                  >
                    <FontAwesomeIcon icon={faAngleLeft} />
                  </button>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-800 bg-white hover:text-orange-500"
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                  </button>
                  <button
                    onClick={() => setCurrentPage(lastPages)}
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-800 bg-white hover:text-orange-500"
                  >
                    <FontAwesomeIcon icon={faAnglesRight} />
                  </button>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      </AdminLayout>
    </>
  );
};


export default RekapSurat;