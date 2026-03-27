import React, { useState } from "react";
import styles from "../styles/CanHo.module.css";
import arrowIcon from "../assets/images/arrow-icon.png";

export default function CanHo({ onOpenModal }) {
  const [activeTab, setActiveTab] = useState("1pn");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Image arrays for each apartment type
  const images = {
    "1pn": [
      "/src/assets/images/canho/1PN/Prime_1PN.png",
      "/src/assets/images/canho/1PN/Prime_Plus_1PN_plus-Layout_1.png",
      "/src/assets/images/canho/1PN/Prime_Plus_1PN_plus-Layout_2.png",
    ],
    "2pn": [
      "/src/assets/images/canho/2PN/Grand_Residences_2PN_2WC-Layout_1.png",
      "/src/assets/images/canho/2PN/Grand_Residences_2PN_2WC-Layout_2.png",
      "/src/assets/images/canho/2PN/Grand_Residences_2PN_2WC-Layout_3.png",
      "/src/assets/images/canho/2PN/Grand_Residences_2PN_2WC-Layout_4.png",
      "/src/assets/images/canho/2PN/Residences_2PN_1WC.png",
    ],
    "3pn": [
      "/src/assets/images/canho/3PN/Signature_3PN-Layout_1.png",
      "/src/assets/images/canho/3PN/Signature_3PN-Layout_2.png",
      "/src/assets/images/canho/3PN/Signature_3PN-Layout_3.png",
      "/src/assets/images/canho/3PN/Sky_Villa_3PN.png",
    ],
    "4pn": [
      "/src/assets/images/canho/4PN/Sky_Signature_4PN.png",
      "/src/assets/images/canho/4PN/Sky_Villa_4PN.png",
    ],
  };

  const currentImages = images[activeTab];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? currentImages.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === currentImages.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Title */}
        <div className={styles.header}>
          <h2>THIẾT KẾ CĂN HỘ LUSSO SAIGON</h2>
          <p>Đa dạng loại hình căn hộ · Tư vấn bởi chuyên viên Rever.vn</p>
        </div>

        {/* Image Carousel */}
        <div className={styles.carouselWrapper}>
          {/* Tabs Below Image */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === "1pn" ? styles.active : ""}`}
              onClick={() => handleTabClick("1pn")}
            >
              Căn hộ 1PN
            </button>
            <button
              className={`${styles.tab} ${activeTab === "2pn" ? styles.active : ""}`}
              onClick={() => handleTabClick("2pn")}
            >
              Căn hộ 2PN
            </button>
            <button
              className={`${styles.tab} ${activeTab === "3pn" ? styles.active : ""}`}
              onClick={() => handleTabClick("3pn")}
            >
              Căn hộ 3PN
            </button>
            <button
              className={`${styles.tab} ${activeTab === "4pn" ? styles.active : ""}`}
              onClick={() => handleTabClick("4pn")}
            >
              Căn hộ 4PN
            </button>
          </div>

          <div
            className={styles.imageWrapper}
            style={{
              backgroundImage: `url(${currentImages[currentIndex]})`,
            }}
          >
            {/* Navigation Arrows */}
            <button
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={handlePrev}
            >
              <img
                src={arrowIcon}
                alt="prev"
                style={{ transform: "scaleX(1)" }}
              />
            </button>
            <button
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={handleNext}
              style={{ transform: "scaleX(-1)" }}
            >
              <img src={arrowIcon} alt="next" />
            </button>

            {/* Dots */}
            <div className={styles.dots}>
              {currentImages.map((_, index) => (
                <span
                  key={index}
                  className={index === currentIndex ? styles.activeDot : ""}
                  onClick={() => setCurrentIndex(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>

        {/* Button */}
        <div className={styles.cta}>
          <button onClick={() => onOpenModal && onOpenModal()}>
            NHẬN BÁO GIÁ CHI TIẾT
          </button>
        </div>
      </div>
    </section>
  );
}
