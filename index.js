#!/usr/bin/env node
const readline = require("readline");
const os = require("os");
const fs = require("fs");
const path = require("path");

const FILE_NAME = ".memory_spiral.json";
const filePath = path.resolve(os.homedir(), FILE_NAME);

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '{"index":-1,"list":[]}', "utf-8");
}

const fileContent = fs.readFileSync(filePath).toString("utf-8");
const data = JSON.parse(fileContent);
const isLearn = () => data.index === -1;
const isReview = () => data.index >= 0;

const save = () => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// “记忆螺旋”算法
const spiral = (total) => {
  if (total <= 0) {
    return -1;
  }

  let start = 0;
  let pow = 0;

  while (true) {
    const n = Math.floor(total / 5 ** pow);
    start = n * 5 ** pow;
    if (start !== total) {
      break;
    } else {
      pow++;
    }
  }

  return start;
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function loop() {
  console.clear();
  if (isLearn()) {
    rl.question(`${data.list.length + 1}: `, (text) => {
      try {
        const [title, content, _count] = text.trim().split(/\s+/);
        const count = parseInt(_count);
        if (
          title.length > 0 &&
          content.length > 0 &&
          !Number.isNaN(count) &&
          count > 0
        ) {
          data.list.push({ title, content, count });
          data.index = spiral(data.list.length);
          save();
        } else {
          throw new Error();
        }
      } catch {
        console.warn("Invalid format! Try again: ");
      } finally {
        loop();
      }
    });
    return;
  }

  if (isReview()) {
    const { index, list } = data;
    rl.question(`${index + 1}. ${list[index].title}: `, (text) => {
      const count = parseInt(text);
      if (list[index].count === count) {
        data.index = index + 1 === list.length ? -1 : index + 1;
        save();
      } else {
        console.log("Incorrect answer! Try again: ");
      }
      loop();
    });
    return;
  }
}

loop();
