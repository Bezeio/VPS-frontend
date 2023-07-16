import React, { useEffect, useRef, useState } from "react";
// javascript plugin that creates a sortable object from a dom object
import List from "list.js";
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NotificationAlert from "react-notification-alert";

const Order = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedColumn, setSortedColumn] = useState("");
  const [sortedDirection, setSortedDirection] = useState("");
  const itemsPerPage = 5;

  const thirdListRef = useRef(null);
  const [data, setData] = useState([]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex);
  const notificationAlertRef = React.useRef(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://localhost:7050/api/Order/list");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (data.length > 0) {
      initializeList();
    }
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [data, currentPage]);

  const initializeList = () => {
    new List(thirdListRef.current, {
      valueNames: ["date", "status", "customer", "address", "price"],
      listClass: "list",
    });
  };
  useEffect(() => {
    if (data.length > 0) {
      initializeList();
    }
  }, [data]);
  useEffect(() => {
    fetchData();
  }, []);

  const deleteData = async () => {
    if (selectedOrderId) {
      try {
        await axios.delete(
          `https://localhost:7050/api/Order/${selectedOrderId}`
        );
        notifySuccess();
        fetchData();
        toggleDeleteModal();
      } catch (error) {
        notifyDanger();
        console.error("Error deleting data:", error);
      }
    }
  };

  const handleSort = (column) => {
    let direction = "asc";
    if (column === sortedColumn && sortedDirection === "asc") {
      direction = "desc";
    }
    setSortedColumn(column);
    setSortedDirection(direction);
    sortData(column, direction);
    setCurrentPage(1); // Reset current page when sorting
  };

  const notifySuccess = () => {
    let options = {
      place: "tc",
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {" "}
            Xóa đơn hàng thành công
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
            Xóa đơn hàng thất bại!
          </span>
          <span data-notify="message"> Vui lòng kiểm tra lại đường truyền</span>
        </div>
      ),
      type: "danger",
      icon: "ni ni-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  const sortData = (column, direction) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const valueA = getValueByColumn(a, column);
      const valueB = getValueByColumn(b, column);
      if (valueA < valueB) {
        return direction === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };
  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const confirmDelete = (orderId) => {
    setSelectedOrderId(orderId);
    toggleDeleteModal();
  };

  const getValueByColumn = (item, column) => {
    switch (column) {
      case "date":
        return item.orderDate;
      case "status":
        return item.status;
      case "customer":
        return item.customer.fullName;
      case "address":
        return item.customer.address;
      case "price":
        return item.price;
      default:
        return "";
    }
  };

  return (
    <>
      <NotificationAlert ref={notificationAlertRef} />
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirmation</ModalHeader>
        <ModalBody>Bạn có chắc muốn xóa đơn hàng này</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteData}>
            Có
          </Button>{" "}
          <Button color="secondary" onClick={toggleDeleteModal}>
            Không
          </Button>
        </ModalFooter>
      </Modal>
      <SimpleHeader name="Orders" parentName="Manager" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card className="bg-default shadow">
              <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
                <Button className="btn-neutral" color="default" size="sm">
                  <Link
                    className="text-shadow"
                    key={currentPage}
                    to="/admin/add-order"
                  >
                    New
                  </Link>
                </Button>
                <Button className="btn-neutral" color="default" size="sm">
                  Filters
                </Button>
              </Col>
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Danh sách đặt hàng</h3>
              </CardHeader>
              <div className="table-responsive" ref={thirdListRef}>
                <Table
                  id="myTable"
                  className="align-items-center table-dark table-flush"
                >
                  <thead className="thead-dark">
                    <tr>
                      <th>Id</th>
                      <th
                        className="sort"
                        data-sort="date"
                        scope="col"
                        onClick={() => handleSort("date")}
                      >
                        Ngày đặt hàng
                      </th>
                      <th
                        className="sort"
                        data-sort="status"
                        scope="col"
                        onClick={() => handleSort("status")}
                      >
                        Tình trạng
                      </th>
                      <th
                        className="sort"
                        data-sort="customer"
                        scope="col"
                        onClick={() => handleSort("customer")}
                      >
                        Khách hàng
                      </th>
                      <th
                        className="sort"
                        data-sort="address"
                        scope="col"
                        onClick={() => handleSort("address")}
                      >
                        Địa chỉ
                      </th>
                      <th
                        className="sort"
                        data-sort="price"
                        scope="col"
                        onClick={() => handleSort("price")}
                      >
                        Giá
                      </th>

                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody className="list">
                    {displayedData.map((order) => (
                      <tr key={order.orderId}>
                        <td className="id">#{order.orderId}</td>
                        <td className="date">
                          {new Date(order.orderDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i
                              className={
                                order.status === 1 ? "bg-warning" : "bg-yellow"
                              }
                            />
                            <span className="status">
                              {order.status === 1
                                ? "Đang xử lý"
                                : "Đang vận chuyển"}
                            </span>
                          </Badge>
                        </td>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                src={require("assets/img/theme/bootstrap.jpg")}
                              />
                            </a>
                            <Media>
                              <span className="customer mb-0 text-sm">
                                {order.customer.fullName}
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td className="product">{order.customer.address}</td>
                        <td className="price">{order.price} VND</td>

                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              color=""
                              role="button"
                              size="sm"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <Link
                                to={`/admin/order-details/${order.orderId}`}
                              >
                                <DropdownItem>View</DropdownItem>
                              </Link>
                              <DropdownItem
                                onClick={() => confirmDelete(order.orderId)}
                              >
                                Delete
                              </DropdownItem>
                              <Link to={`/admin/edit-order/${order.orderId}`}>
                                <DropdownItem>Edit</DropdownItem>
                              </Link>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination className="pagination justify-content-end mb-0">
                    <PaginationItem disabled={currentPage === 1}>
                      <PaginationLink
                        previous
                        onClick={() => setCurrentPage(currentPage - 1)}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <PaginationItem
                          key={page}
                          active={currentPage === page}
                        >
                          <PaginationLink onClick={() => setCurrentPage(page)}>
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                    <PaginationItem disabled={currentPage === totalPages}>
                      <PaginationLink
                        next
                        onClick={() => setCurrentPage(currentPage + 1)}
                      />
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Order;
