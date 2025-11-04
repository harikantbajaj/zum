# 🚗 Zum - Revolutionizing Ride Sharing

<div align="center">

![Zum Logo](https://img.shields.io/badge/Zum-Modern%20Ride%20Sharing-blue?style=for-the-badge&logo=car&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?&style=flat&logo=Socket.io&logoColor=white)

*Your ride, on demand — fast, safe, and seamless!*



</div>

---

## 🌟 What is Zum?

Welcome to **Zum**, the next-generation ride-sharing platform that's redefining urban mobility! Imagine a world where getting from point A to B is as effortless as tapping your phone. Zum connects riders seeking convenient transportation with drivers ready to earn on their terms, all powered by cutting-edge technology and a commitment to safety and reliability.

Whether you're a busy professional needing a quick commute, a traveler exploring new cities, or someone looking to supplement their income as a driver, Zum makes it happen with style and efficiency.

---

## ✨ Key Features

### 🚀 For Riders
- **Instant Ride Requests:** Tap to request, get matched in seconds
- **Real-time Tracking:** Watch your driver approach with live GPS updates
- **Flexible Scheduling:** Book rides for now or later
- **Transparent Pricing:** Know your fare upfront, no surprises
- **Multiple Payment Options:** Cash, card, digital wallets — you choose
- **Ride History:** Keep track of all your journeys

### 👨‍🚗 For Drivers
- **Flexible Earnings:** Drive when you want, earn what you deserve
- **Smart Matching:** Get ride requests that fit your location and schedule
- **Driver Dashboard:** Manage your profile, earnings, and vehicle details
- **Real-time Updates:** Stay connected with riders throughout the journey
- **Safety Features:** Emergency buttons and trip recording for peace of mind

### 🔧 Technical Highlights
- **Real-time Communication:** Powered by Socket.io for instant updates
- **Secure Authentication:** JWT-based auth with bcrypt encryption
- **Responsive Design:** Beautiful UI built with React and Tailwind CSS
- **Interactive Maps:** Leaflet-powered maps for accurate location services
- **Scalable Backend:** Express.js API with MongoDB for robust data handling

---

## 🛠️ Tech Stack & Tools

### Frontend
- **React** - Component-based UI library
- **React Router** - Declarative routing for React
- **React Query** - Powerful data synchronization for React
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Leaflet** - Interactive maps
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Socket.io** - Real-time bidirectional communication
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing


Frontend Deployment
https://zum-hazel.vercel.app/
### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Zum.git
   cd Zum
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/Zum
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=your_super_secret_jwt_key_here
   TWILIO_ACCOUNT_SID=your_twilio_sid (optional)
   TWILIO_AUTH_TOKEN=your_twilio_token (optional)
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   node server.cjs
   ```
   The server will run on `http://localhost:5000`

2. **Start the Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

3. **Open your browser** and start exploring Zum!

---

## 📁 Project Structure

```
Zum/
├── backend/                    # 🚀 Express.js API Server
│   ├── models/                 # 📊 Mongoose Data Models
│   │   ├── User.cjs           # 👤 User schema
│   │   └── Ride.cjs           # 🚗 Ride schema
│   ├── routes/                 # 🛣️ API Endpoints
│   │   ├── auth.cjs           # 🔐 Authentication routes
│   │   ├── rides.cjs          # 🚕 Ride management
│   │   ├── users.cjs          # 👥 User management
│   │   └── health.cjs         # ❤️ Health check
│   ├── middleware/             # 🛡️ Custom middleware
│   │   └── auth.cjs           # JWT authentication
│   ├── server.cjs              # ⚙️ Main server file
│   └── package.json
├── frontend/                   # 🎨 React Frontend
│   ├── src/
│   │   ├── components/         # 🧩 Reusable UI Components
│   │   │   ├── Navbar.jsx     # 🧭 Navigation bar
│   │   │   ├── MapView.jsx    # 🗺️ Interactive map
│   │   │   └── RideForm.jsx   # 📝 Ride request form
│   │   ├── context/            # 🔄 React Context Providers
│   │   │   ├── AuthContext.jsx # 👤 User authentication
│   │   │   └── RideContext.jsx # 🚗 Ride state management
│   │   ├── pages/              # 📄 Application Pages
│   │   │   ├── Index.jsx      # 🏠 Landing page
│   │   │   ├── Login.jsx      # 🔑 Login page
│   │   │   ├── RiderDashboard.jsx # 👤 Rider dashboard
│   │   │   └── DriverDashboard.jsx # 👨‍🚗 Driver dashboard
│   │   ├── api/                # 🌐 API Client
│   │   │   └── api.js         # Axios configuration
│   │   ├── utils/              # 🛠️ Utility Functions
│   │   └── App.jsx             # 🎯 Main App Component
│   ├── index.html              # 📄 HTML Template
│   └── package.json
├── README.md                   # 📖 This file
└── .gitignore                  # 🚫 Git ignore rules
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Rides
- `GET /api/rides` - Get available rides
- `POST /api/rides` - Request a new ride
- `PUT /api/rides/:id` - Update ride status
- `GET /api/rides/:id` - Get ride details

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

---

## 🎨 Screenshots & Demos

*Coming soon! Add some beautiful screenshots of your app here.*

<div align="center">
  <img src="https://via.placeholder.com/800x400?text=Zum+Dashboard" alt="Zum Dashboard" width="80%">
</div>

---

## 🤝 Contributing

We love contributions! Here's how you can help make Zum even better:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

---

## 📋 Roadmap

- [ ] Mobile app development (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Integration with payment gateways
- [ ] Ride sharing for groups
- [ ] Driver rating system improvements

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---



<img width="1919" height="911" alt="Screenshot 2025-09-05 131053" src="https://github.com/user-attachments/assets/7c981f09-f90e-42fd-86fa-eba0eb98421a" />
<img width="1919" height="920" alt="Screenshot 2025-09-05 131104" src="https://github.com/user-attachments/assets/df8c1069-d1d3-499f-83c7-23fc0c6dab03" />
<img width="1919" height="865" alt="Screenshot 2025-09-05 131116" src="https://github.com/user-attachments/assets/828d7b48-7993-4f5b-b576-c8e2ba34d92d" />

## 🙏 Acknowledgments

- Thanks to the open-source community for amazing tools and libraries
- Special shoutout to our beta testers and early adopters
- Inspired by the vision of seamless urban transportation

---

<div align="center">

**Made with ❤️ by the Zum Team**

*Transforming the way the world moves, one ride at a time.*

[⬆️ Back to Top](#-Zum---revolutionizing-ride-sharing)

</div>

