import { PDFDocument } from "pdf-lib";

export const modifyPdf = async (imgUrl, pdfBlob, digitalSign) => {
  try {
    // Fetch existing PDF Blob
    const exisitingBytes = await pdfBlob.arrayBuffer();
    const pdfDoc = await PDFDocument.load(exisitingBytes);

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
    newPage.drawText("Signature", {
      x: 30,
      y: 150,
      size: 24,
    });
    newPage.drawText(digitalSign, {
      x: 30,
      y: 120,
      size: 16,
    });
    newPage.drawImage(image, {
      x,
      y: 30,
      width,
      height,
    });

    // Save the modified PDF
    const pdfBytesModified = await pdfDoc.save();
    return pdfBytesModified;
  } catch (error) {
    console.error("Error modifying PDF:", error);
    throw error;
  }
};
