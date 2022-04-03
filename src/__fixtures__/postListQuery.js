const postList = {
  allMarkdownRemark: {
    nodes: [
      {
        frontmatter: {
          date: "2021-01-20",
          subtitle: "내가 작성한 로직의 복잡도는 얼마나 될까?",
          title: "더블링 테스트, 알고리즘 복잡도를 실험으로 예측하는 방법",
        },
        fields: {
          slug: "/2021/doubling-ratio/",
        },
      },
      {
        frontmatter: {
          date: "2020-12-31",
          subtitle: "2020년을 돌아보며 준비하는 2021년",
          title: "2020년 회고",
        },
        fields: {
          slug: "/2020/2020-retrospective/",
        },
      },
      {
        frontmatter: {
          date: "2020-12-11",
          subtitle: "리알못의 리액트 탐방기",
          title: "백엔드 개발자가 회사에서 리액트 세미나를 진행하기까지",
        },
        fields: {
          slug: "/2020/react-seminar-retrospective/",
        },
      },
      {
        frontmatter: {
          date: "2020-12-04",
          subtitle: "Local 환경에 CA를 구성하고 인증서를 발급해보자",
          title: "mkcert를 이용한 localhost HTTPS(TLS) 설정",
        },
        fields: {
          slug: "/2020/https-using-mkcert/",
        },
      },
      {
        frontmatter: {
          date: "2020-10-25",
          subtitle:
            "Controller에서 URI 작업을 할 때 UriComponentsBuilder를 사용하자",
          title: "UriComponentsBuilder로 URI 생성하는 방법",
        },
        fields: {
          slug: "/2020/uri-components-builder/",
        },
      },
      {
        frontmatter: {
          date: "2020-08-12",
          subtitle: "익스트림 프로그래밍 - 변화를 포용하라",
          title: "극단(extreme)으로 가기 위한 철학",
        },
        fields: {
          slug: "/2020/extreme-programming/",
        },
      },
      {
        frontmatter: {
          date: "2020-07-23",
          subtitle: "버그 투성이 프로그램",
          title: "개발자의 아침",
        },
        fields: {
          slug: "/2020/developers-morning/",
        },
      },
      {
        frontmatter: {
          date: "2020-04-30",
          subtitle: "프로그래머의 길, 멘토에게 묻다",
          title: "삶에 적용해야 할 견습 과정 패턴",
        },
        fields: {
          slug: "/2020/apprenticeship-patterns/",
        },
      },
      {
        frontmatter: {
          date: "2020-04-29",
          subtitle: "익명 함수와 이벤트 리스너",
          title:
            "[실수노트] JavaScript에서 동일한 이벤트 리스너는 단 한 번만 등록하자",
        },
        fields: {
          slug: "/2020/register-the-same-event-listener-only-once/",
        },
      },
      {
        frontmatter: {
          date: "2020-03-08",
          subtitle: "스프링 레거시 코드를 개선하는데 실천한 13가지 방법",
          title: "레거시 코드를 점진적으로 개선한 경험",
        },
        fields: {
          slug: "/2020/continuous-improvement-legacy/",
        },
      },
      {
        frontmatter: {
          date: "2020-01-12",
          subtitle: "함께 자라기 - 애자일로 가는 길",
          title: "삶에 애자일 도입하기",
        },
        fields: {
          slug: "/2020/road-to-agile/",
        },
      },
      {
        frontmatter: {
          date: "2020-01-11",
          subtitle: "2019년을 돌아보며 준비하는 2020년",
          title: "2019년 회고",
        },
        fields: {
          slug: "/2020/2019-retrospective/",
        },
      },
      {
        frontmatter: {
          date: "2019-12-06",
          subtitle: "Spring에서 @Cacheable을 사용할 때 주의할 점",
          title:
            "[실수노트] 캐싱된 메서드는 변경 불가능한(Immutable) 객체를 반환토록 하자",
        },
        fields: {
          slug: "/2019/cached-method-with-immutable-object/",
        },
      },
      {
        frontmatter: {
          date: "2019-10-22",
          subtitle: "1만 시간의 재발견: 노력은 왜 우리를 배신하는가",
          title: "의식적인 연습에 기반한 나의 앞으로의 학습",
        },
        fields: {
          slug: "/2019/deliberate-practice/",
        },
      },
      {
        frontmatter: {
          date: "2019-09-25",
          subtitle: "Getter, Setter의 유해성과 캡슐화에 대해서",
          title: "AWS도 Setter를 사용하지 않는다",
        },
        fields: {
          slug: "/2019/aws-also-doesnt-use-setters/",
        },
      },
      {
        frontmatter: {
          date: "2019-08-20",
          subtitle: "Kotlin에서 null을 안전하게 처리하는 4가지 방법",
          title: "코틀린(Kotlin)에서의 null 안전 처리",
        },
        fields: {
          slug: "/2019/null-safety-in-kotlin/",
        },
      },
      {
        frontmatter: {
          date: "2019-08-03",
          subtitle: "클라이언트가 웹 서버로 보내는 HTTP 요청 메시지",
          title: "HTTP 메시지 - HTTP Requests",
        },
        fields: {
          slug: "/2019/http-request-message/",
        },
      },
      {
        frontmatter: {
          date: "2019-06-17",
          subtitle: "하나의 테스트 메서드에 여러 테스트 케이스 수행하기",
          title: "JUnit5, @ParameterizedTest 사용 예",
        },
        fields: {
          slug: "/2019/junit5-parameterizedtest/",
        },
      },
      {
        frontmatter: {
          date: "2019-06-12",
          subtitle: "CLI 명령어 중심으로",
          title: "가볍게 정리하는 Git 기본",
        },
        fields: {
          slug: "/2019/git-basics/",
        },
      },
      {
        frontmatter: {
          date: "2019-06-07",
          subtitle: "대한민국을 살리는 개발자 문화",
          title: "문화와 기술",
        },
        fields: {
          slug: "/2019/culture-and-technology/",
        },
      },
      {
        frontmatter: {
          date: "2019-05-01",
          subtitle: "Collection, 람다 그리고 stream을 중심으로",
          title: "Algorithm 문제 Java Code Snippet",
        },
        fields: {
          slug: "/2019/java-code-snippet-used-in-ps/",
        },
      },
      {
        frontmatter: {
          date: "2019-03-08",
          subtitle: "IntelliJ에서 Docker에 올려진 Tomcat으로 배포",
          title: "IntelliJ에서 Docker로 Web App 배포하기",
        },
        fields: {
          slug: "/2019/using-docker-with-intellij/",
        },
      },
      {
        frontmatter: {
          date: "2019-02-22",
          subtitle: "Oracle DB의 SID와 ServiceName에 대해서",
          title: "ORA-12505 오류 해결",
        },
        fields: {
          slug: "/2019/ora-12505-error/",
        },
      },
      {
        frontmatter: {
          date: "2019-02-06",
          subtitle: "디자인패턴으로 코드의 아름다움뿐만 아니라 성능까지",
          title: "Unity3D에서 Observer패턴을 이용한 연산량 감소",
        },
        fields: {
          slug: "/2019/observer-pattern-in-unity3d/",
        },
      },
      {
        frontmatter: {
          date: "2019-01-22",
          subtitle: "MS-SQL 중심으로 정리해본 DB 기본 내용",
          title: "가볍게 정리하는 DB 기본",
        },
        fields: {
          slug: "/2019/database-basics/",
        },
      },
      {
        frontmatter: {
          date: "2019-01-12",
          subtitle: "개체, 객체, 인스턴스의 차이는 무엇일까?",
          title: "가볍게 구분하는 개체, 객체, 인스턴스",
        },
        fields: {
          slug: "/2019/entity-object-instance/",
        },
      },
      {
        frontmatter: {
          date: "2019-01-08",
          subtitle: "PC SSH Agent에 key를 등록하는 방법",
          title: "SourceTree 'Permission denied (publickey)' 에러",
        },
        fields: {
          slug: "/2019/sourcetree-publickey-error/",
        },
      },
      {
        frontmatter: {
          date: "2017-06-27",
          subtitle: "행렬 곱셈 연산 수행 시간 분석을 통한 캐시에 대한 이해",
          title: "SimpleScalar를 이용한 Cache Simulation",
        },
        fields: {
          slug: "/2017/cache-simulation-with-simplescalar/",
        },
      },
      {
        frontmatter: {
          date: "2017-01-29",
          subtitle: "vim을 좀더 예쁘고 편하게",
          title: "나의 vimrc",
        },
        fields: {
          slug: "/2017/my-vimrc/",
        },
      },
      {
        frontmatter: {
          date: "2017-01-14",
          subtitle: "복사 생성자, 소멸자를 이용한 '='연산자 오버로딩",
          title: "C++에서 대입 연산자를 오버로딩 하는 괜찮은 방법",
        },
        fields: {
          slug: "/2017/assignment-operator-overloading/",
        },
      },
      {
        frontmatter: {
          date: "2017-01-06",
          subtitle: "나중은 결코 오지 않는다.",
          title: "르블랑의 법칙",
        },
        fields: {
          slug: "/2017/leblancs-law/",
        },
      },
      {
        frontmatter: {
          date: "2017-01-05",
          subtitle: "Java에서는 당연한 C++의 '가상'",
          title: "가상함수와 가상상속",
        },
        fields: {
          slug: "/2017/virtual-method-virtual-inheritance/",
        },
      },
      {
        frontmatter: {
          date: "2017-01-05",
          subtitle: "신속하고 변화에 유연하며 적응적인 소프트웨어 개발",
          title: "애자일 소프트웨어 개발",
        },
        fields: {
          slug: "/2017/agile-software-development/",
        },
      },
    ],
  },
};

export default postList;
