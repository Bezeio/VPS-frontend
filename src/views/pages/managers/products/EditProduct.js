import axios from "axios";
import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";
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

import Select2 from "react-select2-wrapper";
// import TagsInput from "components/TagsInput/TagsInput.js";
import ReactQuill from "react-quill";
import Dropzone from "dropzone";
import Slider from "nouislider";
import NotificationAlert from "react-notification-alert";

Dropzone.autoDiscover = false;

const EditProduct = () => {
  const history = useHistory();
  const [reactQuillText, setReactQuillText] = useState("");
  const { productId } = useParams();
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [sliderValue, setSliderValue] = React.useState("0");
  // const [radios, setRadios] = React.useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // New state variable
  const notificationAlertRef = React.useRef(null);
  const sliderRef = React.useRef(null);

  const notifySuccess = () => {
    let options = {
      place: "tc",
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {" "}
            Chỉnh sửa sản phẩm thành công
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
            Chỉnh sửa sản phẩm thất bại
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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7050/api/Product/${productId}`
        );
        setProductData(response.data);
        setSliderValue(response.data.quality);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productId]);

  useEffect(() => {
    if (sliderRef.current) {
      const slider = Slider.create(sliderRef.current, {
        start: [sliderValue],
        connect: [true, false],
        step: 1,
        range: { min: 0, max: 10 },
      });

      slider.on("update", function (values, handle) {
        setSliderValue(values[0]);
      });

      return () => {
        slider.destroy(); // Cleanup the slider on component unmount
      };
    }
    // this variable is to delete the previous image from the dropzone state
    // it is just to make the HTML DOM a bit better, and keep it light
  }, [sliderValue]);

  useEffect(() => {
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

  useEffect(() => {
    if (productData.description) {
      setReactQuillText(productData.description);
    }
  }, [productData.description]);

  const handleStatusSelection = (statusId) => {
    setSelectedStatus(statusId);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Perform validation
    const productName = formData.get("name");
    const brand = formData.get("brand");

    if (!productName || !brand) {
      setIsFormSubmitted(true);
      return;
    }

    try {
      const updatedProduct = {
        productName,
        brand,
        categoryId: formData.get("category"),
        unitPrice: formData.get("price"),
        unitInStock: formData.get("unitInStock"),
        statusId: selectedStatus,
        description: reactQuillText,
        quality: parseInt(sliderValue),
      };

      const response = await axios.put(
        `https://localhost:7050/api/Product/${productId}`,
        updatedProduct
      );

      console.log(response.data);
      setIsFormSubmitted(false);
      notifySuccess();
      history.push("/admin/products");
    } catch (error) {
      notifyDanger();
      console.error("Error updating product:", error);
    }
  };
  return (
    <>
      <NotificationAlert ref={notificationAlertRef} />
      <Container className="mt--12" fluid>
        <Row className="mt-4 ml-8">
          <Col className="order-xl-1 mt-4" xl="10">
            <Card>
              <CardHeader>
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Sửa đổi sản phẩm</h3>
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
                            defaultValue={productData.productName}
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
                            defaultValue={productData.brand}
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
                              defaultValue={
                                productData.category
                                  ? productData.category.categoryId
                                  : ""
                              }
                              options={{
                                placeholder: "Select",
                              }}
                              data={categoryData.map((category) => ({
                                id: category.categoryId,
                                text: category.categoryName,
                              }))}
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
                            defaultValue={productData.unitPrice}
                            name="price"
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
                            htmlFor="input-last-name"
                          >
                            Số lượng
                          </label>
                          <Input
                            defaultValue={productData.unitInStock}
                            name="unitInStock"
                            id="input-last-name"
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
                            className="form-control-label "
                            htmlFor="input-address"
                          >
                            Đánh giá sản phẩm
                          </label>
                          <div className="input-slider-container">
                            <div className="input-slider" ref={sliderRef} />
                            <Row className="mt-3">
                              <Col xs="6">
                                <span className="range-slider-value">
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
                        defaultValue={reactQuillText}
                        value={reactQuillText}
                        onChange={(value) => setReactQuillText(value)}
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
                            className="custom-file-input"
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
                  </Button>{" "}
                  {/* Move inside the form */}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditProduct;
