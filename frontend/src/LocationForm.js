import React from "react";

const LocationForm = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  error,
  successMessage, // Accept successMessage as a prop
  setSuccessMessage,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="currentLocation"
        placeholder="Current Location"
        onChange={handleChange}
        required
        value={formData.currentLocation}
      />
      <input
        type="text"
        name="pickupLocation"
        placeholder="Pickup Location"
        onChange={handleChange}
        required
        value={formData.pickupLocation}
      />
      <input
        type="text"
        name="dropoffLocation"
        placeholder="Dropoff Location"
        onChange={handleChange}
        required
        value={formData.dropoffLocation}
      />
      <input
        type="number"
        name="currentCycleUsed"
        placeholder="Current Cycle Used (Hrs)"
        onChange={handleChange}
        required
        value={formData.currentCycleUsed}
      />
      <button type="submit" disabled={loading}>
        Submit
      </button>
      {loading && (
        <div className="loading-message">
          Loading...
          <div className="loading-spinner"></div>
        </div>
      )}
      {error && <p style={{ color: "red", marginLeft: "20px" }}>{error}</p>}
      {successMessage && ( // Display success message if it exists
        <p style={{ color: "green", marginLeft: "20px" }}>{successMessage}</p>
      )}
    </form>
  );
};

export default LocationForm;
