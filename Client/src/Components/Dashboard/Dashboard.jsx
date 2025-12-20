import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser, FaShoppingBag, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Dashboard() {
  // ✅ Redux data
  const wishlistItems = useSelector((state) => state.wishlist?.wishlist || []);
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const orders = useSelector((state) => state.orders?.orders || []);

  // ✅ Static user (later API/auth se laa sakte ho)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+8801811122222",
  });

  // ✅ Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes
  const handleSave = () => {
    setUser(formData); // ✅ Update user data
    setIsEditing(false);
  };

  return (
    <div style={styles.container}>
      {/* Breadcrumb */}
      <div style={styles.breadcrumb}>
        <Link to="/" style={styles.breadcrumbLink}>Home</Link> /{" "}
        <span style={styles.breadcrumbCurrent}>Dashboard</span>
      </div>

      {/* Dashboard Header */}
      <h1 style={styles.header}>User Dashboard</h1>

      <div style={styles.gridContainer}>
        {/* Account Details */}
        <div style={styles.accountSection}>
          <h3 style={styles.sectionTitle}>
            <FaRegUser style={styles.icon} /> Account Details
          </h3>

          <div style={styles.sectionContent}>
            {isEditing ? (
              <>
                <p style={styles.text}>
                  <span style={styles.textBold}>Name:</span>{" "}
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </p>
                <p style={styles.text}>
                  <span style={styles.textBold}>Email:</span>{" "}
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </p>
                <p style={styles.text}>
                  <span style={styles.textBold}>Phone:</span>{" "}
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </p>
              </>
            ) : (
              <>
                <p style={styles.text}><span style={styles.textBold}>Name:</span> {user.name}</p>
                <p style={styles.text}><span style={styles.textBold}>Email:</span> {user.email}</p>
                <p style={styles.text}><span style={styles.textBold}>Phone:</span> {user.phone}</p>
              </>
            )}
          </div>

          {isEditing ? (
            <button onClick={handleSave} style={styles.button}>Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)} style={styles.button}>Edit Profile</button>
          )}
        </div>

        {/* Recent Orders */}
        <div style={styles.ordersSection}>
          <h3 style={styles.sectionTitle}>
            <FaShoppingBag style={styles.icon} /> Recent Orders
          </h3>
          {orders.length === 0 ? (
            <p style={styles.text}>No recent orders.</p>
          ) : (
            <div style={styles.orderList}>
              {orders.slice(-2).map((order, index) => (
                <div key={index} style={styles.orderItem}>
                  <div>
                    <p style={styles.textBold}>#{order.id}</p>
                    <p style={styles.text}>{order.date}</p>
                  </div>
                  <div style={styles.orderDetails}>
                    <p style={styles.textBold}>${order.total.toFixed(2)}</p>
                    <p style={styles.text}>{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link to="/orders" style={styles.button}>View All Orders</Link>
        </div>

        {/* Wishlist Summary */}
        <div style={styles.wishlistSection}>
          <h3 style={styles.sectionTitle}>
            <FaHeart style={styles.icon} /> Wishlist
          </h3>
          {wishlistItems.length === 0 ? (
            <p style={styles.text}>Your wishlist is empty.</p>
          ) : (
            <div style={styles.wishlistGrid}>
              {wishlistItems.map((item) => (
                <div key={item.id} style={styles.wishlistItem}>
                  <p style={styles.textBold}>{item.name}</p>
                  <p style={styles.text}>${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
          <Link to="/wishlist" style={styles.button}>View Wishlist</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#fff",
    padding: "40px 140px",
    boxSizing: "border-box",
  },
  breadcrumb: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "40px",
  },
  breadcrumbLink: {
    color: "#9ca3af",
    textDecoration: "none",
  },
  breadcrumbCurrent: {
    color: "#000",
  },
  header: {
    fontSize: "36px",
    fontWeight: "600",
    marginBottom: "32px",
  },
  gridContainer: {
    maxWidth: "1152px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "24px",
  },
  accountSection: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    padding: "24px",
  },
  ordersSection: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    padding: "24px",
    gridColumn: "span 2",
  },
  wishlistSection: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    padding: "24px",
    gridColumn: "span 3",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  icon: {
    color: "#ef4444",
    fontSize: "20px",
  },
  sectionContent: {
    marginBottom: "16px",
  },
  text: {
    fontSize: "14px",
    color: "#6b7280",
    margin: "8px 0",
  },
  textBold: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#000",
  },
  input: {
    padding: "6px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginLeft: "6px",
    fontSize: "14px",
  },
  button: {
    display: "inline-block",
    backgroundColor: "#ef4444",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "4px",
    textDecoration: "none",
    transition: "background-color 0.3s",
    cursor: "pointer",
    marginTop: "10px",
  },
  orderList: {
    marginBottom: "16px",
  },
  orderItem: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "8px",
    borderBottom: "1px solid #e5e7eb",
    marginBottom: "8px",
  },
  orderDetails: {
    textAlign: "right",
  },
  wishlistGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "16px",
  },
  wishlistItem: {
    border: "1px solid #e5e7eb",
    borderRadius: "4px",
    padding: "16px",
  },
};
