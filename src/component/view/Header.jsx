import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="navbar" id="">
        <div>
          <h1 className="pala">Anura Sign</h1>
        </div>
        <form id="logoutForm">
          <div>
            <button className="btn btn-danger log123" type="submit">Logout</button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
