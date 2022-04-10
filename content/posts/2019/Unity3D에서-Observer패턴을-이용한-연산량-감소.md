---
path: "observer-pattern-in-unity3d"
date: "2019-02-06"
title: "Unity3D에서 Observer패턴을 이용한 연산량 감소"
subtitle: "디자인패턴으로 코드의 아름다움뿐만 아니라 성능까지"
---

# 개요

- 도플러 효과를 이용한 실감 음향 기술을 제안하는 프로젝트를 Unity3D와 아두이노(움직이는 스피커)를 이용하여 진행.
- 음원의 이동에 따른 도플러 효과를 고려(계산)하기 위하여 Unity3D내 주요 개체들이 음원 개체의 위치를 매순간 참조
- Unity3D내 주요 개체들이 음원 개체를 매번 참조하는 것이 아닌, 음원 개체의 위치가 변경될 때만 위치를 참조하여 계산을 하도록 설계하면 프로그램 연산량이 감소될 것이라 기대

# 기존 구현 방법 및 문제점

- Unity3D의 MonoBehaviour 클래스의 Update() 메소드를 이용하여 구현

  - Update() 메소드는 매 프레임마다 호출되는 이벤트 함수
  - 주요 개체(Listener, LeftSpeaker, RightSpeaker, RealSoundEffector 등)들의 Update() 메소드에서 매 프레임마다 음원 개체의 위치를 참조하여 연산
  - 프레임마다 주요 개체들이 음원 개체와의 거리, 출력량, 회전각도, 도플러 효과 적용 등의 연산을 수행

- 위의 방법은 연산 중복으로 인한 비효율 발생

  - 음원 개체가 정지되어 있거나, 움직이는 속도가 느리면 아래의 그림과 같이 연산 중복이 발생

    ![Operation_Duplication](/images/Unity3D에서-Observer패턴을-이용한-연산량-감소/Operation_Duplication.png)

    - 음원 개체가 이전과 같은 위치이기 때문에 연산 결과가 동일함에도 프레임이 변경되었기 때문에 불필요 연산 수행

# Observer 패턴 적용

- Observer 패턴
  - Subject의 상태가 변할 때 Observer 객체들이 변화를 통지 받고 연산 수행
- Observer 패턴 적용

  - Subject: 음원 개체 (SoundSource)
  - Observer: 청자 개체 (Listener), 스피커 개체 (LeftSpeaker, RightSpeaker), 음향 효과 개체 (RealSoundEffector)

- 음원의 위치가 변경되었을 때에만 연산 수행
  - 성능 향상 기대
  - 불필요 데이터 제거로 인한 데이터 분석의 편리함 기대

# 클래스 관계도

![Class_Diagram](/images/Unity3D에서-Observer패턴을-이용한-연산량-감소/Class_Diagram.png)

# 주요 소스코드

- 음원 개체 (SoundSource) 클래스
  - List를 이용해 Observer 관리
  - RegisterObserver, RemoveObserver, NotifyObservers 구현
  - Update() 메소드를 이용해 프레임마다 위치 변화 확인
- Observer
  - 청자 개체 (Listener), 스피커 개체 (LeftSpeaker, RightSpeaker), 음향 효과 개체 (RealSoundEffector) 등
  - OnNotify() 메소드를 통해 상태 변화 전달받음
  - 기존 Update() 메소드에서 연산 불필요

```csharp
void Update()
{
    if (OnKeyDown())
    {
        audio.Play();
        command.Execute();
    }
    if (position != gameObject.transform.position)
    {
        position = gameObject.transform.position;
        NotifyObservers();
    }
}
```

# 결론

- 동일 기능 수행 시 비교 결과

![result1](/images/Unity3D에서-Observer패턴을-이용한-연산량-감소/result1.png)

- 동일 연산량 수행 시 비교 결과

![result1](/images/Unity3D에서-Observer패턴을-이용한-연산량-감소/result2.png)

- 결과 분석
  - 동일 수행에 대한 연산량이 약 7배 감소
  - FPS (초당 프레임 수) 평균값 증가
    - 성능 향상
  - FPS 표준 편차 감소
    - FPS 안정화
- 기대효과
  - Unity3D를 사용하는 다른 프로젝트에도 적용 가능
  - Gamer의 캐릭터를 추적해 쫓는 몬스터
    - 몬스터 시야에 Gamer가 들어왔을 때 쫓는 기능을 Observer 패턴으로 구현
