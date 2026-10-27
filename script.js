/* =========================================
   LOVE CHECK — EASY CUSTOMIZATION
   Kamu cukup edit bagian ini setiap order.
========================================= */

const CONFIG = {
  senderName: " Yuliy",
  partnerName: "Rayhan",

  // Ganti dengan pesan customer.
  secretMessage:
    "and lastly, thank you for being part of my life, sayang. aku ngga tahu apa yang akan terjadi di masa depan, tapi aku berharap kita tetap saling memilih, bahkan di hari-hari ketika semuanya terasa sulit. aku bersyukur bisa kenal kamu, dan kalau boleh berharap, aku ingin kamu tetap jadi orang yang aku temui di setiap cerita hidupku. i love you, always.🤍",

  // Foto dan musik diletakkan di folder assets.
  photo: "photo.jpg",
  music: "music.mp3",

  // Kamu bisa mengganti kalimat opening.
  openingCopy:
    "15 questions. No cheating. Let's see seberapa kenal lo sama orang ini. 👀"
};


/* =========================================
   QUIZ
   Nilai 2 = sangat cocok / benar
   Nilai 1 = masih mungkin
   Nilai 0 = meleset
========================================= */

const QUESTIONS = [
  {
    q: "Apa yang bikin kamu jatuh cinta sama aku?",
    a: [
      ["A. Fisik", 1],
      ["B. Sikap", 1],
      ["C. Perhatian", 1],
      ["D. Semuanya", 2]
    ]
  },

  {
    q: "Kalau aku lagi marah, kamu bakal?",
    a: [
      ["A. Diam", 1],
      ["B. Ikut marah", 1],
      ["C. Bujuk aku", 2],
      ["D. Kasih waktu", 1]
    ]
  },

  {
    q: "Apa ketakutan terbesar kamu dalam hubungan?",
    a: [
      ["A. Kehilangan", 2],
      ["B. Diselingkuhi", 1],
      ["C. Berubah perasaan", 1],
      ["D. Tidak direstui", 1]
    ]
  },

  {
    q: "Kalau kita bertengkar, kamu pilih?",
    a: [
      ["A. Mengalah", 1],
      ["B. Membahasnya", 2],
      ["C. Diam dulu", 1],
      ["D. Menunggu aku", 1]
    ]
  },

  {
    q: "Menurut kamu, aku itu?",
    a: [
      ["A. Rumah", 1],
      ["B. Teman", 1],
      ["C. Pasangan", 1],
      ["D. Segalanya", 2]
    ]
  },

  {
    q: "Kalau aku berubah, kamu bakal?",
    a: [
      ["A. Bertanya", 2],
      ["B. Membiarkan", 1],
      ["C. Menegur", 1],
      ["D. Menjauh", 1]
    ]
  },

  {
    q: "Apa yang paling kamu butuhkan dariku?",
    a: [
      ["A. Kepercayaan", 1],
      ["B. Perhatian", 1],
      ["C. Pengertian", 1],
      ["D. Kesetiaan", 2]
    ]
  },

  {
    q: "Kalau hubungan kita diuji, kamu akan?",
    a: [
      ["A. Bertahan", 1],
      ["B. Menyerah", 1],
      ["C. Berjuang bersama", 2],
      ["D. Meminta waktu", 1]
    ]
  },

  {
    q: "Kamu lebih takut aku pergi atau berubah?",
    a: [
      ["A. Pergi", 1],
      ["B. Berubah", 1],
      ["C. Keduanya", 2],
      ["D. Tidak takut", 1]
    ]
  },

  {
    q: "Kalau aku insecure, kamu bakal?",
    a: [
      ["A. Meyakinkanku", 2],
      ["B. Memelukku", 1],
      ["C. Menasihatiku", 1],
      ["D. Membiarkanku tenang", 1]
    ]
  },

  {
    q: "Apa arti kesetiaan buat kamu?",
    a: [
      ["A. Tidak selingkuh", 1],
      ["B. Jujur", 1],
      ["C. Tetap memilih pasangan", 1],
      ["D. Semuanya", 2]
    ]
  },

  {
    q: "Kalau aku punya banyak kekurangan?",
    a: [
      ["A. Menerima", 1],
      ["B. Membantu berubah", 2],
      ["C. Membicarakannya", 1],
      ["D. Menyerah", 1]
    ]
  },

  {
    q: "Kamu melihat hubungan kita ke arah mana?",
    a: [
      ["A. Sekadar pacaran", 1],
      ["B. Serius", 1],
      ["C. Menikah", 2],
      ["D. Jalani perlahan", 1]
    ]
  },

  {
    q: "Kalau suatu hari kita kesulitan ekonomi?",
    a: [
      ["A. Berjuang bersama", 1],
      ["B. Mencari solusi", 1],
      ["C. Saling mendukung", 2],
      ["D. Meminta bantuan", 1]
    ]
  },

  {
    q: "Seberapa yakin kamu sama aku?",
    a: [
      ["A. 25%", 1],
      ["B. 50%", 1],
      ["C. 75%", 1],
      ["D. 100%", 2]
    ]
  }
];


let currentQuestion = 0;
let totalScore = 0;
let correctCount = 0;
let musicPlaying = false;

const $ = (id) => document.getElementById(id);

function showScreen(id){
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo({top:0, behavior:"instant"});
}

function renderQuestion(){
  const item = QUESTIONS[currentQuestion];

  $("questionTag").textContent =
    `QUESTION ${String(currentQuestion + 1).padStart(2,"0")}`;

  $("questionCounter").textContent =
    `${String(currentQuestion + 1).padStart(2,"0")} / ${QUESTIONS.length}`;

  $("progressFill").style.width =
    `${(currentQuestion / QUESTIONS.length) * 100}%`;

  $("questionText").textContent = item.q;

  const answers = $("answers");
  answers.innerHTML = "";

  item.a.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "answer";

    button.innerHTML = `
      <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
      <span class="answer-text">${choice[0]}</span>
    `;

    button.addEventListener("click", () => chooseAnswer(choice[1]));
    answers.appendChild(button);
  });
}

function chooseAnswer(score){
  totalScore += score;

  if(score === 2){
    correctCount++;
  }

  currentQuestion++;

  if(currentQuestion < QUESTIONS.length){
    renderQuestion();
  }else{
    $("progressFill").style.width = "100%";
    showCalculating();
  }
}

function showCalculating(){
  showScreen("calculating");

  const texts = [
    "Ngitung seberapa kenal kamu sama aku...",
    "Mengingat kembali semua cerita random...",
    "Checking your relationship memory...",
    "Okay... we got the result. 👀"
  ];

  let i = 0;
  $("loadingText").textContent = texts[0];

  const interval = setInterval(() => {
    i++;
    if(i < texts.length){
      $("loadingText").textContent = texts[i];
    }
  }, 650);

  setTimeout(() => {
    clearInterval(interval);
    showResult();
  }, 2750);
}

function showResult(){
  const maxScore = QUESTIONS.length * 2;
  const percent = Math.round((totalScore / maxScore) * 100);

  let title, copy, color;

  if(percent >= 85){
    title = "The “I Actually Listen” Partner 💚";
    copy = `Okay ${CONFIG.partnerName}... kamu ternyata merhatiin juga. 😭💗 Banyak jawaban kamu nunjukin kalau kamu cukup paham kebiasaan, mood, dan cara orang ini pengen diperlakukan.`;
    color = "var(--green)";
  }else if(percent >= 65){
    title = "Pretty Good, But... 👀";
    copy = `Not bad, ${CONFIG.partnerName}. kamu cukup kenal, tapi ada beberapa jawaban yang bikin orang ini mungkin bilang, “HAH? KOK SALAH?” 😭`;
    color = "var(--yellow)";
  }else{
    title = "How Are You Dating Me? 😭";
    copy = `${CONFIG.partnerName}... kita perlu ngobrol. 💀 kamu mungkin perlu lebih banyak dengerin cerita random, nginget detail kecil, dan berhenti jawab “terserah” juga.`;
    color = "var(--red)";
  }

  $("resultGreeting").textContent =
    `Okay ${CONFIG.partnerName}, let's see seberapa kenal kamu... 👀`;

  $("score").textContent = `${percent}%`;
  $("resultFraction").textContent =
    `${correctCount} / ${QUESTIONS.length} answers matched`;

  $("resultTitle").textContent = title;
  $("resultCopy").textContent = copy;

  $("scoreCircle").style.background =
    `conic-gradient(${color} 0 ${percent}%, rgba(255,255,255,.08) ${percent}% 100%)`;

  const memory = Math.min(99, Math.max(35, percent + 3));
  const understanding = Math.min(99, Math.max(35, percent - 2));
  const attention = Math.min(99, Math.max(35, percent + 5));

  $("memoryStat").textContent = `${memory}%`;
  $("understandingStat").textContent = `${understanding}%`;
  $("attentionStat").textContent = `${attention}%`;

  showScreen("result");

  if(percent >= 85){
    confetti();
  }
}

function openMessage(){
  $("senderLabel").textContent = CONFIG.senderName.toUpperCase();
  $("senderSignature").textContent = CONFIG.senderName;
  $("partnerMessageName").textContent = CONFIG.partnerName;
  $("secretMessage").textContent = CONFIG.secretMessage;

  const img = $("couplePhoto");
  img.src = CONFIG.photo;
  img.onerror = () => {
    img.src = "assets/photo-placeholder.svg";
  };

  showScreen("message");
}

function startMusic(){
  const audio = $("bgMusic");
  audio.src = CONFIG.music;
  audio.volume = 0.45;

  audio.play().then(() => {
    musicPlaying = true;
    $("musicBtn").textContent = "🔊";
    $("musicStatus").textContent = "Music on";
  }).catch(() => {
    musicPlaying = false;
    $("musicStatus").textContent = "Tap 🎵";
  });
}

function toggleMusic(){
  const audio = $("bgMusic");

  if(musicPlaying){
    audio.pause();
    musicPlaying = false;
    $("musicBtn").textContent = "🎵";
    $("musicStatus").textContent = "Music off";
  }else{
    audio.play().then(() => {
      musicPlaying = true;
      $("musicBtn").textContent = "🔊";
      $("musicStatus").textContent = "Music on";
    }).catch(() => {
      toast("Browser belum mengizinkan musik. Tap sekali lagi 🎵");
    });
  }
}

async function shareResult(){
  const score = $("score").textContent;
  const title = $("resultTitle").textContent;

  const text =
`🚦 LOVE CHECK RESULT 💗

${CONFIG.partnerName} baru aja selesai Love Check!

💗 Score: ${score}
🏆 ${title}

Berani cek kamu juga? 👀`;

  const url = window.location.href;
  const whatsapp =
    "https://wa.me/?text=" +
    encodeURIComponent(text + "\n" + url);

  if(navigator.share){
    try{
      await navigator.share({
        title:"LOVE CHECK 💗",
        text,
        url
      });
      return;
    }catch(e){}
  }

  window.open(whatsapp, "_blank", "noopener");
}

function resetQuiz(){
  currentQuestion = 0;
  totalScore = 0;
  correctCount = 0;
  renderQuestion();
  showScreen("quiz");
}

function toast(message){
  const t = $("toast");
  t.textContent = message;
  t.classList.add("show");

  setTimeout(() => {
    t.classList.remove("show");
  }, 2400);
}

function confetti(){
  const pieces = ["#ff7eaa","#65e7a6","#ffd76b","#ffffff"];

  for(let i = 0; i < 65; i++){
    const c = document.createElement("i");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = pieces[Math.floor(Math.random() * pieces.length)];
    c.style.animationDelay = Math.random() * .7 + "s";
    document.body.appendChild(c);

    setTimeout(() => c.remove(), 3200);
  }
}

/* Setup */
$("senderOpening").textContent = CONFIG.senderName;
$("opening-copy") && ($("opening-copy").textContent = CONFIG.openingCopy);
$("couplePhoto").src = CONFIG.photo;

$("openBtn").addEventListener("click", () => {
  startMusic();
  renderQuestion();
  showScreen("quiz");
});

$("musicBtn").addEventListener("click", toggleMusic);
$("messageBtn").addEventListener("click", openMessage);
$("shareBtn").addEventListener("click", shareResult);
$("restartBtn").addEventListener("click", resetQuiz);

/* Prevent accidental form-like zooming / selection on answer buttons */
document.addEventListener("gesturestart", e => e.preventDefault());
