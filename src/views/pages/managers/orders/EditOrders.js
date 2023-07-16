import axios from "axios";
import classnames from "classnames";
import React, { useEffect, useState } from "react";
import ReactDatetime from "react-datetime";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// reactstrap components
import {
  ButtonGroup,
  Button,
  Card,
  CardHeader,
  CardBody,
  //   ListGroupItem,
  //   ListGroup,
  //   CardImg,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import Select2 from "react-select2-wrapper";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import NotificationAlert from "react-notification-alert";
import { useHistory } from "react-router-dom";

const EditOrders = () => {
  const history = useHistory();
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [saleData, setSaleData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedSale, setSelectedSale] = useState("");
  const notificationAlertRef = React.useRef(null);

  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

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
    const fetchData = async () => {
      try {
        const orderResponse = await axios.get(
          `https://localhost:7050/api/Order/${orderId}`
        );
        setOrderData(orderResponse.data);
        console.log(orderResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [orderId]);

  const notifySuccess = () => {
    let options = {
      place: "tc",
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {" "}
            Thêm sản phẩm thành công
          </span>
        </div>
      ),
      type: "success",
      icon: "ni ni-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  const notifyDanger = () => {
    let options = {
      place: "tc",
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {" "}
            Thêm sản phẩm thất bại
          </span>
          <span data-notify="message">
            Vui lòng kiểm tra các trường đã điền
          </span>
        </div>
      ),
      type: "danger",
      icon: "ni ni-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7050/api/Customer/list"
        );
        setCustomerData(response.data); // <-- Update this line
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    const fetchSaleData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7050/api/Sale/list"
        );
        setSaleData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching sale data:", error);
      }
    };

    const fetchStatusData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7050/api/Status/list"
        );
        const slicedData = response.data.slice(0, 4); // Get the first four values
        setStatusData(slicedData);
      } catch (error) {
        console.error("Error fetching status data:", error);
      }
    };

    fetchCustomerData();
    fetchSaleData();
    fetchStatusData();
  }, []);

  const handleStatusSelection = (statusId) => {
    setSelectedStatus(statusId);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    const form = e.target;

    if (form.checkValidity()) {
      try {
        const updateOrder = {
          customerId: e.target.elements.customer.value,
          saleId: e.target.elements.sale.value,
          price: e.target.elements.price.value,
          orderDate: new Date(e.target.elements.orderDate.value).toISOString(), // Convert the value to ISO 8601 format
          status: selectedStatus,
        };

        const response = await axios.put(
          `https://localhost:7050/api/Order/${orderId}`,
          updateOrder
        );

        console.log(response.data);
        form.reset();
        setIsFormSubmitted(false);
        notifySuccess();
        history.push("/admin/list-orders");
      } catch (error) {
        notifyDanger();
        console.error("Error adding order:", error);
      }
    }
  };

  return (
    <>
      <div className="rna-wrapper">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Container className="mt--12" fluid>
        <Row className="mt-4 ml-8">
          <Col className="order-xl-1 mt-4" xl="10">
            <Card>
              <CardHeader>
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Chỉnh sửa đơn hàng</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin sản phẩm
                  </h6>
                  <div className="pl-lg-4 ml-7">
                    <Row>
                      <Col lg="5">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Chọn khách hàng
                          </label>
                          <Card>
                            <Select2
                              className="form-control"
                              name="customer"
                              defaultValue={
                                orderData.customerId
                                  ? orderData.customerId.toString()
                                  : "" // Convert the customerId to string and provide an empty string if it's not available
                              }
                              options={{
                                placeholder: "Select",
                              }}
                              data={customerData.map((customer) => ({
                                id: customer.customerId.toString(), // Convert the customerId to string
                                text: customer.fullName,
                              }))}
                              onChange={(event) =>
                                setSelectedCustomer(event.target.value)
                              } 
                            />
                          </Card>
                        </FormGroup>
                      </Col>
                      <Col lg="5">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Hóa đơn
                          </label>
                          <Input
                            name="price"
                            defaultValue={orderData.price}
                            id="input-first-name"
                            placeholder="Price"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="5">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Chọn nhân viên
                          </label>
                          <Card>
                            <Select2
                              className="form-control"
                              name="sale"
                              defaultValue={
                                orderData.saleId
                                  ? orderData.saleId.toString()
                                  : "" // Convert the customerId to string and provide an empty string if it's not available
                              }
                              options={{
                                placeholder: "Select",
                              }}
                              data={saleData.map((sale) => ({
                                id: sale.saleId.toString(), // Convert the customerId to string
                                text: sale.fullName,
                              }))}
                              onChange={(event) =>
                                setSelectedSale(event.target.value)
                              } // Update the selectedCategory state on change
                            />
                          </Card>
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={6}>
                        <label className=" form-control-label">
                          Ngày đặt hàng
                        </label>
                        <FormGroup>
                          <ReactDatetime
                            inputProps={{
                              name: "orderDate",
                              placeholder: "Date Picker Here",
                              readOnly: true,
                              disabled: true, // Add the disabled prop to disable the input field
                            }}
                            value={
                              orderData.orderDate
                                ? new Date(orderData.orderDate).toISOString()
                                : new Date().toISOString()
                            }
                            timeFormat={false}
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
                  <div className="pl-lg-4">
                    <label
                      className="form-control-label mb-4 ml-7"
                      htmlFor="input-address"
                    >
                      Tình trạng sản phẩm
                    </label>
                    <div>
                      {statusData.map((status) => (
                        <ButtonGroup
                          key={status.statusId}
                          className="btn-group-toggle btn-group-colors event-tag mb-4 ml-7"
                          data-toggle="buttons"
                        >
                          <i className="ni business_briefcase-24 mr-2">
                            {status.statusValue}
                          </i>
                          <Button
                            className={classnames("bg-info", {
                              active: status.statusId === selectedStatus,
                            })}
                            color=""
                            type="button"
                            onClick={() =>
                              handleStatusSelection(status.statusId)
                            }
                          />
                        </ButtonGroup>
                      ))}
                    </div>
                  </div>
                  <hr className="my-4" />
                  <Button className="ml-4 mt-4" color="primary" type="submit">
                    LƯU ĐƠN HÀNG
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditOrders;
