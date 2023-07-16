import axios from "axios";
import classnames from "classnames";
import React, { useEffect, useState } from "react";
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
import NotificationAlert from "react-notification-alert";
import { useHistory } from "react-router-dom";

const AddOrder = () => {
  const history = useHistory();

  const [customerData, setCustomerData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [saleData, setSaleData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedSale, setSelectedSale] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const notificationAlertRef = React.useRef(null);
  useEffect(() => {
    // Set the current date as the default value for "Ngày đặt hàng" field
    const currentDate = new Date().toISOString().split("T")[0];
    const orderDateInput = document.getElementById("input-last-name");
    orderDateInput.value = currentDate;
  }, []);

  const notifySuccess = () => {
    let options = {
      place: "tc",
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {" "}
            Thêm đơn hàng thành công
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
            Thêm đơn hàng thất bại
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
        setCustomerData(response.data);
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

    const fetchProductData = async () => {
      try {
        const response = await axios.get("https://localhost:7050/api/Product");
        setProductData(response.data);
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
    fetchProductData();
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
        const order = {
          customerId: e.target.elements.customer.value,
          saleId: e.target.elements.sale.value,
          price: e.target.elements.price.value,
          orderDate: new Date(e.target.elements.orderDate.value).toISOString(), // Convert the value to ISO 8601 format
          status: selectedStatus,
        };

        const response = await axios.post(
          "https://localhost:7050/api/Order",
          order
        );

        const orderId = response.data.orderId; // Retrieve the orderId from the response
        const orderDetails = {
           orderId: orderId,
           productId: e.target.elements.product.value,
        };
        console.log(orderId);
        // Send the order details to the server
        await axios.post(
          "https://localhost:7050/api/OrderDetail",
          orderDetails
        );

        console.log(response.data);
        setIsFormSubmitted(false);
        history.push("/admin/list-orders");
        notifySuccess();
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
                    <h3 className="mb-0">Thêm đơn hàng</h3>
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
                      <Col lg="10">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Chọn sản phẩm
                          </label>
                          <Card>
                            <Select2
                              className="form-control"
                              name="product"
                              value={selectedProduct}
                              options={{
                                placeholder: "Select",
                              }}
                              data={productData.map((product) => ({
                                id: product.productId,
                                text: product.productName,
                              }))}
                              onChange={(event) =>
                                setSelectedProduct(event.target.value)
                              }
                            />
                          </Card>
                        </FormGroup>
                      </Col>
                      {/* <Col lg="5">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-first-name">
                            Số lượng
                          </label>
                          <Input
                            name="quantity"
                            defaultValue=""
                            id="input-first-name"
                            placeholder="Price"
                            type="text"
                          />
                        </FormGroup>
                      </Col> */}
                    </Row>
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
                              value={selectedCustomer}
                              options={{
                                placeholder: "Select",
                              }}
                              data={customerData.map((customer) => ({
                                id: customer.customerId,
                                text: customer.fullName,
                              }))}
                              onChange={(event) =>
                                setSelectedCustomer(event.target.value)
                              } // Update the selectedCategory state on change
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
                            defaultValue=""
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
                              value={selectedSale}
                              options={{
                                placeholder: "Select",
                              }}
                              data={saleData.map((sale) => ({
                                id: sale.saleId,
                                text: sale.fullName,
                              }))}
                              onChange={(event) =>
                                setSelectedSale(event.target.value)
                              }
                            />
                          </Card>
                        </FormGroup>
                      </Col>
                      <Col lg="5">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Ngày đặt hàng
                          </label>
                          <Input
                            name="orderDate"
                            defaultValue=""
                            id="input-last-name"
                            type="date"
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

export default AddOrder;
