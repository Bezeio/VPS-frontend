import React, { useEffect, useRef, useState } from "react";
// react plugin that prints a given react component
import ReactToPrint from "react-to-print";
// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Badge,
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import axios from "axios";

const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: false,
  sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
    <div className="dataTables_length" id="datatable-basic_length">
      <label>
        Show{" "}
        {
          <select
            name="datatable-basic_length"
            aria-controls="datatable-basic"
            className="form-control form-control-sm"
            onChange={(e) => onSizePerPageChange(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        }{" "}
        entries.
      </label>
    </div>
  ),
});


const { SearchBar } = Search;

const Accounts = () => {
  const [alert, setAlert] = useState(null);
  const componentRef = useRef(null);
  const [data, setData] = useState([]);

  // this function will copy to clipboard an entire table,
  // so you can paste it inside an excel or csv file
  const copyToClipboardAsTable = (el) => {
    var body = document.body,
      range,
      sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
      document.execCommand("copy");
    } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
      range.execCommand("Copy");
    }
    setAlert(
      <ReactBSAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Good job!"
        onConfirm={() => setAlert(null)}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="info"
        btnSize=""
      >
        Copied to clipboard!
      </ReactBSAlert>
    );
  };
  useEffect(()=>{
    fetchData()
  },[])
  const fetchData = async() =>{
    try {
      const response = await axios.get("https://localhost:7050/api/Customer/list");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  return (
    <>
      {alert}
      <SimpleHeader name="React Tables" parentName="Tables" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <h3 className="mb-0">Danh sách khách hàng</h3>
              </CardHeader>
              <ToolkitProvider
                data={data}
                keyField="customerId"
                columns={[
                  {
                    dataField: "customerId",
                    text: "Id",
                    sort: true,
                    formatter: (cell) =>{
                      return `# ${cell}`
                    }
                  },
                  {
                    dataField: "fullName",
                    text: "Họ tên",
                    sort: true,
                  },
                  // {
                  //   dataField: "email",
                  //   text: "Email",
                  //   sort: true,
                  // },
                  {
                    dataField: "phone",
                    text: "Số điện thoại",
                    sort: true,
                  },
                  {
                    dataField: "address",
                    text: "Địa chỉ",
                    sort: true,
                  },
                  {
                    dataField: "balance",
                    text: "Số dư",
                    sort: true,
                    formatter: (cell) =>{
                      return `${cell} VND`
                    }
                  },
                  {
                    dataField: "status",
                    text: "Tình trạng",
                    sort: true,
                    formatter: (cell, row) => {
                      return row.status ? (
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-success" />
                            <span className="status">active</span>
                          </Badge>
                      ) : <Badge color="" className="badge-dot mr-4">
                      <i className="bg-warning" />
                      <span className="status">inactive</span>
                    </Badge>;
                    },
                  },
                ]}
                search
              >
                {(props) => (
                  <div className="py-4 table-responsive">
                    <Container fluid>
                      <Row>
                        <Col xs={12} sm={6}>
                          <ButtonGroup>
                            <Button
                              className="buttons-copy buttons-html5"
                              color="default"
                              size="sm"
                              id="copy-tooltip"
                              onClick={() =>
                                copyToClipboardAsTable(
                                  document.getElementById("react-bs-table")
                                )
                              }
                            >
                              <span>Copy</span>
                            </Button>
                            <ReactToPrint
                              trigger={() => (
                                <Button
                                  color="default"
                                  size="sm"
                                  className="buttons-copy buttons-html5"
                                  id="print-tooltip"
                                >
                                  Print
                                </Button>
                              )}
                              content={() => componentRef.current}
                            />
                          </ButtonGroup>
                          <UncontrolledTooltip
                            placement="top"
                            target="print-tooltip"
                          >
                            This will open a print page with the visible rows of
                            the table.
                          </UncontrolledTooltip>
                          <UncontrolledTooltip
                            placement="top"
                            target="copy-tooltip"
                          >
                            This will copy to your clipboard the visible rows of
                            the table.
                          </UncontrolledTooltip>
                        </Col>
                        <Col xs={12} sm={6}>
                          <div
                            id="datatable-basic_filter"
                            className="dataTables_filter px-4 pb-1 float-right"
                          >
                            <label>
                              Search:
                              <SearchBar
                                className="form-control-sm"
                                placeholder=""
                                {...props.searchProps}
                              />
                            </label>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                    <BootstrapTable
                      ref={componentRef}
                      {...props.baseProps}
                      bootstrap4={true}
                      pagination={pagination}
                      bordered={false}
                      id="react-bs-table"
                    />
                  </div>
                )}
              </ToolkitProvider>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Accounts;
