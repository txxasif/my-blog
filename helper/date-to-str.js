const months = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep ",
  10: "Oct ",
  11: "Nov ",
  12: "Dec",
};
export function getMonthHelper(m) {
  return months[`${m}`];
}
export function dateToString(d) {
  const date = new Date(d);
  const m = date.getMonth() + 1;
  console.log(date.getMonth() + 1);
  const day = date.getDate();
  const month = getMonthHelper(date.getMonth() + 1);
  const year = date.getFullYear();
  const finalDate = `${day} ${month} ${year}`;
  console.log(finalDate);
  return finalDate;
}
export function dateToTimeString(d) {
  const date = new Date(d);
  const hour = date.getHours();
  const min = date.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedMin = min < 10 ? "0" + min : min;
  return `${formattedHour}:${formattedMin} ${ampm}`;
}
