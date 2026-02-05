import { GitHubIssuePayload, GitHubStarPayload } from "../../interfaces";

export class GitHubService {

  onStar(payload: GitHubStarPayload): string {
    const { action, sender, repository } = payload
    return `User ${sender.login} ${action} star on ${repository.full_name}`
  }

  onIssue(payload: GitHubIssuePayload): string {
    const { action, sender, repository } = payload
    return `An issue from ${repository.full_name} was ${action} by ${sender.login}`
  }
}