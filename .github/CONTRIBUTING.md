## Contributing

First off, thank you for considering contributing to github-actions-workflow-ts. It's people
like you that make it such a great tool.

### Where do I go from here?

If you've noticed a bug or have a feature request, [make one][new issue]! It's
generally best if you get confirmation of your bug or approval for your feature
request this way before starting to code.

If you have a general question about github-actions-workflow-ts, you can post it in [Discussions](https://github.com/emmanuelnk/github-actions-workflow-ts/discussions), the issue tracker is only for bugs and feature requests.

### Fork & create a branch

If this is something you think you can fix, then [fork github-actions-workflow-ts](https://github.com/emmanuelnk/github-actions-workflow-ts/fork) and create a branch with a descriptive name.

A good branch name would be (where issue #325 is the ticket you're working on):

```sh
git checkout -b feat/325-add-some-new-feature
```

### Get the test suite running

Make sure you're using Node 18 and above.

Now install the development dependencies. This project uses [pnpm](https://github.com/pnpm/pnpm)

```bash
pnpm install
```

### Implement your fix or feature

At this point, you're ready to make your changes! Feel free to ask for help;
everyone is a beginner at first :smile_cat:

### Make a Pull Request

At this point, you should switch back to your main branch and make sure it's
up to date with github-actions-workflow-ts's main branch:

```sh
git remote add upstream git@github.com:emmanuelnk/github-actions-workflow-ts.git
git checkout main
git pull upstream main
```

Then update your feature branch from your local copy of main, and push it!

```sh
git checkout feat/325-add-some-new-feature
git rebase main
git push --set-upstream origin feat/325-add-some-new-feature
```

Finally, go to GitHub and [make a Pull Request][] :D

### Keeping your Pull Request updated

If a maintainer asks you to "rebase" your PR, they're saying that a lot of code
has changed, and that you need to update your branch so it's easier to merge.

To learn more about rebasing in Git, there are a lot of [good][git rebasing]
[resources][interactive rebase] but here's the suggested workflow:

```sh
git checkout feat/325-add-some-new-feature
git pull --rebase upstream main
git push --force-with-lease feat/325-add-some-new-feature
```

### Merging a PR (maintainers only)

A PR can only be merged into main by a maintainer if:

* It is passing CI.
* It has been approved by at least two maintainers. If it was a maintainer who
  opened the PR, only one extra approval is needed.
* It has no requested changes.
* It is up to date with current main.

Any maintainer is allowed to merge a PR if all of these conditions are
met.

### Shipping a release (maintainers only)

### References

[new issue]: https://github.com/emmanuelnk/github-actions-workflow-ts/issues/new
[fork github-actions-workflow-ts]: https://help.github.com/articles/fork-a-repo
[make a pull request]: https://help.github.com/articles/creating-a-pull-request
[git rebasing]: https://git-scm.com/book/en/Git-Branching-Rebasing
[interactive rebase]: https://help.github.com/en/github/using-git/about-git-rebase

