import axios from "axios";

const defaultLocale = "en-US";
export const Api = axios.create({
  method: "GET",
  //url: "https://sky-scrapper.p.rapidapi.com/api/v1/getLocale",
  baseURL: "https://sky-scrapper.p.rapidapi.com/",
  headers: {
    "x-rapidapi-key": "e3c2e885a0mshc712c13ee62df8ep10bea0jsn654b21f27e5f",
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
