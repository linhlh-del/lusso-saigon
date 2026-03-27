import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Overview from "./components/Overview";
import GetInformation from "./components/GetInfor";
import ImgWorldhotel from "./components/ImgWorldHotel";
import Position from "./components/Position";
import TienIch from "./components/TienIch";
import MatBang from "./components/MatBang";
import CanHo from "./components/CanHo";
import ChinhSachBanHang from "./components/Chinhsachbanhang";
import NhaMau from "./components/NhaMau";
import TienDo from "./components/TienDo";
import GetInformation2 from "./components/GetInfor2";
import PopUp from "./components/PopUp";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";

function App() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <FloatingButtons />
      <Header onOpenModal={openModal} />
      <Hero />
      <Overview />
      <GetInformation />
      <ImgWorldhotel />
      <Position />
      <GetInformation />
      <TienIch onOpenModal={openModal} />
      <MatBang />
      <GetInformation />
      <CanHo onOpenModal={openModal} />
      <ChinhSachBanHang />
      <GetInformation />
      <NhaMau />
      <TienDo />
      <GetInformation2 />
      <Footer />
      <PopUp isOpen={showModal} onClose={closeModal} />
    </div>
  );
}

export default App;
