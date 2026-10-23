const D = window.DEEPTRACE_DATA;
const KEY = "deeptrace-demo-v1";
let S = JSON.parse(localStorage.getItem(KEY) || "{}");
const save = () => localStorage.setItem(KEY, JSON.stringify(S));
let page = "home",
  selectedModule = 1,
  selectedLesson = 0,
  quizAnswers = {},
  practiceAnswer = null,
  feedback = "";
const $ = (s) => document.querySelector(s);
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const doneCount = () =>
  Object.keys(S.lessons || {}).filter((k) => S.lessons[k]).length;
const totalCount = () => D.modules.reduce((n, m) => n + m.topics.length, 0);
const pct = () => Math.round((doneCount() / totalCount()) * 100);
const go = (p, m = 1, l = 0) => {
  page = p;
  selectedModule = m;
  selectedLesson = l;
  quizAnswers = {};
  practiceAnswer = null;
  feedback = "";
  render();
  window.scrollTo(0, 0);
};
const name = () => S.code || "Khách tham quan";
const nav = () =>
  `<nav class="nav"><a href="#" class="brand" onclick="go('home');return false"><span class="brand-symbol">⬡</span><span>DEEP<em>TRACE</em></span></a><div class="navlinks"><button class="${page === "home" ? "active" : ""}" onclick="go('home')">Trang chủ</button><button class="${page === "courses" || page === "lesson" ? "active" : ""}" onclick="go('courses')">Khóa học</button><button class="${page === "lab" ? "active" : ""}" onclick="go('lab')">Phòng thực hành</button><button onclick="go('results')">Kết quả</button></div><button class="navcta" onclick="go('${S.code ? "dashboard" : "onboarding"}')">${S.code ? "↗ Bảng điều khiển" : "Bắt đầu học →"}</button></nav>`;
const footer = () =>
  `<footer class="footer">© 2026 DEEPTRACE • Nền tảng đào tạo nhận diện và ứng phó với Deepfake · Phiên bản HTML demo · Dữ liệu lưu cục bộ</footer>`;
function home() {
  return `<main class="container"><section class="hero"><div><span class="eyebrow">✦ DEEPFAKE AWARENESS PLATFORM</span><h1>Nhận diện <span>Deepfake.</span><br>Bảo vệ bản thân trong thế giới số.</h1><p class="muted">Học cách nhận biết nội dung giả mạo, xác minh thông tin và ứng phó an toàn thông qua các bài học ngắn, tình huống thực tế và trải nghiệm tương tác.</p><div class="actions"><button class="primary" onclick="go('${S.code ? "dashboard" : "onboarding"}')">Bắt đầu hành trình học →</button><button class="secondary" onclick="go('lab')">◎ Khám phá phòng thực hành</button></div><div class="statline"><div><b>04</b><small>Module đào tạo</small></div><div><b>16</b><small>Bài học chuyên đề</small></div><div><b>100%</b><small>Học tập tương tác</small></div></div></div><div class="hero-art"><div class="scangrid"></div><div class="halo"><div class="face">◉</div></div><div class="floating f1">◈ KIỂM CHỨNG NGUỒN GỐC<br><b style="color:#65e2f2">Đánh giá bằng chứng</b></div><div class="floating f2">✓ BẢO VỆ DANH TÍNH SỐ</div><div class="floating f3">◎ MEDIA ANALYSIS</div></div></section><section><div class="overline">LỘ TRÌNH HỌC TẬP</div><div class="sectionhead"><div><h2>4 module. Một hành trình an toàn hơn.</h2><p>Đi từ kiến thức nền tảng đến những quyết định an toàn trên mạng xã hội.</p></div><button class="secondary" onclick="go('courses')">Xem chương trình →</button></div><div class="cards">${D.modules.map((m) => `<div class="tile" onclick="go('lesson',${m.id},0)" role="button" tabindex="0" onkeydown="if(event.key==='Enter')go('lesson',${m.id},0)"><span class="ico">${m.icon}</span><span class="small">MODULE 0${m.id}</span><h3>${esc(m.title)}</h3><p>${esc(m.subtitle)}</p><small>${m.minutes} &nbsp;→</small></div>`).join("")}</div></section><section style="margin-top:75px"><div class="overline">NỘI DUNG BÀI GIẢNG ĐÃ MỞ RỘNG</div><div class="sectionhead"><div><h2>Không chỉ là phần giới thiệu</h2><p>Mỗi module có 4 bài học chi tiết, phần giải thích theo mục, sơ đồ ghi nhớ, hoạt động áp dụng, video minh họa và tài liệu PDF gốc.</p></div><span class="pill">04 MODULE · 16 BÀI HỌC</span></div><div class="cards lesson-preview-cards">${D.modules.map((m) => `<div class="tile"><span class="small">MODULE 0${m.id}</span><h3>${esc(m.title)}</h3><ul class="preview-list">${m.topics.map((t, i) => `<li>${i + 1}. ${esc(t.title)}</li>`).join("")}</ul><button class="primary" onclick="go('lesson',${m.id},0)">Mở bài giảng chi tiết →</button></div>`).join("")}</div></section><section style="margin-top:75px"><div class="overline">CÁCH DEEPTRACE HOẠT ĐỘNG</div><h2>Học – Thực hành – Đánh giá</h2><div class="workflow">${["Học 4 module", "Thực hành tình huống", "Xem kết quả học tập"].map((x, i) => `<div class="flowstep"><strong>0${i + 1}</strong>${x}</div>`).join("")}</div></section></main>`;
}

function onboarding() {
  return `
    <main class="container" style="max-width:760px">
      <div class="overline">BẮT ĐẦU HỌC TẬP</div>
      <h1 class="pagetitle">Tham gia DEEPTRACE</h1>

      <p class="muted">
        Tạo mã người tham gia để bắt đầu học 4 module,
        kiểm tra kiến thức và thực hành tình huống.
      </p>

      <div class="bodypanel">
        <h2>Nhập mã số sinh viên</h2>

        <p>
          Tiến độ học tập được lưu trên trình duyệt
          đang sử dụng.
        </p>

        
        <label class="small" for="code">
          Mã số sinh viên (MSSV)
        </label>

        <p>
          <input
            id="code"
            class="field"
            type="text"
            inputmode="numeric"
            maxlength="10"
            pattern="[0-9]{10}"
            value="${esc(S.code || "")}"
            placeholder="Nhập MSSV gồm 10 chữ số"
            autocomplete="off"
          >
        </p>


        <label class="option">
          <input type="checkbox" id="consent">
          Tôi đồng ý tham gia trải nghiệm website DEEPTRACE.
        </label>

        <div class="buttonrow">
          <button class="primary" onclick="register()">
            Bắt đầu học →
          </button>
        </div>

        <div id="formError" class="small"></div>
      </div>
    </main>
  `;
}



function register() {
  let c = $("#code").value.toUpperCase().trim();
  
  if (!/^[0-9]{10}$/.test(c)) {
    $("#formError").textContent =
      "Vui lòng nhập MSSV gồm đúng 10 chữ số.";
    return;
  }

  if (!$("#consent").checked) {
    $("#formError").textContent = "Vui lòng xác nhận đồng ý tham gia.";
    return;
  }
  S.code = c;
  S.consent = true;
  save();
  go("dashboard");
}
function courses() {
  return `<main class="container"><div class="overline">KHÓA HỌC DEEPTRACE</div><h1 class="pagetitle">Khám phá chương trình đào tạo</h1><p class="muted">16 bài học thuộc bốn module được xây dựng theo định hướng DigComp 3.0 và PMT.</p><div class="cards" style="margin-top:28px">${D.modules.map((m) => `<div class="tile" style="min-height:245px"><span class="ico">${m.icon}</span><span class="small">MODULE 0${m.id} · ${m.minutes}</span><h3>${esc(m.title)}</h3><p>${m.topics.length} bài học · Bài kiểm tra củng cố kiến thức</p><button class="secondary" onclick="go('lesson',${m.id},0)">Xem bài học →</button></div>`).join("")}</div></main>`;
}

function dashboard() {
  const quizzes = Object.values(S.quizzes || {});

  const averageScore = quizzes.length
    ? Math.round(
        quizzes.reduce(
          (sum, q) => sum + (q.score / q.total) * 100,
          0
        ) / quizzes.length
      ) + "%"
    : "—";

  return `
    <main class="container">
      <div class="overline">HÀNH TRÌNH CỦA BẠN</div>

      <h1 class="pagetitle">
        Chào mừng trở lại, ${esc(name())} 👋
      </h1>

      <p class="muted">
        Tiếp tục học, thực hành và kiểm chứng thông tin
        an toàn hơn mỗi ngày.
      </p>

      <div class="resultgrid">
        <div class="metric">
          <strong>${pct()}%</strong>
          <small>Tiến độ bài học</small>
        </div>

        <div class="metric">
          <strong>${doneCount()}/${totalCount()}</strong>
          <small>Bài học đã hoàn thành</small>
        </div>

        <div class="metric">
          <strong>${averageScore}</strong>
          <small>Điểm trung bình kiểm tra module</small>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="bodypanel">
          <h2>Tiến độ khóa học</h2>

          <div class="progress">
            <i style="width:${pct()}%"></i>
          </div>

          ${D.modules.map((m) => `
            <div class="dashmodule">
              <div>
                <b>Module 0${m.id}</b>
                <div class="small">${esc(m.title)}</div>
              </div>

              <button
                class="secondary"
                onclick="go('lesson',${m.id},0)"
              >
                Học →
              </button>
            </div>
          `).join("")}
        </div>

        <div class="bodypanel">
          <h2>Các bước tiếp theo</h2>

          <p>
            Hoàn thành 4 module đào tạo, thực hiện
            các bài kiểm tra kiến thức và tham gia
            phòng thực hành để củng cố kỹ năng
            nhận diện Deepfake.
          </p>

          <div class="buttonrow">
            <button
              class="primary"
              onclick="go('courses')"
            >
              Tiếp tục học →
            </button>

            <button
              class="secondary"
              onclick="go('lab')"
            >
              Vào phòng thực hành
            </button>

            <button
              class="secondary"
              onclick="go('results')"
            >
              Xem kết quả học tập
            </button>
          </div>

          <div class="notice">
            Phiên bản thử nghiệm: tiến độ chỉ lưu
            trong localStorage của trình duyệt;
            không đồng bộ giữa các thiết bị.
          </div>
        </div>
      </div>
    </main>
  `;
}

function lesson() {
  const m = D.modules[selectedModule - 1];
  const t = m.topics[selectedLesson];
  const k = `${m.id}-${selectedLesson}`;
  const det = window.DEEPTRACE_DETAILS?.[m.id];
  const ld = det?.lessons?.[selectedLesson];
  const visual = ld?.visual || "definition";
  const diagrams = {
    definition: `<div class="visual-grid"><div class="visual-card"><b>AI tạo sinh / thao túng</b><span>Hình ảnh · Âm thanh · Video</span></div><div class="visual-card"><b>Điều người xem thấy</b><span>Một người có vẻ đã nói/làm điều chưa xảy ra</span></div></div>`,
    pipeline: `<div class="diagram-flow"><div>Dữ liệu đầu vào</div><i>→</i><div>Mô hình AI xử lý</div><i>→</i><div>Tạo / biến đổi</div><i>→</i><div>Nội dung đầu ra</div></div>`,
    types: `<div class="visual-grid three"><div class="visual-card"><span class="visual-emoji">▧</span><b>Deepfake hình ảnh</b><span>Thay đổi khuôn mặt hoặc ngoại hình</span></div><div class="visual-card"><span class="visual-emoji">♫</span><b>Deepfake âm thanh</b><span>Mô phỏng giọng nói</span></div><div class="visual-card"><span class="visual-emoji">▶</span><b>Deepfake video</b><span>Biến đổi khuôn mặt, biểu cảm, lời nói</span></div></div>`,
    verification: `<div class="steps-visual">${["Dừng lại", "Kiểm tra nguồn", "Truy tìm bối cảnh", "Đối chiếu độc lập", "Đánh giá"].map((x, i) => `<div><b>0${i + 1}</b><span>${x}</span></div>`).join("")}</div>`,
    response: `<div class="steps-visual">${["Tạm dừng", "Kiểm tra nguồn", "Dùng công cụ phù hợp", "Đánh giá bằng chứng", "Xử lý / báo cáo"].map((x, i) => `<div><b>0${i + 1}</b><span>${x}</span></div>`).join("")}</div>`,
  };
  const generic = `<div class="visual-grid"><div class="visual-card"><b>Quan sát</b><span>Ghi nhận dấu hiệu hoặc dữ liệu có liên quan</span></div><div class="visual-card"><b>Kiểm chứng</b><span>Đối chiếu nguồn, bối cảnh và bằng chứng độc lập</span></div></div>`;
  const video = det?.video;
  const videoBlock = video
    ? video.id
      ? `<section class="video-panel"><div class="video-heading"><span class="pill">VIDEO BÀI HỌC</span><h3>${esc(video.title)}</h3><p>${esc(video.note || "Video minh họa phục vụ học tập.")}</p></div><div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.id)}" title="${esc(video.title)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div></section>`
      : `<section class="video-panel"><div class="video-heading"><span class="pill">VIDEO BÀI HỌC</span><h3>${esc(video.title)}</h3><p>${esc(video.note || "Video minh họa phục vụ học tập.")}</p></div><div class="video-frame"><video controls preload="metadata" playsinline><source src="${esc(video.url)}" type="video/mp4">Trình duyệt không hỗ trợ video. <a href="${esc(video.url)}">Mở video trực tiếp</a></video></div></section>`
    : "";
  return `<main class="container"><div class="breadcrumbs">Khóa học / Module 0${m.id} / Bài ${selectedLesson + 1}</div><div class="layout"><aside class="sidebar"><h4>MODULE 0${m.id}</h4><div class="small" style="padding:0 9px 17px">${esc(m.title)}</div>${m.topics.map((x, i) => `<button class="sidebtn ${i === selectedLesson ? "sel" : ""}" onclick="go('lesson',${m.id},${i})">${S.lessons?.[m.id + "-" + i] ? "✓" : "◯"} &nbsp; ${i + 1}. ${esc(x.title)}</button>`).join("")}<button class="sidebtn ${selectedLesson === 99 ? "sel" : ""}" onclick="go('quiz',${m.id})">✎ &nbsp; Kiểm tra cuối module</button><hr class="divider"><button class="sidebtn" onclick="go('courses')">← Quay lại khóa học</button><a class="pdf-link" href="resources/Module-${m.id}-${["Hieu-dung-ve-cong-nghe-Deepfake", "Nhan-dien-va-kiem-chung-Deepfake", "Bao-ve-thong-tin-ca-nhan", "Ung-pho-va-cong-cu-phat-hien"][m.id - 1]}.pdf" target="_blank" rel="noopener">▤ Mở tài liệu PDF gốc ↗</a></aside><article class="bodypanel lesson-content"><span class="pill">BÀI ${selectedLesson + 1} / ${m.topics.length}</span><h2>${esc(t.title)}</h2><div class="small">MODULE 0${m.id} · ${m.minutes}</div><hr class="divider"><h3>Mục tiêu bài học</h3><p>${esc(ld?.lead || t.body)}</p>${(ld?.sections || []).map(([head, items]) => `<section class="lesson-section"><h3>${esc(head)}</h3><ul>${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></section>`).join("")}<div class="lesson-visual"><div class="overline">HỌC QUA HÌNH ẢNH</div>${diagrams[visual] || generic}<p class="visual-caption">Sơ đồ minh họa để ghi nhớ kiến thức. Các dấu hiệu trực quan chỉ là manh mối, không thay thế việc kiểm chứng nguồn gốc và bối cảnh.</p></div>${videoBlock}<div class="activity-box"><span class="pill">HOẠT ĐỘNG TƯƠNG TÁC</span><h3>Thử áp dụng kiến thức</h3><p>${esc(ld?.activity || t.take)}</p><div class="takeaway"><b>Điểm cần ghi nhớ</b><br><br>${esc(t.take)}</div></div><div class="pdf-inline"><div><b>Tài liệu học thuật của module</b><p>Mở bản PDF đầy đủ để xem nội dung chi tiết, bảng biểu và tài liệu tham khảo của nhóm.</p></div><a class="secondary" href="resources/Module-${m.id}-${["Hieu-dung-ve-cong-nghe-Deepfake", "Nhan-dien-va-kiem-chung-Deepfake", "Bao-ve-thong-tin-ca-nhan", "Ung-pho-va-cong-cu-phat-hien"][m.id - 1]}.pdf" target="_blank" rel="noopener">Mở PDF ↗</a></div><div class="quizfooter"><button class="secondary" onclick="${selectedLesson > 0 ? `go('lesson',${m.id},${selectedLesson - 1})` : `go('courses')`}">← Bài trước</button><button class="primary" onclick="markLesson()">${S.lessons?.[k] ? "✓ Đã hoàn thành" : "Đánh dấu hoàn thành →"}</button></div></article></div></main>`;
}
function markLesson() {
  S.lessons ??= {};
  S.lessons[`${selectedModule}-${selectedLesson}`] = true;
  save();
  const m = D.modules[selectedModule - 1];
  if (selectedLesson < m.topics.length - 1)
    go("lesson", selectedModule, selectedLesson + 1);
  else go("quiz", selectedModule);
}
function questionHTML(q, i, prefix = "q") {
  return `<div class="question"><h3>Câu ${i + 1}. ${esc(q.q)}</h3>${q.a.map((a, j) => `<label class="option"><input type="radio" name="${prefix}${i}" value="${j}" onchange="${prefix === "q" ? "quizAnswers" : "assessmentAnswers"}[${i}]=${j}"> ${esc(a)}</label>`).join("")}</div>`;
}
function quiz() {
  const m = D.modules[selectedModule - 1];
  return `<main class="container" style="max-width:860px"><div class="breadcrumbs">Khóa học / Module 0${m.id} / Kiểm tra</div><div class="bodypanel"><span class="pill">KIỂM TRA CUỐI MODULE</span><h2>${esc(m.title)}</h2>
<p>Chọn đáp án phù hợp nhất để kiểm tra và củng cố kiến thức sau khi hoàn thành module.</p>
${m.quiz.map((q, i) => questionHTML(q, i)).join("")}<div class="quizfooter"><button class="secondary" onclick="go('lesson',${m.id},0)">← Quay lại bài học</button><button class="primary" onclick="submitQuiz()">Nộp bài kiểm tra →</button></div>${feedback}</div></main>`;
}
function submitQuiz() {
  let m = D.modules[selectedModule - 1];
  if (Object.keys(quizAnswers).length < m.quiz.length) {
    feedback =
      '<div class="notice warn">Vui lòng trả lời tất cả các câu.</div>';
    render();
    return;
  }
  const score = m.quiz.reduce(
    (n, q, i) => n + (quizAnswers[i] === q.correct),
    0,
  );
  S.quizzes ??= {};
  S.quizzes[m.id] = { score, total: m.quiz.length };
  save();
  feedback = `<div class="notice">Bạn làm đúng ${score}/${m.quiz.length} câu.${m.quiz.map((q, i) => `<p><b>Câu ${i + 1}:</b> ${esc(q.why)}</p>`).join("")}</div><button class="primary" onclick="go('dashboard')">Về bảng điều khiển →</button>`;
  render();
}
function lab() {
  const cases = window.DEEPTRACE_CASES || [];
  const saved =
    window.__deeptracePracticeAnswers ||
    (window.__deeptracePracticeAnswers = {});
  return `<main class="container"><div class="overline">DEEPTRACE AWARENESS LAB</div><h1 class="pagetitle">Phòng thực hành: Kiểm tra kiến thức tình huống</h1><p class="muted">20 tình huống thực tế về nhận diện Deepfake, kiểm chứng thông tin và lựa chọn cách ứng phó an toàn. Chọn một đáp án cho mỗi câu rồi nộp bài để xem điểm và giải thích.</p><div class="bodypanel"><div class="resultgrid"><div class="metric"><strong>${cases.length}</strong><small>Câu hỏi tình huống</small></div><div class="metric"><strong>${Object.keys(saved).length}/${cases.length}</strong><small>Đã trả lời</small></div><div class="metric"><strong>${window.__deeptracePracticeScore ?? "—"}</strong><small>Điểm gần nhất / ${cases.length}</small></div></div>${cases.map((q, i) => `<div class="question"><h3>Câu ${i + 1}. ${esc(q[0])}</h3>${q[1].map((a, j) => `<label class="option"><input type="radio" name="practice${i}" value="${j}" ${saved[i] === j ? "checked" : ""} onchange="window.__deeptracePracticeAnswers[${i}]=${j}"> ${String.fromCharCode(65 + j)}. ${esc(a)}</label>`).join("")}${window.__deeptracePracticeSubmitted ? `<div class="notice ${saved[i] === q[2] ? "" : "warn"}"><b>${saved[i] === q[2] ? "✓ Đáp án đúng" : "Đáp án đúng: " + String.fromCharCode(65 + q[2])}</b><br>${esc(q[3])}</div>` : ""}</div>`).join("")}<div class="quizfooter"><button class="secondary" onclick="window.__deeptracePracticeAnswers={};window.__deeptracePracticeSubmitted=false;window.__deeptracePracticeScore=null;go('lab')">Làm lại từ đầu</button><button class="primary" onclick="submitPracticeSet()">Nộp bài và xem kết quả →</button></div>${window.__deeptracePracticeSubmitted ? `<div class="takeaway"><b>Kết quả:</b> ${window.__deeptracePracticeScore}/${cases.length} câu đúng (${Math.round((window.__deeptracePracticeScore / cases.length) * 100)}%). Xem phần giải thích ngay dưới từng câu để củng cố kiến thức.</div>` : ""}</div><div class="bodypanel" style="margin-top:20px"><div class="overline">QUY TẮC AN TOÀN</div><h2>Dừng – Xác minh – Hành động</h2><p>Khi gặp nội dung nghi là Deepfake, không vội chia sẻ, chuyển tiền hoặc cung cấp dữ liệu cá nhân. Hãy kiểm tra nguồn, bối cảnh và đối chiếu bằng chứng độc lập trước khi kết luận.</p><button class="secondary" onclick="go('lesson',4,0)">Học Module 4 →</button></div></main>`;
}
function submitPracticeSet() {
  const cases = window.DEEPTRACE_CASES || [],
    saved =
      window.__deeptracePracticeAnswers ||
      (window.__deeptracePracticeAnswers = {});
  if (Object.keys(saved).length < cases.length) {
    feedback =
      '<div class="notice warn">Vui lòng trả lời đủ 20 câu trước khi nộp bài.</div>';
    window.__deeptracePracticeSubmitted = false;
    render();
    return;
  }
  window.__deeptracePracticeScore = cases.reduce(
    (n, q, i) => n + (saved[i] === q[2] ? 1 : 0),
    0,
  );
  window.__deeptracePracticeSubmitted = true;
  S.practice = (S.practice || 0) + 1;
  save();
  render();
}


function results() {
  const quizzes = Object.values(S.quizzes || {});

  const average = quizzes.length
    ? Math.round(
        quizzes.reduce(
          (sum, q) => sum + (q.score / q.total) * 100,
          0
        ) / quizzes.length
      )
    : null;

  return `
    <main class="container">
      <div class="overline">KẾT QUẢ HỌC TẬP</div>
      <h1 class="pagetitle">Kết quả học tập của bạn</h1>

      <p class="muted">
        Mã tham gia: ${esc(name())}.
        Kết quả được lưu trên trình duyệt hiện tại.
      </p>

      <div class="resultgrid">
        <div class="metric">
          <strong>${pct()}%</strong>
          <small>Tiến độ học tập</small>
        </div>

        <div class="metric">
          <strong>${quizzes.length}/4</strong>
          <small>Module đã kiểm tra</small>
        </div>

        <div class="metric">
          <strong>${average === null ? "—" : average + "%"}</strong>
          <small>Điểm trung bình module</small>
        </div>
      </div>

      <div class="bodypanel">
        <h2>Kết quả kiểm tra từng module</h2>

        ${D.modules.map((m) => `
          <div class="dashmodule">
            <div>
              <b>Module 0${m.id}</b>
              <div class="small">${esc(m.title)}</div>
            </div>

            <span class="tag">
              ${
                S.quizzes?.[m.id]
                  ? S.quizzes[m.id].score + "/" +
                    S.quizzes[m.id].total
                  : "Chưa kiểm tra"
              }
            </span>
          </div>
        `).join("")}
      </div>

      <div class="actions">
        <button class="primary" onclick="go('dashboard')">
          Bảng điều khiển
        </button>

        <button class="secondary" onclick="downloadData()">
          Xuất dữ liệu JSON
        </button>

        <button class="secondary" onclick="resetData()">
          Xóa dữ liệu
        </button>
      </div>
    </main>
  `;
}

function downloadData() {
  let a = document.createElement("a"),
    blob = new Blob(
      [
        JSON.stringify(
          {
            participant: S.code,
            lessons: S.lessons,
            quizzes: S.quizzes,
          },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    );
  a.href = URL.createObjectURL(blob);
  a.download = "deeptrace-demo-" + (S.code || "participant") + ".json";
  a.click();
  URL.revokeObjectURL(a.href);
}
function resetData() {
  if (confirm("Xóa toàn bộ tiến độ DEEPTRACE trên trình duyệt này?")) {
    S = {};
    save();
    go("home");
  }
}

function render() {
  document.title =
    "DEEPTRACE — Học, kiểm chứng & ứng phó với Deepfake";

  const pages = {
    home,
    dashboard,
    courses,
    onboarding,
    lesson,
    quiz,
    lab,
    results
  };

  $("#app").innerHTML = `
    <div class="app">
      ${nav()}
      ${pages[page]()}
      ${footer()}
    </div>
  `;
}

render();
