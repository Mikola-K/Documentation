import axios from "axios";
import redis from "redis";
import fs from "fs";
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

async function fetchAndWriteJSON(url, fileName) {
  try {
    const response = await axios.get(url);
    const data = response.data;
    const json = JSON.stringify(data);
    fs.writeFileSync(fileName, json);
    console.log(`Data written to ${fileName}`);
  } catch (error) {
    console.error(error);
  }
}

await fetchAndWriteJSON(config.url, "data.json");

class OutputStrategy {
  outputData() {
    throw new Error("Method not implemented");
  }
}

class ConsoleOutputStrategy extends OutputStrategy {
  outputData() {
    const jsonData = fs.readFileSync("data.json");
    const data = JSON.parse(jsonData);
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
    }
    console.log(`Finished outputing ${data.length} elements`);
  }
}

class RedisStrategy extends OutputStrategy {
  async outputData() {
    const client = redis.createClient();
    client.on(
      "connect",
      () => {
        console.log("Redis is connected.");
      },
      "error",
      (err) => console.log("Redis Client Error", err)
    );
    await client.connect();
    const jsonData = await fs.promises.readFile("data.json");
    const data = JSON.parse(jsonData);
    console.log(`Writing ${data.length} elements`);
    for (let i = 0; i < data.length; i++) {
      const key = `output-key-${i}`;
      const value = JSON.stringify(data[i]);
      client.set(key, value, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Saved '${value}' to Redis with key '${key}'`);
        }
      });
    }
  }
}

class StrategyContext {
  constructor() {
    this.strategy = "";
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  getStrategy() {
    return this.strategy;
  }

  run() {
    this.strategy.outputData();
  }
}

const context = new StrategyContext();
const consoleOutputStrategy = new ConsoleOutputStrategy();
const redisStrategy = new RedisStrategy();

if (config.strategy === "console") {
  context.setStrategy(consoleOutputStrategy);
}

if (config.strategy === "redis") {
  context.setStrategy(redisStrategy);
}

context.run();
