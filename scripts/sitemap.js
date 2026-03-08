const fs = require("fs");
const path = require("path");

const domain = "https://dmc.variouscd.com";

function getFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const fullPath = path.join(dir, item);

    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else if (item.endsWith(".html")) {
      files.push(fullPath);
    }
  });

  return files;
}

const pages = getFiles(".");

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

pages.forEach(page => {

  let url = page.replace("./", "").replace("index.html", "").replace(".html","");

  xml += `<url>\n`;
  xml += `<loc>${domain}/${url}</loc>\n`;
  xml += `</url>\n`;

});

xml += `</urlset>`;

fs.writeFileSync("sitemap.xml", xml);

console.log("Sitemap generated");
