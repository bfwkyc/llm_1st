// ============================================================
// 02단원 · 개념 04 — 폴더 다루기
// ------------------------------------------------------------
// 실행: node 개념04_폴더_다루기.js
// ============================================================
//
// 앞에서 파일을 읽고 썼습니다. 그런데 실제 서비스에서는
// 파일을 아무 데나 쌓아 두지 않습니다. 폴더로 정리합니다.
//
//     uploads/
//       2026/
//         03/
//           작업표준서.pdf
//           검사성적서.xlsx
//
// 이번 파일에서는 폴더를 만들고, 안을 들여다보고, 지우는 법을 배웁니다.
// 파일 업로드 서버를 만들 때 그대로 씁니다.

const fs = require("fs");
const path = require("path");

// 이 예제가 쓸 연습용 폴더입니다.
const 연습폴더 = path.join(__dirname, "연습_업로드");

// 매번 결과가 같도록 먼저 통째로 지우고 시작합니다.
// force: true 는 "없어도 에러 내지 말라" 는 뜻입니다.
fs.rmSync(연습폴더, { recursive: true, force: true });

// ── 섹션 1: 폴더 만들기 ──

// [Line 30] mkdirSync 로 지정한 경로에 새 폴더 생성
fs.mkdirSync(연습폴더);

// [Line 32] existsSync 로 폴더가 정상 생성되었는지 존재 여부 확인
console.log(fs.existsSync(연습폴더));
// 🔊 콘솔 출력: true

// [Line 36~42] 이미 존재하는 폴더를 다시 만들면 EEXIST 에러 발생 → try/catch 로 포획
try {
  fs.mkdirSync(연습폴더);
} catch (error) {
  // [Line 40] 에러 코드 출력 (EEXIST = already EXISTs)
  console.log(error.code);
  // 🔊 콘솔 출력: EEXIST
}

// [Line 45~47] 사전 확인 후 없을 때만 만드는 안전한 방어 코드 패턴
if (!fs.existsSync(연습폴더)) {
  fs.mkdirSync(연습폴더);
}

// ── ✏️ [Line 49] 직접 해보기 1 실행 코드 ──
// [직접해보기 Line 1] "임시폴더" 절대 경로 생성
const p = path.join(__dirname, "임시폴더");

// [직접해보기 Line 2] 임시폴더 생성
fs.mkdirSync(p, { recursive: true });

// [직접해보기 Line 3] 폴더 존재 여부 확인 출력
console.log(fs.existsSync(p));
// 🔊 콘솔 출력: true

// ============================================================
// 📺 화면 및 🔊 F12 / 터미널 CLI 최종 콘솔 실행 결과
// ============================================================
// 📺 브라우저 화면 표시: (Node.js 백엔드 콘솔 환경이므로 웹 브라우저 DOM 렌더링 없음)
//
// 🔊 F12 / 터미널 최종 콘솔 출력 결과:
// true
// EEXIST
// true

// ✏️ 직접 해보기 1 — "임시폴더" 를 만들고 existsSync 로 확인해 보세요.

// ── 섹션 2: 여러 단계를 한 번에 ──

// uploads/2026/03 처럼 여러 단계를 만들려면 어떻게 할까요?
// 하나씩 만들 필요 없습니다. recursive 옵션을 주면 됩니다.

// [Line 58] uploads/2026/03 형태의 다단계 깊은 경로 생성
const 깊은경로 = path.join(연습폴더, "2026", "03");

// [Line 60] recursive: true 옵션으로 상위/하위 폴더를 한 번에 생성 (부모 없어도 에러 없음)
fs.mkdirSync(깊은경로, { recursive: true });

// [Line 62] 깊은 경로가 정상적으로 생성되었는지 검증
console.log(fs.existsSync(깊은경로));
// 🔊 콘솔 출력: true

// [Line 68] recursive: true 는 이미 폴더가 존재해도 EEXIST 에러를 내지 않는 보너스가 있음
fs.mkdirSync(깊은경로, { recursive: true });

// [Line 69] 중복 생성 시에도 에러 없이 안전하게 통과함을 출력
console.log("두 번 만들어도 에러가 안 났습니다");
// 🔊 콘솔 출력: 두 번 만들어도 에러가 안 났습니다

// ── ✏️ [Line 78] 직접 해보기 2 정답 실행 코드 ──
// [직접해보기 Line 1] 연습폴더 안에 "docs/pdf" 다단계 폴더를 한 번에 생성
fs.mkdirSync(path.join(연습폴더, "docs", "pdf"), { recursive: true });

// [직접해보기 Line 2] docs/pdf 폴더 생성 확인 (검증용)
console.log(fs.existsSync(path.join(연습폴더, "docs", "pdf")));
// 🔊 콘솔 출력: true

// ============================================================
// 📺 화면 및 🔊 F12 / 터미널 CLI 최종 콘솔 실행 결과
// ============================================================
// 📺 브라우저 화면 표시: (Node.js 백엔드 콘솔 환경이므로 웹 브라우저 DOM 렌더링 없음)
//
// 🔊 F12 / 터미널 최종 콘솔 출력 결과:
// true
// 두 번 만들어도 에러가 안 났습니다
// true

// ✏️ 직접 해보기 2 — 연습폴더 안에 "docs/pdf" 를 한 번에 만들어 보세요.

// ── 섹션 3: 폴더 안 목록 보기 ──

// [Line 83] 연습폴더 직속에 "작업표준서.pdf" 파일 생성
fs.writeFileSync(path.join(연습폴더, "작업표준서.pdf"), "내용1", "utf-8");

// [Line 84] 연습폴더 직속에 "검사성적서.xlsx" 파일 생성
fs.writeFileSync(path.join(연습폴더, "검사성적서.xlsx"), "내용22", "utf-8");

// [Line 85] 깊은경로(2026/03) 폴더 안에 "3월보고서.pdf" 파일 생성
fs.writeFileSync(path.join(깊은경로, "3월보고서.pdf"), "내용333", "utf-8");

// [Line 87] readdirSync 로 연습폴더의 1단계 항목 이름 목록 추출 (한 겹만 탐색)
const 목록 = fs.readdirSync(연습폴더);

// [Line 89] OS별 순서 차이를 통일하기 위해 sort() 정렬 후 출력 (폴더와 파일이 함께 반환됨)
console.log(목록.sort());
// 🔊 콘솔 출력: [ '2026', '검사성적서.xlsx', '작업표준서.pdf' ]

// [Line 101] filter 와 path.extname 을 조합하여 확장자가 .pdf 인 파일만 선별
const pdf목록 = fs
  .readdirSync(연습폴더)
  .filter((name) => path.extname(name) === ".pdf");

// [Line 102] 필터링된 PDF 파일 목록 출력
console.log(pdf목록);
// 🔊 콘솔 출력: [ '작업표준서.pdf' ]

// ── ✏️ [Line 105] 직접 해보기 3 정답 실행 코드 ──
// [직접해보기 Line 1] 깊은경로(연습_업로드/2026/03) 폴더의 내부 목록 출력
console.log(fs.readdirSync(깊은경로));
// 🔊 콘솔 출력: [ '3월보고서.pdf' ]

// ============================================================
// 📺 화면 및 🔊 F12 / 터미널 CLI 최종 콘솔 실행 결과
// ============================================================
// 📺 브라우저 화면 표시: (Node.js 백엔드 콘솔 환경이므로 웹 브라우저 DOM 렌더링 없음)
//
// 🔊 F12 / 터미널 최종 콘솔 출력 결과:
// [ '2026', '검사성적서.xlsx', '작업표준서.pdf' ]
// [ '작업표준서.pdf' ]
// [ '3월보고서.pdf' ]

// ✏️ 직접 해보기 3 — 깊은경로 폴더의 목록을 출력해 보세요.

// ── 섹션 4: 파일인가 폴더인가 ──

// 목록에는 파일과 폴더가 섞여 나옵니다. 구분하려면 statSync 를 씁니다.

// [Line 110] statSync 로 "작업표준서.pdf" 의 메타데이터 객체 조회
const 파일정보 = fs.statSync(path.join(연습폴더, "작업표준서.pdf"));

// [Line 112] 파일 여부(true) 및 디렉터리 여부(false) 출력
console.log(파일정보.isFile(), 파일정보.isDirectory());
// 🔊 콘솔 출력: true false

// [Line 115] statSync 로 "2026" 폴더의 메타데이터 객체 조회
const 폴더정보 = fs.statSync(path.join(연습폴더, "2026"));

// [Line 117] 파일 여부(false) 및 디렉터리 여부(true) 출력
console.log(폴더정보.isFile(), 폴더정보.isDirectory());
// 🔊 콘솔 출력: false true

// [Line 120] 파일 크기(바이트) 확인 ("내용1" -> 한글 2자(6바이트) + 숫자 1자(1바이트) = 7)
console.log(파일정보.size);
// 🔊 콘솔 출력: 7

// [Line 136] 수정 시각 객체의 타입 확인 (자바스크립트 Date 인스턴스)
console.log(파일정보.mtime.constructor.name);
// 🔊 콘솔 출력: Date

// [Line 142] withFileTypes: true 옵션으로 이름과 타입 정보가 함께 담긴 객체 배열 획득
const 항목들 = fs.readdirSync(연습폴더, { withFileTypes: true });

// [Line 143] map 으로 "이름:구분" 문자열을 조합하고 sort() 정렬
const 구분 = 항목들
  .map((e) => `${e.name}:${e.isDirectory() ? "폴더" : "파일"}`)
  .sort();

// [Line 145] 구분 결과 배열 출력
console.log(구분);
// 🔊 콘솔 출력: [ '2026:폴더', '검사성적서.xlsx:파일', '작업표준서.pdf:파일' ]

// ── ✏️ [Line 150] 직접 해보기 4 정답 실행 코드 ──
// [직접해보기 Line 1~3] 연습폴더에서 디렉터리만 필터링하여 순수 이름 배열 추출
const 폴더만 = fs
  .readdirSync(연습폴더, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

// [직접해보기 Line 4] 폴더 이름 배열 출력
console.log(폴더만);
// 🔊 콘솔 출력: [ '2026' ]

// ============================================================
// 📺 화면 및 🔊 F12 / 터미널 CLI 최종 콘솔 실행 결과
// ============================================================
// 📺 브라우저 화면 표시: (Node.js 백엔드 콘솔 환경이므로 웹 브라우저 DOM 렌더링 없음)
//
// 🔊 F12 / 터미널 최종 콘솔 출력 결과:
// true false
// false true
// 7
// Date
// [ '2026:폴더', '검사성적서.xlsx:파일', '작업표준서.pdf:파일' ]
// [ '2026' ]

// ✏️ 직접 해보기 4 — 연습폴더에서 '폴더만' 골라 이름을 출력해 보세요.

// ── 섹션 5: 지우기 ──

// [파일 하나] — 앞에서 배운 unlinkSync
fs.unlinkSync(path.join(연습폴더, "검사성적서.xlsx"));
console.log(fs.existsSync(path.join(연습폴더, "검사성적서.xlsx")));
// 출력: false

// [빈 폴더] — rmdirSync
const 빈폴더 = path.join(연습폴더, "빈폴더");
fs.mkdirSync(빈폴더);
fs.rmdirSync(빈폴더);
console.log(fs.existsSync(빈폴더));
// 출력: false

// [안에 뭐가 든 폴더] — rmSync 에 recursive
// rmdirSync 로는 안 됩니다. 비어 있지 않다고 에러가 납니다.
console.log(fs.existsSync(깊은경로));
// 출력: true

fs.rmSync(path.join(연습폴더, "2026"), { recursive: true });
console.log(fs.existsSync(깊은경로));
// 출력: false
// 안에 있던 3월보고서.pdf 까지 통째로 사라졌습니다.

// ★★ 아주 위험합니다 ★★
//   rmSync 에 recursive: true 를 주면 그 아래를 전부 지웁니다.
//   경로를 잘못 쓰면 되돌릴 수 없습니다. 휴지통에도 안 갑니다.
//
//   실무에서는 지우기 전에 반드시 확인합니다.
//     · 경로를 console.log 로 찍어 보고
//     · 그 경로가 내가 만든 폴더 안인지 확인하고
//     · 그다음에 지웁니다
//
//   사용자가 보낸 값을 그대로 rmSync 에 넣는 일은 절대 하지 마세요.

// ✏️ 직접 해보기 5 — 폴더를 만들고, 안에 파일을 하나 넣고,
//                    rmdirSync 로 지워 보세요. 무슨 에러가 나나요?

// ── 섹션 6: 실전 — 업로드 폴더 준비하기 ──

// 파일 업로드 서버가 시작할 때 하는 일을 그대로 만들어 봅시다.
// "오늘 날짜 폴더에 저장한다" 는 흔한 방식입니다.

// [Line 196] 기준 폴더와 Date 객체를 받아 년/월 폴더를 자동 생성하고 경로를 반환하는 함수
function 저장폴더만들기(기준폴더, 날짜) {
  // [Line 197] 4자리 연도 추출 (예: 2026)
  const 년 = 날짜.getFullYear();

  // [Line 198] getMonth() 는 0부터 시작하므로 +1 을 하고, padStart(2, "0") 으로 2자리 고정 ("03")
  const 월 = String(날짜.getMonth() + 1).padStart(2, "0");

  // [Line 200] 기준폴더/년/월 다단계 경로 결합
  const 대상 = path.join(기준폴더, String(년), 월);

  // [Line 203] 없으면 만들고, 이미 있으면 에러 없이 통과
  fs.mkdirSync(대상, { recursive: true });

  // [Line 205] 생성된 저장 대상 절대 경로 반환
  return 대상;
}

// [Line 207] 2026년 3월 5일 기준 저장 폴더 생성 (2는 3월)
const 오늘폴더 = 저장폴더만들기(연습폴더, new Date(2026, 2, 5));

// [Line 209] 오늘폴더의 최하위 폴더 이름 확인
console.log(path.basename(오늘폴더));
// 🔊 콘솔 출력: 03

// [Line 211] 오늘폴더의 상위 연도 폴더 이름 확인
console.log(path.basename(path.dirname(오늘폴더)));
// 🔊 콘솔 출력: 2026

// [Line 216] 완성된 날짜 폴더에 저장할 파일 경로 결합
const 저장경로 = path.join(오늘폴더, "새문서.pdf");

// [Line 217] 폴더가 이미 마련되어 있으므로 ENOENT 에러 없이 안전하게 파일 기록
fs.writeFileSync(저장경로, "업로드된 내용", "utf-8");

// [Line 219] 파일이 정상적으로 기록되었는지 존재 여부 확인
console.log(fs.existsSync(저장경로));
// 🔊 콘솔 출력: true

// [Line 225] 실습 종료 후 연습폴더 통째로 뒷정리 삭제
fs.rmSync(연습폴더, { recursive: true, force: true });

// [Line 226] 삭제 확인 (false)
console.log(fs.existsSync(연습폴더));
// 🔊 콘솔 출력: false

// ── ✏️ [Line 228] 직접 해보기 6 정답 실행 코드 ──
// [직접해보기 Line 1] new Date(2026, 11, 25) 전달 시 11은 12월이므로 2026/12 폴더가 생성됨
const 크리스마스폴더 = 저장폴더만들기(연습폴더, new Date(2026, 11, 25));

// [직접해보기 Line 2] 월 확인 (12)
console.log(path.basename(크리스마스폴더));
// 🔊 콘솔 출력: 12

// [직접해보기 Line 3] 연도 확인 (2026)
console.log(path.basename(path.dirname(크리스마스폴더)));
// 🔊 콘솔 출력: 2026

// [직접해보기 Line 4] 확인 후 최종 정리
fs.rmSync(연습폴더, { recursive: true, force: true });

// ============================================================
// 📺 화면 및 🔊 F12 / 터미널 CLI 최종 콘솔 실행 결과
// ============================================================
// 📺 브라우저 화면 표시: (Node.js 백엔드 콘솔 환경이므로 웹 브라우저 DOM 렌더링 없음)
//
// 🔊 F12 / 터미널 최종 콘솔 출력 결과:
// 03
// 2026
// true
// false
// 12
// 2026

// ✏️ 직접 해보기 6 — 저장폴더만들기 에 new Date(2026, 11, 25) 를 넣으면
//                    어떤 폴더가 만들어질까요? 먼저 예상하고 확인하세요.

// ── 섹션 7: 자주 하는 실수 ──

// ★ 아래에서 SyntaxError 라고 적힌 것은 눈으로만 보세요. 주석을 풀지 마세요.

// [실수 1] 폴더 없이 파일부터 쓰려 함
//   fs.writeFileSync(path.join(__dirname, "없는폴더", "a.txt"), "내용");
//   실수: ENOENT 가 납니다. 파일은 만들어 주지만 폴더는 안 만들어 줍니다.
//         쓰기 전에 mkdirSync(폴더, { recursive: true }) 를 먼저 하세요.

// [실수 2] recursive 를 안 씀
//   fs.mkdirSync(path.join(a, "b", "c"));
//   실수: b 가 없으면 ENOENT 입니다. 한 단계씩만 만들어 줍니다.
//         { recursive: true } 를 붙이면 다 만들어 주고 이미 있어도 안전합니다.

// [실수 3] readdirSync 결과를 그대로 경로로 씀
//   const files = fs.readdirSync(폴더);
//   fs.readFileSync(files[0]);
//   실수: readdirSync 는 '이름' 만 줍니다. 전체 경로가 아닙니다.
//         path.join(폴더, files[0]) 로 합쳐야 합니다.

// [실수 4] 안쪽 폴더까지 다 보일 거라 생각함
//   readdirSync 는 한 겹만 봅니다. 안쪽 폴더의 파일은 안 나옵니다.
//   전부 훑으려면 폴더를 만날 때마다 다시 들어가야 합니다.

// [실수 5] rmSync 를 함부로 씀
//   fs.rmSync(경로, { recursive: true, force: true });
//   실수: 경로가 틀리면 엉뚱한 폴더가 통째로 사라집니다.
//         특히 사용자 입력을 경로에 넣으면 절대 안 됩니다.

// [실수 6] 폴더를 unlinkSync 로 지우려 함
//   fs.unlinkSync(폴더경로);
//   실수: EPERM 이나 EISDIR 에러가 납니다.
//         파일은 unlink, 폴더는 rmdir 또는 rm 입니다.

// ── 정리 ──

// 1. mkdirSync(경로, { recursive: true }) — 여러 단계를 한 번에, 있어도 안전.
// 2. readdirSync(폴더) — 한 겹의 이름 목록. 전체 경로가 아니다.
// 3. withFileTypes: true 를 주면 파일인지 폴더인지 바로 알 수 있다.
// 4. statSync 로 크기(size)와 수정 시각(mtime)을 알 수 있다.
// 5. 파일은 unlinkSync, 빈 폴더는 rmdirSync, 내용 있는 폴더는 rmSync + recursive.
// 6. 지우는 것은 되돌릴 수 없다. 경로를 반드시 확인하고 지운다.
// 7. 파일을 쓰기 전에 폴더를 먼저 만든다. 폴더는 자동으로 안 생긴다.

// ============================================================
// 직접 해보기 정답
// ============================================================
//
// 1) const p = path.join(__dirname, "임시폴더");
//    fs.mkdirSync(p, { recursive: true });
//    console.log(fs.existsSync(p));   // 출력: true
//    fs.rmSync(p, { recursive: true, force: true });   // 확인 후 정리
//
// 2) fs.mkdirSync(path.join(연습폴더, "docs", "pdf"), { recursive: true });
//    → docs 와 pdf 가 한 번에 만들어집니다.
//
// 3) console.log(fs.readdirSync(깊은경로));
//    // 출력: [ '3월보고서.pdf' ]
//    → 섹션 5에서 지우기 전에 실행해야 나옵니다.
//
// 4) const 폴더만 = fs.readdirSync(연습폴더, { withFileTypes: true })
//      .filter((e) => e.isDirectory())
//      .map((e) => e.name);
//    console.log(폴더만);
//    // 출력: [ '2026' ]
//    → filter 와 map 은 JS자료 08단원에서 배운 그대로입니다.
//
// 5) const p = path.join(__dirname, "안빈폴더");
//    fs.mkdirSync(p, { recursive: true });
//    fs.writeFileSync(path.join(p, "a.txt"), "내용", "utf-8");
//    try {
//      fs.rmdirSync(p);
//    } catch (e) {
//      console.log(e.code);   // 출력: ENOTEMPTY
//    }
//    fs.rmSync(p, { recursive: true, force: true });
//    → ENOTEMPTY = NOT EMPTY. "비어 있지 않다" 는 뜻입니다.
//      안에 뭐가 있으면 rmdirSync 로는 못 지웁니다.
//
// 6) 2026/12 폴더가 만들어집니다.
//    new Date(2026, 11, 25) 의 11 은 12월입니다. getMonth() 가 0부터라
//    +1 을 하면 12 가 되고, padStart 로 "12" 가 됩니다.
//    (한 자리 달이면 "03" 처럼 앞에 0이 붙습니다)
