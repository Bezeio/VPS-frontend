import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7050/api/Order/${orderId}`
        );
        setOrderData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="row mb-lg-5">
        <div className="col-lg-8 mx-auto">
          <div className="card my-5">
            <div className="card-header p-3 pb-0">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3>Chi tiết đơn hàng</h3>
                  <p className="text-sm mb-0">
                    Order no. <b>241342</b> from <b>23.02.2021</b>
                  </p>
                  <p className="text-sm">
                    Code: <b>KF332</b>
                  </p>
                </div>
                <a href="" className="btn ms-auto mb-0 bg-gradient-success">
                  Hóa đơn
                </a>
              </div>
            </div>
            <div className="card-body p-3 pt-0">
              {/* <hr class="horizontal dark mt-0 mb-4"></hr> */}
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div>
                    <img
                      src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/smartwatch.jpg"
                      className="avatar avatar-xl me-3"
                      alt="product image"
                    ></img>
                  </div>
                  <div>
                    <h6 className="text-lg mb-0 mt-2">Smart Watch</h6>
                    <p className="text-sm mb-3">Được đặt hàng 2 ngày trước</p>
                  </div>
                </div>
              </div>

              <hr className="horizontal dark my-1"></hr>
              <div className="row mt-4">
                <div className="col-lg-3 col-md-6 col-12">
                  <h3 className="mb-3">Theo dõi đơn hàng</h3>

                  <div className="timeline timeline-one-side">
                    <div className="timeline-block mb-3">
                      <span className="timeline-step">
                        <i className="ni ni-bell-55" />
                      </span>
                      <div className="timeline-content">
                        <h6 className="text-dark text-sm font-weight-bold mb-0">
                          Đơn hàng đã nhận
                        </h6>
                        <p className="text-dark font-weight-bold text-xs mt-1 mb-0 ">
                          22 DEC 7:20 AM
                        </p>
                      </div>
                    </div>
                    <div className="timeline-block mb-3">
                      <span className="timeline-step">
                        <i className="ni ni-html5"></i>
                      </span>
                      <div className="timeline-content">
                        <h6 className="text-dark text-sm font-weight-bold mb-0">
                          Tạo đơn hàng #1832412
                        </h6>
                        <p className="text-dark font-weight-bold text-xs mt-1 mb-0">
                          22 DEC 7:21 AM
                        </p>
                      </div>
                    </div>
                    <div className="timeline-block mb-3">
                      <span className="timeline-step">
                        <i className="ni ni-cart"></i>
                      </span>
                      <div className="timeline-content">
                        <h6 className="text-dark text-sm font-weight-bold mb-0">
                          Chuyển phát nhanh
                        </h6>
                        <p className="text-dark font-weight-bold text-xs mt-1 mb-0">
                          22 DEC 8:10 AM
                        </p>
                      </div>
                    </div>
                    <div className="timeline-block mb-3">
                      <span className="timeline-step">
                        <i className="ni ni-check-bold text-success text-gradient"></i>
                      </span>
                      <div className="timeline-content">
                        <h6 className="text-dark text-sm font-weight-bold mb-0">
                          Giao hàng thành công
                        </h6>
                        <p className="text-dark font-weight-bold text-xs mt-1 mb-0">
                          22 DEC 4:54 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-6 col-12">
                  <h3 className="mb-3">Thông tin của đơn hàng</h3>

                  <ul className="list-group">
                    <li className="list-group-item border-0 d-flex mb-2 bg-gradient-success border-radius-lg">
                      <div className="d-flex flex-column">
                        <h6 className="mb-3 text-sm">Oliver Liam</h6>
                        <span className="mb-2 text-sm">
                          Địa chỉ:{" "}
                          <span className="text-dark font-weight-bold ms-2">
                            Viking Burrito
                          </span>
                        </span>
                        <span className="mb-2 text-sm">
                          Email:{" "}
                          <span className="text-dark ms-2 font-weight-bold">
                            oliver@burrito.com
                          </span>
                        </span>
                        <span className="text-sm">
                          Số điện thoại:{" "}
                          <span className="text-dark ms-2 font-weight-bold">
                            FRB1235476
                          </span>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-12 ms-auto">
                  <h3 className="mb-3">Thanh toán</h3>
                  <div className="d-flex justify-content-between">
                    <span className="mb-2 text-sm">Giá sản phẩm:</span>
                    <span className="text-dark font-weight-bold ms-2">
                      {orderData.price} VND
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="mb-2 text-sm">Phí vận chuyển:</span>
                    <span className="text-dark ms-2 font-weight-bold">$14</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-sm">Khuyễn mãi:</span>
                    <span className="text-dark ms-2 font-weight-bold">
                      $1.95
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                    <span className="mb-2 text-lg">Tổng:</span>
                    <span className="text-dark text-lg ms-2 font-weight-bold">
                      $105.95
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
