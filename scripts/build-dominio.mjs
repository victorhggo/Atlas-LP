// Gera a versão da LP para o domínio próprio em out-dominio-proprio/,
// sem mexer na pasta out/ (versão do Netlify).
import { execSync } from "node:child_process";
import { renameSync, rmSync } from "node:fs";

const DOMAIN = "https://lp-atlas.escolhidospro.com.br";

rmSync("out-dominio-proprio", { recursive: true, force: true });
execSync("npm run build", {
  stdio: "inherit",
  env: { ...process.env, SITE_URL: DOMAIN },
});
renameSync("out", "out-dominio-proprio");
console.log(`\nVersão para ${DOMAIN} pronta em out-dominio-proprio/`);
