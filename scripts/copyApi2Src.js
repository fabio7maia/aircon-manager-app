const fs = require("fs");
const path = require("path");

/**
 * Look ma, it's cp -R.
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
const copyRecursiveSync = function (src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest);
    fs.readdirSync(src).forEach(function (childItemName) {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

const dest = path.join(__dirname, "../app/services/__genApi__");

if (fs.existsSync(dest)) {
  fs.rmdirSync(dest, { recursive: true });
}

copyRecursiveSync(path.join(__dirname, "../.gen/api/client/dist"), dest);
