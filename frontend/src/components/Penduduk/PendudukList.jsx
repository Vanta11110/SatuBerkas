import React, { useEffect, useState } from "react";
import { Form, Table, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight, faSlidersH } from "@fortawesome/free-solid-svg-icons";
import axios from "@lib/axios";
import Link from "next/link";
import Modal from '@components/Modal/Modal'
import ToastComp from "@components/Toast/Toast";

const PendudukList = (props) => {
  const [penduduk, setPenduduk] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPendudukId, setSelectedPendudukId] = useState(null);
  const [selectedRt, setSelectedRt] = useState("");
  const [originalPenduduk, setOriginalPenduduk] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginate, setPaginate] = useState(100);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState(1);
  const [total, setTotal] = useState("");
  const [lastPages, setLastPages] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    success: true,
  });
  const [debouncedFilterInput, setDebouncedFilterInput] = useState(filterInput);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedFilterInput(filterInput);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [filterInput]);

  useEffect(() => {
    fetchPenduduk();
  }, [selectedRt, paginate, currentPage, debouncedFilterInput]);
  
  function fetchPenduduk() {
    let url = `/api/penduduk`;
    const queryParams = {page : currentPage,};
    if (selectedRt) { 
      queryParams.RT = selectedRt;
    }
    if (paginate) { 
      queryParams.Paginate = paginate;
    }
    if (debouncedFilterInput) {
      queryParams.filterInput = debouncedFilterInput;
    }
    queryParams.page = currentPage;
    
    axios
      .get(url , { params: queryParams })
      .then((response) => {
        setPenduduk(response.data.data);
        setOriginalPenduduk(response.data.data);
        setFrom(response.data.from)
        setTo(response.data.to)
        setTotal(response.data.total)
        setLastPages(response.data.last_page)
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function deletePenduduk(id) {
    let params = { _method: "delete" };

    axios
      .post("/api/penduduk/" + id, params)
      .then((response) => {
        fetchPenduduk();
        console.log("delete berhasil");
        setToast({
          show: true,
          message: "Data Berhasil di Hapus ",
          success: true,
        });
        console.log("Toast should show for success");
        setTimeout(() => {
          setToast(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error delete data:", error);
        setToast({
          show: true,
          message: "Data Gagal di Hapus",
          success: false,
        });
        console.log("Toast Status:", toast);
        setTimeout(() => {
          setToast(false);
        }, 3000);
      });
  }
  const toggleDropdown = (pendudukId) => {
    if (activeDropdown === pendudukId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(pendudukId);
    }
  };
  const openModalHapus = (pendudukId) => {
    setSelectedPendudukId(pendudukId);
    setModalVisible(true);
  };
  const closeModalHapus = () => {
    setSelectedPendudukId(null);
    setModalVisible(false);
  };
  const confirmDelete = () => {
    if (selectedPendudukId) {
      deletePenduduk(selectedPendudukId);
      closeModalHapus();
    }
  };

  function handleFilterChange(event) {
    const { name, value } = event.target;
    if (name === "RT") {
      setSelectedRt(value);
    }
    if (name === "Paginate") {
      setPaginate(value);
    }
    if (name === "filterInput") {
      setFilterInput(value)
      setCurrentPage(1)
    }
  }
  function handleClearFilter() {
    setSelectedRt("");
    setPaginate(100);
    fetchPenduduk();
  }

  return (
    <>
      <Modal
        isOpen={modalVisible}
        message="Hapus Data Ini?"
        onClose={closeModalHapus}
        onConfirm={confirmDelete}
        confirmText="Hapus"
      />
      {toast.show && (
        <ToastComp message={toast.message} success={toast.success} />
      )}
      <Form className="flex text-sm gap-1 mb-2 items-center">
        <div className="font-semibold">Filter : </div>
        <Form.Group className="col-md-3 w-auto">
          <Form.Control
            as="select"
            name="RT"
            value={selectedRt}
            onChange={handleFilterChange}
            className="text-sm"
          >
            <option value="">RT</option>
            <option value="01">RT 01</option>
            <option value="02">RT 02</option>
            <option value="03">RT 03</option>
            <option value="04">RT 04</option>
            <option value="05">RT 05</option>
            <option value="06">RT 06</option>
            <option value="07">RT 07</option>
            <option value="08">RT 08</option>
            <option value="09">RT 09</option>
            <option value="10">RT 10</option>
            <option value="11">RT 11</option>
            <option value="12">RT 12</option>
            <option value="13">RT 13</option>
            <option value="14">RT 14</option>
            <option value="15">RT 15</option>
            <option value="16">RT 16</option>
            <option value="17">RT 17</option>
            <option value="18">RT 18</option>
            <option value="19">RT 19</option>
            <option value="20">RT 20</option>
            <option value="21">RT 21</option>
            <option value="22">RT 22</option>
            <option value="23">RT 23</option>
            <option value="24">RT 24</option>
            <option value="25">RT 25</option>
            <option value="26">RT 26</option>
            <option value="27">RT 27</option>
            <option value="28">RT 28</option>
            <option value="29">RT 29</option>
            <option value="30">RT 30</option>
            <option value="31">RT 31</option>
            <option value="32">RT 32</option>
            <option value="33">RT 33</option>
            <option value="34">RT 34</option>
            <option value="35">RT 35</option>
            <option value="36">RT 36</option>
            <option value="37">RT 37</option>
            <option value="38">RT 38</option>
            <option value="39">RT 39</option>
            <option value="40">RT 40</option>
            <option value="41">RT 41</option>
            <option value="42">RT 42</option>
            <option value="43">RT 43</option>
            <option value="44">RT 44</option>
            <option value="45">RT 45</option>
            <option value="46">RT 46</option>
            <option value="47">RT 47</option>
            <option value="48">RT 48</option>
            <option value="49">RT 49</option>
            <option value="50">RT 50</option>
            <option value="51">RT 51</option>
            <option value="52">RT 52</option>
            <option value="53">RT 53</option>
            <option value="54">RT 54</option>
            <option value="55">RT 55</option>
            <option value="56">RT 56</option>
            <option value="57">RT 57</option>
            <option value="58">RT 58</option>
            <option value="59">RT 59</option>
          </Form.Control>
        </Form.Group>
        <Button
          variant="secondary"
          onClick={handleClearFilter}
          className="text-sm bg-blue-500 "
        >
          Reset Filter
        </Button>
        <div className="font-semibold ml-5">Cari : </div>
        <div className="h-10">
          <input
            type="text"
            name="filterInput"
            placeholder="Cari penduduk..."
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500 mb-5 text-black"
            value={filterInput}
            onChange={handleFilterChange}
          />
        </div>
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
      <Table responsive bordered hover>
        <thead className="bg-light text-center align-middle">
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>NIK</th>
            <th>No KK</th>
            <th>RT</th>
            <th>Tanggal Lahir</th>
            <th>Pekerjaan</th>
            <th aria-label="Action" />
          </tr>
        </thead>
        <tbody className="align-middle">
          {penduduk.map((person, index) => (
            <tr key={person.id}>
              <td className="text-center">{index + 1}</td>
              <td className="text-start">{person.nama}</td>
              <td className="text-center">{person.nik}</td>
              <td className="text-center">{person.no_kk}</td>
              <td className="text-center">{person.rt}</td>
              <td className="text-center">{person.tanggal_lahir}</td>
              <td className="text-center">{person.pekerjaan}</td>
              <td className="h-full border border-gray-300 px-3 align-middle">
                <button
                  id={`dropdownButton-${person.id}`}
                  data-dropdown-toggle={`dropdown-${person.id}`}
                  className=" hover:text-amber-500"
                  type="button"
                  onClick={() => toggleDropdown(person.id)}
                >
                  <FontAwesomeIcon fixedWidth icon={faSlidersH} />
                </button>
              </td>
              <div
                id={`dropdown-${person.id}`}
                className={`z-10 right-1 ${
                  activeDropdown === person.id ? "block" : "hidden"
                }  absolute mt-10 rounded-lg shadow w-auto border border-solid border-gray-800`}
              >
                <ul
                  className="text-sm bg-white text-gray-700"
                  aria-labelledby={`dropdownButton-${person.id}`}
                >
                  <li>
                    <Link
                      href={`/update_penduduk?id=${person.id}`}
                      className="block text-start pr-3 pl-2 py-2 rounded-md hover:bg-gray-200 hover:text-gray-700"
                    >
                      Update Data
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={() => openModalHapus(person.id)}
                      className="block text-start pl-2 py-2 rounded-md hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
                    >
                      Hapus Data
                    </a>
                  </li>
                  <li>
                    <Link
                      href={`/upload_surat?id=${person.id}`}
                      className="block pl-2 text-start py-2 rounded-md hover:bg-gray-200 hover:text-gray-700"
                    >
                      Upload File
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/detail_penduduk?id=${person.id}`}
                      className="block text-start pl-2 py-2 rounded-md hover:bg-gray-200 hover:text-gray-700"
                    >
                      Detail
                    </Link>
                  </li>
                </ul>
              </div>
            </tr>
          ))}
        </tbody>
      </Table>
      {total > paginate && (
        <div className="flex flex-col mt-3 mb-1 items-center">
          <span className="text-sm text-gray-700">
            Menampilkan{" "}
            <span className="font-semibold text-gray-900">{from}</span> sampai{" "}
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
    </>
  );
};

export default PendudukList;
