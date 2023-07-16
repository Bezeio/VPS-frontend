import React, { useEffect, useState } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";


const  CardsHeader = ({ name, parentName }) => {
  const [revenueData, setRevenueData] = useState([]);
  const [customerdata, setCustomerData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [blogData, setBlogData] = useState([]);

  useEffect(()=>{
    fetchRevenueData()
    fetchCustomerData()
    fetchOrderData()
    fetchBlogData()
  })
  const fetchRevenueData = async() =>{
    try {
      const response = await axios.get("https://localhost:7050/api/OrderDetail/totalprice");
      setRevenueData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchCustomerData = async() =>{
    try {
      const response = await axios.get("https://localhost:7050/api/Customer/total");
      setCustomerData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchOrderData = async() =>{
    try {
      const response = await axios.get("https://localhost:7050/api/Order/total");
      setOrderData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchBlogData = async() =>{
    try {
      const response = await axios.get("https://localhost:7050/api/Blog/total");
      setBlogData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  return (
    <>
      <div className="header bg-info pb-6">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="6" xs="7">
                <h6 className="h2 text-white d-inline-block mb-0">{name}</h6>{" "}
                <Breadcrumb
                  className="d-none d-md-inline-block ml-md-4"
                  listClassName="breadcrumb-links breadcrumb-dark"
                >
                  <BreadcrumbItem>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="fas fa-home" />
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      {parentName}
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem aria-current="page" className="active">
                    {name}
                  </BreadcrumbItem>
                </Breadcrumb>
              </Col>
              {/* <Col className="text-right" lg="6" xs="5">
                <Button
                  className="btn-neutral"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="sm"
                >
                  New
                </Button>
                <Button
                  className="btn-neutral"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="sm"
                >
                  Filters
                </Button>
              </Col> */}
            </Row>

            <Row>
            <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Tổng doanh thu
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{revenueData}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
                        <i class="fa-solid fa-dollar-sign"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Tính từ tháng trước</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Số lượng người dùng
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{customerdata}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                          <i className="ni ni-single-02" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Tính từ tháng trước</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Số lượng đơn hàng
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{orderData}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                          <i className="ni ni-collection" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Tính từ tháng trước</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Tổng số bài đăng
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {blogData}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                          <i className="ni ni-active-40" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Tính từ tháng trước</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

CardsHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default CardsHeader;
