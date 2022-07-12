# Frisklog

학습한 내용 및 문제를 해결했던 경험을 상기시키며 정리하는 용도로 만들게 된 블로그입니다.

## Table of Contents

-   [Features](#features)
-   [Install](#install)
-   [Task Manage](#task-manage)
-   [File Structure](#file-structure)
-   [Related projects](#related-projects)
-   [License](#license)

## Features

-   `Loadable`을 사용하여 페이지에 필요한 스크립트만 동적으로 불러올 수 있도록 `Code-Spliting` 코드분할 작업을 하였습니다.
-   HMR 및 번들링 기능이 내장된 `Razzle`을 사용였습니다.
-   컴포넌트 내에서 재사용가능한 코드를 커스텀 Hooks로 리펙토링 하였습니다.
-   전역상태를 관리하기 위해 `Context API`를 사용하였습니다.
-   데이터 패칭을 위해 `Apollo-Client` 및 `GraphQL`을 사용하였습니다.
-   `Scss` 와 `Bootstrap`를 활용하여 스타일시트를 작성하였습니다.

## Install

1. 프로젝트 내려받기

```
$ git clone https://github.com/donghoon4907/frisklog.git
$ cd frisklog
```

2. 패키지 설치

> yarn을 사용하는 경우에만 패키지 잠금이 적용됩니다.

-   Using yarn

```
$ yarn install
```

3. 환경 변수 설정하기

`.env` 파일을 구성하여 환경 변수를 설정하세요. `.env.example`를 통해 예시를 확인할 수 있습니다.

-   `.env.development` 개발 시 필요한 설정
-   `.env.production` 배포 시 필요한 설정

4. GraphQL 서버 설치 가이드

-   [Frisklog-Server](https://github.com/donghoon4907/frisklog-server)

## Task Manage

-   [Trello(deprecated)](https://trello.com/b/Z34VUGK0/frisklog)
-   [Projects](https://github.com/users/donghoon4907/projects/1)

## File Structure

| 루트경로 |  디렉토리명   |                  설명                   |
| :------: | :-----------: | :-------------------------------------: |
|  `/src`  |   `/assets`   |       아이콘 컴포넌트 목록입니다.       |
|          | `/components` |   재사용 가능한 컴포넌트 목록입니다.    |
|          |  `/context`   | Context API 관련 모듈을 정의하였습니다. |
|          |  `/graphql`   |  GraphQL Query 및 Mutation 목록입니다.  |
|          |   `/hooks`    |     커스텀 Hooks를 정의하였습니다.      |
|          |    `/json`    |         정적 데이터 목록입니다.         |
|          |    `/lib`     | 공통으로 사용되는 헬퍼 모듈 목록입니다. |
|          |   `/pages`    |       페이지 컴포넌트 목록입니다.       |
|          |    `/sass`    |         스타일 시트 목록입니다.         |

## Related projects

-   [Backend(서비스)](https://github.com/donghoon4907/frisklog-server)
-   [Next+Typescript(구버전, deprecated)](https://github.com/donghoon4907/frisklog-with-next)

## License

[MIT](License)
