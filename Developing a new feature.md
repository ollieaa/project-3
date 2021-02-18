##Developing a new feature!

1) **gco -b name-of-branch**

2) **Create your feature!**

3) **git add .**

4) **git commit -m "my great new feature"** (You can add and commit as often as you like at this stage. Recommend at least daily)

5) **gco development** (check out your development branch)

6) **git pull origin development** (pull the latest from github)

7) **gco name-of-branch** (check out your feature branch)

8) **git merge development** Merge your development branch into your feature branch.

9) If there were any conflicts, resolve them, involving your team as needed. Make sure to run your tests after doing this!

10) **git add .** (Only necessary if there were conflicts)

11) **git commit -m "message"** (Only necessary if there were conflicts)

12) **gco development** (back to your development branch)

13) **git merge name-of-branch** (now merge your feature branch into development branch)

14) **git push origin development** (share you dev branch with your team!)

15) **gco -b name-of-new-branch OR gco name-of-branch** if you intend to use the same feature branch for everything.