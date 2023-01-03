const fs = require("fs");
const cp = require("child_process");
const path = require("path");

const outputPath = path.resolve("./src/protogen");

console.log(`${outputPath} will be created...`);

if (fs.existsSync(outputPath))
  fs.rmSync(outputPath, { recursive: true, force: true });
fs.mkdirSync(outputPath, { recursive: true });

const pluginPath = path.resolve(
  process.platform === "win32"
    ? "./node_modules/.bin/protoc-gen-ts.cmd"
    : "./node_modules/.bin/protoc-gen-ts"
);

const protoPath = path.resolve("./src/proto");

console.log(`.js code will be created at ${outputPath}...`);

const spawnResult = cp.spawnSync(
  `protoc\
  --plugin="protoc-gen-ts=${pluginPath}" \
  --js_out="import_style=commonjs,binary:${outputPath}" \
  --ts_out="${outputPath}" \
  -I ${protoPath}\
  ${path.join(protoPath, "*.proto")}`,
  { shell: true }
);

if (spawnResult.status === 0)
  console.log(`*.js files have created at ${outputPath}`);
else return console.log(spawnResult.stderr.toString());
