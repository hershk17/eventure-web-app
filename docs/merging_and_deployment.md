# Merging

- First, the Github Repository will be cloned to our local directory.
- At the start of every sprint, a development branch with a proper name will be created branching off from the main branch.
- Feature branches with a proper name will be created branching off from the development branch. Group members can checkout on these feature branches to start working.
- Code can be written and tested, then staged and committed with a meaningful message once complete. A pull must be performed before pushing to the feature branch if other group members are working on the same branch. Any arising conflicts must be reported and resolved.
- Committed changes are pushed to the feature branch for testing.
- Once all the required tests have passed, a pull request from the feature branch into the development branch is created.
- When merging feature branches into the dev branch, we will be using the **recursive merge** strategy. This is because team members will branch off from the dev branch and then further branch off to various feature branches which may be merged into the dev branch simultaneously.
- The completed feature is merged into the development branch (following the [Pull Request Guidelines](#Pull-Request-Guidelines)).
- Once development for the current sprint is complete, a pull request from the development branch into the main branch is created.
- We will be using the **fast-forward merge** strategy when merging the development branch to the release (main) branch. There should be no changes made directly to the main branch, ensuring that there are no conflicts when merging to the main branch from the dev branch at the end of the sprint.
- Completed code is merged into the main branch (following the [Pull Request Guidelines](#Pull-Request-Guidelines)).
- Feature branches can be deleted once merged into the main branch.

### Pull Request Guidelines

- It must pass all tests with GitHub actions and it must follow the description guideline.
- A pull request will be reviewed by at least 1 or 2 team members, the author of the pull request must attend to comments left by reviewers. If no more comments are needed, then merge the pull request.
- If there are conflicts during a merge, the person who is committing the changes is responsible for resolving the conflicts. If necessary, the member who is resolving the conflicts may request assistance from the other team member(s) who may have authored the conflicts.
- Before merging, if multiple commits can be grouped up or were made in rapid succession, members may **squash** such commits, combining corresponding commit messages into a bullet-point list of changes.

# Deployment

- We will be compiling the release build manually and deploying it to the online tester appetize.io. This way, we will be able to deploy and test the application quickly and efficiently.
- Our deployment strategy will be using the **Canary deployment** strategy. This means that the application will be deployed in stages. Each sprint would include a new feature that would be tested thoroughly before being released.
- Once enough of the core functionality is present in the main branch, the team will consider releasing a closed beta to a small group of users. We will also consider publishing a refined version of the application to the play store.
