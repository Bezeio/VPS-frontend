import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetailData, setOrderDetailData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  const fetchCustomerData = async () => {
    if (orderDetailData.length === 0 || orderData.length === 0) return;

    try {
      const response = await axios.get(
        `https://localhost:7050/api/Customer/${orderData.customerId}`
      );
      setCustomerData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  useEffect(() => {
    const fetchOrderDetailData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7050/api/OrderDetail/listbyod?id=${orderId}`
        );
        setOrderDetailData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching order detail data:", error);
      }
    };

    const fetchOrderData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7050/api/Order/${orderId}`
        );
        setOrderData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderDetailData();
    fetchOrderData();
  }, [orderId]);

  useEffect(() => {
    fetchCustomerData();
  }, [orderDetailData, orderData]);

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
                    Order no. <b>#{orderData.orderId}</b> from{" "}
                    <b>
                      {new Date(orderData.orderDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </b>
                  </p>
                  <p className="text-sm">
                    Shipped date:{" "}
                    <b>
                      {new Date(orderData.shippedDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </b>
                  </p>
                </div>
                <a href="" className="btn ms-auto mb-0 bg-gradient-success">
                  Xác nhận
                </a>
              </div>
            </div>
            <div className="card-body p-3 pt-0">
              <div className="row d-flex justify-content-between mb-4 mt-2">
                <div className="col-lg-5 col-md-6 col-12 ml-2">
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
                        <i className="ni ni-cart"></i>
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
                <div className="col-lg-6 col-md-6 col-12">
                  <h3 className="mb-3">Thông tin của đơn hàng</h3>

                  <ul className="list-group">
                    <li className="list-group-item border-0 d-flex mb-2 bg-gradient-success border-radius-lg">
                      <div className="d-flex flex-column text-white">
                        <h3 className="mb-3 text-white">
                          {customerData.fullName}
                        </h3>
                        <span className="mb-2 text-sm text-white">
                          Địa chỉ:{" "}
                          <span className="text-white ms-2 font-weight-bold">
                            {customerData.address}
                          </span>
                        </span>
                        <span className="mb-2 text-sm text-white">
                          Số dư:{" "}
                          <span className="text-white ms-2 font-weight-bold">
                            {customerData.balance} VND
                          </span>
                        </span>
                        <span className="text-sm">
                          Số điện thoại:{" "}
                          <span className="text-white ms-2 font-weight-bold">
                            {customerData.phone}
                          </span>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <hr className="horizontal dark my-1" />
              {orderDetailData.map((order, index) => (
                <React.Fragment key={order.orderDetailId}>
                  <div className="row d-flex justify-content-between mb-4 mt-2">
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
                        <p className="text-sm mb-3">
                          Được đặt hàng 2 ngày trước
                        </p>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-12">
                      <h3 className="mb-3">Chi tiết</h3>
                      <div className="d-flex justify-content-between">
                        <span className="mb-2 text-sm">Giá sản phẩm:</span>
                        <span className="text-dark font-weight-bold ms-2">
                          {order.unitPrice} VND
                        </span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="mb-2 text-sm">Số lượng:</span>
                        <span className="text-dark font-weight-bold ms-2">
                          {order.quantity}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-sm">Khuyến mãi:</span>
                        <span className="text-dark ms-2 font-weight-bold">
                          {order.discount}
                        </span>
                      </div>
                    </div>
                  </div>
                  {index !== orderData.length - 1 && (
                    <hr className="horizontal dark my-1" />
                  )}
                </React.Fragment>
              ))}
              {/* <hr className="horizontal dark my-1"></hr> */}
              <div className="row mt-4 ml-2">
                <div className="col-lg-12 col-12 ms-auto mr-4">
                  <h3 className="mb-3">Thanh toán</h3>
                  <div className="d-flex justify-content-between mb-4">
                    <span className="text-sm">Tổng tiền hàng: </span>
                    <span className="text-dark ms-2 font-weight-bold">
                      {orderData.price} VND
                    </span>
                  </div>
                  {/* <div className="d-flex justify-content-between">
                    <span className="mb-2 text-sm">Phí vận chuyển:</span>
                    <span className="text-dark ms-2 font-weight-bold">$14</span>
                  </div> */}
                  <div className="d-flex justify-content-between">
                    <span className="text-sm">Phí vận chuyển:</span>
                    <span className="text-dark ms-2 font-weight-bold">
                      15000 VND
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                    <span className="mb-2 text-lg">Tổng thanh toán:</span>
                    <span className="text-dark text-lg ms-2 font-weight-bold">150000VND</span>
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
