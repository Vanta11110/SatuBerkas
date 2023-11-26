import HeadCustom from "../layout/AdminLayout/Header/head";
import React from "react";
import Select from "react-select";
import { useState, useEffect } from "react";
import axios from "@lib/axios";
import { useRouter } from "next/router";
import Toast from "../components/Toast/Toast";
import { AdminLayout } from "@layout"
import { Card } from "react-bootstrap";
import {useAuth} from "@hooks/auth"

const genderOptions = [
  { value: "Laki-Laki", label: "Laki-Laki" },
  { value: "Perempuan", label: "Perempuan" },
];
const rtOptions = [
  { value: "01", label: "RT 01" },
  { value: "02", label: "RT 02" },
  { value: "03", label: "RT 03" },
  { value: "04", label: "RT 04" },
  { value: "05", label: "RT 05" },
  { value: "06", label: "RT 06" },
  { value: "07", label: "RT 07" },
  { value: "08", label: "RT 08" },
  { value: "09", label: "RT 09" },
  { value: "10", label: "RT 10" },
  { value: "11", label: "RT 11" },
  { value: "12", label: "RT 12" },
  { value: "13", label: "RT 13" },
  { value: "14", label: "RT 14" },
  { value: "15", label: "RT 15" },
  { value: "16", label: "RT 16" },
  { value: "17", label: "RT 17" },
  { value: "18", label: "RT 18" },
  { value: "19", label: "RT 19" },
  { value: "20", label: "RT 20" },
  { value: "21", label: "RT 21" },
  { value: "22", label: "RT 22" },
  { value: "23", label: "RT 23" },
  { value: "24", label: "RT 24" },
  { value: "25", label: "RT 25" },
  { value: "26", label: "RT 26" },
  { value: "27", label: "RT 27" },
  { value: "28", label: "RT 28" },
  { value: "29", label: "RT 29" },
  { value: "30", label: "RT 30" },
  { value: "31", label: "RT 31" },
  { value: "32", label: "RT 32" },
  { value: "33", label: "RT 33" },
  { value: "34", label: "RT 34" },
  { value: "35", label: "RT 35" },
  { value: "36", label: "RT 36" },
  { value: "37", label: "RT 37" },
  { value: "38", label: "RT 38" },
  { value: "39", label: "RT 39" },
  { value: "40", label: "RT 40" },
  { value: "41", label: "RT 41" },
  { value: "42", label: "RT 42" },
  { value: "43", label: "RT 43" },
  { value: "44", label: "RT 44" },
  { value: "45", label: "RT 45" },
  { value: "46", label: "RT 46" },
  { value: "47", label: "RT 47" },
  { value: "48", label: "RT 48" },
  { value: "49", label: "RT 49" },
  { value: "50", label: "RT 50" },
  { value: "51", label: "RT 51" },
  { value: "52", label: "RT 52" },
  { value: "53", label: "RT 53" },
  { value: "54", label: "RT 54" },
  { value: "55", label: "RT 55" },
  { value: "56", label: "RT 56" },
  { value: "57", label: "RT 57" },
  { value: "58", label: "RT 58" },
  { value: "59", label: "RT 59" },
];

const religionOptions = [
  { value: "Islam", label: "Islam" },
  { value: "Kristen", label: "Kristen" },
  { value: "Katholik", label: "Katholik" },
  { value: "Hindu", label: "Hindu" },
  { value: "Budha", label: "Budha" },
  { value: "Konghucu", label: "Konghucu" },
];

const occupationOptions = [
  { value: "Mahasiswa", label: "Mahasiswa" },
  { value: "Wiraswasta", label: "Wiraswasta" },
  { value: "Pelajar", label: "Pelajar" },
  { value: "Ibu Rumah Tangga", label: "Ibu Rumah Tangga" },
  { value: "Tidak Bekerja", label: "Tidak Bekerja" },
];

const maritalStatusOptions = [
  { value: "Belum Menikah", label: "Belum Menikah" },
  { value: "Sudah Menikah", label: "Sudah Menikah" },
  { value: "Janda", label: "Janda" },
  { value: "Duda", label: "Duda" },
];

const educationOptions = [
  { value: "Belum Sekolah", label: "Belum Sekolah" },
  { value: "TK/Paud", label: "TK/Paud" },
  { value: "SD", label: "SD" },
  { value: "SMP", label: "SMP" },
  { value: "SMA", label: "SMA" },
  { value: "S1", label: "S1" },
  { value: "S2", label: "S2" },
  { value: "S3", label: "S3" },
];

const UpdatePenduduk = () => {
  const [penduduk, setPenduduk] = useState([]);
  const [nama, setNama] = useState(penduduk ? penduduk.nama : "");
  const [nik, setNik] = useState(penduduk ? penduduk.nik : "");
  const [nokk, setNokk] = useState(penduduk ? penduduk.no_kk : "");
  const [tanggalLahir, setTanggalLahir] = useState(
    penduduk ? penduduk.tanggal_lahir : ""
  );
  const [alamat, setAlamat] = useState(penduduk ? penduduk.alamat : "");
  const [jenisKelamin, setJenisKelamin] = useState(
    penduduk
      ? genderOptions.find((option) => option.value === penduduk.jenis_kelamin)
      : null
  );
  const [kelurahan, setKelurahan] = useState(
    "Gunung Samarinda");
  const [rt, setRt] = useState(
    penduduk ? rtOptions.find((option) => option.value === penduduk.rt) : null
  );
  const [agama, setAgama] = useState(
    penduduk
      ? religionOptions.find((option) => option.value === penduduk.agama)
      : null
  );
  const [pekerjaan, setPekerjaan] = useState(
    penduduk
      ? occupationOptions.find((option) => option.value === penduduk.pekerjaan)
      : null
  );
  const [status, setStatus] = useState(
    penduduk
      ? maritalStatusOptions.find(
          (option) => option.value === penduduk.status_perkawinan
        )
      : null
  );
  const [pendidikanTerakhir, setPendidikanTerakhir] = useState(
    penduduk
      ? educationOptions.find(
          (option) => option.value === penduduk.pendidikan_terakhir
        )
      : null
  );
  const [ayah, setAyah] = useState(penduduk ? penduduk.ayah : "");
  const [ibu, setIbu] = useState(penduduk ? penduduk.ibu : "");

  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const [toast, setToast] = useState({
    show: false,
    message: "",
    success: true,
  });

  useEffect(() => {
    // if(!user){
    //   router.push('/login')
    // }
    fetchPenduduk(id);
  }, [user, router]);

  const namaChange = (e) => {
    let re = /^[A-Za-z\s]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setNama(e.target.value);
    }
  };
  const nikChange = (e) => {
    let re = /^[0-9]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setNik(e.target.value);
    }
  };
  const nokkChange = (e) => {
    let re = /^[0-9]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setNokk(e.target.value);
    }
  };
  const tanggalLahirChange = (e) => {
    const inputDate = e.target.value;
    const dateArray = inputDate.split("-");
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];
    const formattedDate = `${year}-${month}-${day}`;

    setTanggalLahir(formattedDate);
  };

  const genderChange = (selectedOption) => {
    setJenisKelamin(selectedOption.value);
    console.log(jenisKelamin)
  };
  const alamatChange = (e) => {
    setAlamat(e.target.value);
  };
  const rtChange = (selectedOption) => {
    setRt(selectedOption.value);
  };
  const pekerjaanChange = (selectedOption) => {
    setPekerjaan(selectedOption.value);
  };
  const statusChange = (selectedOption) => {
    setStatus(selectedOption.value);
  };
  const pendidikanChange = (selectedOption) => {
    setPendidikanTerakhir(selectedOption.value);
  };
  const agamaChange = (selectedOption) => {
    setAgama(selectedOption.value);
  };
  const ayahChange = (e) => {
    let re = /^[A-Za-z\s]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setAyah(e.target.value);
    }
  };
  const ibuChange = (e) => {
    let re = /^[A-Za-z\s]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setIbu(e.target.value);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("nama", nama);
    formData.append("nik", nik);
    formData.append("no_kk", nokk);
    formData.append("tanggal_lahir", tanggalLahir);
    formData.append("jenis_kelamin", jenisKelamin);
    formData.append("alamat", alamat);
    formData.append("rt", rt);
    formData.append("kelurahan", kelurahan);
    formData.append("pekerjaan", pekerjaan);
    formData.append("status_perkawinan", status);
    formData.append("pendidikan_terakhir", pendidikanTerakhir);
    formData.append("agama", agama);
    formData.append("ayah", ayah);
    formData.append("ibu", ibu);

    let url = "api/penduduk";
    if (id != "") {
      url = "api/penduduk/" + id;
      formData.append("_method", "PUT");
    }
    console.log(kelurahan);

    axios
      .post(url, formData)
      .then((response) => {
        fetchPenduduk();
        setNama("");
        setNik("");
        setNokk("");
        setTanggalLahir("");
        setJenisKelamin("");
        setKelurahan("");
        setAlamat("");
        setRt("");
        setPekerjaan("");
        setStatus("");
        setPendidikanTerakhir("");
        setAgama("");
        setAyah("");
        setIbu("");
        setToast({
          show: true,
          message: "Update Data Berhasil",
          success: true,
        });
        console.log("Toast should show for success");
        setTimeout(() => {
          setToast(false);
          router.push(`/detail_penduduk?id=${id}`);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error adding data:", error);
        setToast({ show: true, message: "Update Data Gagal", success: false });
        console.log("Toast Status:", toast);
      });
  };

  function fetchPenduduk(id) {
    let url = `/api/penduduk/${id}`;
    axios
      .get(url)
      .then((response) => {
        setPenduduk(response.data);
        setNik(response.data.nik);
        setNama(response.data.nama);
        setNokk(response.data.no_kk);
        setTanggalLahir(response.data.tanggal_lahir);
        setJenisKelamin(response.data.jenis_kelamin);
        setAlamat(response.data.alamat);
        setRt(response.data.rt);
        setKelurahan(response.data.kelurahan);
        setAgama(response.data.agama);
        setPekerjaan(response.data.pekerjaan);
        setStatus(response.data.status_perkawinan);
        setPendidikanTerakhir(response.data.pendidikan_terakhir);
        setAyah(response.data.ayah);
        setIbu(response.data.ibu);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <HeadCustom title={"Penambahan Data"} />
      <AdminLayout>
        <Card className="h-full">
          <Card.Header>Update Data Penduduk</Card.Header>
          <Card.Body>
            <div className="main-content p-1 flex-stretch justify-center flex-start bg-white text-black">
              <div className="mx-auto border border-gray-300 rounded-md p-8 ml-80">
                <form method="POST" onSubmit={submitForm}>
                  {/* NIK */}
                  <div className="mb-4">
                    <label
                      htmlFor="nik"
                      className="block text-gray-600 font-semibold"
                    >
                      NIK:
                    </label>
                    <input
                      type="text"
                      id="nik"
                      name="nik"
                      placeholder="NIK"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                      value={nik}
                      onChange={nikChange}
                      required
                      pattern="[0-9]{16}"
                      maxLength="16"
                      title="Masukkan 16 karakter"
                    />
                  </div>
                  {/* Nama Lengkap */}
                  <div className="mb-4">
                    <label
                      htmlFor="nama"
                      className="block text-gray-600 font-semibold"
                    >
                      Nama Lengkap:
                    </label>
                    <input
                      type="text"
                      id="nama"
                      name="nama"
                      placeholder="Nama Lengkap"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                      value={nama}
                      onChange={namaChange}
                      required
                    />
                  </div>

                  {/* No. KK */}
                  <div className="mb-4">
                    <label
                      htmlFor="noKk"
                      className="block text-gray-600 font-semibold"
                    >
                      No. KK:
                    </label>
                    <input
                      type="text"
                      id="noKk"
                      name="noKk"
                      placeholder="No. KK"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                      value={nokk}
                      onChange={nokkChange}
                      required
                      pattern="[0-9]{16}"
                      maxLength="16"
                      title="Masukkan 16 karakter"
                    />
                  </div>

                  <div className="mb-4 flex space-x-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="tanggalLahir"
                        className="block text-gray-600 font-semibold"
                      >
                        Tanggal Lahir:
                      </label>
                      <input
                        type="date"
                        id="tanggalLahir"
                        name="tanggalLahir"
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                        value={tanggalLahir}
                        onChange={tanggalLahirChange}
                        required
                      />
                    </div>

                    <div className="w-1/2">
                      <label
                        htmlFor="jenisKelamin"
                        className="block text-gray-600 font-semibold"
                      >
                        Jenis Kelamin:
                      </label>
                      <Select
                        id="jenisKelamin"
                        name="jenisKelamin"
                        placeholder="Pilih Jenis Kelamin"
                        options={genderOptions}
                        value={
                          penduduk
                            ? genderOptions.find(
                                (option) => option.value === jenisKelamin
                              )
                            : null
                        }
                        onChange={genderChange}
                        required
                      />
                    </div>
                  </div>
                  {/* Alamat */}
                  <div className="mb-4">
                    <label
                      htmlFor="alamat"
                      className="block text-gray-600 font-semibold"
                    >
                      Alamat:
                    </label>
                    <input
                      type="text"
                      id="alamat"
                      name="alamat"
                      placeholder="Alamat"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                      value={alamat}
                      onChange={alamatChange}
                      required
                    />
                  </div>

                  {/* RT dan Kelurahan */}
                  <div className="mb-4 flex space-x-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="rt"
                        className="block text-gray-600 font-semibold"
                      >
                        Pilih RT:
                      </label>
                      <Select
                        id="rt"
                        name="rt"
                        placeholder="Pilih RT"
                        options={rtOptions}
                        value={
                          penduduk
                            ? rtOptions.find((option) => option.value === rt)
                            : null
                        }
                        onChange={rtChange}
                        required
                      />
                    </div>

                    <div className="w-1/2">
                      <label
                        htmlFor="kelurahan"
                        className="block text-gray-600 font-semibold"
                      >
                        Pilih Kelurahan:
                      </label>
                      <input
                        id="kelurahan"
                        name="kelurahan"
                        className="w-full px-3 py-2 border rounded-md border-gray-300"
                        placeholder="Kelurahan"
                        value={kelurahan}
                        disabled
                        required
                      />
                    </div>
                  </div>

                  {/* Agama */}
                  <div className="mb-4">
                    <label
                      htmlFor="agama"
                      className="block text-gray-600 font-semibold"
                    >
                      Agama:
                    </label>
                    <Select
                      id="agama"
                      name="agama"
                      options={religionOptions}
                      placeholder="Pilih Agama"
                      value={
                        penduduk
                          ? religionOptions.find(
                              (option) => option.value === agama
                            )
                          : null
                      }
                      onChange={agamaChange}
                      required
                    />
                  </div>

                  {/* Pekerjaan */}
                  <div className="mb-4">
                    <label
                      htmlFor="pekerjaan"
                      className="block text-gray-600 font-semibold"
                    >
                      Pekerjaan:
                    </label>
                    <Select
                      id="pekerjaan"
                      name="pekerjaan"
                      options={occupationOptions}
                      placeholder="Pilih Pekerjaan"
                      value={
                        penduduk
                          ? occupationOptions.find(
                              (option) => option.value === pekerjaan
                            )
                          : null
                      }
                      onChange={pekerjaanChange}
                      required
                    />
                  </div>

                  {/* Status Pernikahan */}
                  <div className="mb-4">
                    <label
                      htmlFor="statusPernikahan"
                      className="block text-gray-600 font-semibold"
                    >
                      Status Pernikahan:
                    </label>
                    <Select
                      id="statusPernikahan"
                      name="statusPernikahan"
                      options={maritalStatusOptions}
                      placeholder="Pilih Status Pernikahan"
                      value={
                        penduduk
                          ? maritalStatusOptions.find(
                              (option) => option.value === status
                            )
                          : null
                      }
                      onChange={statusChange}
                      required
                    />
                  </div>

                  {/* Pendidikan Terakhir */}
                  <div className="mb-4">
                    <label
                      htmlFor="pendidikanTerakhir"
                      className="block text-gray-600 font-semibold"
                    >
                      Pendidikan Terakhir:
                    </label>
                    <Select
                      id="pendidikanTerakhir"
                      name="pendidikanTerakhir"
                      options={educationOptions}
                      placeholder="Pilih Pendidikan Terakhir"
                      value={
                        penduduk
                          ? educationOptions.find(
                              (option) => option.value === pendidikanTerakhir
                            )
                          : null
                      }
                      onChange={pendidikanChange}
                      required
                    />
                  </div>

                  {/* Nama Ayah Kandung */}
                  <div className="mb-4">
                    <label
                      htmlFor="namaAyahKandung"
                      className="block text-gray-600 font-semibold"
                    >
                      Nama Ayah Kandung:
                    </label>
                    <input
                      type="text"
                      id="namaAyahKandung"
                      name="namaAyahKandung"
                      placeholder="Nama Ayah Kandung"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                      value={ayah}
                      onChange={ayahChange}
                      required
                    />
                  </div>

                  {/* Nama Ibu Kandung */}
                  <div className="mb-4">
                    <label
                      htmlFor="namaIbuKandung"
                      className="block text-gray-600 font-semibold"
                    >
                      Nama Ibu Kandung:
                    </label>
                    <input
                      type="text"
                      id="namaIbuKandung"
                      name="namaIbuKandung"
                      placeholder="Nama Ibu Kandung"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                      value={ibu}
                      onChange={ibuChange}
                      required
                    />
                  </div>

                  {/* Tombol Simpan */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {toast.show && (
              <Toast message={toast.message} success={toast.success} />
            )}
          </Card.Body>
        </Card>
      </AdminLayout>
    </>
  );
};

export default UpdatePenduduk;
