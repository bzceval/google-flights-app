import axios from "axios";

const defaultLocale = "en-US";
const defaultCurrency = "USD";
const defaultCountryCode = "US";

export const Api = axios.create({
  method: "GET",
  //url: "https://sky-scrapper.p.rapidapi.com/api/v1/getLocale",
  baseURL: "https://sky-scrapper.p.rapidapi.com/",
  headers: {
    "x-rapidapi-key": "b49a96939emshd6a29439bd048a6p1173ddjsn43f0ffcc8ef5",
    "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
  },
});

export const getNearByAirports = async (position) => {
  return await Api.get(
    `api/v1/flights/getNearByAirports?lat=${position[0]}&lng=${position[1]}&locale=${defaultLocale}`
  );
};

export const getSearchAirports = async (query) => {
  return await Api.get(
    `api/v1/flights/searchAirport?query=${query}&locale=${defaultLocale}`
  );
};

export const getSearchFlights = async (params) => {
  console.log(params.destinationSky.skyId);
  return await Api.get(
    `api/v2/flights/searchFlights?originSkyId=${params.originSky[0].skyId}&destinationSkyId=${params.destinationSky[0].skyId}&originEntityId=${params.originSky[0].entityId}&destinationEntityId=${params.destinationSky[0].entityId}&cabinClass=${params.cabinClass}&adults=${params.adults}&sortBy=best&currency=${defaultCurrency}&market=${defaultLocale}&countryCode=${defaultCountryCode}&date=${params.oneDate}`
  );
};
//https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=LOND&destinationSkyId=NYCA&originEntityId=27544008&destinationEntityId=27537542&cabinClass=premium_economy&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US&date=2025-05-05
// export const getSearchFlights = async (params) => {
//   console.log(params.destinationSky.skyId);
//   return await Api.get(
//     `api/v2/flights/searchFlights?originSkyId=${
//       params.originSky[0].skyId
//     }&destinationSkyId=${params.destinationSky[0].skyId}&originEntityId=${
//       params.originSky[0].entityId
//     }&destinationEntityId=${params.destinationSky[0].entityId}&cabinClass=${
//       params.cabinClass
//     }&adults=1&sortBy=best&currency=USD&market=${defaultLocale}&countryCode=US&date=${
//       params.oneDate ? params.oneDate : params.roundDate.departure
//     }&returnDate=${params.roundDate.return}&adults=${
//       params.passenger.adults
//     }&childerens=${params.passenger.childerens}&infants=${
//       params.passenger.infants
//     }`
//   );
// };
