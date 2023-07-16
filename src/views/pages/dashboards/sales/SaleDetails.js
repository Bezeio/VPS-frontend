import axios from "axios";
import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// reactstrap components
import {
  ButtonGroup,
  Button,
  Card,
  CardHeader,
  CardBody,
  ListGroupItem,
  ListGroup,
  CardImg,
  // CardTitle,
  FormGroup,
  Form,
  Input,
  // ListGroupItem,
  // ListGroup,
  // Progress,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
// import ProfileHeader from "components/Headers/ProfileHeader.js";

import ReactDatetime from "react-datetime";
import Select2 from "react-select2-wrapper";
import moment from "moment";
// import TagsInput from "components/TagsInput/TagsInput.js";

const SaleDetails = () => {
  const { saleId } = useParams();
  const [orderData, setOrderData] = useState([]);
  const [shipperData, setShipperData] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7050/api/Order/${saleId}`
        );
        setOrderData(response.data);
        const orderDate = new Date(response.data.orderDate); // Convert orderDate to a Date object
        setStartDate(orderDate); // Update the startDate value
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [saleId]);

  useEffect(() => {
    const fetchShipperData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7050/api/Shipper/list`
        );
        setShipperData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchShipperData();
  }, []);



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

  const isValidDate = (current) => {
    return current.isSameOrAfter(moment().startOf('day'));
  };

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

  return (
    <>
      <Container className="mt--12" fluid>
        <Row className="mt-4">
          <Col className="order-xl-1 mt-4" xl="12">
            <Card>
              <CardHeader>
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Đơn hàng</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin đơn hàng
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Mã đơn hàng
                          </label>
                          <Input
                            defaultValue={orderData.orderId}
                            id="input-username"
                            placeholder="Order ID"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Nguời bán hàng
                          </label>
                          <Input
                            defaultValue={orderData.saleId}
                            id="input-username"
                            placeholder="Sale ID"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Giá trị đơn hàng
                          </label>
                          <Input
                            defaultValue={orderData.price}
                            id="input-first-name"
                            placeholder="Price"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={6}>
                        <label className=" form-control-label">
                          Ngày đặt hàng
                        </label>
                        <FormGroup>
                          <ReactDatetime
                            inputProps={{
                              placeholder: "Date Picker Here",
                              disabled: true,
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
                    </Row>
                    <Row>
                      
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Chọn người giao hàng
                          </label>
                          <Card>
                            <Select2
                              className="form-control"
                              options={{
                                placeholder: "Select",
                              }}
                              data={shipperData.map((shipper) => ({
                                id: shipper.shipperId,
                                text: shipper.fullName,
                              }))}
                            />
                          </Card>
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={6}>
                        <FormGroup>
                          <label className=" form-control-label">
                            Ngày giao hàng
                          </label>
                          <ReactDatetime
                            inputProps={{
                              placeholder: "Date Picker Here",
                            }}
                            isValidDate={isValidDate}
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
                  </div>

                  <hr className="my-4" />
                </Form>
              </CardBody>
            </Card>
            <Button className="ml-4 mt-4" color="primary" type="submit">
              LƯU ĐƠN HÀNG
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SaleDetails;
