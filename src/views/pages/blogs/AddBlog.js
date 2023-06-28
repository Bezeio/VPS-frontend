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
} from "reactstrap";
// core components
// import ProfileHeader from "components/Headers/ProfileHeader.js";
import "quill/dist/quill.snow.css"; // Import Quill styles
import "dropzone/dist/dropzone.css";
import ReactQuill from "react-quill";
import ReactDatetime from "react-datetime";

// import Dropzone from "dropzone";

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
                    <Col lg="6">
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
              </Form>
              <Button className="ml-4 mt-4" color="primary" type="submit">
                LƯU BÀI VIẾT
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default AddBlog;
