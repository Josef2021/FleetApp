### Semetey Internship project
### Tech Stack (March 30 2022)
* [ReactJS](https://reactjs.org/)
* [Material UI](https://mui.com/)
* [Heroku] (https://devcenter.heroku.com/)
* [Firebase] (https://firebase.google.com/docs)

### GitHub
# How to create pull request (PR).
  1. Pull latest version of main:
      ```
      $ git checkout main
      $ git pull origin main
      $ git checkout -b <yourName>/<yourBranchName>
      ```
  2. After finishing the task:
      ```
      $ git add .
      $ git commit -m "Briefly describe what you did."
      $ git push origin <yourName>/<yourBranchName>
  3. Then go to https://github.com/tagaism/semetey/pulls
  4. Assign all members to code-review.
  5. Create PR to 'main' branch.
  6. Name your PR as JIRA-task name.
  7. Add link to task from JIRA to description.
  8. Inform team in Slack.
  9. DO NOT MERGE! Wait for feedback.
  10. If your PR is returned, do not create new branch or new PR.
      Do all fixings on current branch. Then,
      ```
      $ git add .
      $ git commit -m "Made fixings"
      $ git push origin <yourName>/<yourBranchName>
      ```
  9. GO TO -> step 6.
  10. Remember, _>>>> DO NOT MERGE!!<<<<_
### How to do a code review
  1. Be familiar with the issue.
  2. See the code if it is clean, easy to read.
  3. Pull the reviewing branch to you local machine and try to run, and check if it works properly.
  4. Make comments of what you notice or demand correction(if necessary).
  5. Inform person who created PR.
  6. Be nice to people

HEROKU NOTES
----------------
You may encounter some issues if you want to deploy fuse-react to heroku, here is the solution:

// We need to use the mars/create-react-app buildpack:
heroku buildpacks:set mars/create-react-app

// the next build will be created with this official pack.

// We need to install devDependencies:
heroku config:set NPM_CONFIG_PRODUCTION=false
push skeleton branch to master of heroku
git push heroku skeleton:master

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
