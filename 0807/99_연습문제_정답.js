// 99_연습문제_정답 (09일차 - JS 조건문 · 반복문)
// 연습문제 정답
// node 99_연습문제_정답.js 로 실행하며 결과를 확인합니다.
// 각 문제를 중괄호 블록 { } 으로 감싸 변수 이름 충돌을 막았습니다.
// (블록 안에서 선언한 let/const 는 블록 밖에서 보이지 않습니다.)

// ═══ 문제 1 정답 ═══ if / else
console.log("===== 문제 1 =====");
{
  const mathScore = 85;
  if (mathScore > 80) {
    console.log("우수 학생 명단에 올랐습니다"); // 출력: 우수 학생 명단에 올랐습니다
  } else {
    console.log("다음 시험에서 더 힘내 봅시다");
  }
  // 해설: 85 > 80 이 true 이므로 if 블록만 실행됩니다. 두 블록이 동시에 실행되는 일은 없습니다.
}

// ═══ 문제 2 정답 ═══ else if 다중 조건
console.log("===== 문제 2 =====");
{
  const examScore = 88;
  if (examScore >= 95) {
    console.log("A등급 - 최우수");
  } else if (examScore >= 85) {
    console.log("B등급 - 우수"); // 출력: B등급 - 우수
  } else if (examScore >= 70) {
    console.log("C등급 - 보통");
  } else {
    console.log("D등급 - 노력 필요");
  }
  // 해설: 위에서부터 검사해 "처음 true 가 되는 블록 하나만" 실행됩니다.
  // 만약 >= 70 을 먼저 검사하면 88점도 C등급이 되어 버립니다. 높은 점수부터 검사!
}

// ═══ 문제 3 정답 ═══ switch
console.log("===== 문제 3 =====");
{
  const subjectCode = 3;
  switch (subjectCode) {
    case 1:
      console.log("국어 시간");
      break;
    case 2:
      console.log("수학 시간");
      break;
    case 3:
      console.log("체육 시간 - 체육복 준비"); // 출력: 체육 시간 - 체육복 준비
      break;
    default:
      console.log("알 수 없는 코드");
      break;
  }
  // 해설: subjectCode 값과 일치하는 case 블록만 실행됩니다.
  // break 를 빼먹으면 아래 case 까지 줄줄이 실행되니(fall-through) 주의!
}

// ═══ 문제 4 정답 ═══ 삼항 연산자
console.log("===== 문제 4 =====");
{
  const wrongCount = 3;
  const currentHour = 22;
  const testResult = wrongCount === 0 ? "통과" : "재시험"; // 조건 ? 참일 때 : 거짓일 때
  console.log(`채점 결과: ${testResult}`); // 출력: 채점 결과: 재시험
  const periodName = currentHour >= 18 ? "야간 자습" : "정규 수업";
  console.log(`현재 일과: ${periodName}`); // 출력: 현재 일과: 야간 자습
  // 해설: "결과값을 변수에 담는" 상황이면 if/else 보다 삼항 연산자가 한 줄로 깔끔합니다.
}

// ═══ 문제 5 정답 ═══ for 문 누적 합
console.log("===== 문제 5 =====");
{
  const mealCounts = [120, 135, 110, 150, 125];
  let weekTotal = 0; // 합계 변수는 반복문 "밖"에! (안에 선언하면 매번 0으로 초기화됨)
  for (let i = 0; i < mealCounts.length; i++) {
    weekTotal += mealCounts[i]; // 인덱스로 요소에 접근해 누적
  }
  console.log(`주간 총 급식 인원: ${weekTotal}명`); // 출력: 주간 총 급식 인원: 640명
  console.log(`하루 평균 급식 인원: ${weekTotal / mealCounts.length}명`); // 출력: 하루 평균 급식 인원: 128명
  // 해설: 120 + 135 + 110 + 150 + 125 = 640, 640 / 5 = 128.
  // 조건을 i < mealCounts.length 로 쓰면 배열 길이가 바뀌어도 코드는 그대로 동작합니다.
}

// ═══ 문제 6 정답 ═══ while + break
console.log("===== 문제 6 =====");
{
  let classPoints = 0;
  let addCount = 0;
  while (true) {
    classPoints += 40; // 한 번에 40점 적립
    addCount++;
    if (classPoints >= 200) {
      break; // 목표에 도달하면 즉시 종료
    }
  }
  console.log(`적립 횟수: ${addCount}회`); // 출력: 적립 횟수: 5회
  console.log(`최종 점수: ${classPoints}점`); // 출력: 최종 점수: 200점
  // 해설: 40, 80, 120, 160, 200 으로 5회 만에 200 이상이 되어 break.
  // while (true) 를 쓸 때는 break 조건에 반드시 도달하는지 꼭 확인해야 합니다(무한 루프 방지).
}

// ═══ 문제 7 정답 ═══ [도전] 시험 점수 분석
console.log("===== 문제 7 =====");
{
  const scores = [72, 81, -1, 85, 77, -1, 83];
  let validCount = 0;
  let highCount = 0;
  let maxScore = 0;
  for (let i = 0; i < scores.length; i++) {
    if (scores[i] === -1) {
      continue; // 결시 -> 이번 차례의 나머지를 건너뛰고 다음 학생으로
    }
    validCount++;
    if (scores[i] > 80) {
      highCount++;
    }
    if (scores[i] > maxScore) {
      maxScore = scores[i]; // 지금까지의 최고값보다 크면 교체
    }
  }
  console.log(`응시 인원: ${validCount}명`); // 출력: 응시 인원: 5명
  console.log(`80점 초과: ${highCount}명`); // 출력: 80점 초과: 3명
  console.log(`최고 점수: ${maxScore}점`); // 출력: 최고 점수: 85점
  // 해설 ①: continue 는 "이번 차례만" 건너뜁니다. 반복 자체는 계속됩니다.
  //   그래서 -1 을 만나면 그 아래 세 줄(validCount++, highCount, maxScore)이 통째로 건너뛰어지고
  //   결시 학생은 어떤 집계에도 섞이지 않습니다. break 를 쓰면 첫 -1 에서 분석이 끝나 버립니다.
  //
  // 해설 ②: 최고값 찾기는 "지금까지의 챔피언"을 변수 하나에 들고 다니며 도전자와 비교하는 방식입니다.
  //   비교가 끝나야 챔피언이 확정되므로 maxScore 는 반드시 반복문 밖에 선언합니다.
  //
  // 해설 ③: 왜 maxScore 를 0 에서 시작했는가 —
  //   점수는 0 이상이라 어떤 실제 점수든 0 보다 크기 때문입니다.
  //   ⚠️ 이건 이 문제에서만 통하는 방법입니다. 기온처럼 음수가 나올 수 있는 데이터라면
  //   0 으로 시작하면 영하 값이 하나도 못 이겨서 최고값이 엉뚱하게 0 이 됩니다.
  //   그럴 땐 "배열의 첫 요소"로 시작해야 안전합니다 (심화2 문제 1 에서 다시 다룹니다).
  //   여기서는 첫 요소가 -1(결시)일 수도 있어서 오히려 0 시작이 맞습니다.
  //
  // 계산: 응시 5명(72, 81, 85, 77, 83), 그중 80점 초과는 3명(81, 85, 83), 최고 점수는 85점.
}
