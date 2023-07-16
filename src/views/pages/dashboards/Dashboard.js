import React, { useEffect, useRef, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  // Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  // DropdownMenu,
  // DropdownItem,
  // DropdownToggle,
  // UncontrolledDropdown,
  // Form,
  // Input,
  ListGroupItem,
  ListGroup,
  Media,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  PaginationItem,
  PaginationLink,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownToggle,
  Badge,
  Pagination,
  CardFooter,
  FormGroup,
} from "reactstrap";

// core components
import CardsHeader from "components/Headers/CardsHeader.js";
import List from "list.js";
import ReactDatetime from "react-datetime";

import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ReactDatetimeClass from "react-datetime";

function Dashboard() {

  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const firstListRef = useRef(null);
  const [data, setData] = useState([]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  const handleReactDatetimeChange = (who, date) => {
    if (
      startDate &&
      who === "endDate" &&
      new Date(startDate._d + "") > new Date(date._d + "")
    ) {
      setStartDate(date);
      setEndDate(date);
    } else if (
      endDate &&
      who === "startDate" &&
      new Date(endDate._d + "") < new Date(date._d + "")
    ) {
      setStartDate(date);
      setEndDate(date);
    } else {
      if (who === "startDate") {
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };
  // this function adds on the day tag of the date picker
  // middle-date className which means that this day will have no border radius
  // start-date className which means that this day will only have left border radius
  // end-date className which means that this day will only have right border radius
  // this way, the selected dates will look nice and will only be rounded at the ends
  const getClassNameReactDatetimeDays = (date) => {
    if (startDate && endDate) {
    }
    if (startDate && endDate && startDate._d + "" !== endDate._d + "") {
      if (
        new Date(endDate._d + "") > new Date(date._d + "") &&
        new Date(startDate._d + "") < new Date(date._d + "")
      ) {
        return " middle-date";
      }
      if (endDate._d + "" === date._d + "") {
        return " end-date";
      }
      if (startDate._d + "" === date._d + "") {
        return " start-date";
      }
    }
    return "";
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      initializeList();
    }
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://localhost:7050/api/Sale/list");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const initializeList = () => {
    new List(firstListRef.current, {
      valueNames: ["id", "name", "phone", "status", "address", "dob", "action"],
      listClass: "list",
    });
  };

  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data(chartExample1Data === "data1" ? "data2" : "data1");
  };
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  const [showMore1, setShowMore1] = useState(false);
  const [showMore2, setShowMore2] = useState(false);
  const [showMore3, setShowMore3] = useState(false);
  const [showLess1, setShowLess1] = useState(false);
  const [showLess2, setShowLess2] = useState(false);
  const [showLess3, setShowLess3] = useState(false);

  const handleViewMore1 = () => {
    setShowMore1(true);
    setShowLess1(true);
  };
  const handleViewLess1 = () => {
    setShowMore1(false);
    setShowLess1(false);
  };
  const handleViewMore2 = () => {
    setShowMore2(true);
    setShowLess2(true);
  };
  const handleViewLess2 = () => {
    setShowMore2(false);
    setShowLess2(false);
  };
  const handleViewMore3 = () => {
    setShowMore3(true);
    setShowLess3(true);
  };
  const handleViewLess3 = () => {
    setShowMore3(false);
    setShowLess3(false);
  };
  return (
    <>
      <CardsHeader name="Manager" parentName="Dashboards" />
      <Container className="mt--6" fluid>
        <Row>
          <Col xl="12">
            
            <Card className="bg-default">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-light text-uppercase ls-1 mb-1">
                      Tổng quan
                    </h6>
                    <h5 className="h3 text-white mb-0">Doanh thu</h5>
                  </div>
                  <div className="col">
                  <Row className="input-daterange datepicker align-items-center">
                      <Col xs={12} sm={6}>
                        <label className=" form-control-label">
                          Ngày bắt đầu
                        </label>
                        <FormGroup>
                          <ReactDatetime
                            inputProps={{
                              placeholder: "Chọn ngày bắt đầu",
                            }}
                            value={startDate}
                            timeFormat={false}
                            onChange={(e) =>
                              handleReactDatetimeChange("startDate", e)
                            }
                            renderDay={(props, currentDate, selectedDate) => {
                              let classes = props.className;
                              classes +=
                                getClassNameReactDatetimeDays(currentDate);
                              return (
                                <td {...props} className={classes}>
                                  {currentDate.date()}
                                </td>
                              );
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={6}>
                        <FormGroup>
                          <label className=" form-control-label">
                            Ngày kết thúc
                          </label>
                          <ReactDatetimeClass
                            inputProps={{
                              placeholder: "Chọn ngày kết thúc",
                            }}
                            value={endDate}
                            timeFormat={false}
                            onChange={(e) =>
                              handleReactDatetimeChange("endDate", e)
                            }
                            renderDay={(props, currentDate, selectedDate) => {
                              let classes = props.className;
                              classes +=
                                getClassNameReactDatetimeDays(currentDate);
                              return (
                                <td {...props} className={classes}>
                                  {currentDate.date()}
                                </td>
                              );
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Nav className="justify-content-end" pills>
                      <NavItem className="mr-2 mr-md-0">
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Tháng</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Tuần</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    id="chart-sales-dark"
                    className="chart-canvas"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* <Col xl="4">
            <Card>
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Số lượng đặt hàng
                    </h6>
                    <h5 className="h3 mb-0">Trong năm</h5>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                    className="chart-canvas"
                    id="chart-bars"
                  />
                </div>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
        <Row>
          <Col xl="4">
            <Card>
              <CardHeader>
                <h5 className="h3 mb-0">Danh sách tài khoản</h5>
              </CardHeader>

              <CardBody>
                <ListGroup className="list my--3" flush>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-1.jpg")}
                          />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Thanh Phong
                          </a>
                        </h4>
                        <small>Manager</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          Xem
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-2.jpg")}
                          />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Hoang Quyet
                          </a>
                        </h4>
                        <small>Sales</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          Xem
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-3.jpg")}
                          />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Dang Dung
                          </a>
                        </h4>
                        <small>Technical</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          Xem
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-4.jpg")}
                          />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Nhu Van
                          </a>
                        </h4>
                        <small>Blogger</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          Xem
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {showMore1 && (
                    <>
                      <ListGroupItem className="px-0">
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <a
                              className="avatar rounded-circle"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={require("assets/img/theme/team-3.jpg")}
                              />
                            </a>
                          </Col>
                          <div className="col ml--2">
                            <h4 className="mb-0">
                              <a
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Dang Dung
                              </a>
                            </h4>
                            <small>Technical</small>
                          </div>
                          <Col className="col-auto">
                            <Button color="primary" size="sm" type="button">
                              Xem
                            </Button>
                          </Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem className="px-0">
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <a
                              className="avatar rounded-circle"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={require("assets/img/theme/team-4.jpg")}
                              />
                            </a>
                          </Col>
                          <div className="col ml--2">
                            <h4 className="mb-0">
                              <a
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Nhu Van
                              </a>
                            </h4>
                            <small>Blogger</small>
                          </div>
                          <Col className="col-auto">
                            <Button color="primary" size="sm" type="button">
                              Xem
                            </Button>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    </>
                  )}
                  {!showMore1 && (
                    <div className="text-center mt-4">
                      <Button
                        color="primary"
                        type="button"
                        onClick={handleViewMore1}
                      >
                        Xem thêm
                      </Button>
                    </div>
                  )}
                  {showLess1 && (
                    <div className="text-center mt-4">
                      <Button
                        color="primary"
                        type="button"
                        onClick={handleViewLess1}
                      >
                        Trở lại
                      </Button>
                    </div>
                  )}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card>
              <CardHeader>
                <h5 className="h3 mb-0">Người dùng đặt hàng nhiều nhất</h5>
              </CardHeader>

              <CardBody>
                <ListGroup className="list my--3" flush>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-1.jpg")}
                          />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Thanh Phong
                          </a>
                        </h4>
                        <small>Manager</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          Tặng voucher
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-2.jpg")}
                          />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Hoang Quyet
                          </a>
                        </h4>
                        <small>Sales</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          Tặng voucher
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-3.jpg")}
                          />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Dang Dung
                          </a>
                        </h4>
                        <small>Technical</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          Tặng voucher
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/team-4.jpg")}
                          />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Nhu Van
                          </a>
                        </h4>
                        <small>Blogger</small>
                      </div>
                      <Col className="col-auto">
                        <Button color="primary" size="sm" type="button">
                          Tặng voucher
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {showMore2 && (
                    <>
                      <ListGroupItem className="px-0">
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <a
                              className="avatar rounded-circle"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={require("assets/img/theme/team-3.jpg")}
                              />
                            </a>
                          </Col>
                          <div className="col ml--2">
                            <h4 className="mb-0">
                              <a
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Dang Dung
                              </a>
                            </h4>
                            <small>Technical</small>
                          </div>
                          <Col className="col-auto">
                            <Button color="primary" size="sm" type="button">
                              Tặng voucher
                            </Button>
                          </Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem className="px-0">
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <a
                              className="avatar rounded-circle"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={require("assets/img/theme/team-4.jpg")}
                              />
                            </a>
                          </Col>
                          <div className="col ml--2">
                            <h4 className="mb-0">
                              <a
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Nhu Van
                              </a>
                            </h4>
                            <small>Blogger</small>
                          </div>
                          <Col className="col-auto">
                            <Button color="primary" size="sm" type="button">
                              Tặng voucher
                            </Button>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    </>
                  )}
                </ListGroup>
                {!showMore2 && (
                  <div className="text-center mt-4">
                    <Button
                      color="primary"
                      type="button"
                      onClick={handleViewMore2}
                    >
                      Xem thêm
                    </Button>
                  </div>
                )}
                {showLess2 && (
                  <div className="text-center mt-4">
                    <Button
                      color="primary"
                      type="button"
                      onClick={handleViewLess2}
                    >
                      Trở lại
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card>
              <CardHeader>
                <h5 className="h3 mb-0">Sản phẩm đặt hàng nhiều nhất</h5>
              </CardHeader>

              <CardBody>
                <ListGroup className="list my--3" flush>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/bootstrap.jpg")}
                          />
                        </a>
                      </Col>
                      <div className="col">
                        <h5>Argon Design System</h5>
                        <Progress
                          className="progress-xs mb-0"
                          color="orange"
                          max="100"
                          value="60"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/angular.jpg")}
                          />
                        </a>
                      </Col>
                      <div className="col">
                        <h5>Angular Now UI Kit PRO</h5>
                        <Progress
                          className="progress-xs mb-0"
                          color="success"
                          max="100"
                          value="100"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/sketch.jpg")}
                          />
                        </a>
                      </Col>
                      <div className="col">
                        <h5>Black Dashboard</h5>
                        <Progress
                          className="progress-xs mb-0"
                          color="danger"
                          max="100"
                          value="72"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/react.jpg")}
                          />
                        </a>
                      </Col>
                      <div className="col">
                        <h5>React Material Dashboard</h5>
                        <Progress
                          className="progress-xs mb-0"
                          color="info"
                          max="100"
                          value="90"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                  {showMore3 && (
                    <>
                      <ListGroupItem className="px-0">
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <a
                              className="avatar rounded-circle"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={require("assets/img/theme/sketch.jpg")}
                              />
                            </a>
                          </Col>
                          <div className="col">
                            <h5>Black Dashboard</h5>
                            <Progress
                              className="progress-xs mb-0"
                              color="danger"
                              max="100"
                              value="72"
                            />
                          </div>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem className="px-0">
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <a
                              className="avatar rounded-circle"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={require("assets/img/theme/react.jpg")}
                              />
                            </a>
                          </Col>
                          <div className="col">
                            <h5>React Material Dashboard</h5>
                            <Progress
                              className="progress-xs mb-0"
                              color="info"
                              max="100"
                              value="90"
                            />
                          </div>
                        </Row>
                      </ListGroupItem>
                    </>
                  )}
                  {!showMore3 && (
                    <div className="text-center mt-4">
                      <Button
                        color="primary"
                        type="button"
                        onClick={handleViewMore3}
                      >
                        Xem thêm
                      </Button>
                    </div>
                  )}
                  {showLess3 && (
                    <div className="text-center mt-4">
                      <Button
                        color="primary"
                        type="button"
                        onClick={handleViewLess3}
                      >
                        Trở lại
                      </Button>
                    </div>
                  )}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container className="mt-2" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-0">Danh sách salers</h3>
              </CardHeader>
              {data.length > 0 ? (
                <div className="table-responsive" ref={firstListRef}>
                  <Table className="align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th className="sort" data-sort="id" scope="col">
                          ID
                        </th>
                        <th className="sort" data-sort="name" scope="col">
                          Họ tên
                        </th>
                        <th className="sort" data-sort="phone" scope="col">
                          Số điện thoại
                        </th>
                        <th className="sort" data-sort="status" scope="col">
                          Tình trạng
                        </th>
                        <th className="sort" data-sort="address" scope="col">
                          Địa chỉ
                        </th>
                        <th className="sort" data-sort="dob" scope="col">
                          Ngày sinh
                        </th>
                        <th scope="col">Bật/tắt hoạt động</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody className="list">
                      {displayedData.map((sale) => (
                        <tr key={sale.saleId}>
                          <td className="id">#{sale.saleId}</td>
                          <th scope="row">
                            <Media className="align-items-center">
                              <a
                                className="avatar rounded-circle mr-3"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  src={require("assets/img/theme/bootstrap.jpg")}
                                />
                              </a>
                              <Media>
                                <span className="name mb-0 text-sm">
                                  {sale.fullName}
                                </span>
                              </Media>
                            </Media>
                          </th>
                          <td className="phone">{sale.phone}</td>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i
                                className={
                                  sale.statusId === 1
                                    ? "bg-success"
                                    : "bg-warning"
                                }
                              />
                              <span className="status">
                                {sale.statusId === 1
                                  ? "Hoạt động"
                                  : "Ngừng hoạt động"}
                              </span>
                            </Badge>
                          </td>
                          <td className="address">{sale.address}</td>
                          <td className="dob">{sale.dob}</td>
                          <td className="action">
                            <label className="custom-toggle custom-toggle-danger mr-1">
                              <input defaultChecked type="checkbox" />
                              <span
                                className="custom-toggle-slider rounded-circle"
                                data-label-off="Tắt"
                                data-label-on="Bật"
                              />
                            </label>
                          </td>
                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                color=""
                                role="button"
                                size="sm"
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu
                                className="dropdown-menu-arrow"
                                right
                              >
                                <Link to={`/admin/list-sales/${sale.saleId}`}>
                                  <DropdownItem>View</DropdownItem>
                                </Link>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div>Loading...</div>
              )}
              <CardFooter className="py-4 bg-transparent">
                <nav aria-label="...">
                  <Pagination className="pagination justify-content-end mb-0">
                    <PaginationItem disabled={currentPage === 1}>
                      <PaginationLink
                        previous
                        onClick={() => setCurrentPage(currentPage - 1)}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <PaginationItem
                          key={page}
                          active={currentPage === page}
                        >
                          <PaginationLink onClick={() => setCurrentPage(page)}>
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                    <PaginationItem disabled={currentPage === totalPages}>
                      <PaginationLink
                        next
                        onClick={() => setCurrentPage(currentPage + 1)}
                      />
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
