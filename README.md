# ✍️ Trip Logger

Trip Logger is a full-stack web application designed to help users log their trips, calculate routes, and manage their driving hours efficiently. It calculates the most efficient routes based on real-time traffic data, helping users save time and fuel. Whether you're logging daily commutes or planning epic road trips, Trip Logger serves as your partner in exploring the world with confidence.

## 💻⚛️🏗️🛠️ Tech-stacks used

- [React.js](https://reactjs.org/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [SQLite](https://www.sqlite.org/index.html)
- [Axios](https://axios-http.com/)
- [Leaflet](https://leafletjs.com/)
- [jsPDF](https://github.com/parallax/jsPDF)
- [HTML5](https://www.w3schools.com/html/)

## Main Features

- User registration and authentication
- Log trips with details such as:
  - Current location
  - Pickup location
  - Dropoff location
  - Current cycle used
- Calculate routes using real-time traffic data
- Generate PDF logs of trips
- View logs and download them as PDFs
- Responsive design for mobile and desktop devices


## Getting Started & Installation

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- Django (v3.2 or higher)
- pip (Python package installer)
- A valid API key for OpenCage Data

## Installation

### Clone the Repository

   ```bash
https://github.com/Aklilu-Mandefro/trip-logger.git
   ```
   
## 🖥️ Backend Installation
1. Navigate to the backend directory:

    ```bash
         cd backend
   ```

2. Create a virtual environment:

    ```bash
           python -m venv venv
   ```
   
3. Activate the virtual environment:
 - Windows:
 
  ```bash
       venv\Scripts\activate
   ```
   
 - macOS/Linux:
 
  ```bash
source venv/bin/activate
   ```

4. Install dependencies:

 ```bash
pip install djangorestframework django-cors-headers
   ```

5. Set up the database:

 ```bash
python manage.py migrate
   ```

6. Run the backend server:

 ```bash
python manage.py runserver
   ```


## 🌐 Frontend Installation
1. Navigate to the Frontend directory:

    ```bash
     cd frontend
   ```

2. Install dependencies:

 ```bash
npm install axios react-leaflet leaflet jspdf html2canvas
   ```

3. Run the Frontend server:

 ```bash
npm start
   ```
4. Build for production

 ```bash
npm run build

   ```

# API Endpoints
- POST /api/trips/: Save trip data.
- GET /api/trips/: Retrieve all trip logs.


## Screenshot

## [Visit Trip Logger](https://mytrip-logger.vercel.app/)

<br>

<a href="https://mytrip-logger.vercel.app/" target="_blank"><img src="https://i.imgur.com/cADkxrr.png" alt="Trip Logger app home page"> </a>
<a href="https://mytrip-logger.vercel.app/" target="_blank"><img src="https://i.imgur.com/vNVJyuQ.png" alt="Trip Logger app footer"> </a>



## Acknowledgments

- [Django REST Framework](https://www.django-rest-framework.org/) - A powerful toolkit for building Web APIs in Django.
- [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [OpenCage Geocoding API](https://opencagedata.com/) - A geocoding API that provides forward and reverse geocoding capabilities.
- [Project OSRM](http://project-osrm.org/) - An open-source routing engine that provides fast and efficient route calculations.
- [jsPDF](https://github.com/parallax/jsPDF) - A library that allows you to generate PDF documents in JavaScript.


#### Please give this repo a ⭐ if you found it helpful and share it with your friends.
