function isValidBase64(base64) {
  const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
  return base64Regex.test(base64);
}

export function base64ToBlob(base64Data, mimeType) {
  const base64 = base64Data.split(",")[1];

  if (!isValidBase64(base64)) {
    throw new Error("The Base64 string is not correctly encoded.");
  }

  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}
