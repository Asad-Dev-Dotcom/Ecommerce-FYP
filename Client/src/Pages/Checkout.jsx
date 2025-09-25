import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems || []); // ✅ cart se data aa rha hai
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
    saveInfo: false,
  });

  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // ✅ Subtotal cart ke hisaab se
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal - discount + shipping;

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10,15}$/.test(phone);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleApplyCoupon = () => {
    if (couponCode === "DISCOUNT10") {
      setDiscount(subtotal * 0.1);
      alert("Coupon applied! 10% discount.");
    } else {
      setDiscount(0);
      alert("Invalid coupon code.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!isValidEmail(formData.emailAddress)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!isValidPhone(formData.phoneNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }

    console.log("Order placed:", {
      formData,
      paymentMethod,
      cartItems,
      total,
    });

    alert("Order placed successfully!");
  };

  return (
    <div className="min-h-screen">
      {/* ✅ Dynamic Breadcrumb */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-4 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-900">
              Home
            </Link>
            {pathnames.map((name, index) => {
              const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
              const isLast = index === pathnames.length - 1;
              return (
                <React.Fragment key={routeTo}>
                  <span>{">"}</span>
                  {isLast ? (
                    <span className="text-gray-900 font-medium">
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </span>
                  ) : (
                    <Link
                      to={routeTo}
                      className="hover:text-gray-900 capitalize"
                    >
                      {name}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10">
          {/* ✅ Billing Details */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">
                Billing Details
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { label: "Full Name*", name: "fullName", required: true },
                  { label: "Company Name", name: "companyName" },
                  {
                    label: "Street Address*",
                    name: "streetAddress",
                    required: true,
                  },
                  { label: "Apartment, floor, etc.", name: "apartment" },
                  { label: "Town/City*", name: "townCity", required: true },
                  {
                    label: "Phone Number*",
                    name: "phoneNumber",
                    required: true,
                    type: "tel",
                  },
                  {
                    label: "Email Address*",
                    name: "emailAddress",
                    required: true,
                    type: "email",
                  },
                ].map(({ label, name, required, type = "text" }) => (
                  <div key={name}>
                    <label
                      htmlFor={name}
                      className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer"
                    >
                      {label}
                    </label>

                    <input
                      id={name}
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      required={required}
                      className="w-lg px-4 py-3 border-none rounded-lg bg-gray-200 
                      focus:outline-none focus:ring-2 focus:ring-red-500 
                      transition-all duration-300 ease-in-out"
                    />
                  </div>
                ))}

                <div className="flex items-center">
                  <input
                    id="saveInfo"
                    type="checkbox"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-gray-300 accent-red-600 text-white 
                    focus:ring-2 focus:ring-red-500 transition-all duration-200 
                    cursor-pointer"
                  />

                  <label
                    htmlFor="saveInfo"
                    className="ml-3 text-sm text-gray-700 cursor-pointer"
                  >
                    Save this information for faster check-out next time
                  </label>
                </div>
              </form>
            </div>
          </div>

          {/* ✅ Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg p-6">
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span className="font-medium text-gray-900">
                        {item.name}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-6 space-y-3">
                <div className="flex justify-between text-lg font-bold font-quicksand">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex pr-2 justify-between text-lg font-quicksand font-bold">
                  <span>Shipping:</span>
                  <span className="text-green-600">Free</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Discount:</span>
                    <span className="text-red-500">
                      - ${discount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg border-t pt-3">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* ✅ Payment Method */}
              <div className="mt-8 space-y-4">
                {[
                  {
                    id: "bank",
                    label: (
                      <span className="flex items-center space-x-2">
                        <span>Bank</span>
                        <div className="flex space-x-1 ml-2">
                          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                            VISA
                          </div>
                          <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                            MC
                          </div>
                        </div>
                      </span>
                    ),
                  },
                  { id: "cod", label: "Cash on delivery" },
                ].map(({ id, label }) => (
                  <div key={id} className="flex items-center">
                    <input
                      type="radio"
                      id={id}
                      name="payment"
                      value={id}
                      checked={paymentMethod === id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 accent-black border-gray-300 focus:ring-black cursor-pointer"
                    />
                    <label htmlFor={id} className="ml-3">
                      {label}
                    </label>
                  </div>
                ))}
              </div>

              {/* ✅ Coupon Code */}
              <div className="mt-8 flex space-x-3">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-4 py-3 outline-none bg-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="cursor-pointer px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Apply Coupon
                </button>
              </div>

              {/* ✅ Place Order */}
              <button
                onClick={handleSubmit}
                className="cursor-pointer w-full mt-8 px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700  font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
