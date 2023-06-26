import React from 'react';

function Header() {
  return (
    <div className="navbar">
      <div>
        <h1 className="pala">Anura Sign</h1>
      </div>
      <form id="logoutForm">
        <div>
          <button className="btn btn-danger log123" type="submit">Logout</button>
        </div>
      </form>
    </div>
  );
}

function Dashboard() {
  return (
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
  );
}

function Footer() {
  return (
    <footer>
      <script
        src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
        crossorigin="anonymous"
      />
      <script
        src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"
        crossorigin="anonymous"
      />
      <script
        src="https://unpkg.com/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        crossorigin="anonymous"
      />
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
      <script>
        {`
          document.getElementById("logoutForm").addEventListener("submit", function (event) {
            event.preventDefault(); // Mencegah pengiriman formulir secara default

            // Hapus token dari sessionStorage
            sessionStorage.removeItem('token');

            // Arahkan pengguna kembali ke halaman login dengan pesan logout berhasil
            window.location.href = "/login?message=Logout berhasil";
          });
        `}
      </script>
    </footer>
  );
}

export default function DefaultLayout({ title, body }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8" />
        <title>{title}</title>
        <link rel="stylesheet" href="/public/css/styles.css" />
        <link rel="stylesheet" href="/public/css/style.css" />
        <link rel="stylesheet" href="/public/css/document.css" />
        <link rel="stylesheet" href="/public/css/sendsign.css" />
        <link rel="stylesheet" href="/public/css/sign.css" />
        <link rel="stylesheet" href="/public/css/t-view.css" />
        <link rel="stylesheet" href="/public/css/template.css" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
          crossorigin="anonymous"
        />
      </head>
      <body className="body">
        <Header />
        <div className="display">
          <Dashboard />
          <div className="content">{body}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
