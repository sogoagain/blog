---
path: "sourcetree-publickey-error"
date: "2019-01-08"
title: "SourceTree 'Permission denied (publickey)' 에러"
subtitle: "PC SSH Agent에 key를 등록하는 방법"
---

# 상황

SourceTree에서 원격저장소에 접근(푸쉬/풀/클론 등)을 할 때 ' 'Permission denied (publickey)' 에러 발생

# 원인

PC SSH Agent에 key가 등록되어 있지 않았을 때 발생

# 확인 방법

## Windows

Putty실행 후 등록된 key 리스트 확인

## On GitBash, OSX or Linux

```bash
$ ssh-add -l
```

# 등록된 key가 없을 때 해결법

## Windows

Putty실행 후 'Add Key' 버튼을 이용해 키 추가

## On GitBash, OSX or Linux

아래의 명령어를 통해 키 추가
(identity는 자신의 키 파일명으로 대체)

```bash
$ ssh-add ~/.ssh/identity
```
