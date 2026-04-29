import React, { useState } from "react";
import {
  Search,
  Home,
  User,
  MapPin,
  Clock,
  Train,
  Bus,
  ArrowLeft,
  CreditCard,
  Wallet,
  QrCode,
  ChevronRight,
} from "lucide-react";

/**
 * Clean & Premium transport app UI built with React + Tailwind CSS.
 *
 * Expected Tailwind config additions (tailwind.config.js):
 *
 * theme: {
 *   extend: {
 *     colors: {
 *       navy: { 900: "#001a4d", 800: "#002266", 700: "#002b80", 600: "#0033a0" },
 *       brand: { 500: "#1e63d1", 400: "#3a86ff" },
 *     },
 *     fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
 *     boxShadow: {
 *       soft: "0 10px 30px -10px rgba(0, 20, 80, 0.25)",
 *       card: "0 20px 50px -20px rgba(0, 20, 80, 0.4)",
 *     },
 *   },
 * }
 */

const PhoneFrame = ({ children }) => (
  <div className="relative w-full max-w-sm mx-auto h-[780px] bg-navy-800 rounded-[2.5rem] overflow-hidden shadow-card ring-1 ring-black/5">
    {children}
  </div>
);

const BottomNav = ({ active = "home", onNavigate }) => {
  const items = [
    { key: "home", icon: Home },
    { key: "profile", icon: User },
    { key: "map", icon: MapPin },
  ];
  return (
    <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-100 py-4 px-10 flex justify-between items-center">
      {items.map(({ key, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onNavigate && onNavigate(key)}
          className={`p-2 rounded-full transition-all ${
            active === key ? "text-navy-800" : "text-slate-400"
          } hover:text-navy-800`}
        >
          <Icon
            size={26}
            strokeWidth={active === key ? 2.4 : 1.8}
            fill={active === key ? "#002266" : "none"}
          />
        </button>
      ))}
    </div>
  );
};

const HomeScreen = ({ onSelectTransport }) => (
  <PhoneFrame>
    <div className="h-full flex flex-col">
      <div className="bg-navy-800 px-7 pt-14 pb-28 relative">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-white text-3xl font-bold leading-tight tracking-tight">
              Hello,
              <br />
              John Doe
            </h1>
            <p className="text-white/70 text-sm mt-3">Where you will go</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/30 ring-2 ring-white/20" />
        </div>
        <div className="mt-5 bg-white rounded-full flex items-center px-5 py-3 shadow-soft">
          <Search size={18} className="text-navy-800 mr-3" />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent outline-none text-sm text-navy-800 placeholder-slate-400"
          />
        </div>
      </div>

      <div className="-mt-16 px-7">
        <div className="bg-white rounded-3xl h-24 shadow-soft" />
      </div>

      <div className="flex-1 px-7 pt-7 bg-gradient-to-b from-slate-50 to-white overflow-y-auto">
        <h2 className="text-navy-800 text-lg font-bold mb-4">
          Choose your Transport
        </h2>

        <button
          onClick={() => onSelectTransport("bus")}
          className="w-full bg-brand-500 rounded-3xl p-5 text-left mb-4 shadow-soft relative overflow-hidden hover:scale-[1.02] transition-transform"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">Bus</h3>
              <span className="inline-block bg-navy-800 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                Select
              </span>
            </div>
            <Bus size={90} className="text-white drop-shadow-md" strokeWidth={1.4} />
          </div>
        </button>

        <button
          onClick={() => onSelectTransport("mrt")}
          className="w-full bg-navy-800 rounded-3xl p-5 text-left shadow-soft relative overflow-hidden hover:scale-[1.02] transition-transform"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">MRT</h3>
              <span className="inline-block bg-white text-navy-800 text-xs font-semibold px-4 py-1.5 rounded-full">
                Select
              </span>
            </div>
            <Train size={90} className="text-white drop-shadow-md" strokeWidth={1.4} />
          </div>
        </button>

        <div className="h-24" />
      </div>

      <BottomNav active="home" />
    </div>
  </PhoneFrame>
);

const scheduleData = [
  { from: "10 : 00", to: "10 : 30" },
  { from: "11 : 05", to: "11 : 45" },
  { from: "11 : 25", to: "12 : 30" },
  { from: "13 : 10", to: "13 : 45" },
];

const ScheduleScreen = ({ onBack, onSelectSchedule }) => (
  <PhoneFrame>
    <div className="h-full flex flex-col">
      <div className="bg-navy-800 px-7 pt-14 pb-10 relative">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-white text-2xl font-bold">MRT</h1>
          <div className="w-9" />
        </div>
        <div className="flex justify-center py-4">
          <Train size={150} className="text-white drop-shadow-xl" strokeWidth={1.3} />
        </div>
      </div>

      <div className="flex-1 bg-white rounded-t-[2.5rem] -mt-6 px-7 pt-8 pb-28 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-soft border border-slate-100 p-5 mb-8">
          <div className="flex">
            <div className="flex flex-col items-center mr-4 pt-1">
              <MapPin size={18} className="text-navy-800" fill="#002266" />
              <div className="flex-1 border-l-2 border-dotted border-slate-300 my-1 min-h-[28px]" />
              <MapPin size={18} className="text-navy-800" />
            </div>
            <div className="flex-1">
              <div className="mb-3">
                <p className="text-slate-400 text-xs font-medium mb-1">From</p>
                <p className="text-navy-800 text-sm font-semibold">
                  Blue Castle, Indira Nagar, Bangalore
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-medium mb-1">To</p>
                <div className="h-[1px] bg-slate-200 w-3/4" />
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-navy-800 text-lg font-bold mb-4">Choose Schedule</h2>

        <div className="space-y-3">
          {scheduleData.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-white rounded-2xl border border-slate-100 shadow-sm p-4"
            >
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-navy-800" />
                <span className="text-navy-800 font-semibold text-sm">{s.from}</span>
                <span className="text-slate-400">↔</span>
                <span className="text-navy-800 font-semibold text-sm">{s.to}</span>
              </div>
              <button
                onClick={() => onSelectSchedule(s)}
                className="bg-navy-800 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-navy-700 transition"
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="map" />
    </div>
  </PhoneFrame>
);

const TicketScreen = ({ onBack, schedule }) => {
  const [payment, setPayment] = useState("credit");
  return (
    <PhoneFrame>
      <div className="h-full flex flex-col">
        <div className="bg-navy-800 px-7 pt-14 pb-20 flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-white text-2xl font-bold">Ticket</h1>
          <div className="w-9" />
        </div>

        <div className="flex-1 bg-slate-50 rounded-t-[2rem] -mt-8 px-6 pt-6 pb-32 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-soft p-5 mb-6 border border-slate-100">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="flex">
                  <div className="flex flex-col items-center mr-3 pt-1">
                    <MapPin size={16} className="text-navy-800" fill="#002266" />
                    <div className="flex-1 border-l-2 border-dotted border-slate-300 my-1 min-h-[24px]" />
                    <MapPin size={16} className="text-navy-800" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-400 text-xs font-medium">From</p>
                    <div className="h-[1px] bg-slate-300 w-full my-2" />
                    <p className="text-slate-400 text-xs font-medium mt-2">To</p>
                    <div className="h-[1px] bg-slate-300 w-full my-2" />
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3 text-xs text-navy-800 font-semibold">
                  <Clock size={14} />
                  <span>{schedule ? schedule.from : "10 : 00"}</span>
                  <Train size={14} />
                  <span>{schedule ? schedule.to : "10 : 30"}</span>
                </div>
              </div>
              <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center border border-slate-200">
                <QrCode size={88} className="text-navy-800" strokeWidth={1.2} />
              </div>
            </div>
          </div>

          <h2 className="text-navy-800 text-lg font-bold mb-1">Payment</h2>
          <p className="text-navy-800 text-sm font-medium mb-3">Enter Amount</p>
          <div className="bg-slate-200/80 rounded-full px-5 py-3 mb-6 text-navy-800 text-sm font-semibold">
            $ 5.0
          </div>

          <div className="space-y-3 mb-2">
            <button
              onClick={() => setPayment("credit")}
              className={`w-full flex items-center justify-between py-3 px-5 rounded-full transition ${
                payment === "credit"
                  ? "bg-navy-800 text-white shadow-soft"
                  : "bg-white text-navy-800 border border-slate-200"
              }`}
            >
              <span className="flex items-center gap-3 text-sm font-semibold">
                <CreditCard size={18} />
                Credit Card
              </span>
              <span className="text-xs opacity-80">Balance :</span>
            </button>

            <button
              onClick={() => setPayment("ewallet")}
              className={`w-full flex items-center justify-between py-3 px-5 rounded-full transition ${
                payment === "ewallet"
                  ? "bg-navy-800 text-white shadow-soft"
                  : "bg-white text-navy-800 border border-slate-200"
              }`}
            >
              <span className="flex items-center gap-3 text-sm font-semibold">
                <Wallet size={18} />
                E-Wallet
              </span>
              <span className="text-xs opacity-80">Balance :</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 bg-slate-50 px-6 pb-6 pt-3">
          <button className="w-full bg-navy-800 text-white font-bold py-4 rounded-2xl text-base tracking-wide shadow-card hover:bg-navy-700 transition flex items-center justify-center gap-2">
            Buy Ticket
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
};

export default function TransportApp() {
  const [screen, setScreen] = useState("home");
  const [schedule, setSchedule] = useState(null);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-10 bg-gradient-to-br from-sky-100 to-blue-300 font-sans">
      <div className="w-full flex justify-center">
        {screen === "home" && (
          <HomeScreen onSelectTransport={() => setScreen("schedule")} />
        )}
        {screen === "schedule" && (
          <ScheduleScreen
            onBack={() => setScreen("home")}
            onSelectSchedule={(s) => {
              setSchedule(s);
              setScreen("ticket");
            }}
          />
        )}
        {screen === "ticket" && (
          <TicketScreen onBack={() => setScreen("schedule")} schedule={schedule} />
        )}
      </div>

      <div className="mt-6 flex gap-2 bg-white/70 backdrop-blur rounded-full p-1 shadow">
        {["home", "schedule", "ticket"].map((s) => (
          <button
            key={s}
            onClick={() => setScreen(s)}
            className={`px-4 py-2 text-xs font-semibold rounded-full capitalize transition ${
              screen === s ? "bg-navy-800 text-white" : "text-navy-800"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
