import Promise from 'bluebird';
import GitHubApi from 'github';

let github = new GitHubApi();

module.exports = Promise.promisifyAll(github);
