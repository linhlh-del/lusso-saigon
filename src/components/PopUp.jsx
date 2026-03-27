import React, { useState } from "react";
import styles from "../styles/PopUp.module.css";

export default function PopUp({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Đăng ký thành công!");
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={onClose}></div>

      {/* Modal */}
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <div className={styles.container}>
          {/* Logo */}
          <img
            src="/src/assets/images/logo-lusso-saigon.png"
            alt="Lusso Saigon"
            className={styles.logo}
          />

          {/* Title */}
          <h2>NHẬN BẢNG GIÁ VÀ CHÍNH SÁCH MỚI NHẤT LUSSO SAIGON</h2>

          <p>
            Để tiết kiệm thời gian tìm hiểu dự án, vui lòng để lại thông tin.
            Chuyên viên sẽ liên hệ ngay cho bạn.
          </p>

          {/* FORM */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Họ và tên *"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại *"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Nội dung / Lời nhắn"
              value={form.message}
              onChange={handleChange}
            />

            <button type="submit">ĐĂNG KÝ</button>
          </form>
        </div>
      </div>
    </>
  );
}
