import { degrees, PDFDocument, rgb } from "pdf-lib";

export const modifyPdf = async (imgUrl, pdfUrl, digitalSign) => {
  const url = "https://pdf-lib.js.org/assets/with_update_sections.pdf";
  const exisitingBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(exisitingBytes);

  const newPage = pdfDoc.addPage([600, 200]); // You can specify the dimensions of the new page

  const imageBytes = await fetch(imgUrl).then((res) => res.arrayBuffer());
  const image = await pdfDoc.embedPng(imageBytes);

  const { width, height } = image.scale(0.25);

  const x = (newPage.getWidth() - width) / 2;
  const y = (newPage.getHeight() - height) / 2;

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

  const pdfBytesModified = await pdfDoc.save();
  return pdfBytesModified;
};
