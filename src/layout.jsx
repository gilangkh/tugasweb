import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ title, children }) => {
  const handleLogout = () => {
    // Menghapus token dari sessionStorage
    sessionStorage.removeItem('token');
    // Arahkan pengguna kembali ke halaman login dengan pesan logout berhasil
    window.location.href = "/login?message=Logout berhasil";
  };

  return (
    <div>
      <nav className="navbar">
        <div>
          <h1 className="pala">Anura Sign</h1>
        </div>
        <form id="logoutForm" onSubmit={handleLogout}>
          <div>
            <button className="btn btn-danger log123" type="submit">Logout</button>
          </div>
        </form>
      </nav>

      <div className="display">
        <div className="dashboard" id="default">
          <Link to="/profile">
            <img className="img margin-items" src="/public/images/Profile-PNG-File.png" alt="" />
          </Link>
          <div className="img"></div>
          <hr />
          <div className="margin-items">
            <Link className="label" to="/mengajukan">Mengajukan</Link>
          </div>
          <hr />
          <div className="margin-items">
            <Link className="label" to="/diajukan">Diajukan</Link>
          </div>
          <hr />
          <div className="margin-items">
            <Link className="label" to="/dokumen/index">DOC</Link>
          </div>
          <hr />
        </div>
        <div className="content">{children}</div>
      </div>

      <script src="https://unpkg.com/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

      <script>
        {`
        function handleScriptLoad() {
          const token = sessionStorage.getItem("token");

          if (!token) {
            window.location.href = "/login";
          } else {
            try {
              const tokenParts = token.split(".");
              if (tokenParts.length !== 3) {
                throw new Error("Invalid token format");
              }
              const encodedPayload = tokenParts[1];
              const decodedPayload = atob(encodedPayload);
              const payload = JSON.parse(decodedPayload);
              console.log(payload);

              const currentTimestamp = Math.floor(Date.now() / 1000);

              if (payload.exp < currentTimestamp) {
                alert("Sesi Anda Telah Berakhir");
                window.location.href = "/login";
              }
            } catch (error) {
              console.error("Failed to decode token:", error);
              window.location.href = "/register?message=" + encodeURIComponent(error);
            }
          }
        }

        function handleScriptError() {
          console.error("Failed to load the jwt-decode library.");
          // Handle the error accordingly (e.g., redirect to an error page)
        }

        handleScriptLoad();
        `}
      </script>

    </div>
  );
};

export default Layout;
