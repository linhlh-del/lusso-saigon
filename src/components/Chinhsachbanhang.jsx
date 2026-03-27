// ChinhSachBanHang.jsx
import { useState } from "react";
import "../styles/ChinhSachBanHang.css";
import logo1 from "../assets/images/logo-rever.png";
import logo2 from "../assets/images/logo-lusso-saigon.png";
import logo3 from "../assets/images/logo-world-hotels.png";

// ── Dot SVG ──────────────────────────────────────────────────────────────────
const Dot = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 6 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3Z"
      fill="#F1E8CE"
    />
  </svg>
);

// ── Data ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "vay-von", label: "Vay vốn ngân hàng" },
  { id: "chuan-18", label: "Chuẩn 18 tháng" },
  { id: "som-50", label: "Thanh toán sớm 50%" },
  { id: "som-70", label: "Thanh toán sớm 70%" },
];

/**
 * Mỗi milestone:
 *   label       – nhãn thời gian, hiển thị TRÊN đường line
 *   italic      – dòng nhỏ in nghiêng dưới label (optional)
 *   amount      – số tiền / % lớn, hiển thị DƯỚI đường line
 *   note        – ghi chú nhỏ dưới amount
 *   bankNote    – "Ngân hàng giải ngân" (optional)
 *   topNote     – ghi chú nhỏ phía trên label (optional)
 *   extraAmount – % phụ cùng cột (optional)
 *   extraNote   – ghi chú cho extraAmount (optional)
 */
const SOLUTIONS = [
  {
    id: "vay-von",
    title: "PHƯƠNG ÁN 1 : VAY VỐN NGÂN HÀNG - LUSSO F1",
    subtitle: "CHI PHÍ THANH TOÁN 11% CHO ĐẾN KHI NHẬN NHÀ",
    badge: "(*) Hỗ trợ lãi suất 0% trong 20 tháng",
    milestones: [
      {
        label: "TTĐC",
        amount: "50 triệu",
        note: "(Ký TTĐC)",
      },
      {
        label: "T",
        italic: "Trong vòng 7 ngày",
        amount: "11%",
        note: "Ký HĐMB",
        bankNote: "Ngân hàng giải ngân",
      },
      {
        label: "T+15",
        amount: "44%",
        note: "Trong vòng 7 ngày",
        bankNote: "Ngân hàng giải ngân",
      },
      {
        topNote: "Thông báo bàn giao nhà",
        label: "T+540 ngày",
        amount: "31%",
        note: "Thông báo bàn giao nhà",
        extraAmount: "9%",
        extraNote: "Ngân hàng giải ngân",
      },
      {
        topNote: "Thông báo\ncấp sổ hồng",
        label: "",
        amount: "5%",
        note: "Thông báo\ncấp sổ hồng",
      },
    ],
  },
  {
    id: "chuan-18",
    title: "PHƯƠNG ÁN 2 : CHUẨN 18 THÁNG",
    subtitle: "THANH TOÁN THEO TIẾN ĐỘ THI CÔNG",
    badge: "(*) Thanh toán theo đợt linh hoạt",
    milestones: [
      { label: "TTĐC", amount: "50 triệu", note: "(Ký TTĐC)" },
      { label: "T", amount: "10%", note: "Ký HĐMB" },
      { label: "T+6 tháng", amount: "10%", note: "Đợt 2" },
      { label: "T+540 ngày", amount: "65%", note: "Bàn giao nhà" },
      { label: "", amount: "5%", note: "Cấp sổ hồng" },
    ],
  },
  {
    id: "som-50",
    title: "PHƯƠNG ÁN 3 : THANH TOÁN SỚM 50%",
    subtitle: "CHIẾT KHẤU ƯU ĐÃI ĐẾN 3%",
    badge: "(*) Áp dụng chiết khấu 3% khi thanh toán sớm 50%",
    milestones: [
      { label: "TTĐC", amount: "50 triệu", note: "(Ký TTĐC)" },
      { label: "T", amount: "50%", note: "Ký HĐMB" },
      { label: "T+15", amount: "20%", note: "Đợt 2" },
      { label: "T+540 ngày", amount: "25%", note: "Bàn giao nhà" },
      { label: "", amount: "5%", note: "Cấp sổ hồng" },
    ],
  },
  {
    id: "som-70",
    title: "PHƯƠNG ÁN 4 : THANH TOÁN SỚM 70%",
    subtitle: "CHIẾT KHẤU ƯU ĐÃI ĐẾN 5%",
    badge: "(*) Áp dụng chiết khấu 5% khi thanh toán sớm 70%",
    milestones: [
      { label: "TTĐC", amount: "50 triệu", note: "(Ký TTĐC)" },
      { label: "T", amount: "70%", note: "Ký HĐMB" },
      { label: "T+15", amount: "5%", note: "Đợt 2" },
      { label: "T+540 ngày", amount: "20%", note: "Bàn giao nhà" },
      { label: "", amount: "5%", note: "Cấp sổ hồng" },
    ],
  },
];

// ── RoadmapTimeline – FLEXBOX THUẦN, không dùng position:absolute ────────────
// Cấu trúc 5 hàng ngang, mỗi hàng 5 cột equal-width:
//   [topNote row]
//   [label  row]   TTĐC | T     | T+15  | T+540  | (trống)
//   [track  row]   ●────────────────────────────────●
//   [amount row]   50tr | 11%   | 44%   | 31%    | 5%
//   [note   row]   ...  | ...   | ...   | ...    | ...

function RoadmapTimeline({ milestones }) {
  const hasTopNotes = milestones.some((m) => m.topNote);

  return (
    <div className="rm">
      {/* Hàng 1: top-note (chỉ render nếu có) */}
      {hasTopNotes && (
        <div className="rm__row rm__row--top">
          {milestones.map((m, i) => (
            <div key={i} className="rm__col">
              {m.topNote
                ? m.topNote.split("\n").map((line, j) => (
                    <span key={j}>
                      {line}
                      <br />
                    </span>
                  ))
                : null}
            </div>
          ))}
        </div>
      )}

      {/* Hàng 2: label + italic */}
      <div className="rm__row rm__row--label">
        {milestones.map((m, i) => (
          <div key={i} className="rm__col">
            {m.label && <span className="rm__label">{m.label}</span>}
            {m.italic && <span className="rm__italic">{m.italic}</span>}
          </div>
        ))}
      </div>

      {/* Hàng 3: đường line + dots */}
      <div className="rm__track">
        <div className="rm__line" />
        {milestones.map((_, i) => (
          <div key={i} className="rm__col rm__col--dot">
            <span className="rm__dot">
              <Dot />
            </span>
          </div>
        ))}
      </div>

      {/* Hàng 4: amount chính + extraAmount */}
      <div className="rm__row rm__row--amount">
        {milestones.map((m, i) => (
          <div key={i} className="rm__col">
            <span className="rm__amount">{m.amount}</span>
            {m.extraAmount && (
              <span className="rm__amount rm__amount--extra">
                {m.extraAmount}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Hàng 5: note + bankNote + extraNote */}
      <div className="rm__row rm__row--note">
        {milestones.map((m, i) => (
          <div key={i} className="rm__col">
            <span className="rm__note">
              {m.note.split("\n").map((line, j, arr) => (
                <span key={j}>
                  {line}
                  {j < arr.length - 1 && <br />}
                </span>
              ))}
            </span>
            {m.bankNote && <span className="rm__bank">{m.bankNote}</span>}
            {m.extraNote && <span className="rm__bank">{m.extraNote}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SolutionSlide ─────────────────────────────────────────────────────────────
function SolutionSlide({ solution }) {
  return (
    <div className="csb__solution">
      <div className="csb__solution-header">
        <h3 className="csb__solution-title">{solution.title}</h3>
        <p className="csb__solution-subtitle">{solution.subtitle}</p>
      </div>

      <RoadmapTimeline milestones={solution.milestones} />

      <div className="csb__badge">
        <span>{solution.badge}</span>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ChinhSachBanHang() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const activeSolution = SOLUTIONS.find((s) => s.id === activeTab);

  return (
    <section className="csb" id="chinh-sach">
      <div className="csb__inner">
        {/* Logo row – 3 đối tác */}
        <div className="csb__logos">
          <div className="csb__logo-item">
            <img src={logo1} alt="Rever" />
          </div>
          <div className="csb__logo-item">
            <img src={logo2} alt="Lusso Saigon" />
          </div>
          <div className="csb__logo-item">
            <img src={logo3} alt="World Hotels" />
          </div>
        </div>

        {/* Content */}
        <div className="csb__content">
          {/* Title + price */}
          <div className="csb__title-block">
            <h2 className="csb__title">CHÍNH SÁCH BÁN HÀNG</h2>
            <div className="csb__price-row">
              <span className="csb__price-label">GIÁ CHỈ TỪ</span>
              <span className="csb__price-number">48</span>
              <span className="csb__price-unit">TRIỆU/M²</span>
            </div>
          </div>

          {/* Tabs + solution */}
          <div className="csb__solutions">
            <div className="csb__tabs">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={`csb__tab${activeTab === tab.id ? " csb__tab--active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="csb__slide-window">
              <SolutionSlide key={activeTab} solution={activeSolution} />
            </div>
          </div>

          {/* Footnote */}
          <div className="csb__footnote">
            <p>
              (*) Chính sách được áp dụng theo văn bản được ban hành chính thức
              từ phía Chủ đầu tư
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
