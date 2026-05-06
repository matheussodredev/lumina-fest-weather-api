export function isDateTimeInRange(
  dateTime: string,
  startDateTime: string,
  endDateTime: string
): boolean {
  return dateTime >= startDateTime && dateTime <= endDateTime;
}