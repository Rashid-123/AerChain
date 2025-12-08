import * as chrono from "chrono-node";

export const parseDueDate = (input: string): string | null => {
  if (!input) return null;
 
  const parsed = chrono.parseDate(input);

  if (!parsed) return null;

  // IST = UTC + 5:30
  const IST_OFFSET = 5.5 * 60 * 60 * 1000; // ms

  const istDate = new Date(parsed.getTime() + IST_OFFSET);

  return istDate.toISOString().toString();  // OR .toString() if you want readable format


//   return parsed ? parsed.toISOString() : null;
};
