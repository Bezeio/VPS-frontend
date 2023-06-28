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

import Select2 from "react-select2-wrapper";
import TagsInput from "components/TagsInput/TagsInput.js";
import ReactQuill from "react-quill";
import Dropzone from "dropzone";
import Slider from "nouislider";

Dropzone.autoDiscover = false;

const EditProduct = () => {
  const [reactQuillText, setReactQuillText] = useState("");

  const { productId } = useParams();
  const [productData, setProductData] = useState([]);
  const [sliderValue, setSliderValue] = React.useState("0");
  const [radios, setRadios] = React.useState(null);

  const sliderRef = React.useRef(null);
  useEffect(() => {
    Slider.create(sliderRef.current, {
      start: [0],
      connect: [true, false],
      step: 1,
      range: { min: 0, max: 100 },
    }).on("update", function (values, handle) {
      setSliderValue(values[0]);
    });
    // this variable is to delete the previous image from the dropzone state
    // it is just to make the HTML DOM a bit better, and keep it light
    let currentMultipleFile = undefined;
    // multiple dropzone file - accepts any type of file
    new Dropzone(document.getElementById("dropzone-multiple"), {
      url: "https://",
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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7050/api/Product/${productId}`
        );
        setProductData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (productData.description) {
      setReactQuillText(productData.description);
    }
  }, [productData.description]);

  return (
    <>
      <Container className="mt--12" fluid>
        <Row className="mt-4">
          <Col className="order-xl-1 mt-4" xl="12">
            <Card>
              <CardHeader>
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Sửa đổi sản phẩm</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin sản phẩm
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Tên sản phẩm
                          </label>
                          <Input
                            defaultValue={productData.productName}
                            id="input-username"
                            placeholder="Name of product"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
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
                              defaultValue="1"
                              options={{
                                placeholder: "Select",
                              }}
                              data={[
                                { id: "1", text: "Alerts" },
                                { id: "2", text: "Badges" },
                                { id: "3", text: "Buttons" },
                                { id: "4", text: "Cards" },
                                { id: "5", text: "Forms" },
                                { id: "6", text: "Modals" },
                              ]}
                            />
                          </Card>
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
                            Nhãn hiệu
                          </label>
                          <Input
                            defaultValue={productData.brand}
                            id="input-first-name"
                            placeholder="Brand"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Giá sản phẩm
                          </label>
                          <Input
                            defaultValue={productData.unitPrice}
                            id="input-last-name"
                            placeholder="VND"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <div className="pl-lg-4">
                    <label
                      className="form-control-label mb-4"
                      htmlFor="input-address"
                    >
                      Tình trạng sản phẩm
                    </label>
                    <div>
                      <ButtonGroup
                        className="btn-group-toggle btn-group-colors event-tag mb-4 ml-8"
                        data-toggle="buttons"
                      >
                        <i className="ni business_briefcase-24 mr-2">
                          Hoạt động
                        </i>
                        <Button
                          className={classnames("bg-success mr-6", {
                            active:
                              radios === "bg-success" &&
                              productData.status.statusName === "Hoạt Động",
                          })}
                          color=""
                          type="button"
                          onClick={() => setRadios("bg-success")}
                        />
                        <i className="ni business_briefcase-24 mr-2">
                          Còn hàng
                        </i>
                        <Button
                          className={classnames("bg-info mr-6", {
                            active: radios === "bg-info",
                          })}
                          color=""
                          type="button"
                          onClick={() => setRadios("bg-info")}
                        />
                        <i className="ni business_briefcase-24 mr-2">
                          Ngừng Hoạt Động
                        </i>
                        <Button
                          className={classnames("bg-danger mr-6", {
                            active: radios === "bg-danger",
                          })}
                          color=""
                          type="button"
                          onClick={() => setRadios("bg-danger")}
                        />

                        <i className="ni business_briefcase-24 mr-2">
                          Hết Hàng
                        </i>
                        <Button
                          className={classnames("bg-yellow mr-6", {
                            active: radios === "bg-yellow",
                          })}
                          color=""
                          type="button"
                          onClick={() => setRadios("bg-yellow")}
                        />
                      </ButtonGroup>
                    </div>
                  </div>

                  <div className="pl-lg-4">
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
                </Form>
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
                            <p className=" small text-muted mb-0" data-dz-size>
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
              </CardBody>
            </Card>
            <Button className="ml-4 mt-4" color="primary" type="submit">
              LƯU SẢN PHẨM
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditProduct;
