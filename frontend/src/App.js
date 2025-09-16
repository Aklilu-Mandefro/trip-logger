import React, { useState, useRef } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "./App.css";
import Header from "./Header";
import LocationForm from "./LocationForm";
import MapView from "./MapView";
import LogList from "./LogList";
import Footer from "./Footer";
import About from "./About";
import LoadingSpinner from "./LoadingSpinner";

function App() {
  const [formData, setFormData] = useState({
    currentLocation: "",
    pickupLocation: "",
    dropoffLocation: "",
    currentCycleUsed: "",
  });
  const [route, setRoute] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mapRef = useRef();
  const [successMessage, setSuccessMessage] = useState("");
  const [stops, setStops] = useState([]); // State for stops

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Form Data being submitted:", formData);

      // Geocode the locations
      const currentCoords = await geocodeLocation(formData.currentLocation);
      const pickupCoords = await geocodeLocation(formData.pickupLocation);
      const dropoffCoords = await geocodeLocation(formData.dropoffLocation);

      console.log("Current Coordinates:", currentCoords);
      console.log("Pickup Coordinates:", pickupCoords);
      console.log("Dropoff Coordinates:", dropoffCoords);

      // Check if any of the coordinates are undefined
      if (!currentCoords || !pickupCoords || !dropoffCoords) {
        throw new Error("One or more locations could not be geocoded.");
      }

      // Prepare the payload with formatted coordinates
      const payload = {
        current_location: `${currentCoords.lat},${currentCoords.lng}`,
        pickup_location: `${pickupCoords.lat},${pickupCoords.lng}`,
        dropoff_location: `${dropoffCoords.lat},${dropoffCoords.lng}`,
        current_cycle_used: formData.currentCycleUsed.toString(),
      };

      console.log("Payload to be sent:", payload);

      await saveTripData(payload);

      // Calculate the route and generate logs
      await calculateRouteAndLogs(
        { currentCoords, pickupCoords, dropoffCoords },
        formData.currentCycleUsed
      );
    } catch (error) {
      console.error("Error in geocoding or route calculation:", error);
      setError(
        "Failed to retrieve location coordinates. Please check your inputs."
      );
    } finally {
      setLoading(false);
    }
  };

  const saveTripData = async (data) => {
    try {
 const response = await axios.post(`${process.env.REACT_APP_API_URL}/trips/`, data);
      console.log("Trip data saved successfully:", response.data);
      setSuccessMessage("Trip data saved to the database successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error saving trip data:", error);
      setError("Failed to save trip data. Please try again.");
    }
  };

  const geocodeLocation = async (location) => {
    const apiKey = "e7c4065925184c64a79a6143df11567c"; // Your API key
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json`,
      {
        params: {
          q: location,
          key: apiKey,
        },
      }
    );

    if (response.data.results.length === 0) {
      throw new Error("No results found");
    }

    const { lat, lng } = response.data.results[0].geometry;
    return { lat, lng };
  };

  const calculateRouteAndLogs = async (data, currentCycleUsed) => {
    const { currentCoords, pickupCoords, dropoffCoords } = data;

    try {
      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${currentCoords.lng},${currentCoords.lat};${pickupCoords.lng},${pickupCoords.lat};${dropoffCoords.lng},${dropoffCoords.lat}`;

      const response = await axios.get(osrmUrl, {
        params: {
          overview: "full",
          geometries: "geojson",
        },
      });

      const routeCoordinates = response.data.routes[0].geometry.coordinates.map(
        (coord) => ({
          lat: coord[1],
          lng: coord[0],
        })
      );

      setRoute(routeCoordinates);

      if (mapRef.current && routeCoordinates.length > 0) {
        mapRef.current.setView(
          [routeCoordinates[0].lat, routeCoordinates[0].lng],
          13
        );
      }

      // Generate logs and stops
      const { newLogs, newStops } = generateELDLogs({
        ...formData,
        currentCycleUsed,
      });
      setLogs(newLogs);
      setStops(newStops); // Set the stops state
    } catch (error) {
      console.error("Error fetching route data", error);
      setError("Failed to calculate route. Please try again.");
    }
  };

  const generateELDLogs = (tripData) => {
    const { currentCycleUsed } = tripData;
    const logs = [];

    // Real stops
    const stops = [
      { type: "fuel", lat: 34.0522, lng: -118.2437 }, // Los Angeles, CA (Fuel Stop)
      { type: "rest", lat: 36.7783, lng: -119.4179 }, // California (Rest Stop)
    ];

    const dailyDrivingLimit = 11; // Maximum driving hours in a day
    const totalDrivingHours = 70; // Total allowed driving hours

    const usedDrivingHours = parseInt(currentCycleUsed) || 0;
    let remainingDrivingHours = totalDrivingHours - usedDrivingHours;
    const totalDays = Math.ceil(remainingDrivingHours / dailyDrivingLimit);

    for (let day = 1; day <= totalDays; day++) {
      let driveHours = dailyDrivingLimit;

      if (remainingDrivingHours < dailyDrivingLimit) {
        driveHours = remainingDrivingHours;
      }

      logs.push(`Day ${day}:`);
      logs.push(`- Drive for ${driveHours} hours.`);
      logs.push(`- Rest for 10 hours.`);
      logs.push(`- Fueling Stop: At least once every 1000 miles.`);
      logs.push("-----------------------------------");

      remainingDrivingHours -= driveHours;
    }

    logs.push(
      `Current Cycle Used: ${
        usedDrivingHours + (totalDrivingHours - remainingDrivingHours)
      } hours.`
    );
    logs.push("End of Logging Period.");

    return { newLogs: logs, newStops: stops }; // Return logs and stops
  };

  const handleAboutClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const downloadLogsAsPDF = () => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = `${process.env.PUBLIC_URL}/trip-logger-logo.png`;

    img.onload = () => {
      const logoWidth = 30;
      const logoHeight = 15;
      const titleText = "Trip Logger";
      const titleFontSize = 16;

      doc.setFontSize(titleFontSize);
      const titleTextWidth = doc.getTextWidth(titleText);
      const totalWidth = logoWidth + titleTextWidth + 2;
      const pageWidth = doc.internal.pageSize.getWidth();
      const centerX = (pageWidth - totalWidth) / 2;

      const logoX = centerX;
      const titleX = logoX + logoWidth + 2;

      doc.addImage(img, "PNG", logoX, 10, logoWidth, logoHeight);
      doc.text(titleText, titleX, 20);

      doc.setFontSize(20);
      const logsTitleY = 50;
      doc.text("Generated Logs", 15, logsTitleY);

      doc.setFontSize(12);
      const startY = logsTitleY + 10;
      let currentY = startY;
      let endOfLoggingPeriodReached = false;

      logs.forEach((log) => {
        if (currentY > doc.internal.pageSize.height - 20) {
          doc.addPage();
          currentY = 10;
        }

        if (log === "End of Logging Period") {
          doc.text(log, 15, currentY);
          endOfLoggingPeriodReached = true;
          return;
        }

        doc.text(log, 15, currentY);
        currentY += 10;
      });

      if (endOfLoggingPeriodReached) {
        if (currentY > doc.internal.pageSize.height - 20) {
          doc.addPage();
          currentY = 10;
        }
        const now = new Date();
        const formattedDateTime = now.toLocaleString();
        const dateTimeText = "Log Generated On: " + formattedDateTime;
        doc.text(dateTimeText, 15, currentY);
      }

      doc.save("generated_logs.pdf");
    };

    img.onerror = () => {
      console.error("Failed to load the logo image.");
    };
  };

  return (
    <div className="container">
      <Header />
      <LocationForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={error}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
      />
      {loading && <LoadingSpinner />}
      <MapView route={route} stops={stops} mapRef={mapRef} />
      <LogList logs={logs} downloadLogsAsPDF={downloadLogsAsPDF} />
      <Footer handleAboutClick={handleAboutClick} />
      <About
        isOpen={isModalOpen}
        onClose={closeModal}
        content="<p> <span class='curvy-underline'>Trip Logger </span> is an application designed to help users log their trips, calculate routes, and manage their driving hours efficiently. It calculates the most efficient routes based on real-time traffic data, helping you save time and fuel.</p>
        <p>Trip Logger is more than just an app; it's your partner in exploring the world with confidence. Whether you're logging daily commutes or planning epic road trips, let Trip Logger guide you every mile of the way.</p>"
      />
    </div>
  );
}

export default App;
