import { Octokit } from "@octokit/rest";

type Repo = {
  owner: string;
  repo: string;
};

export const defaultBotRepositories: Repo[] = [
  {
    owner: "kotisoff",
    repo: "kitbot"
  },
  {
    owner: "TMKSpace",
    repo: "MurkaBot_remake"
  }
];

const octo = new Octokit();

export function getRepo(settings: Repo) {
  return octo.repos.get(settings);
}
