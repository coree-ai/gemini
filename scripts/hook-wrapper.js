#!/usr/bin/env node
const { execSync } = require("child_process");

function main() {
  const hookEvent = process.env.GEMINI_HOOK_EVENT || "SessionStart";
  try {
    const args = process.argv.slice(2);
    const stdout = execSync(`npx --yes @coree-ai/coree@0.14.1 inject ${args.join(" ")}`, {
      encoding: "utf8",
      timeout: 110000,
      env: process.env,
    }).trim();

    if (!stdout) {
      console.log(JSON.stringify({}));
      return;
    }

    console.log(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: hookEvent,
          additionalContext: stdout,
        },
      })
    );
  } catch (_e) {
    console.log(JSON.stringify({}));
  }
}

main();
