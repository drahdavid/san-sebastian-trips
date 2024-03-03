import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

export const currencyFormat = (num) =>
  "$" + num?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const getDayName = (date) =>
  capitalizeFirstLetter(dayjs(date).format("dddd"));
