# Git 📚

Git is a version control system that allows you to track changes to files. It is used by developers to collaborate on projects and is a vital tool in the development process.

## Create a new repository 🆕

To create a new repository, run the following command:

```bash
git config --global user.name "efzr"
git config --global user.email "emerson.zapatarivas@gmail.com"
git config --global push.default matching
git config --global alias.co checkout
git init
```

## `git add` ➕

The `git add` command adds a change in the working directory to the staging area. It tells Git that you want to include updates to a particular file in the next commit. However, `git add` doesn't really affect the repository in any significant way—changes are not actually recorded until you run `git commit`.

```bash
git add .
```

## `git commit` 💾

The `git commit` command captures a snapshot of the project's currently staged changes. Committed snapshots can be thought of as "safe" versions of a project—Git will never change them unless you explicitly ask it to. Prior to the execution of `git commit`, The `git add` command is used to promote or 'stage' changes to the project that will be stored in a commit. `git commit` can be thought of as 'saving' the file in the current state of the project and recording a message that describes the changes being saved.

```bash
git commit -m "Initial commit"
```

## `git push` ⬆

The `git push` command is used to upload local repository content to a remote repository. Pushing is how you transfer commits from your local repository to a remote repo. It's the counterpart to `git fetch`, but whereas fetching imports commits to local branches, pushing exports commits to remote branches. This command works only if you have already run `git init` and `git add`.

```bash
git push -u origin master
```

## `git pull` ⬇

The `git pull` command is used to fetch and download content from a remote repository and immediately update the local repository to match that content. Merging remote upstream changes into your local repository is a common task in Git-based collaboration work flows. The `git pull` command is actually a combination of two other commands, `git fetch` followed by `git merge`. In the first stage of operation `git pull` will execute a `git fetch` scoped to the local branch that `HEAD` is pointed at. Once the content is downloaded, `git pull` will enter a merge workflow. A new merge commit will be-created and `HEAD` updated to point at the new commit.

```bash
git pull
```

## `git clone` 🐑

The `git clone` command is used to create a copy of a specific repository or branch within a repository. Cloning a local or remote repository pulls down a full copy of all the repository data. The `git clone` command automatically initializes and `git init` and `git remote add origin` if cloning a remote repository to create a local copy on your computer.

```bash
git clone
```

## `git status` 📋

The `git status` command displays the state of the working directory and the staging area. It lets you see which changes have been staged, which haven't, and which files aren't being tracked by Git. Status output does not show you any information regarding the committed project history. For this, you need to use `git log`.

```bash
git status
```

## `git log` 📜

The `git log` command displays committed snapshots. It lets you list the project history, filter it, and search for specific changes. While `git status` lets you inspect the working directory and the staging area, `git log` only operates on the committed history.

```bash
git log
```

## `git branch` 🌿

The `git branch` command lets you create, list, rename, and delete branches. It doesn't let you switch between branches or put a forked history back together again. For this reason, `git branch` is tightly integrated with the `git checkout` and `git merge` commands.

```bash
git branch
```

### `git branch -d` ❌

The `-d` option will delete the specified branch, but only if you have already merged and committed the changes elsewhere. Otherwise, Git will prevent you from deleting the branch.

```bash
git branch -d <branch_name>
```

### `git branch -D` ❗

The `-D` option is shorthand for `--delete --force`. It deletes the specified branch, even if you haven't merged it yet. This is the command to use if you want to permanently throw away all of the commits associated with a particular line of development.

```bash
git branch -D <branch_name>
```

### `git branch -a` 🅰

The `-a` option will list both remote-tracking branches and local branches.

```bash
git branch -a
```

### `git branch <branch_name>` or `git checkout -b <branch_name>`🆕

The `<branch_name>` argument is the name of the branch you want to create. Running `git branch` without a branch name will list the existing branches in the repository. The `-b` option is a convenience flag that tells Git to run `git branch <branch_name>` immediately after creating the branch. You could accomplish the same thing by running `git branch <branch_name>` followed by `git checkout <branch_name>`.

```bash
git branch <branch_name>
```

### `git branch <branch_name> <base_branch>` or `git checkout -b <branch_name> <base_branch>`🆕

The `<branch_name>` argument is the name of the branch you want to create. The `<base_branch>` argument is the name of the branch you want to base the new branch off of. Running `git branch` without a branch name will list the existing branches in the repository. The `-b` option is a convenience flag that tells Git to run `git branch <branch_name>` immediately after creating the branch. You could accomplish the same thing by running `git branch <branch_name>` followed by `git checkout <branch_name>`.

```bash
git branch <branch_name> <base_branch>
```

## `git checkout` 🔄

The `git checkout` command lets you navigate between the branches created by `git branch`. Checking out a branch updates the files in the working directory to match the version stored in that branch, and it tells Git to record all new commits on that branch. Think of it as a way to select which line of development you're working on.

```bash
git checkout <branch_name>
```

## `git merge` 🔀

The `git merge` command lets you take the independent lines of development created by `git branch` and integrate them into a single branch. Note that all of the commands presented below merge into the current branch. The current branch will be updated to reflect the merge, but the target branch will be completely unaffected. Again, this means that `git merge` is often used in conjunction with `git checkout` to select the current branch and `git branch -d` to delete the obsolete target branch.

```bash
git merge <branch_name>
```

## `git remote` 🔗

The `git remote` command lets you create, view, and delete connections to other repositories. Remote connections are more like bookmarks rather than direct links into other repositories. Instead of providing real-time access to another repository, they serve as convenient names that can be used to reference a not-so-convenient URL.

```bash
git remote
```

### `git remote add` ➕

The `git remote add` command takes two arguments:

- A remote name, for example, `origin`
- A remote URL, for example, `http:://github.com/user/repo.git`

Running `git remote` on its own will list the named connections you have to other repositories at that moment in time. The `-v` flag will list both the remote name and URL.

```bash
git remote add <remote_name> <remote_url>
```

### `git remote rm` ❌

The `git remote rm` command takes one argument:

- A remote name, for example, `origin`

```bash
git remote rm <remote_name>
```

## `git reset` 🔙

The `git reset` command lets you reset the current HEAD to a specified state. It's important to understand that `git reset` is a command that undoes local changes. It's a fairly safe command to use since Git will prevent you from losing any changes that haven't been committed. However, it can be destructive since it undoes commits.

```bash
git reset <commit>
```

## `git revert` 🔙

The `git revert` command lets you undo changes to a commit (or multiple commits) by creating a new commit. This command adds new history to the project (it doesn't modify existing history). For this reason, it's considered safe to use on public branches.

```bash
git revert <commit>
```

## `git rm` ❌

The `git rm` command lets you remove one or more files from the staging area and the working directory. It doesn't remove a file from the project's history.

```bash
git rm <file_name>
```

## `git mv` ➡

The `git mv` command lets you move or rename a file, a directory, or a symlink.

```bash
git mv <file_name>
```

## `git stash` 📦

The `git stash` command takes your uncommitted changes (both staged and unstaged), saves them away for later use, and then reverts them from `HEAD`. Think of it as a way to quickly switch context without committing a half-done version of your work or without dirtying your commit history.

```bash
git stash
```

## `git tag` 🏷

The `git tag` command lets you create, list, delete, and verify tags. It doesn't let you manipulate tags in the same way that `git branch` manipulates branches. Tags, like branches, are references to commits except that they're immutable. They're typically used to capture a point in history that is used for a marked version release (i.e. v1.0.1).

```bash
git tag
```

### `git tag -a` 🏷

The `-a` option will create an annotated tag, which is a full object in Git. It allows for additional information such as a tag message.

```bash
git tag -a <tag_name> -m "Tag message"
```

### `git tag -d` ❌

The `-d` option will delete the specified tag locally.

```bash
git tag -d <tag_name>
```

### `git push --tags` ⬆

The `--tags` option will push all local tags to the remote repository.

```bash
git push --tags
```