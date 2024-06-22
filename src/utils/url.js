export function encodeUri(filename) {
  const safeFileName = filename.replace(/\s+/g, "_");
  return encodeURIComponent(safeFileName);
}
