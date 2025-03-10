import { execSync } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

try {
  // 解决 __dirname 和 __filename 的问题
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // 1. 打包
  console.log("Building the project...");
  execSync("npm run build", { stdio: "inherit" });

  // 2. 进入目标文件夹
  const targetDir = path.resolve(__dirname, "digital-electronics");
  console.log(`Navigating to the target directory: ${targetDir}`);
  process.chdir(targetDir);

  // 3. 初始化 Git 仓库并提交所有文件
  console.log("Initializing Git repository...");
  execSync("git init", { stdio: "inherit" });
  execSync("git add -A", { stdio: "inherit" });
  execSync('git commit -m "deploy"', { stdio: "inherit" });

  // 4. 推送到远程仓库的 gh-pages 分支
  console.log("Pushing to the remote repository...");
  execSync(
    "git push -f git@github.com:dreamhuan/digital-electronics.git master:gh-pages",
    {
      stdio: "inherit",
    }
  );

  // 5. 返回之前的目录
  process.chdir("..");
  console.log("Deployment successful!");
} catch (error) {
  console.error("Deployment failed:", error.message);
  process.exit(1);
}
