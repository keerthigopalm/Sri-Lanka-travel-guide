import "./TravelTips.css";

const tips = [
  {
    icon: "💵",
    title: "Currency",
    content: [
      "Currency: Sri Lankan Rupee (LKR). 1 USD ≈ 310 LKR.",
      "ATMs are widely available in cities. Carry cash for rural areas.",
      "Credit cards accepted at hotels and tourist restaurants.",
      "Exchange money at banks for better rates than airport kiosks.",
    ],
  },
  {
    icon: "🌦️",
    title: "Weather & Seasons",
    content: [
      "West/South coast: dry season Dec–April. East coast: dry May–September.",
      "Highlands cool year-round (10–20°C). Coastal areas 28–32°C.",
      "Monsoon rains can be heavy but usually brief. Always carry a light rain jacket.",
      "Best overall time: December to March for most regions.",
    ],
  },
  {
    icon: "🚌",
    title: "Getting Around",
    content: [
      "Tuk-tuks are the easiest way to explore towns — always negotiate the fare first.",
      "Train rides (especially Kandy–Ella) are scenic and affordable. Book 2nd class in advance.",
      "Intercity buses are cheap but can be crowded. Private A/C buses more comfortable.",
      "Rental cars available — note traffic drives on the left.",
    ],
  },
  {
    icon: "🙏",
    title: "Culture & Customs",
    content: [
      "Remove shoes before entering temples and homes.",
      "Dress modestly at religious sites — cover shoulders and knees.",
      "Photography inside temples may require permission or a fee.",
      "Sri Lankans are warm and hospitable — a smile and 'Ayubowan' (greeting) go a long way.",
    ],
  },
  {
    icon: "🍽️",
    title: "Food & Drink",
    content: [
      "Rice and curry is the staple — try it at a local small restaurant for the best experience.",
      "Drink only bottled or filtered water; avoid tap water.",
      "Street food like roti, kottu, and hoppers are delicious and safe at busy spots.",
      "Alcohol is available but not sold on Poya (full moon) holidays.",
    ],
  },
  {
    icon: "🏥",
    title: "Health & Safety",
    content: [
      "Apply sunscreen and mosquito repellent, especially in the evening.",
      "Travel insurance is strongly recommended.",
      "National Hospital Colombo has the best facilities for emergencies.",
      "Pharmacies (dispensaries) are common — basic medications widely available.",
    ],
  },
  {
    icon: "📱",
    title: "Connectivity",
    content: [
      "Buy a local SIM card (Dialog or Mobitel) at the airport — cheap data plans.",
      "4G coverage is good in cities and tourist areas; patchy in the deep jungle.",
      "Most hotels and cafes offer free WiFi.",
      "WhatsApp is widely used — share it with your tuk-tuk drivers.",
    ],
  },
  {
    icon: "🛂",
    title: "Visa & Entry",
    content: [
      "Most nationalities require an Electronic Travel Authorization (ETA) — apply at eta.gov.lk.",
      "Tourist ETA: 30 days, extendable. Cost: USD 35.",
      "Passport must be valid for at least 6 months beyond your visit.",
      "Yellow fever vaccination required if arriving from an endemic country.",
    ],
  },
];

function TravelTips() {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Travel Tips</h1>
          <p>Everything you need to know before and during your Sri Lanka adventure.</p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="tips-grid">
            {tips.map((tip) => (
              <div key={tip.title} className="tip-card card">
                <div className="tip-card__header">
                  <span className="tip-card__icon">{tip.icon}</span>
                  <h3>{tip.title}</h3>
                </div>
                <ul className="tip-card__list">
                  {tip.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Emergency Contacts */}
          <div className="emergency-box">
            <h2>🚨 Emergency Contacts</h2>
            <div className="emergency-grid">
              <div className="emergency-item">
                <strong>Police</strong>
                <span>119</span>
              </div>
              <div className="emergency-item">
                <strong>Ambulance</strong>
                <span>110</span>
              </div>
              <div className="emergency-item">
                <strong>Fire</strong>
                <span>111</span>
              </div>
              <div className="emergency-item">
                <strong>Tourist Police</strong>
                <span>+94 11 243 3342</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelTips;
