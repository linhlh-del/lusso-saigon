import heroBg from "../assets/images/content-main_1728x960.png";
import logo1 from "../assets/images/icon-lusso-saigon_3_724x159.png";
import logo2 from "../assets/images/logo-lusso_724x198.png";

export default function Hero() {
  return (
    <div
      style={{
        height: 960,
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "flex-end",
        paddingTop: 200,
        paddingRight: 432,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        <img src={logo1} style={{ width: 300 }} />
        <img src={logo2} style={{ width: 300 }} />
      </div>
    </div>
  );
}
