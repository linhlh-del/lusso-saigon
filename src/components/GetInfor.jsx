import React, { useState } from "react";
import styles from "../styles/getInformation.module.css";

export default function GetInformation() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    product: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone.replace(/\s/g, ""));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Số điện thoại phải có 10 chữ số";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Success - submit form
      console.log("Form submitted:", formData);
      alert("Cảm ơn bạn! Chúng tôi sẽ liên hệ trong thời gian soonest.");
      // Reset form
      setFormData({
        name: "",
        phone: "",
        product: "",
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const isFormValid =
    formData.name.trim() &&
    formData.phone.trim() &&
    validatePhone(formData.phone);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* TEXT */}
        <p className={styles.desc}>
          Quý Anh/Chị điền thông tin bên dưới để nhận tư vấn ngay về tiềm năng
          vị trí của Eaton Park.
        </p>

        {/* FORM */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="name"
              placeholder="Họ tên (*)"
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name}</span>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại (*)"
              className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && (
              <span className={styles.errorText}>{errors.phone}</span>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="product"
              placeholder="Quan tâm sản phẩm"
              className={styles.input}
              value={formData.product}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className={`${styles.input} ${styles.button}`}>
            NHẬN THÔNG TIN
          </button>

          {submitted && (
            <div className={styles.successMessage}>
              ✓ Thông tin đã được gửi thành công!
            </div>
          )}
        </form>

        {/* HOTLINE */}
        <div className={styles.hotline}>HOTLINE: 0877191940</div>
      </div>
    </div>
  );
}
