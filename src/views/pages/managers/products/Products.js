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
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Products() {
  const firstListRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      initializeList();
    }
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://localhost:7050/api/Product");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const initializeList = () => {
    new List(firstListRef.current, {
      valueNames: ["name", "brand", "budget", "status", "category", "completion"],
      listClass: "list",
    });
  };

  return (
    <>
      <SimpleHeader name="Sortable Tables" parentName="Tables" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-0">Danh sách sản phẩm</h3>
              </CardHeader>
              {data.length > 0 ? (
                <div className="table-responsive" ref={firstListRef}>
                  <Table className="align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th className="sort" data-sort="name" scope="col">
                          Sản phẩm
                        </th>
                        <th className="sort" data-sort="brand" scope="col">
                          Nhãn hiệu 
                        </th>
                        <th className="sort" data-sort="budget" scope="col">
                          Giá 
                        </th>
                        <th className="sort" data-sort="status" scope="col">
                          Tình trạng
                        </th>
                        <th className="sort" data-sort="category" scope="col">
                          Phân loại
                        </th>
                        <th className="sort" data-sort="completion" scope="col">
                          Đánh giá
                        </th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody className="list">
                      {data.map((product) => (
                        <tr key={product.productId}>
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
                            <i className={product.status.statusName === "Hoạt Động" ? "bg-success" : "bg-warning"} />
                            <span className="status">{product.status.statusName}</span>
                            </Badge>
                          </td>
                          <td className="category">{product.category.categoryName}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="completion mr-2">60%</span>
                              <div>
                                <Progress
                                  max="100"
                                  value="60"
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
                                <Link to={`/admin/edit-product/${product.productId}`}>
                                <DropdownItem>
                                 Edit
                                </DropdownItem>
                              </Link>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
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
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
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
}

export default Products;
