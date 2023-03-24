---
path: "assignment-operator-overloading"
date: "2017-01-14"
title: "C++에서 대입 연산자를 오버로딩 하는 괜찮은 방법"
subtitle: "복사 생성자, 소멸자를 이용한 '='연산자 오버로딩"
tags: "C++"
---

# C++로 LinkedList를 구현할 때의 고민

LinkedList 구현에서 =연산자 오버 로딩을 어떻게 할까 봐 고민하던 중 굉장히 멋진 방법을 찾았다. 이 방법은 깊은 복사를 하는 복사 생성자가 제대로 구현되어 있어야 하고 소멸자 또한 메모리 정리를 깔끔히 한다는 것을 전제로 한다.

```cpp
template <typename T>
LinkedList<T>& LinkedList<T>::operator=(const LinkedList<T>& reference) {
    LinkedList<T> temp = reference;
    size = temp.getSize();
    std::swap(temp.head, head);
    return *this;
}
```

# 해결책

방법은 다음과 같다. LinkedList의 임시 객체를 복사 생성자를 통해 생성한 뒤 swap을 통해 임시 객체의 head 포인터 값과 현재 객체의 head 포인터 값을 변경한 뒤 현재 객체를 반환한다.

# Nice한 요소

임시 객체를 복사 생성자를 통해 만들었으므로 임시 객체가 가진 데이터는 피연산 객체의 데이터와 완전히 같다. 그 뒤 head 포인터를 변경함으로써 현재 객체가 그 데이터를 갖게 되고 임시 객체는 현재 객체가 원래 가지고 있었던 데이터를 갖게 된다. 함수가 끝날 때 임시객체의 소멸 자가 호출되므로 임시 객체가 가지고 있던 정리 해야 할 데이터들이 말끔히 정리된다.
