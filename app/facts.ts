import invariant from "tiny-invariant";
import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import Fuse from "fuse.js";

const factsPath = path.join(__dirname, "..", "facts");

export type FactMarkdownAttributes = {
  title: string;
};

function isValidFactAttributes(
  attributes: any
): attributes is FactMarkdownAttributes {
  return attributes?.title;
}

export async function getFacts(q: string | null) {
  const dir = await fs.readdir(factsPath);
  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(factsPath, filename));
      const { attributes, body } = parseFrontMatter(file.toString());
      invariant(
        isValidFactAttributes(attributes),
        `Fact ${file} is missing attributes`
      );
      return {
        filename: filename.replace(/\.md$/, ""),
        title: attributes.title,
        body,
      };
    })
  ).then((facts) => {
    const fuse = new Fuse(facts, {
      keys: ["title", "body"],
      ignoreLocation: true,
      threshold: 0.2,
    });
    if (q === null) {
      return facts;
    }
    return fuse.search(q).map((result) => result.item);
  });
}
