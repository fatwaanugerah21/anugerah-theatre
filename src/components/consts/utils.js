export function concenate(string, digit) {
  return string.length > digit ? string.substr(0, digit) + "..." : string;
}
