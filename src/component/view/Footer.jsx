import React from 'react';

const Footer = () => {
  const handleLogout = (event) => {
    event.preventDefault();
    sessionStorage.removeItem('token');
    window.location.href = '/login?message=Logout berhasil';
  };

  return (
    <footer>
      <script
        src="https://unpkg.com/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        crossOrigin="anonymous"
      ></script>

      <script>
        {`
          document.getElementById("logoutForm").addEventListener("submit", function (event) {
            event.preventDefault();
            sessionStorage.removeItem('token');
            window.location.href = "/login?message=Logout berhasil";
          });
        `}
      </script>

      <form id="logoutForm" onSubmit={handleLogout}>
        <button className="btn btn-danger log123" type="submit">Logout</button>
      </form>
    </footer>
  );
};

export default Footer;
