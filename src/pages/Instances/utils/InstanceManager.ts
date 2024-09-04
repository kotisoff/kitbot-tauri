import fs from "@tauri-apps/plugin-fs";
import path from "@tauri-apps/api/path";
import shell from "@tauri-apps/plugin-shell";

// NodeJS Managment

export async function isNJSProject(directory: string): Promise<boolean> {
  const files = await fs.readDir(directory);
  return files.find((f) => f.name == "package.json") ? true : false;
}

export async function scanPackage(directory: string) {
  const pkg = JSON.parse(
    await path.join(directory, "package.json").then(fs.readTextFile)
  ) as PackageFile;
  pkg.path = directory;

  return pkg;
}

export type PackageFile = {
  name: string;
  author?: string;
  authors?: string[];
  version?: string;
  main?: string;
  scripts?: {
    [index: string]: string | undefined;
    start: string | undefined;
    build: string | undefined;
    dev: string | undefined;
  };

  path: string;
};

export const instancesFile = path
  .appDataDir()
  .then((v) => path.join(v, "instances.json"));

// Instances Managment

type InstancesType = {
  instances: InstanceType[];
};

export type InstanceType = {
  path: string;
};

export async function loadInstances(): Promise<InstanceType[]> {
  if (!(await instancesFile.then(fs.exists))) return [];

  return (
    (await instancesFile
      .then(fs.readTextFile)
      .then(JSON.parse)) as InstancesType
  ).instances;
}

export async function writeInstances(instances: InstanceType[]) {
  const appDataDir = await path.appDataDir();
  if (!(await fs.exists(appDataDir))) await fs.mkdir(appDataDir);

  return fs.writeTextFile(await instancesFile, JSON.stringify({ instances }));
}

// Run

export async function runPackageMain(
  pkg: PackageFile
): Promise<[shell.Command<string>, shell.Child] | null> {
  let command: shell.Command<string> | undefined;
  if (pkg.scripts?.start)
    command = shell.Command.create("yarn", "start", { cwd: pkg.path });
  else if (pkg.main) {
    const file = await path.join(pkg.path, pkg.main);
    command = shell.Command.create("node", file, { cwd: pkg.path });
  } else return null;

  try {
    const child = await command.spawn();
    return [command, child];
  } catch (err) {
    console.log(err);
    return null;
  }
}
