export function firstLetterUpperCase(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function normalizeFilename(string: string) {
  return string
    .replace(/[\\/:*?"<>|.]/g, "")
    .replace(/\s/g, "-")
    .toLowerCase()
    .substring(0, 240);
}
