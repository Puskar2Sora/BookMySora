<h1 align="center">🎬 BookMySora – Movie Ticket Booking Platform</h1>

<p align="center">
  A premium, fully animated movie ticket booking system made using <b>React</b>,
  <b>Firebase Authentication</b>, <b>TailwindCSS</b>, <b>Framer Motion</b> and <b>LocalStorage</b>.
</p>

<hr/>

<h2>🚀 Live Demo</h2>
<p>
  🔗 <a href="https://book-my-sora.vercel.app/" target="_blank">
  https://your-deployment-url.com</a>
</p>

<hr/>

<h2>📌 Features</h2>

<h3>1️⃣ Browse Movies</h3>
<ul>
  <li>Beautiful poster grid</li>
  <li>Movie details page</li>
  <li>Dynamic showtimes</li>
</ul>

<h3>2️⃣ Theatre & Showtime Selection</h3>
<ul>
  <li>Select theatre (PVR, INOX, Wave, etc.)</li>
  <li>Multiple time slots</li>
  <li>Smooth navigation with animations</li>
</ul>

<h3>3️⃣ Seat Selection (Premium UI)</h3>
<ul>
  <li>VIP, Gold, Silver, Economy & Couple Seats</li>
  <li>Curved cinema seating layout</li>
  <li>Real-time seat pricing calculation</li>
  <li>Reserved seats disabled automatically</li>
</ul>

<h3>4️⃣ UPI Payment Simulation</h3>
<ul>
  <li>Enter UPI ID</li>
  <li>Virtual keypad for UPI PIN</li>
  <li>Animated “Processing Payment” screen</li>
  <li>No real payment required — safe for projects</li>
</ul>

<h3>5️⃣ Ticket Generation</h3>
<ul>
  <li>Auto QR Code generation</li>
  <li>Full ticket PDF download</li>
  <li>Movie poster included</li>
  <li>Seat, time, date, theatre stored in LocalStorage</li>
</ul>

<h3>6️⃣ User Profile Page</h3>
<ul>
  <li>Firebase Auth login/signup</li>
  <li>Profile picture auto-generated from name initial</li>
  <li>Shows all previous bookings</li>
</ul>

<hr/>

<h2>🛠 Tech Stack</h2>

<h3>Frontend</h3>
<ul>
  <li>⚛ React (Vite)</li>
  <li>🎨 TailwindCSS</li>
  <li>🎬 Framer Motion</li>
  <li>🔢 qrcode.react</li>
  <li>🧾 jsPDF + html2canvas</li>
  <li>🌐 React Router Dom</li>
</ul>

<h3>Authentication</h3>
<ul><li>🔥 Firebase Authentication</li></ul>

<h3>Storage</h3>
<ul>
  <li>🗄 LocalStorage for tickets</li>
  <li>☁ Firebase Auth for user login</li>
</ul>

<hr/>

<h2>📁 Folder Structure</h2>

<pre>
src/
 ├── components/
 │    ├── Navbar.jsx
 │    ├── UpiAnimation.jsx
 │    └── ...
 │
 ├── pages/
 │    ├── Home.jsx
 │    ├── Movies.jsx
 │    ├── Showtimes.jsx
 │    ├── Booking.jsx
 │    ├── Payment.jsx
 │    ├── Ticket.jsx
 │    └── Profile.jsx
 │
 ├── contexts/
 │    └── AuthContext.jsx
 │
 ├── hooks/
 │    └── useLocation.js
 │
 ├── App.jsx
 └── main.jsx
</pre>

<hr/>

<h2>⚙️ Installation & Setup</h2>

<h3>1️⃣ Clone Repo</h3>
<pre>git clone https://github.com/your-username/BookMySora.git
cd BookMySora</pre>

<h3>2️⃣ Install Dependencies</h3>
<pre>npm install</pre>

<h3>3️⃣ Add Firebase Environment Variables</h3>

Create a <b>.env</b> file:

<pre>
VITE_FIREBASE_API_KEY=yourKey
VITE_FIREBASE_AUTH_DOMAIN=yourDomain
VITE_FIREBASE_PROJECT_ID=yourProjectId
</pre>

<h3>4️⃣ Start Dev Server</h3>
<pre>npm run dev</pre>

<hr/>

<div align="center">

  <h3>🏠 Home Page</h3>
  <img src="screenshots/home.png" width="700" style="border-radius:12px; margin-bottom:20px"/>

  <h3>🎥 Movies Page</h3>
  <img src="screenshots/movies.png" width="700" style="border-radius:12px; margin-bottom:20px"/>

  <h3>🎟 Seat Selection</h3>
  <img src="screenshots/seats.png" width="700" style="border-radius:12px; margin-bottom:20px"/>

  <h3>💳 UPI Payment</h3>
  <img src="screenshots/payment.png" width="700" style="border-radius:12px; margin-bottom:20px"/>

  <h3>🎫 Generated Ticket</h3>
  <img src="screenshots/ticket.png" width="700" style="border-radius:12px; margin-bottom:20px"/>

</div>
<hr/>

<h2>📦 Build for Production</h2>
<pre>npm run build</pre>

<p>Deploy easily using <b>Vercel</b>, <b>Firebase Hosting</b>, or <b>Netlify</b>.</p>

<hr/>

<h2>⭐ Why BookMySora?</h2>
<ul>
  <li>💎 Premium UI (glassmorphism + gradients)</li>
  <li>🚀 Fast and smooth seat selection flow</li>
  <li>🧾 Auto PDF ticket creation</li>
  <li>🎟 Includes QR Code ready for scanning</li>
  <li>🔐 Firebase login system</li>
  <li>📱 Fully mobile responsive</li>
  <li>🪄 Smooth animations everywhere</li>
</ul>

<hr/>

<h2>🤝 Contributing</h2>
<p>Pull requests are welcome! You may improve UI, animations, or add backend features.</p>

<hr/>

<h2>📝 License</h2>
<p>The project is licensed under <b>MIT License</b>.</p>

<hr/>

<h2 align="center"> @ Trying to get the Peace</h2>
<p align="center">
Built by <b>Puskar Nath</b> <br/>
Powered by React + Firebase + TailwindCSS <br/>
</p>
