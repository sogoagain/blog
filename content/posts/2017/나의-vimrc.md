---
path: "my-vimrc"
date: "2017-01-29"
title: "나의 vimrc"
subtitle: "vim을 좀더 예쁘고 편하게"
---

## 나의 Vimrc 설정

```shell
set nocompatible
filetype off

set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Plugin 'VundleVim/Vundle.vim'
Plugin 'tpope/vim-fugitive'
Plugin 'tpope/vim-sensible'			         " vim 세팅을 표준으로 설정하는 플러그인
Plugin 'scrooloose/nerdtree'			     " 파일 네비게이션 바 :NERDTree
Plugin 'scrooloose/syntastic'			     " 문법 highlighting
Plugin 'scrooloose/nerdcommenter'		     " 코맨트를 쉽고 간편하게 만들어주는 플러그인
Plugin 'mattn/emmet-vim'
Plugin 'nathanaelkane/vim-indent-guides'	" indent 깊이 표현
Plugin 'Shougo/neocomplcache.vim'		    " 자동완성 플러그인
Plugin 'altercation/vim-colors-solarized'	" Solarized 테마
Plugin 'bling/vim-airline'
Plugin 'vim-airline/vim-airline-themes'
Plugin 'Raimondi/delimitMate'

call vundle#end()
filetype plugin indent on

set nu  "add line numbers
set expandtab

" Solarized 테마
set background=dark
colorscheme solarized
let g:airline_theme='solarized'

" TAB SIZE 설정
set ts=4 sw=4 et

" Indent Guides 설정
let g:indent_guides_start_level=2
let g:indent_guides_guide_size=1
au VimEnter * IndentGuidesEnable
```
