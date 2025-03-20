export function convertTo24HourFormat(time12h: string): string {
  // Split time and period (AM/PM)
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":").map(Number);

  // Convert hours based on AM/PM
  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  // Format hours and minutes as two digits
  const hoursStr = hours < 10 ? "0" + hours : hours.toString();
  const minutesStr = minutes < 10 ? "0" + minutes : minutes.toString();

  return `${hoursStr}:${minutesStr}`;
}

export function convertCamelCaseToTitle(str: string): string {
  return (
    str
      // Insert space before each uppercase letter (except the first one)
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // Capitalize the first letter of each word
      .replace(/\b\w/g, (char) => char.toUpperCase())
  );
}

export const bufferToBase64 = (buffer: any) => {
  return `data:image/png;base64,${Buffer.from(buffer).toString("base64")}`;
};
