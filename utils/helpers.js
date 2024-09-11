/**
 * Helper function to validate latitude and longitude values.
 * @param {number} latitude - Latitude value.
 * @param {number} longitude - Longitude value.
 * @returns {boolean} - Returns true if the values are valid, otherwise false.
 */
const validateCoordinates = (latitude, longitude) => {
  const isValidLatitude = latitude >= -90 && latitude <= 90;
  const isValidLongitude = longitude >= -180 && longitude <= 180;
  return isValidLatitude && isValidLongitude;
};

/**
 * Helper function to format bus data for output.
 * @param {Object} bus - The bus object from the database.
 * @returns {Object} - Returns a formatted bus object.
 */
const formatBusData = (bus) => {
  return {
    id: bus._id,
    busNumber: bus.busNumber,
    route: bus.route,
    currentLocation: bus.currentLocation,
  };
};

module.exports = {
  validateCoordinates,
  formatBusData,
};
