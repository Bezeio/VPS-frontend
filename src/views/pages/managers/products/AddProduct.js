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
  // CardImg,
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
import NotificationAlert from "react-notification-alert";
import Select2 from "react-select2-wrapper";
// import TagsInput from "components/TagsInput/TagsInput.js";
import ReactQuill from "react-quill";
import Dropzone from "dropzone";
import Slider from "nouislider";
import axios from "axios";
import { useHistory } from "react-router-dom";

Dropzone.autoDiscover = false;

const AddProduct = () => {
  const history = useHistory();
  const [reactQuillText, setReactQuillText] = useState("");

  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [sliderValue, setSliderValue] = React.useState("0");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [description, setDescription] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const notificationAlertRef = React.useRef(null);

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

  const sliderRef = React.useRef(null);
  useEffect(() => {
    Slider.create(sliderRef.current, {
      start: [0],
      connect: [true, false],
      step: 1,
      range: { min: 0, max: 10 },
    }).on("update", function (values, handle) {
      setSliderValue(values[0]);
      console.log(values[0]);
    });
    // this variable is to delete the previous image from the dropzone state
    // it is just to make the HTML DOM a bit better, and keep it light
    let currentMultipleFile = undefined;
    // multiple dropzone file - accepts any type of file
    new Dropzone(document.getElementById("dropzone-multiple"), {
      url: "https://example.com/upload",
      thumbnailWidth: null,
      thumbnailHeight: null,
      previewsContainer: document.getElementsByClassName(
        "dz-preview-multiple"
      )[0],
      previewTemplate: document.getElementsByClassName("dz-preview-multiple")[0]
        .innerHTML,
      maxFiles: null,
      acceptedFiles: null,
      init: function () {
        this.on("addedfile", function (file) {
          if (currentMultipleFile) {
          }
          currentMultipleFile = file;
        });
      },
    });
    document.getElementsByClassName("dz-preview-multiple")[0].innerHTML = "";
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7050/api/Category/list`
        );
        setCategoryData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, []);

  useEffect(() => {
    const fetchStatusData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7050/api/Status/list`
        );
        const slicedData = response.data.slice(0, 4); // Get the first four values
        setStatusData(slicedData);
        console.log(slicedData);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

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
        // Build the product object with the form data
        const product = {
          productName: e.target.elements.name.value,
          categoryId: e.target.elements.category.value, // Get the category value from the defaultValue prop of Select2
          brand: e.target.elements.brand.value,
          unitPrice: e.target.elements.price.value,
          unitInStock: e.target.elements.unitInStock.value,
          statusId: selectedStatus,
          // quantity: e.target.elements.quantity.value,
          description: description,
          quality: parseInt(sliderValue),
          // image: e.target.elements.image.value,
          // Add other fields as needed
        };

        // Make a POST request to the API to add the product
        const response = await axios.post(
          "https://localhost:7050/api/Product",
          product
        );

        // Handle the response
        console.log(response.data);
        form.reset();
        setIsFormSubmitted(false);
        // Show success alert
        notifySuccess()
        history.push("/admin/products");

        // Reset the form fields or redirect to another page
      } catch (error) {
        notifyDanger()
        console.error("Error adding product:", error);
      }
    }
  };

  return (
    <>
    <div className="rna-wrapper">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Container className="mt--12 " fluid>
        <Row className="mt-4 ml-8">
          <Col className="order-xl-1 mt-4" xl="10">
            <Card>
              <CardHeader>
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Thêm sản phẩm</h3>
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
                            htmlFor="input-username"
                          >
                            Tên sản phẩm
                          </label>
                          <Input
                            name="name"
                            id="input-username"
                            placeholder="Name of product"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="5">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Nhãn hiệu
                          </label>
                          <Input
                            name="brand"
                            defaultValue=""
                            id="input-first-name"
                            placeholder="Brand"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="10">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Phân loại sản phẩm
                          </label>
                          <Card>
                            <Select2
                              className="form-control"
                              name="category"
                              value={selectedCategory}
                              options={{
                                placeholder: "Select",
                              }}
                              data={categoryData.map((category) => ({
                                id: category.categoryId,
                                text: category.categoryName,
                              }))}
                              onChange={(event) =>
                                setSelectedCategory(event.target.value)
                              } // Update the selectedCategory state on change
                            />
                          </Card>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="5">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Giá sản phẩm
                          </label>
                          <Input
                            name="price"
                            defaultValue=""
                            id="input-last-name"
                            placeholder="VND"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="5">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Số lượng
                          </label>
                          <Input
                            name="unitInStock"
                            defaultValue=""
                            id="input-first-name"
                            placeholder="Quantity"
                            type="number"
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

                  <div className="pl-lg-4 mt-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Đánh giá sản phẩm
                          </label>
                          <div className="input-slider-container">
                            <div className="input-slider" ref={sliderRef} />
                            <Row className="mt-3">
                              <Col xs="6">
                                <span
                                  className="range-slider-value"
                                  name="quality"
                                >
                                  {sliderValue}
                                </span>
                              </Col>
                            </Row>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />

                  <h6 className="heading-small text-muted mb-4">
                    Giới thiệu sản phẩm
                  </h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label className="form-control-label">Giới thiệu</label>
                      <div
                        data-quill-placeholder="Quill WYSIWYG"
                        data-toggle="quill"
                      />
                      <ReactQuill
                        name="description"
                        defaultValue={reactQuillText}
                        value={description}
                        onChange={setDescription}
                        theme="snow"
                        modules={{
                          toolbar: [
                            ["bold", "italic"],
                            ["link", "blockquote", "code", "image"],
                            [
                              {
                                list: "ordered",
                              },
                              {
                                list: "bullet",
                              },
                            ],
                          ],
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div className="pl-lg-4">
                    <label
                      className="form-control-label mb-4"
                      htmlFor="input-address"
                    >
                      Chọn ảnh
                    </label>
                    <div
                      className="dropzone dropzone-multiple pl-lg-4"
                      id="dropzone-multiple"
                    >
                      <div className="fallback">
                        <div className="custom-file">
                          <input
                            className="image custom-file-input"
                            id="customFileUploadMultiple"
                            multiple="multiple"
                            type="file"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFileUploadMultiple"
                          >
                            Choose file
                          </label>
                        </div>
                      </div>
                      <ListGroup
                        className=" dz-preview dz-preview-multiple list-group-lg"
                        flush
                      >
                        <ListGroupItem className=" px-0">
                          <Row className=" align-items-center">
                            <Col className=" col-auto">
                              <div className=" avatar">
                                <img
                                  alt="..."
                                  className=" avatar-img rounded"
                                  data-dz-thumbnail
                                />
                              </div>
                            </Col>
                            <div className=" col ml--3">
                              <h4 className=" mb-1" data-dz-name>
                                ...
                              </h4>
                              <p
                                className=" small text-muted mb-0"
                                data-dz-size
                              >
                                ...
                              </p>
                            </div>
                            <Col className=" col-auto">
                              <Button size="sm" color="danger" data-dz-remove>
                                <i className="fas fa-trash" />
                              </Button>
                            </Col>
                          </Row>
                        </ListGroupItem>
                      </ListGroup>
                    </div>
                  </div>
                  <Button className="ml-4 mt-4" color="primary" type="submit">
                    LƯU SẢN PHẨM
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

export default AddProduct;
