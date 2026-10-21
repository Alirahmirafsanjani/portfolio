import type { PortfolioContent } from "./types";

export const id: PortfolioContent = {
  meta: {
    title: "Raka Wijaya — Full-stack Developer & Motion Engineer",
    description:
      "Full-stack developer dan motion engineer yang membangun antarmuka cepat, aksesibel, dan penuh detail.",
    ogTitle: "Raka Wijaya — Portofolio",
  },

  nav: {
    links: [
      { id: "about", label: "Tentang" },
      { id: "skills", label: "Keahlian" },
      { id: "work", label: "Karya" },
      { id: "experience", label: "Pengalaman" },
      { id: "contact", label: "Kontak" },
    ],
    langAriaLabel: "Ganti bahasa",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    skipToContent: "Lompat ke konten",
  },

  hero: {
    eyebrow: "Portofolio / 2026",
    status: "Tersedia untuk freelance & full-time",
    titleLines: ["Saya merancang & membangun", "pengalaman digital", "yang terasa hidup."],
    highlightIndex: 2,
    tagline:
      "Full-stack developer dan motion engineer. Saya mengubah ide ambisius menjadi antarmuka yang cepat, aksesibel, dan punya karakter.",
    primaryCta: "Lihat karya saya",
    secondaryCta: "Hubungi saya",
    scrollHint: "Gulir untuk menjelajah",
  },

  about: {
    label: "Tentang",
    title: "Ketelitian di setiap lapisan — dari database sampai piksel.",
    paragraphs: [
      "Saya adalah full-stack developer dengan enam tahun pengalaman membangun produk untuk startup dan perusahaan bertumbuh di Asia Tenggara dan Eropa. Pekerjaan saya berada di persimpangan rigor teknis dan kejelasan visual: API yang type-safe, model data yang tahan banting, dan antarmuka yang merespons dengan disengaja.",
      "Sebagian besar waktu saya habis di bagian yang tak terlihat — optimasi query, state machine, semantik aksesibilitas, serta koreografi animasi yang tidak pernah melawan pengguna. Hasilnya, perangkat lunak terasa cepat karena memang begitu, dan terlihat hidup karena setiap transisi punya alasan.",
      "Di luar editor saya menulis tentang performa rendering, berkontribusi ke beberapa pustaka open-source, dan menghabiskan waktu yang tak masuk akal untuk menyetel kurva easing sampai terasa pas.",
    ],
    stats: [
      { value: 6, suffix: "+", label: "Tahun pengalaman" },
      { value: 40, suffix: "+", label: "Proyek selesai" },
      { value: 12, suffix: "", label: "Pustaka open-source" },
    ],
    badges: ["Tersedia untuk proyek", "Berbasis di Jakarta", "Open untuk remote"],
    portraitCaption: "Saat ini di Jakarta — terbuka untuk kerja remote ke seluruh dunia.",
  },

  skills: {
    label: "Keahlian",
    title: "Perangkat kerja",
    subtitle:
      "Stack pragmatic yang saya pakai harian, dipilih untuk umur panjang bukan sekadar kebaruan.",
    groups: [
      {
        name: "Frontend",
        items: [
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Aksesibilitas",
          "Design system",
        ],
      },
      {
        name: "Backend",
        items: [
          "Node.js",
          "PostgreSQL",
          "Prisma",
          "Redis",
          "tRPC",
          "REST & GraphQL",
        ],
      },
      {
        name: "Motion & 3D",
        items: [
          "Motion",
          "GSAP",
          "Three.js",
          "GLSL shader",
          "Lenis",
          "WebGL",
        ],
      },
      {
        name: "Tooling",
        items: [
          "Vite",
          "Turbopack",
          "Vitest",
          "Playwright",
          "Docker",
          "GitHub Actions",
        ],
      },
    ],
    marquee: [
      "TypeScript",
      "React",
      "Next.js",
      "Motion",
      "Three.js",
      "PostgreSQL",
      "Node.js",
      "Tailwind CSS",
      "GraphQL",
      "WebGL",
      "Docker",
      "Figma",
    ],
  },

  projects: {
    label: "Karya pilihan",
    title: "Yang pernah saya bangun",
    subtitle:
      "Potongan silang dari produk, eksperimen, dan alat open-source dalam beberapa tahun terakhir.",
    items: [
      {
        slug: "aurora-analytics",
        title: "Aurora Analytics",
        category: "Platform SaaS",
        year: "2025",
        summary:
          "Dasbor analitik produk real-time yang menangani jutaan event setiap menit.",
        description: [
          "Aurora adalah platform analitik produk untuk tim yang butuh jawaban dalam hitungan detik, bukan jam. Data clickstream masuk, diproses lewat pipeline streaming, lalu ditampilkan di dasbor yang tetap interaktif saat beban memuncak.",
          "Bagian tersulitnya adalah membuat dasbor langsung terasa instan padahal angka di belakangnya masih menetap. Kami menyelesaikannya dengan agregasi inkremental, rendering optimistis, dan lapisan grafik ter-virtualisasi yang hanya melukis bagian yang terlihat.",
        ],
        highlights: [
          "Pipeline ingestion streaming menangani 2 juta+ event/menit",
          "Lapisan grafik ter-virtualisasi dengan anggaran interaksi di bawah 16ms",
          "Query builder dipakai bersama 4 tim internal",
          "Infrastruktur yang selaras dengan SOC 2 Type II",
        ],
        tags: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "D3"],
        accent: "#22d3ee",
        metric: { value: "2M+", label: "event / menit" },
        links: [
          { label: "Situs live", href: "#" },
          { label: "Kode sumber", href: "#" },
        ],
      },
      {
        slug: "lumen-commerce",
        title: "Lumen Commerce",
        category: "Storefront headless",
        year: "2024",
        summary:
          "Storefront headless untuk label fesyen, dari design system sampai checkout.",
        description: [
          "Lumen menggantikan toko bertema lambat dengan storefront headless sepenuhnya. Brief-nya sederhana: buat penjelajahan terasa seperti majalah dan buat checkout terasa instan.",
          "Kami membangun design system composable yang bisa dikembangkan tim marketing tanpa developer, dipadu dengan checkout yang dirender dari cache dan divalidasi bertahap — sehingga pelanggan tidak pernah menunggu jaringan untuk melangkah.",
        ],
        highlights: [
          "Design system composable dengan 60+ primitif commerce",
          "Validasi checkout bertahap, 41% cart abandonment lebih rendah",
          "Halaman katalog dirender di edge, TTFB median 380ms",
          "Modul storytelling editorial dengan koreografi scroll",
        ],
        tags: ["React", "Stripe", "Sanity", "Vercel", "Tailwind"],
        accent: "#8b5cf6",
        metric: { value: "+41%", label: "kenaikan konversi" },
        links: [
          { label: "Situs live", href: "#" },
          { label: "Kode sumber", href: "#" },
        ],
      },
      {
        slug: "orbit-motion",
        title: "Orbit",
        category: "Open-source",
        year: "2024",
        summary:
          "Mesin koreografi scroll ringan — 3,4kB, tanpa dependensi, aksesibel penuh.",
        description: [
          "Orbit adalah pustaka animasi scroll yang saya buat karena setiap proyek memasang pustaka berbeda yang jauh lebih berat. API-nya sengaja dibuat kecil dan deklaratif untuk pinning, scrubbing, dan staggering, tanpa mengorbankan kontrak aksesibilitas.",
          "Pustaka ini menghormati preferensi reduced-motion sejak awal, berukuran 3,4kB hasil minify, dan sudah dipakai di produksi oleh beberapa tim yang saya kenal.",
        ],
        highlights: [
          "3,4kB minify, tanpa dependensi runtime",
          "Dukungan prefers-reduced-motion sebagai kelas satu",
          "Scrubbing timeline deterministik tanpa layout thrash",
          "Lisensi MIT, 3,4k bintang di GitHub",
        ],
        tags: ["TypeScript", "Web API", "Vite"],
        accent: "#f472b6",
        metric: { value: "3,4kB", label: "ukuran minify" },
        links: [
          { label: "Situs live", href: "#" },
          { label: "Kode sumber", href: "#" },
        ],
      },
      {
        slug: "nordic-fitness",
        title: "Nordic Fitness",
        category: "Aplikasi mobile-first",
        year: "2023",
        summary:
          "Perencana latihan dengan sync offline-first dan bahasa gerak tersendiri.",
        description: [
          "Nordic adalah perencana latihan untuk orang yang berlatih tanpa sinyal. Setiap set, catatan, dan perubahan rencana tersinkron saat koneksi kembali, dengan resolusi konflik yang mengutamakan pengguna, bukan server.",
          "Antarmukanya memakai gerak sebagai alat navigasi: transisi shared-element membawa Anda dari rencana ke sesi, dan penghitung yang disinkronkan dengan getaran membuat aplikasi tetap berguna saat latihan tanpa perlu melihat layar.",
        ],
        highlights: [
          "Basis data lokal offline-first dengan resolusi konflik deterministik",
          "Transisi shared-element dari perencana ke sesi aktif",
          "Penghitung istirahat dengan getaran haptis untuk dipakai tanpa mata",
          "Diaudit WCAG 2.2 AA di seluruh alur utama",
        ],
        tags: ["React Native", "Expo", "SQLite", "Reanimated"],
        accent: "#a3e635",
        metric: { value: "AA", label: "WCAG 2.2" },
        links: [{ label: "Situs live", href: "#" }],
      },
      {
        slug: "halo-brand",
        title: "Halo",
        category: "Brand & web",
        year: "2023",
        summary:
          "Sistem identitas dan situs peluncuran beranimasi untuk startup climate-tech.",
        description: [
          "Halo butuh peluncuran yang mampu membawa cerita teknis serius tanpa kehilangan energi. Kami membangun identitas di sekitar satu gradien kontinu — motif yang sama muncul di logo, situs, dan produk itu sendiri.",
          "Situsnya adalah satu narasi scroll, di mana gradien bermigrasi antarbagian dan menyatukan seluruh brand lewat satu ide gerak yang konsisten.",
        ],
        highlights: [
          "Identitas, art direction, dan bahasa gerak dalam satu sistem",
          "Narasi single-scroll dengan motif gradien yang bermigrasi",
          "Fallback reduced-motion tetap mempertahankan semua pesan",
          "Peluncuran menghasilkan 12k pendaftaran di minggu pertama",
        ],
        tags: ["Motion", "GSAP", "Three.js", "Brand"],
        accent: "#fb923c",
        metric: { value: "12k", label: "pendaftaran minggu pertama" },
        links: [{ label: "Situs live", href: "#" }],
      },
      {
        slug: "signal-cli",
        title: "Signal CLI",
        category: "Tool developer",
        year: "2022",
        summary:
          "Toolkit terminal untuk mengirim design token dari Figma ke kode.",
        description: [
          "Signal membaca library Figma, meresolusi token menjadi satu sumber kebenaran, lalu mengeluarkan output bertipe untuk web, iOS, dan Android — dengan mode diff yang menunjukkan persis apa yang berubah sebelum di-commit.",
          "Tool ini ada karena token drift tak terlihat sampai terlambat. Membuat drift itu terdengar dan bisa direview mengubah cara tim-tim yang saya bekerja sama dalam membangun UI.",
        ],
        highlights: [
          "Output token bertipe untuk web, iOS, dan Android",
          "Mode diff untuk meninjau perubahan token sebelum commit",
          "Sinkronisasi Figma REST API dengan cache anti-konflik",
          "Diadopsi 5 tim produk secara internal",
        ],
        tags: ["Node.js", "TypeScript", "CLI", "Figma API"],
        accent: "#38bdf8",
        metric: { value: "5", label: "tim mengadopsi" },
        links: [
          { label: "Situs live", href: "#" },
          { label: "Kode sumber", href: "#" },
        ],
      },
    ],
    openProject: "Buka studi kasus",
    closeProject: "Tutup",
    liveSite: "Situs live",
    sourceCode: "Kode sumber",
  },

  experience: {
    label: "Pengalaman",
    title: "Perjalanan sejauh ini",
    subtitle:
      "Tempat saya bekerja, apa yang saya pegang, dan apa yang saya pelajari di sepanjang jalan.",
    items: [
      {
        period: "2024 — Sekarang",
        role: "Lead Frontend Engineer",
        company: "Aurora Labs",
        location: "Jakarta · Remote",
        points: [
          "Menjadi pemilik arsitektur frontend untuk platform analitik real-time dengan 30rb+ pengguna aktif harian.",
          "Memperkenalkan motion design system yang memangkas pekerjaan animasi bespoke di tiga squad sekitar 70%.",
          "Mentor empat engineer serta merancang guild internal tentang performa rendering.",
        ],
        current: true,
      },
      {
        period: "2022 — 2024",
        role: "Senior Full-stack Engineer",
        company: "Lumen Commerce",
        location: "Singapura · Remote",
        points: [
          "Membangun ulang storefront headless dari nol, menaikkan konversi 41% pada kuartal pertama.",
          "Merancang lapisan sinkronisasi offline-first yang masih dipakai tim mobile sampai hari ini.",
          "Menetapkan anggaran performa yang kini menjadi acuan setiap rilis.",
        ],
      },
      {
        period: "2020 — 2022",
        role: "Frontend Engineer",
        company: "Nordic Digital",
        location: "Jakarta",
        points: [
          "Menyelesaikan 20+ proyek klien di sektor fintech, kesehatan, dan mobilitas.",
          "Membangun pustaka komponen bersama dan checklist aksesibilitas milik studio.",
          "Memimpin migrasi dari CRA ke monorepo berbasis Vite.",
        ],
      },
      {
        period: "2019 — 2020",
        role: "Web Developer",
        company: "Studio Kembar",
        location: "Bandung",
        points: [
          "Membangun situs pemasaran dan microsite kampanye untuk brand nasional.",
          "Menulis playbook animasi internal pertama milik studio.",
        ],
      },
    ],
    current: "Sekarang",
  },

  contact: {
    label: "Kontak",
    title: "Mari bangun sesuatu yang layak rilis.",
    subtitle:
      "Punya ide produk yang butuh kualitas serius, atau tim yang butuh pasangan frontend senior? Kotak masuk saya terbuka.",
    cta: "halo@raka.dev",
    ctaHint: "Biasanya membalas dalam 24 jam",
    socials: [
      { label: "GitHub", handle: "@rakawijaya", href: "https://github.com" },
      { label: "LinkedIn", handle: "in/rakawijaya", href: "https://linkedin.com" },
      { label: "X", handle: "@rakawijaya", href: "https://x.com" },
      { label: "Instagram", handle: "@raka.codes", href: "https://instagram.com" },
    ],
  },

  footer: {
    marquee: "MARI KERJA SAMA — ",
    tagline: "Dirancang & dibangun dengan niat.",
    backToTop: "Kembali ke atas",
    copyright: "Raka Wijaya. Seluruh hak cipta dilindungi.",
    builtWith: "Dibangun dengan Next.js, Motion, dan banyak kurva easing.",
  },
};
