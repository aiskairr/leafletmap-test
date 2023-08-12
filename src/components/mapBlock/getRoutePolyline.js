import axios from "axios";

const OSRM_API_URL = "https://router.project-osrm.org/";

async function getRoutePolyline(newCoordinates) {
  try {
    const coordinates = `${newCoordinates[0][1]},${newCoordinates[0][0]};${newCoordinates[1][1]},${newCoordinates[1][0]};${newCoordinates[2][1]},${newCoordinates[2][0]}`;
    const response = await axios.get(
      `${OSRM_API_URL}/route/v1/driving/${coordinates}`
    );
    if (response.status === 200 && response.data.code === "Ok") {
      return response.data.routes[0].geometry;
    } else {
      throw new Error("Ошибка при получении маршрута");
    }
  } catch (error) {
    throw new Error("Ошибка при выполнении запроса к API OSRM");
  }
}

export default getRoutePolyline;
