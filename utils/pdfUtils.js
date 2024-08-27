import { PDFDocument, rgb } from "pdf-lib";
// Utility function to convert Uint8Array to Base64
// Utility to convert Base64 to Uint8Array
const base64ToUint8Array = (base64) => {
  const binaryString = atob(base64.split(",")[1]); // Decode Base64, ignoring the data URL part
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const modifyPdf = async (imgUrl, pdfBase64, digitalSign) => {
  try {
    // Convert Base64 to Uint8Array
    const existingBytes = base64ToUint8Array(pdfBase64);

    // Load the existing PDF
    const pdfDoc = await PDFDocument.load(existingBytes);

    // Add a new page
    const newPage = pdfDoc.addPage([600, 200]);

    // Fetch and embed the image
    const imageBytes = await fetch(imgUrl).then((res) => res.arrayBuffer());
    const image = await pdfDoc.embedPng(imageBytes);

    // Scale the image
    const { width, height } = image.scale(0.25);

    // Calculate positioning
    const x = (newPage.getWidth() - width) / 2;
    const y = (newPage.getHeight() - height) / 2;

    // Draw text and image on the new page
    newPage.drawText("Customer Name", {
      x: 30,
      y: 150,
      size: 18,
    });
    newPage.drawText(digitalSign, {
      x: 30,
      y: 120,
      size: 14,
      color: rgb(79 / 255, 79 / 255, 79 / 255),
    });
    newPage.drawText("Freehand Signature", {
      x: 30,
      y: 90,
      size: 18,
    });
    newPage.drawImage(image, {
      x: 30,
      y: 30,
      width,
      height,
    });

    // Save the modified PDF as a Uint8Array
    const pdfBytesModified = await pdfDoc.save();
    return pdfBytesModified;
  } catch (error) {
    console.error("Error modifying PDF:", error);
    throw error;
  }
};
