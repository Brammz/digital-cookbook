# Digital Cookbook

Project for fun to keep track of my recipes and select one fast using suggestions and search functionality on tags and ingredients.

## Notes

Google API has issues with React because it uses file system. The workaround is:

1. Go to `web-application/node_modules/googleapis-common/build/src/discovery.js`
2. Change `const readFile = util.promisify(fs.readFile)` to `const readFile = fs.readFile ? util.promisify(fs.readFile) : async () => {}`