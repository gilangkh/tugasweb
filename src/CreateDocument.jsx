import React from 'react';

const CreateDocument = () => {
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const token = sessionStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const docForm = document.getElementById("docForm");
    const nama = document.getElementById("names");
    const fileInput = document.getElementById("filename");
    const description = document.getElementById("description");

    const formdata = new FormData();
    formdata.append("name", nama.value);
    formdata.append("filename", fileInput.files[0]);
    formdata.append("description", description.value);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    try {
      const response = await fetch("http://localhost:3000/document/create", requestOptions);
      const result = await response.json();
      console.log(result);
      console.log("ini pesan" + result.message);
      window.location.href = "/dokumen/index";
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className="container emp-profile">
      <div className="row">
        <div className="col-md-12">
          <div className="profile-head">
            <h2 id="heading">
              CREATE Dokumen
            </h2>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <hr />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <form id="docForm" encType="multipart/form-data">
          <div className="col-md-12">
            <div className="tab-content profile-tab" id="myTabContent">
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              </div>
              <div className="row my-3">
                <div className="col-md-6">
                  <label htmlFor="names">Nama Document</label>
                  <input className="form-control" type="text" name="names" id="names" value="" />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-md-6">
                  <label htmlFor="filename">Filename</label>
                  <div className="d-flex justify-content-between">
                    <input className="form-control col-md-12" type="file" name="filename" id="filename" value="" />
                  </div>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-md-6">
                  <label htmlFor="description">Description</label>
                  <input className="form-control" type="text" name="description" id="description" value="" />
                </div>
              </div>
              <div>
                <button type="submit" className="btn btn-danger">Save</button>
                <a href="/dokumen/index" className="btn btn-secondary">Kembali</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDocument;
