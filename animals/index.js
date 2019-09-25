const axios = require("axios");
const cheerio = require("cheerio");

const DOMAIN = process.env.DOMAIN || "http://www.spca.org.tw";
const URL = process.env.URL || "http://www.spca.org.tw/adoptions--fostering-program-3893639178200133688423478242373533621123.html";

async function getHtml() {
  const { data } = await axios.get(URL);
  return data;
}

async function renderAnimals() {
  const html = await getHtml();
  const $ = cheerio.load(html);
  const animalLinks = $(".wsite-spacer ~ h2.wsite-content-title + div:not(.paragraph) a");

  let animals = [];
  animalLinks.each((i, ele) => {
    const name = $(ele).attr("title");
    const href = $(ele).attr("href");
    const src = $(ele).children("img").attr("src");
    animals.push({ name, href: `${DOMAIN}${href}`, src: `${DOMAIN}${src}` });
  });
  return { animals };
}

module.exports = renderAnimals;
