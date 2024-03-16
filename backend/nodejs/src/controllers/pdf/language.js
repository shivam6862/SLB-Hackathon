module.exports = language = (item, pdfDoc, index) => {
  const language = item.language.replace(/\b\w/g, (l) => l.toUpperCase());
  const heading = item.heading;

  const keys = Object.keys(item);
  var overviewKey = keys.find((key) => key.startsWith("overview"));

  const level = item[overviewKey].level;
  const location = item[overviewKey].location;
  const category = item[overviewKey].category;
  const description = item[overviewKey].description;
  const about = item.about;
  const contact_numbers = item.contact_numbers;

  const HEADING_FONT = 18;
  const HEADING = 16;
  const TEXT_FONT = 13;

  // language
  pdfDoc
    .font("Helvetica", 900)
    .fontSize(HEADING_FONT)
    .text(
      index + ". Language : " + language,
      pdfDoc.page.margins.left,
      pdfDoc.y,
      {}
    );
  pdfDoc.page.margins.left += 10;
  pdfDoc.fontSize(TEXT_FONT).moveDown(0.5);

  heading;
  if (heading && heading != "") {
    pdfDoc
      .font("Helvetica", 800)
      .fontSize(HEADING)
      .text(heading, pdfDoc.page.margins.left, pdfDoc.y, {});
    pdfDoc.fontSize(TEXT_FONT).moveDown(0.5);
  }

  // overview
  if (overviewKey) {
    pdfDoc
      .font("Helvetica", 600)
      .fontSize(HEADING_FONT)
      .text("Overview: ", pdfDoc.page.margins.left, pdfDoc.y, {});
    if (level && level != "") {
      pdfDoc
        .font("Helvetica", 600)
        .fontSize(TEXT_FONT)
        .text("Level : " + level, pdfDoc.page.margins.left + 10, pdfDoc.y, {});
    }
    if (location && location != "")
      pdfDoc
        .font("Helvetica", 600)
        .fontSize(TEXT_FONT)
        .text(
          "Location : " + location,
          pdfDoc.page.margins.left + 10,
          pdfDoc.y,
          {}
        );
    if (category && category != "")
      pdfDoc
        .font("Helvetica", 600)
        .fontSize(TEXT_FONT)
        .text(
          "Category : " + category,
          pdfDoc.page.margins.left + 10,
          pdfDoc.y,
          {}
        );
    pdfDoc.fontSize(TEXT_FONT).moveDown(0.5);
  }

  // description
  if (description && description != "") {
    pdfDoc
      .font("Helvetica", 600)
      .fontSize(HEADING_FONT)
      .text("Description : ", pdfDoc.page.margins.left, pdfDoc.y, {});
    pdfDoc
      .font("Helvetica", 600)
      .fontSize(TEXT_FONT)
      .text(description, pdfDoc.page.margins.left + 10, pdfDoc.y, {});
    pdfDoc.fontSize(15).moveDown(0.5);
  }

  // about
  if (about && about.length > 0) {
    console.log("about", about);
    pdfDoc
      .font("Helvetica", 600)
      .fontSize(HEADING_FONT)
      .text("About : ", pdfDoc.page.margins.left, pdfDoc.y, {});
    pdfDoc.x += 10;
    pdfDoc
      .font("Helvetica")
      .fontSize(TEXT_FONT)
      .list(about, { bulletRadius: 1.5 });
    pdfDoc.fontSize(TEXT_FONT).moveDown(0.5);
    pdfDoc.x -= 10;
  }

  // contact numbers
  if (
    contact_numbers != undefined &&
    contact_numbers &&
    contact_numbers.length > 0
  ) {
    pdfDoc
      .font("Helvetica", 600)
      .fontSize(HEADING_FONT)
      .text("Contact Numbers : ", pdfDoc.page.margins.left, pdfDoc.y, {});
    pdfDoc.x += 10;
    pdfDoc
      .font("Helvetica")
      .fontSize(TEXT_FONT)
      .list(contact_numbers, { bulletRadius: 1.5 });
    pdfDoc.x -= 10;
  }

  pdfDoc.fontSize(25).moveDown(1);
  pdfDoc.page.margins.left -= 10;
};
