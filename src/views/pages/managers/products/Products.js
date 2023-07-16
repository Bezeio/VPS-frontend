import React, { useEffect, useRef, useState } from "react";
import List from "list.js";
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
  Progress,
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
import SimpleHeader from "components/Headers/SimpleHeader.js";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NotificationAlert from "react-notification-alert";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedColumn, setSortedColumn] = useState("");
  const [sortedDirection, setSortedDirection] = useState("");
  const itemsPerPage = 5;

  const firstListRef = useRef(null);
  const [data, setData] = useState([]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex);
  const [selecteProductId, setSelecteProductId] = useState(null);
  const notificationAlertRef = useRef(null);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      initializeList();
    }
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [data, currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://localhost:7050/api/Product");
      setData(response.data);
      setCurrentPage(1); // Reset current page when fetching new data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const notifySuccess = () => {
    let options = {
      place: "tc",
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {" "}
            Xóa sản phẩm thành công
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
            Xóa sản phẩm thất bại!
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

  const deleteData = async () => {
    if (selecteProductId) {
      try {
        await axios.delete(
          `https://localhost:7050/api/Product/${selecteProductId}`
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

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const confirmDelete = (productId) => {
    setSelecteProductId(productId);
    toggleDeleteModal();
  };
  const initializeList = () => {
    new List(firstListRef.current, {
      valueNames: [
        "name",
        "brand",
        "budget",
        "status",
        "category",
        "completion",
      ],
      listClass: "list",
    });
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

  const getValueByColumn = (item, column) => {
    switch (column) {
      case "name":
        return item.productName;
      case "brand":
        return item.brand;
      case "budget":
        return item.unitPrice;
      case "status":
        return item.status.statusId;
      case "category":
        return item.category.categoryName;
      case "completion":
        return item.quality;
      default:
        return "";
    }
  };

  return (
    <>
      <NotificationAlert ref={notificationAlertRef} />
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirmation</ModalHeader>
        <ModalBody>Bạn có chắc muốn xóa sản phẩm này</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteData}>
            Có
          </Button>{" "}
          <Button color="secondary" onClick={toggleDeleteModal}>
            Không
          </Button>
        </ModalFooter>
      </Modal>
      <SimpleHeader name="Products" parentName="Manager" />

      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
                <Button className="btn-neutral" color="default" size="sm">
                  <Link key={currentPage} to="../admin/add-product">
                    Thêm sản phẩm
                  </Link>
                </Button>
                <Button className="btn-neutral" color="default" size="sm">
                  Lọc sản phẩm
                </Button>
              </Col>
              <CardHeader className="border-0">
                <h3 className="mb-0">Danh sách sản phẩm</h3>
              </CardHeader>
              {data.length > 0 ? (
                <div className="table-responsive" ref={firstListRef}>
                  <Table className="align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th
                          className="sort"
                          data-sort="name"
                          scope="col"
                          onClick={() => handleSort("name")}
                        >
                          Sản phẩm
                        </th>
                        <th
                          className="sort"
                          data-sort="brand"
                          scope="col"
                          onClick={() => handleSort("brand")}
                        >
                          Nhãn hiệu
                        </th>
                        <th
                          className="sort"
                          data-sort="budget"
                          scope="col"
                          onClick={() => handleSort("budget")}
                        >
                          Giá
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
                          data-sort="category"
                          scope="col"
                          onClick={() => handleSort("category")}
                        >
                          Phân loại
                        </th>
                        <th
                          className="sort"
                          data-sort="completion"
                          scope="col"
                          onClick={() => handleSort("completion")}
                        >
                          Đánh giá
                        </th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody className="list">
                      {displayedData.map((product) => (
                        <tr key={product.productId}>
                          <th scope="row">
                            <Media className="align-items-center">
                              <a
                                className="avatar rounded-circle mr-3"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  alt="Image..."
                                  src={product.image}
                                />
                              </a>
                              <Media>
                                <span className="name mb-0 text-sm">
                                  {product.productName}
                                </span>
                              </Media>
                            </Media>
                          </th>
                          <td className="brand">{product.brand}</td>
                          <td className="budget">{product.unitPrice} VND</td>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i
                                className={
                                  product.status.statusId === 1
                                    ? "bg-success"
                                    : product.status.statusId === 2
                                    ? "bg-warning"
                                    : product.status.statusId === 3
                                    ? "bg-yellow"
                                    : "bg-gray"
                                }
                              />
                              <span className="status">
                                {product.status.statusId === 1
                                  ? "Hoạt động"
                                  : product.status.statusId === 2
                                  ? "Ngừng hoạt động"
                                  : product.status.statusId === 3
                                  ? "Còn hàng"
                                  : "Hết hàng"}
                              </span>
                            </Badge>
                          </td>

                          <td className="category">
                            {product.category.categoryName}
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="completion mr-2">
                                {product.quality}/10
                              </span>
                              <div>
                                <Progress
                                  max="10"
                                  value={product.quality}
                                  color="warning"
                                />
                              </div>
                            </div>
                          </td>
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
                              <DropdownMenu
                                className="dropdown-menu-arrow"
                                right
                              >
                                <Link
                                  to={`/admin/edit-product/${product.productId}`}
                                >
                                  <DropdownItem>Edit</DropdownItem>
                                </Link>
                                <DropdownItem
                                  onClick={() =>
                                    confirmDelete(product.productId)
                                  }
                                >
                                  Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div>Loading...</div>
              )}
              <CardFooter className="py-4 bg-transparent">
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

export default Products;
