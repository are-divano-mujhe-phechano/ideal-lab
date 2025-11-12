// src/App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

/* -------------------- IMAGE PLACEHOLDERS --------------------
   Replace these URLs with your actual images (img1, img2...)
   img1 = hero image
   img2..img8 = solution cards images
-------------------------------------------------------------- */
const img1 =
  "https://tcjgzctuxdmddkrj.ipfycdn.com/wp-content/uploads/2021/11/Digital-A11Y-background-2-2-scaled-e1636371247445.jpg";
const img2 ="https://i.pinimg.com/736x/56/ee/f3/56eef36c0572b4320dd5c579b3286051.jpg";

/* -------------------- DonationForm (loads Razorpay script) -------------------- */
function DonationForm() {
  const [amount, setAmount] = React.useState("");
  const [purpose, setPurpose] = React.useState("General Support");

  // dynamically load Razorpay script so window.Razorpay exists
  useEffect(() => {
    if (document.getElementById("razorpay-js")) return;
    const s = document.createElement("script");
    s.id = "razorpay-js";
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    document.body.appendChild(s);
    return () => {
      // keep script for the rest of session (no cleanup)
    };
  }, []);

  const handlePayment = () => {
    if (!amount) {
      alert("Please select or enter a donation amount.");
      return;
    }

    // Parse amount like ₹1,000 or "1000"
    const raw = amount.toString().replace(/[^0-9]/g, "");
    const value = parseInt(raw, 10);
    if (!value || isNaN(value)) {
      alert("Please enter a valid numeric amount.");
      return;
    }

    const options = {
      key: "rzp_test_ReFreJH22CLVhr", // replace with your Razorpay Key ID for production
      amount: value * 100, // paise
      currency: "INR",
      name: "Rural Women Empowerment",
      description: `Donation for ${purpose}`,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/5a/Razorpay_logo.svg",
      handler: function (response) {
        // handle success (for demo - better to verify on backend)
        alert("✅ Donation Successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: { purpose },
      theme: { color: "#0f766e" },
    };

    if (!window.Razorpay) {
      alert("Payment SDK not loaded yet. Try again in a moment.");
      return;
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-10 text-left border border-gray-100">
      <h4 className="text-lg font-semibold mb-5 text-gray-800">Make a Donation</h4>
      <p className="text-gray-500 text-sm mb-8">Every contribution makes a difference</p>

      {/* AMOUNT OPTIONS */}
      <div className="flex flex-wrap gap-4 mb-6">
        {["₹1,000", "₹2,500", "₹5,000", "₹10,000"].map((amt) => (
          <button
            key={amt}
            onClick={() => setAmount(amt)}
            className={`px-5 py-2 border rounded-md text-sm ${
              amount === amt
                ? "bg-teal-700 text-white"
                : "border-gray-300 hover:bg-teal-700 hover:text-white"
            } transition`}
          >
            {amt}
          </button>
        ))}
        <input
          type="text"
          inputMode="numeric"
          placeholder="Custom (e.g. 2500)"
          value={amount.startsWith("₹") ? amount : amount}
          onChange={(e) => setAmount(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-32 text-sm text-center focus:ring-1 focus:ring-teal-600 outline-none"
        />
      </div>

      {/* PURPOSE DROPDOWN */}
      <label htmlFor="purpose" className="text-sm font-medium text-gray-700 mb-3 block">
        Donation Purpose (Optional)
      </label>
      <select
        id="purpose"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm text-gray-700 mb-8 focus:ring-1 focus:ring-teal-600 outline-none"
      >
        <option>General Support</option>
        <option>Digital Training</option>
        <option>Hub Development</option>
        <option>Family Awareness</option>
      </select>

      {/* DONATE BUTTON */}
      <button
        onClick={handlePayment}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-md transition"
      >
        ❤️ Donate Now
      </button>
    </div>
  );
}

/* -------------------- Signup page -------------------- */
function Signup() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production: call backend API to create user
    // For demo we'll just redirect to home and show a simple message
    alert("Account created (demo). Thank you for joining!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf6f2] px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-teal-700 mb-2">Join Our Movement</h2>
        <p className="text-gray-500 text-center mb-8">
          Sign up to support and empower rural women in Maharashtra.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              name="name"
              type="text"
              required
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-1 focus:ring-teal-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-1 focus:ring-teal-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-1 focus:ring-teal-600 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-2 rounded-md transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-teal-700 hover:underline">
            Return Home
          </Link>
        </p>
      </div>
    </div>
  );
}

/* -------------------- Home (your original page) -------------------- */
function Home() {
  // Use Link for Join Us in "Get Involved" section
  return (
    <div className="font-sans bg-white text-gray-800 scroll-smooth">
      {/* NAVBAR */}
      <header className="flex justify-between items-center px-10 py-5 bg-white shadow-sm fixed top-0 w-full z-50">
        <h1 className="text-sm md:text-base font-semibold text-teal-700 tracking-tight">
          Rural Women Empowerment
        </h1>
        <nav className="space-x-6 text-sm font-medium text-gray-700">
          {["About", "Challenge", "Solution", "Impact", "Donate", "Get Involved"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="hover:text-teal-600 hover:underline underline-offset-4 transition-all duration-200"
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      {/* HERO */}
      <section
        className="relative h-screen flex flex-col justify-center items-center text-white text-center"
        style={{
          backgroundImage: `url(${img1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-teal-800/70"></div>
        <div className="relative z-10 px-6 md:px-8 max-w-3xl text-left space-y-10">
          <h2 className="text-3xl md:text-5xl font-bold leading-snug mb-10 text-white">
            Empowering Rural Women in Maharashtra Through Digital Entrepreneurship
          </h2>
          <p className="text-base md:text-lg text-gray-200 mb-10 leading-relaxed">
            Bridging the gap between tradition and technology—helping women in rural Maharashtra build
            confidence, skills, and independence through digital tools.
          </p>
          <div className="flex justify-left gap-5 flex-wrap mt-4">
            <a
  href="#donate"
  className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-8 py-3 rounded-md shadow-md transition-all scroll-smooth"
>
  Join the Movement →
</a>

            <a
    href="#about"
    className="border border-white text-white font-medium px-8 py-3 rounded-md hover:bg-white hover:text-teal-700 transition-all scroll-smooth"
  >
    Learn More
  </a>
          </div>
        </div>
      </section>

      {/* OUR MISSION */}
      <section id="about" className="bg-[#faf6f2] py-24 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Our Mission</h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16 leading-relaxed">
          Creating a digitally inclusive Maharashtra where every woman can lead, learn, and earn through technology.
        </p>
        <div className="grid md:grid-cols-3 gap-10 px-10 md:px-24">
          {[
            { icon: "🎯", title: "Vision", desc: "To create a digitally inclusive Maharashtra where every woman can lead, learn, and earn through technology." },
            { icon: "💻", title: "Mission", desc: "To provide access, training, and mentorship to rural women, enabling sustainable entrepreneurship through digital platforms." },
            { icon: "🌍", title: "Impact", desc: "Empowering families and communities through digital literacy, market connectivity, and sustainable livelihood opportunities." },
          ].map((card, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="text-4xl mb-5">{card.icon}</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">{card.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CHALLENGE */}
      <section id="challenge" className="bg-teal-800 text-white text-center py-24">
        <h3 className="text-2xl md:text-3xl font-bold mb-10">Understanding the Ground Reality</h3>
        <div className="grid md:grid-cols-5 gap-8 px-10 md:px-24">
          {[
            { label: "Women lack smartphone/internet access", value: "65%" },
            { label: "Unaware of digital business opportunities", value: "70%" },
            { label: "Interested in learning digital marketing", value: "55%" },
            { label: "Face family resistance", value: "60%" },
            { label: "Prefer local-language training", value: "80%" },
          ].map((stat, i) => (
            <div key={i} className="p-5 rounded-lg bg-white/10 hover:bg-white/20 transition-all">
              <p className="text-4xl font-bold text-yellow-400">{stat.value}</p>
              <p className="text-sm mt-3 text-gray-100 leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BARRIERS */}
      <section className="py-24 text-center bg-white">
        <h3 className="text-2xl md:text-3xl font-bold mb-6">Barriers Faced by Rural Women</h3>
        <p className="text-gray-600 mb-16 leading-relaxed">
          While India is progressing digitally, many women in Maharashtra's rural areas face deep-rooted challenges.
        </p>
        <div className="grid md:grid-cols-3 gap-10 px-10 md:px-24">
          {[
            { icon: "📶", title: "Limited Access", desc: "Lack of smartphones, reliable internet, or digital devices." },
            { icon: "💡", title: "Low Digital Literacy", desc: "Many never received formal digital education or training." },
            { icon: "🚫", title: "Societal Barriers", desc: "Gender norms discourage women from business or online work." },
            { icon: "💰", title: "Economic Constraints", desc: "Depend on microloans but lack exposure to digital marketing." },
            { icon: "⚠️", title: "Lack of Awareness", desc: "Unaware of government schemes or NGO initiatives." },
          ].map((b, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-3xl mb-3">{b.icon}</div>
              <h4 className="font-semibold text-gray-800 mb-2">{b.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" className="bg-white text-center py-24">
  <h3 className="text-2xl md:text-3xl font-bold mb-6">
    Our Solution: Building a Future of Digital Inclusion
  </h3>
  <p className="text-gray-600 mb-16">
    Seven key pillars to empower rural women through digital entrepreneurship.
  </p>

  <div className="grid md:grid-cols-3 gap-10 px-10 md:px-24">
    {[
      {
        title: "Digital Entrepreneurship Hubs",
        img: "https://plus.unsplash.com/premium_photo-1661427053933-d3da1618d8c4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3732", // Rural women with laptops
      },
      {
        title: "Free Local-Language Training",
        img: "https://plus.unsplash.com/premium_photo-1661920529196-08b816cbac30?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3639", // Teacher training women
      },
      {
        title: "Affordable Device Support",
        img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60", // Devices and learning
      },
      {
        title: "Marketplace Connection",
        img: "https://plus.unsplash.com/premium_photo-1661512001232-486df66a4ce4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2938", // Women selling online
      },
      {
        title: "Family Awareness Workshops",
        img: "https://plus.unsplash.com/premium_photo-1661475916373-5aaaeb4a5393?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2940", // Family/community discussion
      },
      {
        title: "Collaborative Partnerships",
        img: "https://images.unsplash.com/photo-1573496529574-be85d6a60704?auto=format&fit=crop&w=800&q=60", // Partnership handshake
      },
      {
        title: "Ongoing Learning Platforms",
        img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=60", // Woman learning on laptop
      },
    ].map((sol, i) => (
      <div
        key={i}
        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 overflow-hidden"
      >
        {/* 🔹 Image Section */}
        <div
          className="h-52 bg-gray-200"
          style={{
            backgroundImage: `url(${sol.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* 🔹 Text Section */}
        <div className="p-6 text-left">
          <h4 className="font-semibold text-gray-800 mb-3">{sol.title}</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            Learn more about how we help women build sustainable digital livelihoods.
          </p>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* IMPACT */}
      <section id="impact" className="bg-[#faf6f2] text-center py-24">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Measuring Our Progress</h3>
        <p className="text-gray-600 mb-16">Join us in creating measurable impact.</p>
        <div className="grid md:grid-cols-4 gap-10 px-10 md:px-24">
          {[
            { label: "Women Trained", value: "5000+" },
            { label: "Digital Hubs Established", value: "50" },
            { label: "Products Listed Online", value: "10000+" },
            { label: "Awareness Events", value: "200+" },
          ].map((impact, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <h4 className="text-3xl font-bold text-teal-700 mb-2">{impact.value}</h4>
              <p className="text-gray-600 text-sm">{impact.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DONATION */}
      <section id="donate" className="bg-[#f9f4ef] text-center py-24 px-8 md:px-24">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">❤️ Support Our Mission</h3>
        <p className="text-gray-600 mb-16 max-w-xl mx-auto leading-relaxed">
          Your contribution directly empowers rural women with digital skills and opportunities.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            {[
              { amount: "₹1,000", desc: "Provides a smartphone to one woman" },
              { amount: "₹5,000", desc: "Funds complete digital training for 5 women" },
              { amount: "₹10,000", desc: "Sets up a micro Digital Hub in a village" },
              { amount: "₹25,000", desc: "Sponsors an entire family awareness workshop" },
            ].map((item, i) => (
              <div key={i} className="border-l-4 border-orange-500 bg-white rounded-md p-6 text-left shadow-sm hover:shadow-md transition-all">
                <h4 className="text-xl font-semibold text-teal-700 mb-2">{item.amount}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <DonationForm />
        </div>
      </section>

      {/* GET INVOLVED */}
      <section id="get-involved" className="bg-teal-800 text-white text-center py-24">
        <h3 className="text-2xl md:text-3xl font-bold mb-6">Get Involved</h3>
        <p className="max-w-xl mx-auto mb-10 text-gray-200 leading-relaxed">
          Be part of the change—volunteer, sponsor, or collaborate to empower rural women in Maharashtra.
        </p>

        {/* LINKED Join Us button - goes to /signup */}
        <Link
          to="/signup"
          className="inline-block border border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-teal-800 transition-all"
        >
          Join Us
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-gray-900 text-white text-center text-sm mt-10">
        <p>© 2025 Empowering Rural Women Initiative | All Rights Reserved.</p>
      </footer>
    </div>
  );
}

/* -------------------- App (Router wrapper) -------------------- */
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
