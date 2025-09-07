import { exec } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { data } from "@/app/api/exercices/[orgId]/[language]/route";

export async function POST(req, { params }) {
  const { orgId, language, exerciseId } = params;
  const { code, functionName } = await req.json();
  const org = data.find(({ id }) => id === parseInt(orgId));
  const tests = org.tests
    .get(language)
    .exercices.find(({ id }) => id === parseInt(exerciseId)).test;
  try {
    if (!code) {
      return NextResponse.json(
        { success: false, error: "No code provided" },
        { status: 400 },
      );
    }

    const tempFilePath = path.join("/tmp", `temp_${Date.now()}_docker.js`);
    const userFunction = `${code}`;
    const testCases = tests
      .map(
        ({ input, expected, title }, i) => `
const rg${i}_${Date.now()} = ${functionName}(${input})
if (rg${i}_${Date.now()} != "${expected}") {
  console.error(JSON.stringify({"testIndex": ${i}, "input": ${input}, "expected": "${expected.toString()}", "result": \`$\{rg${i}_${Date.now()}}\`}));
  return;
}`,
      )
      .join("\n");
    const testPassed = tests.map((test) => {
      return { ...test, passed: true };
    });
    const allCode = `${userFunction}${testCases}`;
    await fs.writeFile(tempFilePath, allCode);
    const result = await executeCodeWithDocker(tempFilePath);
    return NextResponse.json({ success: true, testPassed });
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}

async function executeCodeWithDocker(filePath) {
  return new Promise((resolve, reject) => {
    const dockerCommand = `docker run --rm -v ${filePath}:/usr/src/app/script.js js-runner node /usr/src/app/script.js`;

    exec(dockerCommand, (error, stdout, stderr) => {
      fs.unlink(filePath);
      if (error || stderr) {
        reject(stderr || error.message);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}
