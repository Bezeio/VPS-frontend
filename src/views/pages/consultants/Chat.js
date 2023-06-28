const Chat = () => {
  return (
    <>
      <div className="main-content position-relative max-height-vh-100 h-100">
        <nav className="navbar navbar-main navbar-expand-lg bg-transparent shadow-none position-absolute px-4 w-100 z-index-2 mt-n11">
          <div className="container-fluid py-1">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 ps-2 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm">
                  <a className="text-white opacity-5" href="">
                    Pages
                  </a>
                </li>
                <li
                  className="breadcrumb-item text-sm text-white active"
                  aria-current="page"
                >
                  Chat
                </li>
              </ol>
              <h3 className="text-white font-weight-bolder ml-2">Chat</h3>
            </nav>
            <div className="sidenav-toggler sidenav-toggler-inner d-xl-block d-none">
              <a href="" className="nav-link text-white p-0">
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line bg-white"></i>
                  <i className="sidenav-toggler-line bg-white"></i>
                  <i className="sidenav-toggler-line bg-white"></i>
                </div>
              </a>
            </div>
            <div
              className="collapse navbar-collapse me-md-0 me-sm-4 mt-sm-0 mt-2"
              id="navbar"
            >
              <div className="ml-md-auto pe-md-3 d-flex align-items-center">
                <div className="input-group">
                  <span className="input-group-text text-body">
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type here..."
                  />
                </div>
              </div>
              <ul className="navbar-nav justify-content-end">
                <li className="nav-item d-flex align-items-center">
                  <a
                    href="../../pages/authentication/signin/illustration.html"
                    className="nav-link text-white font-weight-bold px-0"
                    target="_blank"
                  >
                    <i className="fa fa-user me-sm-1"></i>
                    <span className="d-sm-inline d-none">Sign In</span>
                  </a>
                </li>
                <li className="nav-item d-xl-none ps-3 pe-0 d-flex align-items-center">
                  <a
                    href=""
                    className="nav-link text-body p-0"
                    id="iconNavbarSidenav"
                  >
                    <div className="sidenav-toggler-inner">
                      <i className="sidenav-toggler-line bg-white"></i>
                      <i className="sidenav-toggler-line bg-white"></i>
                      <i className="sidenav-toggler-line bg-white"></i>
                    </div>
                  </a>
                </li>
                <li className="nav-item px-3 d-flex align-items-center">
                  <a href="" className="nav-link text-white p-0">
                    <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                  </a>
                </li>
                <li className="nav-item dropdown pe-2 d-flex align-items-center">
                  <a
                    href=""
                    className="nav-link text-white p-0"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-bell cursor-pointer"></i>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end px-2 py-3 ml-n4"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li className="mb-2">
                      <a className="dropdown-item border-radius-md" href="">
                        <div className="d-flex py-1">
                          <div className="my-auto">
                            <img
                              src="../../assets/img/team-2.jpg"
                              className="avatar avatar-sm me-3"
                              alt="user image"
                            />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h3 className="text-sm font-weight-normal mb-1">
                              <span className="font-weight-bold">New message</span>{" "}
                              from Laur
                            </h3>
                            <p className="text-xs text-secondary mb-0">
                              <i className="fa fa-clock me-1"></i>
                              13 minutes ago
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="mb-2">
                      <a className="dropdown-item border-radius-md" href="">
                        <div className="d-flex py-1">
                          <div className="my-auto">
                            <img
                              src="../../assets/img/small-logos/logo-spotify.svg"
                              className="avatar avatar-sm bg-gradient-dark me-3"
                              alt="logo spotify"
                            />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h3 className="text-sm font-weight-normal mb-1">
                              <span className="font-weight-bold">New album</span> by
                              Travis Scott
                            </h3>
                            <p className="text-xs text-secondary mb-0">
                              <i className="fa fa-clock me-1"></i>1 day
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item border-radius-md" href="">
                        <div className="d-flex py-1">
                          <div className="avatar avatar-sm bg-gradient-secondary me-3 my-auto">
                            <svg
                              width="12px"
                              height="12px"
                              viewBox="0 0 43 36"
                              version="1.1"
                            >
                              <title>credit-card</title>
                              <g
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd"
                              >
                                <g
                                  id="Rounded-Icons"
                                  transform="translate(-2169.000000, -745.000000)"
                                  fill="#FFFFFF"
                                  fill-rule="nonzero"
                                >
                                  <g transform="translate(1716.000000, 291.000000)">
                                    <g transform="translate(453.000000, 454.000000)">
                                      <path
                                        className="color-background"
                                        d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                        opacity="0.593633743"
                                      ></path>
                                      <path
                                        className="color-background"
                                        d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"
                                      ></path>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h3 className="text-sm font-weight-normal mb-1">
                              Payment successfully completed
                            </h3>
                            <p className="text-xs text-secondary mb-0">
                              <i className="fa fa-clock me-1"></i>2 days
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="card shadow-lg mx-4 card-profile-bottom">
          <div className="card-body p-3">
            <div className="row gx-4">
              <div className="col-auto">
                <div className="avatar avatar-xl position-relative">
                  <img
                    src="../../assets/img/team-1.jpg"
                    alt="profile_image"
                    className="w-100 border-radius-lg shadow-sm"
                  />
                </div>
              </div>
              <div className="col-auto my-auto">
                <div className="h-100">
                  <h5 className="mb-1">Sayo Kravits</h5>
                  <p className="mb-0 font-weight-bold text-sm">Public Relations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-lg-4 col-md-5 col-12">
              <div className="card blur shadow-blur max-height-vh-70 overflow-auto overflow-x-hidden mb-5 mb-lg-0">
                <div className="card-header p-3">
                  <h3>Friends</h3>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Search Contact"
                    aria-label="Email"
                  />
                </div>
                <div className="card-body p-2">
                  <a
                    href=""
                    className="d-block p-2 border-radius-lg bg-gradient-primary"
                  >
                    <div className="d-flex p-2">
                      <img
                        alt="Image"
                        src="../../assets/img/team-2.jpg"
                        className="avatar shadow"
                      />
                      <div className="ml-3">
                        <div className="justify-content-between align-items-center">
                          <h3 className="text-white mb-0">
                            Charlie Watson
                            <span className="badge badge-success"></span>
                          </h3>
                          <p className="text-white mb-0 text-sm">Typing...</p>
                        </div>
                      </div>
                    </div>
                  </a>
                  <a href="" className="d-block p-2">
                    <div className="d-flex p-2">
                      <img
                        alt="Image"
                        src="../../assets/img/team-1.jpg"
                        className="avatar shadow"
                      />
                      <div className="ml-3">
                        <h3 className="mb-0">Jane Doe</h3>
                        <p className="text-muted text-xs mb-2">1 hour ago</p>
                        <span className="text-muted text-sm col-11 p-0 text-truncate d-block">
                          Computer users and programmers
                        </span>
                      </div>
                    </div>
                  </a>
                  <a href="" className="d-block p-2">
                    <div className="d-flex p-2">
                      <img
                        alt="Image"
                        src="../../assets/img/team-3.jpg"
                        className="avatar shadow"
                      />
                      <div className="ml-3">
                        <h3 className="mb-0">Mila Skylar</h3>
                        <p className="text-muted text-xs mb-2">24 min ago</p>
                        <span className="text-muted text-sm col-11 p-0 text-truncate d-block">
                          You can subscribe to receive weekly...
                        </span>
                      </div>
                    </div>
                  </a>
                  <a href="" className="d-block p-2">
                    <div className="d-flex p-2">
                      <img
                        alt="Image"
                        src="../../assets/img/team-5.jpg"
                        className="avatar shadow"
                      />
                      <div className="ml-3">
                        <h3 className="mb-0">Sofia Scarlett</h3>
                        <p className="text-muted text-xs mb-2">7 hours ago</p>
                        <span className="text-muted text-sm col-11 p-0 text-truncate d-block">
                          It’s an effective resource regardless..
                        </span>
                      </div>
                    </div>
                  </a>
                  <a href="" className="d-block p-2">
                    <div className="d-flex p-2">
                      <img
                        alt="Image"
                        src="../../assets/img/team-4.jpg"
                        className="avatar shadow"
                      />
                      <div className="ml-3">
                        <div className="justify-content-between align-items-center">
                          <h3 className="mb-0">Tom Klein</h3>
                          <p className="text-muted text-xs mb-2">1 day ago</p>
                        </div>
                        <span className="text-muted text-sm col-11 p-0 text-truncate d-block">
                          Be sure to check it out if your dev pro...
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-7 col-12">
              <div className="card blur shadow-blur max-height-vh-70">
                <div className="card-header shadow-lg">
                  <div className="row">
                    <div className="col-lg-10 col-8">
                      <div className="d-flex align-items-center">
                        <img
                          alt="Image"
                          src="../../assets/img/team-2.jpg"
                          className="avatar"
                        />
                        <div className="ml-3">
                          <h3 className="mb-0 d-block">Charlie Watson</h3>
                          <span className="text-sm text-dark opacity-8">
                            last seen today at 1:53am
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-2 my-auto pe-0">
                      <button
                        className="btn btn-icon-only shadow-none text-dark mb-0 me-3 me-sm-0"
                        type="button"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title=""
                        data-bs-original-title="Video call"
                      >
                        <i className="ni ni-camera-compact"></i>
                      </button>
                    </div>
                    <div className="col-lg-1 col-2 my-auto ps-0">
                      <div className="dropdown">
                        <button
                          className="btn btn-icon-only shadow-none text-dark mb-0"
                          type="button"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ni ni-settings"></i>
                        </button>
                        <ul
                          className="dropdown-menu dropdown-menu-end me-sm-n2 p-2"
                          aria-labelledby="chatmsg"
                        >
                          <li>
                            <a className="dropdown-item border-radius-md" href="">
                              Profile
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item border-radius-md" href="">
                              Mute conversation
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item border-radius-md" href="">
                              Block
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item border-radius-md" href="">
                              Clear chat
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item border-radius-md text-danger"
                              href=""
                            >
                              Delete chat
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="card-body overflow-auto overflow-x-hidden"
                  style={{ height: "500px" }}
                >
                  <div className="row justify-content-start mb-4">
                    <div className="col-auto">
                      <div className="card ">
                        <div className="card-body py-2 px-3">
                          <p className="mb-1">
                            It contains a lot of good lessons about effective
                            practices
                          </p>
                          <div className="d-flex align-items-center text-sm opacity-6">
                            <i className="ni ni-check-bold text-sm me-1"></i>
                            <small>3:14am</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-end text-right mb-4">
                    <div className="col-auto">
                      <div className="card bg-gray-200">
                        <div className="card-body py-2 px-3">
                          <p className="mb-1">
                            Can it generate daily design links that include
                            essays and data visualizations ?<br />
                          </p>
                          <div className="d-flex align-items-center justify-content-end text-sm opacity-6">
                            <i className="ni ni-check-bold text-sm me-1"></i>
                            <small>4:42pm</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12 text-center">
                      <span className="badge text-dark">Wed, 3:27pm</span>
                    </div>
                  </div>
                  <div className="row justify-content-start mb-4">
                    <div className="col-auto">
                      <div className="card ">
                        <div className="card-body py-2 px-3">
                          <p className="mb-1">
                            Yeah! Responsive Design is geared towards those
                            trying to build web apps
                          </p>
                          <div className="d-flex align-items-center text-sm opacity-6">
                            <i className="ni ni-check-bold text-sm me-1"></i>
                            <small>4:31pm</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-end text-right mb-4">
                    <div className="col-auto">
                      <div className="card bg-gray-200">
                        <div className="card-body py-2 px-3">
                          <p className="mb-1">Excellent, I want it now !</p>
                          <div className="d-flex align-items-center justify-content-end text-sm opacity-6">
                            <i className="ni ni-check-bold text-sm me-1"></i>
                            <small>4:42pm</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-start mb-4">
                    <div className="col-auto">
                      <div className="card ">
                        <div className="card-body py-2 px-3">
                          <p className="mb-1">
                            You can easily get it; The content here is all free
                          </p>
                          <div className="d-flex align-items-center text-sm opacity-6">
                            <i className="ni ni-check-bold text-sm me-1"></i>
                            <small>4:42pm</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-end text-right mb-4">
                    <div className="col-auto">
                      <div className="card bg-gray-200">
                        <div className="card-body py-2 px-3">
                          <p className="mb-1">
                            Awesome, blog is important source material for
                            anyone who creates apps? <br />
                            Beacuse these blogs offer a lot of information about
                            website development.
                          </p>
                          <div className="d-flex align-items-center justify-content-end text-sm opacity-6">
                            <i className="ni ni-check-bold text-sm me-1"></i>
                            <small>4:42pm</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-start mb-4">
                    <div className="col-5">
                      <div className="card ">
                        <div className="card-body p-2">
                          <div className="col-12 p-0">
                            <img
                              src="https://images.unsplash.com/photo-1602142946018-34606aa83259?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1762&q=80"
                              alt="Rounded image"
                              className="img-fluid mb-2 border-radius-lg"
                            />
                          </div>
                          <div className="d-flex align-items-center text-sm opacity-6">
                            <i className="ni ni-check-bold text-sm me-1"></i>
                            <small>4:47pm</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-end text-right mb-4">
                    <div className="col-auto">
                      <div className="card bg-gray-200">
                        <div className="card-body py-2 px-3">
                          <p className="mb-0">
                            At the end of the day … the native dev apps is where
                            users are
                          </p>
                          <div className="d-flex align-items-center justify-content-end text-sm opacity-6">
                            <i className="ni ni-check-bold text-sm me-1"></i>
                            <small>4:42pm</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-start">
                    <div className="col-auto">
                      <div className="card ">
                        <div className="card-body py-2 px-3">
                          <p className="mb-0">Charlie is Typing...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer d-block">
                  <form className="align-items-center">
                    <div className="d-flex">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Type here"
                          aria-label="Message example input"
                        />
                      </div>
                      <button className="btn bg-gradient-primary mb-0 ml-2">
                        <i className="ni ni-send text-white"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Chat;
