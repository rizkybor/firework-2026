let fireworks = [];
let clicked = false;
let newYearReached = false; // Variabel untuk menandai apakah tahun baru sudah tiba

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  rectMode(CENTER);

  // UNTUK TESTING: Matikan countdown sementara agar langsung tampil pesan
  // Hapus baris ini setelah testing selesai
//   newYearReached = true;
}

function getCountdownTime() {
  let now = new Date();
  let target = new Date(2026, 0, 1); // Target: 1 Januari 2026 (bulan 0 = Januari)
  let diff = target - now; // Selisih waktu dalam milidetik

  if (diff <= 0) {
    newYearReached = true; // Tandai bahwa tahun baru sudah tiba
    return "00:00:00"; // Kembalikan 00:00:00 jika sudah habis
  }

  // Hitung jam, menit, detik dari selisih
  let hours = Math.floor(diff / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Format dengan leading zero
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;

  return `${hours}:${minutes}:${seconds}`;
}

function draw() {
  background(0, 0, 0, 25);
  if (!clicked) {
    fill(255, 255, 255, 10);
    noStroke();
    textAlign(CENTER, CENTER);
    text("click for fireworks", window.innerWidth / 2, window.innerHeight / 2);
  } else {
    if (!newYearReached) {
      // Tampilkan countdown jika belum habis
      textSize(140);
      fill(255, 255, 255, 10);
      noStroke();
      textAlign(CENTER, CENTER);
      text(getCountdownTime(), window.innerWidth / 2, window.innerHeight / 2);
   } else {
      // --- TEMPATKAN DI SINI ---
      
      // 1. Pesan Happy New Year Utama
      textSize(90);
      fill(255, 255, 255, 220);
      textAlign(CENTER, CENTER);
      text("Happy New Year 2026!", window.innerWidth / 2, window.innerHeight / 2 - 150);

      // 2. Styling Resolusi Style Pills
      textSize(12); 
      textAlign(CENTER, CENTER);
      rectMode(CENTER);
      noStroke();

      let resolutions = [
       
      ];

      // --- STYLING QUOTE & HOPE (ESTETIK) ---
      let quote = "2026: Write your own story, make it worth reading.";
      let hope = `"Semoga setiap usahamu di tahun ini tidak hanya menjadi hasil, tapi juga menjadi inspirasi bagi orang-orang di sekitarmu."`;
      
      let quoteY = window.innerHeight / 2 + 380; // Letakkan di bagian bawah

      // 1. Kotak Transparan (Glass Effect)
      fill(255, 255, 255, 15); 
      noStroke();
      rect(window.innerWidth / 2, quoteY, 900, 100, 15);

      // 2. Styling Quote Utama
      textSize(20);
      textStyle(ITALIC);
      fill(255, 255, 255, 230);
      text(`"${quote}"`, window.innerWidth / 2, quoteY - 15);

      // 3. Styling Harapan/Wish
      textSize(15);
      textStyle(NORMAL);
      fill(255, 255, 255, 150);
      text(hope, window.innerWidth / 2, quoteY + 20);

      // Reset style agar tidak mengganggu elemen lain
      textStyle(NORMAL);

      for (let i = 0; i < resolutions.length; i++) {
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2 + 30 + (i * 65); // Jarak antar pill
        let padding = 40;
        let w = textWidth(resolutions[i].txt) + padding;
        let h = 50;

        // Background Pill
        fill(resolutions[i].col.levels[0], resolutions[i].col.levels[1], resolutions[i].col.levels[2], 50);
        rect(x, y, w, h, 25);

        // Border Pill
        noFill();
        stroke(resolutions[i].col);
        strokeWeight(2);
        rect(x, y, w, h, 25);

        // Teks di dalam Pill
        noStroke();
        fill(255);
        text(resolutions[i].txt, x, y);
      }
    }

    // Jalankan fireworks
    for (let f of fireworks) f.step();
  }
}

function mouseReleased() {
  clicked = true;
  let target = {
    x: mouseX,
    y: mouseY,
  };
  fireworks.push(new Firework(target));
}