export const formatMobileNumber = (value: string) => value.replace(/\D/g, "");
export const getDisplayMobile = (value: string) => {
  if (value.length <= 4) return value;
  if (value.length <= 7) return `${value.slice(0, 4)} ${value.slice(4)}`;
  return `${value.slice(0, 4)} ${value.slice(4, 7)} ${value.slice(7, 11)}`;
};