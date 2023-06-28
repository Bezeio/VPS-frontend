import React, { useEffect, useState } from "react";
import {
  // Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import Select2 from "react-select2-wrapper";
import TagsInput from "components/TagsInput/TagsInput.js";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import "dropzone/dist/dropzone.css";

const AddProduct = () => {
  const [tagsinput, setTagsinput] = useState([
    "Bucharest",
    "Cluj",
    "Iasi",
    "Timisoara",
    "Piatra Neamt",
  ]);
  const [reactQuillText, setReactQuillText] = React.useState("");

  return (
    <>
      <Container className="mt--12" fluid>
        <Col className="order-xl-1 mt-4" xl="12">
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Thêm sản phẩm</h3>
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
                          id="input-last-name"
                          placeholder="VND"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <div className="pl-lg-4">
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-address"
                        >
                          Tình trạng sản phẩm
                        </label>
                        <div
                          style={{
                            backgroundColor: "white",
                            color: "black",
                            border: "1px solid #ccc",
                          }}
                        >
                          <TagsInput
                            onlyUnique
                            className="bootstrap-tagsinput"
                            onChange={(value) => setTagsinput(value)}
                            value={tagsinput}
                            tagProps={{ className: "tag badge mr-1" }}
                            inputProps={{
                              className: "",
                              placeholder: "",
                            }}
                          />
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
                  <label className="form-control-label">Thêm hình ảnh</label>
                  <div className="custom-file">
                    <input
                      className="custom-file-input"
                      id="customFileLang"
                      lang="en"
                      type="file"
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="customFileLang"
                    >
                      Select file
                    </label>
                  </div>
                </div>
              </Form>
              <Button className="ml-4 mt-4" color="primary" type="submit">
                LƯU SẢN PHẨM
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default AddProduct;
