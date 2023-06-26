import React from 'react';
import Header from './Header';
import Footer from './Footer';

const App = () => {
  return (
    <div>
      <Header />

      <div className="display">
        <div className="dashboard" id="default">
          <a href="/profile">
            <img className="img margin-items" src="/public/images/Profile-PNG-File.png" alt="" />
          </a>
          <div className="img" />
          <hr />
          <div className="margin-items">
            <a className="label" href="/mengajukan">Mengajukan</a>
          </div>
          <hr />
          <div className="margin-items">
            <a className="label" href="/diajukan">Diajukan</a>
          </div>
          <hr />
          <div className="margin-items">
            <a className="label" href="/dokumen/index">DOC</a>
          </div>
          <hr />
        </div>
        <div className="content">
          {/* Isi konten aplikasi */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
