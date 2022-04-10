---
path: "java-code-snippet-used-in-ps"
date: "2019-05-01"
title: "Algorithm 문제 Java Code Snippet"
subtitle: "Collection, 람다 그리고 stream을 중심으로"
---

# 알고리즘 문제 풀이 시 자주 사용 되는 Code Snippet 정리

한동안 풀었던 알고리즘 문제들의 소스 코드를 스스로 리뷰해보는 시간을 가졌다.
알고리즘 문제를 풀 때면 비슷한 코드 조각들을 작성하게 되는데, 그때그때 찾아보거나 생각해서 작성하려니 시간 소요가 생각보다 커지게 되었다. 이와 같은 이유로 이제껏 작성한 코드에서 자주 사용되는 조각들을 추출하여 정리해보았다.

정리해보니 자료구조의 사용과 관련된 코드들이 많았다. 앞으로 Collection과 람다를 깊게 공부하여 더 좋은 방법이 있으면 바로바로 업데이트할 생각이다.

# HashMap 사용

```java
results.putIfAbsent(rank, 0);
results.computeIfPresent(rank, (k, v) -> ++v);
```

---

# List 사용

```java
allCases.removeIf(i -> !Arrays.equals(result, simulate(i, ball)));
```

---

# 우선순위 큐 사용

```java
public int getMinimumAverageProcessingTime(int[][] jobs) {
Queue<Job> scheduleQueue = new PriorityQueue<>(Comparator.comparing(j -> j.requestedTime));
Arrays.stream(jobs).forEach(j -> scheduleQueue.add(new Job(j[0], j[1])));
}
```

```java
Queue<Integer> minHeap = new PriorityQueue<>(Comparator.naturalOrder());
Queue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
```

---

# Array를 List로

```java
List<String> participantList = Arrays.asList(participant);
List<Integer> lostStudents = Arrays.stream(lost)
                        .boxed()
                        .collect(Collectors.toList());
List<Integer> lostStudents = IntStream.of(lost)
                        .boxed()
                        .collect(Collectors.toList());
```

```java
List<Integer> peopleList = Arrays.stream(people)
                    .boxed()
                    .sorted(Comparator.reverseOrder())
                    .collect(Collectors.toList());
```

---

# List를 Array로

```java
return numbers.stream()
            .mapToInt(i -> i)
            .toArray();
```

# Array를 Queue로

```java
Queue<Integer> dateQueue = Arrays.stream(dates)
                    .boxed()
                    .collect(Collectors.toCollection(LinkedList::new));
```

---

# Array 정렬

```java
Arrays.sort(cubes, Collections.reverseOrder());
Arrays.sort(costs, Comparator.comparing(cost -> cost[2]));
```

```java
int[] sorted = IntStream.of(a)
            .boxed()
            .sorted(Comparator.reverseOrder())
            .mapToInt(i -> i)
            .toArray();
int[] sortedNumbers = Arrays.stream(numbers)
            .boxed()
            .sorted((Integer o1, Integer o2) -> Integer.valueOf(o2 + "" + o1) - Integer.valueOf(o1 + "" + o2))
            .mapToInt(i -> i)
            .toArray();
```

---

# List에서 최대/최소값 찾기

```java
Integer max = listOfIntegers
            .stream()
            .mapToInt(v -> v)
            .max().orElseThrow(NoSuchElementException::new);
```

```java
Person minByAge = people
            .stream()
            .min(Comparator.comparing(Person::getAge))
            .orElseThrow(NoSuchElementException::new);
```
