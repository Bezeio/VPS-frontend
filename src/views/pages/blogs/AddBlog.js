import React, { useEffect, useState } from "react";

// reactstrap components
import {
  // Button,
  Card,
  CardHeader,
  CardBody,
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
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
// core components
// import ProfileHeader from "components/Headers/ProfileHeader.js";
import "quill/dist/quill.snow.css"; // Import Quill styles
import "dropzone/dist/dropzone.css";
import ReactQuill from "react-quill";
import ReactDatetime from "react-datetime";
import Dropzone from "dropzone";

const AddBlog = () => {
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
  const [reactQuillText, setReactQuillText] = React.useState("");
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
  return (
    <>
      <Container className="mt--12" fluid>
        <Col className="order-xl-1 mt-4" xl="12">
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Thêm bài viết</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Tiêu đề
                        </label>
                        <Input
                          id="input-username"
                          placeholder="Name of product"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    
                  </Row>
                </div>

                <div className="pl-lg-4">
                <Row className="input-daterange datepicker align-items-center">
                      <Col xs={12} sm={6}>
                        <label className=" form-control-label">
                          Ngày bắt đầu
                        </label>
                        <FormGroup>
                          <ReactDatetime
                            inputProps={{
                              placeholder: "Date Picker Here",
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
                          <ReactDatetime
                            inputProps={{
                              placeholder: "Date Picker Here",
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
                </div>

                <div className="pl-lg-4">
                  <FormGroup>
                    <label className="form-control-label">Nội dung</label>
                  <Form>
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
                  </Form>
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
                LƯU BÀI VIẾT
              </Button>
              </Form>
              
            </CardBody>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default AddBlog;
