import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    try {
      const response = await fetch('http://localhost:3000/login', requestOptions);

      if (response.ok) {
        const data = await response.json();
        const token = data.response.token;

        console.log('Login success!');
        sessionStorage.setItem('token', token);
        requestOptions.headers['Authorization'] = `Bearer ${token}`;

        window.location.href = '/diajukan?text=' + token;
      } else {
        alert('Login failed');
        console.log(await response.json());
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" id="anura">
            <h1 className="h1 my-5 display-5 fw-bold ls-tight">
              <span className="span">ANURA</span>
            </h1>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                <form onSubmit={handleSubmit}>
                  <div>
                    <h1 className="h1 my-5 display-5 fw-bold ls-tight text-center pb-5" id="heading1">
                      LOGIN REACT
                    </h1>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  <div className="justify-content-center">
                    <button type="submit" className="btn btn-primary btn-block mb-4">
                      LOGIN
                    </button>
                  </div>

                  <div className="text-center">
                    <p>
                      Don't have an account? <a href="/register">Register</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
