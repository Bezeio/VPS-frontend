import React, { useEffect, useRef, useState } from "react";
import List from "list.js";
import classnames from "classnames";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  CardBody,
  Button,
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import axios from "axios";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import { Chart } from "chart.js";
import { Bar, Line } from "react-chartjs-2";

const Salers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");

  const firstListRef = useRef(null);
  const [orderData, setOrderData] = useState([]);

  const totalPages = Math.ceil(orderData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = orderData.slice(startIndex, endIndex);

  const { saleId } = useParams();

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data(chartExample1Data === "data1" ? "data2" : "data1");
  };
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (orderData.length > 0) {
      initializeList();
    }
  }, [orderData]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7050/api/Order/listbysaleidd?id=${saleId}`
      );
      setOrderData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteData = async (orderId) => {
    try {
      await axios.delete(`https://localhost:7050/api/Order/${orderId}`);
      fetchData(); // Refetch data after successful deletion
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const initializeList = () => {
    new List(firstListRef.current, {
      valueNames: ["id", "saleId", "orderDate", "status", "price", "action"],
      listClass: "list",
    });
  };

  return (
    <>
      <SimpleHeader className="Dashboard" parentName="Saler" />
      <Container className="mt--6" fluid>
        <Row>
          <Col xl="8">
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
          <Col xl="4">
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
          </Col>
        </Row>
        <Row>
          <div className="col">
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-0">Danh sách đơn hàng</h3>
              </CardHeader>
              {orderData.length > 0 ? (
                <div className="table-responsive" ref={firstListRef}>
                  <Table className="align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th className="sort" data-sort="id" scope="col">
                          ID
                        </th>
                        <th className="sort" data-sort="saleId" scope="col">
                          Saler
                        </th>
                        <th className="sort" data-sort="orderDate" scope="col">
                          Ngày đặt hàng
                        </th>
                        <th className="sort" data-sort="status" scope="col">
                          Tình trạng
                        </th>
                        <th className="sort" data-sort="address" scope="col">
                          Giá đơn hàng
                        </th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody className="list">
                      {displayedData.map((order) => (
                        <tr key={order.orderId}>
                          <td className="id">#{order.orderId}</td>
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
                                <span className="saleId mb-0 text-sm">
                                  {order.saleId}
                                </span>
                              </Media>
                            </Media>
                          </th>
                          <td className="date">
                          {new Date(order.orderDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </td>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i
                                className={
                                  order.status === 1
                                    ? "bg-warning"
                                    : "bg-yellow"
                                }
                              />
                              <span className="status">
                                {order.status === 1
                                  ? "Đang xử lý"
                                  : "Đang vận chuyển"}
                              </span>
                            </Badge>
                          </td>
                          <td className="price">{order.price} VND</td>
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
                                <Link
                                  to={`/admin/saler-details/${order.orderId}`}
                                >
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
};

export default Salers;
