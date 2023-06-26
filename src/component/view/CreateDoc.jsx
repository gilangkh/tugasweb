import React, { useEffect } from 'react';

const CreateDocument = () => {
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = sessionStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const docForm = new FormData(event.target);
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: docForm,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/document/create", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        console.log("ini pesan" + result.message);
        window.location.href = "/dokumen/index";
      })
      .catch(error => console.log('error', error));
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
        <form id="docForm" encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="col-md-12">
            <div className="tab-content profile-tab" id="myTabContent">
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              </div>
              <div className="row my-3">
                <div className="col-md-6">
                  <label htmlFor="names">Nama Document</label>
                  <input className="form-control" type="text" name="names" id="names" defaultValue="" />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-md-6">
                  <label htmlFor="filename">Filename</label>
                  <div className="d-flex justify-content-between">
                    <input className="form-control col-md-12" type="file" name="filename" id="filename" />
                  </div>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-md-6">
                  <label htmlFor="description">Description</label>
                  <input className="form-control" type="text" name="description" id="description" defaultValue="" />
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
