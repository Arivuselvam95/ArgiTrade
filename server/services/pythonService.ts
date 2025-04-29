import { spawn } from "child_process";
import path from "path";

/**
 * Execute a Python script with provided data and return the results
 * @param scriptName The name of the Python script (without the .py extension)
 * @param inputData The data to pass to the Python script as JSON
 * @returns A Promise that resolves to the parsed JSON result from the Python script
 */
export const executePythonScript = async <T>(scriptName: string, inputData: any): Promise<T> => {
  return new Promise((resolve, reject) => {
    try {
      const scriptPath = path.join(__dirname, "pythonScripts", `${scriptName}.py`);
      
      const process = spawn("python", [scriptPath, JSON.stringify(inputData)]);
      
      let dataString = "";
      let errorString = "";
      
      process.stdout.on("data", (data) => {
        dataString += data.toString();
      });
      
      process.stderr.on("data", (data) => {
        errorString += data.toString();
        console.error(`Python script stderr: ${data}`);
      });
      
      process.on("close", (code) => {
        if (code !== 0) {
          return reject(new Error(`Python script exited with code ${code}: ${errorString}`));
        }
        
        try {
          const results = JSON.parse(dataString);
          resolve(results as T);
        } catch (error) {
          console.error("Error parsing Python script output:", error);
          reject(new Error("Error processing Python script results"));
        }
      });
    } catch (error) {
      console.error("Error executing Python script:", error);
      reject(error);
    }
  });
};
