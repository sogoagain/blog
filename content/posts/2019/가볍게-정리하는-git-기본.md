---
path: "git-basics"
date: "2019-06-12"
title: "가볍게 정리하는 Git 기본"
subtitle: "CLI 명령어 중심으로"
tags: "Git"
---

# Git 기본 내용 정리

Git과 Github를 사용하고 있지만 단순히 commit, pull/push, branch 정도의 기능만 사용하고 있었을 뿐 아니라 Git GUI 도구를 활용했기에 명령줄 환경에서 git을 잘 다루지 못하였다. Git의 여러 기능을 명령줄 환경에서 능숙하게 사용하여 버전관리 및 협업을 제대로 하고 싶은 바람이 마음속 깊숙이 자리 잡고 있었다. 미루고 미루다 이번에 기회가 되어 Git의 내용을 정리해보는 시간을 가졌다.

명령어 중심으로 정리를 한 것이라 Git을 처음 사용하시는 분들은 포스팅에 참고한 아래 2개의 링크를 통해 Git의 기본적인 사용법을 익히는 것을 추천한다.
생활코딩의 [지옥에서 온 Git](https://www.opentutorials.org/course/2708)강의와 [git - 간편 안내서](http://rogerdudler.github.io/git-guide/index.ko.html)를 참고하였다.

# Git 이란?

- 버전관리 시스템 중 하나 (구체적인 제품)
- 소스코드의 '백업', '복원', '협업'을 효율적으로 할 수 있도록 해주는 프로그램이다.

## git 환경설정

- git을 사용하는 사용자 이름이나 email 주소를 설정해놓을 수 있다. 이런 설정을 해놓아야 협업을 할 때 작업한 사람을 식별하는데 용이하다.

1. config 정보 확인

```shell
git config --list
```

- config list를 확인한 후 exit를 하고 싶을 땐 ':q'를 입력하면 된다.

2. config 설정하기

```shell
git config --global user.name "이름"
git config --global user.email "이메일"
```

3. config 삭제하기

```shell
git config --unset --global user.name
git config --unset --global user.email
```

## 저장소 만들기

```shell
git init
```

- 위 명령어를 실행하면 현재 디렉터리에 '.git' 이라는 디렉터리가 생성된다.
- '.git' 디렉터리는 버전정보와 관련된 내용들이 저장되는 디렉터리다.

## 저장소 상태보기

```shell
git status
```

# 버전관리

## 파일을 인덱스에 추가하기 (파일 tracking)

```shell
git add <file name>
```

- commit을 하기전에 하나의 버전으로 묶을 파일들을 add를 통해 인덱스에 추가해 놓아야 한다.
- add는 프로젝트의 수많은 수정사항들 중에 하나의 작업 단위에 속하는 파일들끼리 묶어서 commit할 수 있도록 도와준다.
- git add된 파일들은 "staging area"에 속하게 된다.

## 변경내용 확정하기 (버전 만들기)

- 버전은 '의미 있는 변화, 변화가 완결된 상태' 정도로 이해할 수 있으며, 좋은 버전의 단위는 고민해봐야할 사항이다.
- commit은 하나의 작업을 담고 있는 것이 좋다.
- commit된 파일들은 "repository"에 속하게 된다.

```shell
git commit
```

- git index에 추가된 파일이 존재할 경우 위 명령어를 실행하면 vi 편집기가 실행된다. 맨 윗줄에 버전에 대한 설명을 적고 저장하면 commit이 완료된다.

```shell
git commit -m "버전에 대한 설명"
```

- vi 편집기를 사용하지 않고 'm' 옵션을 이용해서 바로 commit할 수 있다.

```shell
git commit -a -m "버전에 대한 설명"
```

- 매번 git add 후에 git commit을 하는 것이 번거로울 수 있다. 그럴땐 'a' 옵션을 통해 add와 commit을 동시에 할 수 있다.
- 'a' 옵션은 변경된 파일을 인덱스에 추가한 뒤 커밋한다. 이때, 신규로 추가된 파일(한번도 add를 하지 않은 파일)은 제외된다.

```shell
git commit --amend
```

- amend 옵션을 통해 커밋 메세지를 수정할 수 있다.
- 단, 원격 저장소에 올리기 전에 수정해야한다.

## commit 로그 확인

```shell
git log
```

- commit 로그를 확인할 수 있다.

```shell
git reflog
```

- reset 기록을 확인할 수 있다.

## 변경사항 확인하기

1. 차이점 확인

```shell
git log -p
```

- 각각의 커밋과 커밋 사이의 소스 차이를 확인 할 수 있다.

```shell
git diff <commit id>..<commit id>
```

- 특정한 두 커밋 사이의 차이점을 확인 할 수 있다.

```shell
git diff
```

- 제일 최근의 커밋된 버전과 현재 작업한 수정 내역과의 차이점을 확인할 수 있다.
- 수정된 파일들을 git add하게 되면 확인할 수 없다.

## 변경내용 되돌리기

1. reset

```shell
git reset --hard <commit id>
```

- reset은 되돌리려는 commit으로 상태가 돌아간다. 되돌리려는 commit 이후의 이력은 숨겨진다.
- reset 명령어에서 사용할 수 있는 옵션은 'soft, mixed, hard' 등이 있다.

```shell
git reset --hard ORIG_HEAD
```

- reset 하기 전으로 되돌리고 싶다면 'ORIG_HEAD'로 reset 하면 된다.

2. revert

```shell
git revert
```

- revert는 돌아가려는 commit을 기반으로 새로운 commit을 생성하며 작업 상태를 되돌리는 명령어다.
- 즉, commit 이력을 유지하면서 내용을 되돌린다고 볼 수 있다.

3. checkout

```shell
git checkout <commit id>
```

- checkout은 본래 branch를 변경할 때 사용하는 명령어인데, 아래와 같은 방법으로 변경 내용을 되돌릴 수 있다.
- HEAD가 branch를 가리키는 것이 아닌 직접 commit을 가리키게 된다.
- git branch 명령어를 통해서 위 내용을 확인할 수 있다.

# branch

## 가지(branch) 치기

- branch는 원래 버전관리 되던 작업을 통째로 복사한 뒤 독립적으로 개발하여 또 다른 버전의 줄기를 만드는 것이다.

1. branch 확인하기

```shell
git branch
```

2. branch 생성하기

```shell
git branch <branch name>
git checkout -b <branch name>
```

- checkout 명령어에 'b' 옵션을 통해 branch를 생성하면서 바로 생성된 branch로 checkout 할 수 있다.

3. branch 갈아타기

```shell
git checkout <branch name>
```

4. 모든 branch의 커밋 로그 확인하기

```shell
git log --branches --decorate --graph --oneline
```

5. branch 사이의 commit 차이점 확인하기

```shell
git log <branch1 name>..<branch2 name>
```

- branch1에는 없고 branch2에는 있는 commit 로그를 보여준다.
- 'p' 옵션을 통해 소스코드의 차이점도 볼 수 있다.

6. diff 명령어를 이용하여 branch 사이의 상태 비교

```shell
git diff <branch1 name>..<branch2 name>
```

- diff 명령어를 통해서 branch1과 branch2의 현재 상태들을 비교할 수 있다.

## branch 병합하기

```shell
git merge <branch2 name>
```

- branch2에서 branch1으로 병합을 하기 위해선 아래의 절차를 밟아야 한다.

1. branch1으로 checkout
2. branch1에서 merge 명령을 한다.
3. 병합된 commit이 새로 생성된다.

- merge tool을 이용한 병합

1. git 설정

```shell
git config --global merge.tool <tool name>
```

2. merge 후 conflict가 발생
3. mergetool 실행 후 conflict 해결

```shell
git mergetool
```

4. conflict를 해결하면 바로 commit 되는데, <filename>.orig 라는 백업 파일이 생성되므로 차후에 삭제를 권장한다.

## branch 삭제하기

```shell
git branch -d <branch name>
```

## stash

```shell
git stash --help
```

- 현재 branch에서 작업을 하는 중에 다른 branch로 변경하여 작업을 해야할 일이 있을 때 사용하는 명령어다.
- 작업중이었던 내용을 어딘가 저장하여 감추는 기능을 한다.
- git stash 명령은 버전관리가 되고 있는 파일에 대해서만 사용 가능하다.

1. 작업 내용 숨기기

```shell
git stash save
```

2. stash 목록 확인하기

```shell
git stash list
```

3. 숨겼던 작업 내용 적용하기

```shell
git stash apply
```

4. 가장 최신 stash 삭제하기

```shell
git stash drop
```

5. stash 했던 작업 내용을 적용한 뒤 바로 삭제하기

```shell
git stash pop
```

## 원격 저장소

- 원격 저장소는 지역(local) 저장소 반대에 있는 개념으로 '소스 백업' 및 '협업'을 가능케 한다.

1. 원격 저장소 생성

```shell
git init --bare <remote directory>
```

- 원격 저장소를 만드려는 디렉터리에 위 명령어를 입력한다.
- init의 bare 옵션은 작업이 불가능한(working directory가 없는) 저장소를 생성한다.
- 즉, 순수한 저장의 기능을 하는 저장소가 생성된다.

2. 원격 저장소 연결

```shell
git remote add <원격 저장소 별칭> <원격 저장소 경로>
```

- 지역(local) 저장소와 원격 저장소를 연결한다.
- 보통 원격 저장소 별칭은 'origin'을 사용한다.

3. 원격 저장소 확인

```shell
git remote -v
```

4. 연결된 원격 저장소 제거

```shell
git remote remove <원격 저장소 별칭>
```

5. 원격 저장소 복제

```shell
git clone <원격 저장소 주소> <로컬 저장소 경로>
```

6. 원격 저장소로 전송

```shell
git push <원격 저장소 별칭> <branch 이름>
```

- '--set-upstream' 옵션을 사용하면 현재 branch와 원격저장소의 branch를 연결하여 다음 명령 부터는 원격 저장소와 원격 저장소의 branch를 명시할 필요가 없도록 해주는 옵션이다.
- 즉, 첫 push에 '--set-upstream' 옵션을 주면 이후부터는 'git push'를 통해 원격 저장소로 전송이 가능하다.

7. 원격 저장소 내용 가져오기

```shell
git pull
```

- pull 명령어는 원격 저장소의 내용을 로컬 저장소로 가져와 병합 작업 후 작업 내용을 반영한다.

```shell
git fetch
```

- fetch 명령어는 원격 저장소의 내용을 로컬 저장소로 가져오기는 하지만 새로운 브랜치로 가져오기 때문에 로컬 저장소에 반영이 되지 않는다.
- fetch로 가져온 새로운 브랜치는 'FETCH_HEAD' 이름으로 체크아웃 가능하다.

## Rebase

```shell
git rebase <branch name>
```

- 서로 다른 브랜치를 병합하는 기능을 하는 명령어다.
- merge 명령어와 다르게 병합하는 브랜치의 커밋 이력을 유지할 수 있다.

```shell
git rebase --continue
```

- rebase 명령어 실행 중 conflict가 일어나면 해결 후 continue 옵션을 통해 계속해서 병합을 실행한다.
