/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question, Subject, Jurusan, Kelas } from "../types";

export const SUBJECTS: Subject[] = [
  // ==================== SISWA KELAS X COMMON ====================
  {
    id: "x-agama",
    name: "PENDIDIKAN AGAMA",
    durationMinutes: 45,
    token: "AGAMA10",
    description: "Evaluasi pemahaman nilai spiritual, akhlak mulia, kerukunan beragama, dan penerapan nilai ketuhanan dalam pelayanan sosial.",
    kelas: Kelas.X,
  },
  {
    id: "x-pancasila",
    name: "PENDIDIKAN PANCASILA DAN PPKN",
    durationMinutes: 45,
    token: "PPKN10",
    description: "Menguji pemahaman pilar kebangsaan, norma hukum, hak dan kewajiban warga negara, serta pengamalan sila Pancasila.",
    kelas: Kelas.X,
  },
  {
    id: "x-indonesia",
    name: "BAHASA INDONESIA",
    durationMinutes: 45,
    token: "INDO10",
    description: "Asesmen kemampuan menyusun teks laporan hasil observasi, analisis struktur karya sastra, dan penulisan sesuai EBI.",
    kelas: Kelas.X,
  },
  {
    id: "x-matematika",
    name: "MATEMATIKA",
    durationMinutes: 45,
    token: "MTK10",
    description: "Uji konsep eksponen, logaritma, persamaan linier, fungsi kuadrat, dan penalarannya dalam kalkulasi harian kesehatan.",
    kelas: Kelas.X,
  },
  {
    id: "x-inggris",
    name: "BAHASA INGGRIS",
    durationMinutes: 45,
    token: "INGGRIS10",
    description: "Evaluasi kemampuan percakapan interaktif (menyapa, menawarkan bantuan), pemahaman teks ekspositori, dan tata bahasa dasar.",
    kelas: Kelas.X,
  },
  {
    id: "x-ipas",
    name: "ILMU PENGETAHUAN ALAM DAN SOSIAL (IPAS)",
    durationMinutes: 45,
    token: "IPAS10",
    description: "Menguji pemahaman fenomena alam fisik, interaksi sosial kemasyarakatan, serta sanitasi lingkungan pendukung kesehatan.",
    kelas: Kelas.X,
  },
  {
    id: "x-penjaskes",
    name: "PENJASKES",
    durationMinutes: 45,
    token: "PJOK10",
    description: "Evaluasi prinsip kebugaran jasmani, mekanika gerak tubuh yang aman, serta pemeliharaan stamina harian petugas medis.",
    kelas: Kelas.X,
  },
  {
    id: "x-seni-budaya",
    name: "SENI BUDAYA",
    durationMinutes: 45,
    token: "SENI10",
    description: "Apresiasi karya seni rupa lokal/tradisional, dan pemanfaatannya dalam ekspresi kreatif terapi psikologis pasien.",
    kelas: Kelas.X,
  },
  {
    id: "x-sejarah",
    name: "SEJARAH INDONESIA",
    durationMinutes: 45,
    token: "SEJARAH10",
    description: "Mengkaji peninggalan peradaban Nusantara, perjuangan kemerdekaan, sejarah perkembangan institusi kesehatan nasional.",
    kelas: Kelas.X,
  },
  {
    id: "x-informatika",
    name: "INFORMATIKA",
    durationMinutes: 45,
    token: "INFOM10",
    description: "Asesmen kecakapan literasi digital, formula kalkulasi spreadsheet, serta sistem e-health pengelolaan rekam medis harian.",
    kelas: Kelas.X,
  },
  {
    id: "x-mulok",
    name: "MUATAN LOKAL",
    durationMinutes: 45,
    token: "MULOK10",
    description: "Pemanfaatan tanaman obat keluarga (TOGA) lokal Sulawesi Tenggara serta kearifan etnis lokal dalam pengobatan herbal beralasan.",
    kelas: Kelas.X,
  },

  // ==================== SISWA KELAS X PERAWAT (KEPERAWATAN) ====================
  {
    id: "x-dlk-1",
    name: "Dasar Layanan Kesehatan 1",
    durationMinutes: 45,
    token: "DLK110",
    description: "Prinsip dasar pelayanan kesehatan, komunikasi terapeutik asisten medis, etika keperawatan, dan kepatuhan hukum rahasia medis.",
    kelas: Kelas.X,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "x-dlk-2",
    name: "Dasar Layanan Kesehatan 2",
    durationMinutes: 45,
    token: "DLK210",
    description: "Fokus pada Pencegahan dan Pengendalian Infeksi (PPI), pemilahan jenis limbah medis, teknik nirkontaminasi aseptik higienis.",
    kelas: Kelas.X,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "x-dlk-3",
    name: "Dasar Layanan Kesehatan 3",
    durationMinutes: 45,
    token: "DLK310",
    description: "Pengukuran tanda-tanda vital secara berkala (suhu, nadi, laju nafas, tekanan darah) dan pencatatan grafik asuhan klinis.",
    kelas: Kelas.X,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "x-dlk-4",
    name: "Dasar Layanan Kesehatan 4",
    durationMinutes: 45,
    token: "DLK410",
    description: "Aspek konseptual pemenuhan eliminasi, nutrisi tubuh, personal higienis mandi pasien bedridden, dan sirkulasi gerak dasar.",
    kelas: Kelas.X,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "x-pilihan-kep",
    name: "Mata Pelajaran Pilihan (Keperawatan)",
    durationMinutes: 45,
    token: "PILK10",
    description: "Uji kompetensi terapan rehabilitasi fungsional mandiri, pelatihan Range of Motion pasif (ROM), asuhan lansia (Geriatri).",
    kelas: Kelas.X,
    majorRequirement: Jurusan.KEPERAWATAN,
  },

  // ==================== SISWA KELAS X FARMASI ====================
  {
    id: "x-dtf-1",
    name: "Dasar Layanan Teknologi Farmasi 1",
    durationMinutes: 45,
    token: "DTF110",
    description: "Pengenalan ruang lingkup pekerjaan kefarmasian, sejarah farmasi, bentuk sediaan solida (pulvis, pulveres) dan kelembaban udara.",
    kelas: Kelas.X,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "x-dtf-2",
    name: "Dasar Layanan Teknologi Farmasi 2",
    durationMinutes: 45,
    token: "DTF210",
    description: "Skrining administratif lembar resep dokter, arti terminologi latin penanda porsi, serta aturan pemakaian obat (S.d.d).",
    kelas: Kelas.X,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "x-dtf-3",
    name: "Dasar Layanan Teknologi Farmasi 3",
    durationMinutes: 45,
    token: "DTF310",
    description: "Prinsip mekanik timbangan analitis gram dan miligram, kalibrasi batu timbang, dan hitungan konversi kelipatan bahan aktif.",
    kelas: Kelas.X,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "x-dtf-4",
    name: "Dasar Layanan Teknologi Farmasi 4",
    durationMinutes: 45,
    token: "DTF410",
    description: "Penggolongan resmi sediaan terapeutik (Obat bebas, bebas terbatas, obat keras, psikotropika, dan pengawasan narkotika).",
    kelas: Kelas.X,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "x-pilihan-far",
    name: "Mata Pelajaran Pilihan (Farmasi)",
    durationMinutes: 45,
    token: "PILF10",
    description: "Prinsip Beyond Use Date (BUD) sirup/kapsul racikan, standarisasi jamu lokal tradisional, manajemen inventaris stok metode FEFO.",
    kelas: Kelas.X,
    majorRequirement: Jurusan.FARMASI,
  },

  // ==================== KELAS XI (FALLBACKS / PRESETS) ====================
  {
    id: "kep-dasar",
    name: "Ujian Kompetensi Keperawatan Dasar",
    durationMinutes: 30,
    token: "KEP2026",
    description: "Menguji keterampilan dasar asisten keperawatan, tanda-tanda vital, posisi pasien, kebersihan diri, dan etika klinis.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  // ==================== SISWA KELAS XI PERAWAT (KEPERAWATAN) ====================
  {
    id: "xi-mulok-kep",
    name: "MUATAN LOKAL",
    durationMinutes: 45,
    token: "MULOK11K",
    description: "Aplikasi ramuan tradisional khas Sulawesi Tenggara, pemanfaatan minyak kelapa murni (VCO) lokal untuk merawat kelembaban kulit lansia tirah baring lama.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xi-pilihan-kep",
    name: "MATA PELAJARAN PILIHAN",
    durationMinutes: 45,
    token: "PIL11K",
    description: "Pemantauan derajat kemandirian kognitif dan fisik pasien geriatri serta pilihan materi asuhan rehabilitatif lansia.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xi-inggris-kep",
    name: "BAHASA INGGRIS",
    durationMinutes: 45,
    token: "INGG11K",
    description: "Nursing English communication covering patient check-in, symptom description, pain assessment scale instructions, and therapeutic conversations.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xi-pkk-kep",
    name: "PRODUK KREATIF DAN KEWIRAUSAHAAN",
    durationMinutes: 45,
    token: "PKK11K",
    description: "Pengembangan peluang jasa homecare lansia, legalitas usaha panti wreda asuhan mandiri, dan perencanaan usaha mandiri bidang asisten kesehatan.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xi-agama-kep",
    name: "PENDIDIKAN AGAMA",
    durationMinutes: 45,
    token: "AGAMA11K",
    description: "Evaluasi pemahaman nilai akhlak mulia, bimbingan spiritual menjelang ajal (sakaratul maut), empati, dan toleransi mulia asisten keperawatan.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xi-matematika-kep",
    name: "MATEMATIKA",
    durationMinutes: 45,
    token: "MTK11K",
    description: "Penerapan kalkulasi laju tetesan infus (gtt/menit), perhitungan indeks massa tubuh (IMT), dan kalkulasi dosis keperawatan klinis lainnya.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xi-ippd-kep",
    name: "IPPD",
    durationMinutes: 45,
    token: "IPPD11K",
    description: "Membahas patofisiologi penyakit sistem respirasi, kardiovaskular, endokrin, pencernaan, serta persiapan pemeriksaan laboratorium diagnosa.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xi-sejarah-kep",
    name: "SEJARAH INDONESIA",
    durationMinutes: 45,
    token: "SEJ11K",
    description: "Sejarah sistem kesehatan Nusantara pra-kemerdekaan, perawat militer palang merah, dan sejarah pendirian Palang Merah Indonesia.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xi-pancasila-kep",
    name: "PENDIDIKAN PANCASILA",
    durationMinutes: 45,
    token: "PPKN11K",
    description: "Penerapan nilai-nilai kebangsaan, kedaulatan negara, hak asasi manusia, serta etika keadilan sosial dalam distribusi layanan asuhan keperawatan.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xi-indonesia-kep",
    name: "BAHASA INDONESIA",
    durationMinutes: 45,
    token: "INDO11K",
    description: "Penyusunan teks asuhan klinis harian secara baku, komunikasi terapeutik verbal keperawatan, serta telaah dokumen asuhan medis.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xi-kdtk-kep",
    name: "KDTK",
    durationMinutes: 45,
    token: "KDTK11K",
    description: "Prosedur pemenuhan kebutuhan dasar eliminasi foley kateter urin, penanganan luka dekubitus ringan, serta terapi oksigen nasal kanul.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xi-penjaskes-kep",
    name: "PENJASKES",
    durationMinutes: 45,
    token: "PJOK11K",
    description: "Pengaturan kebugaran kardiovaskular, pencegahan sindrom keletihan kronis (burnout) asisten medis, dan peregangan ergonomis di sela shift kerja.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "farmasi-dasar",
    name: "Ujian Dasar-Dasar Kefarmasian",
    durationMinutes: 30,
    token: "FAR2026",
    description: "Menguji klasifikasi obat, singkatan resep resep, dosis resep, penyiapan obat jenuh/suspensi, dan pengelolaan sediaan farmasi.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.FARMASI,
  },

  // ==================== SISWA KELAS XI FARMASI ====================
  {
    id: "xi-mulok-far",
    name: "MUATAN LOKAL",
    durationMinutes: 45,
    token: "MULOK11F",
    description: "Pemanfaatan simplisia herba lokal dari hutan hujan atau pesisir Sulawesi Tenggara untuk kemandirian kesehatan keluarga binaan.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xi-pilihan-far",
    name: "MATA PELAJARAN PILIHAN",
    durationMinutes: 45,
    token: "PIL11F",
    description: "Evaluasi pengolahan fitofarmaka modern, sediaan emulsi kosmetik alamiah, serta digitalisasi inventarisasi sediaan farmasi.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xi-inggris-far",
    name: "BAHASA INGGRIS",
    durationMinutes: 45,
    token: "INGG11F",
    description: "English terminology in professional pharmacy, interpreting drug warnings, prescribing vocabulary, and client communication.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xi-farmakognosi-far",
    name: "FARMAKOGNOSI",
    durationMinutes: 45,
    token: "KOGNOSI11F",
    description: "Studi sistematik tanaman obat (simplisia flos, folium, semen, radix), identifikasi mikroskopis sel tanaman, dan ekstraksi zat aktif alkaloid.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xi-agama-far",
    name: "PENDIDIKAN AGAMA ISLAM",
    durationMinutes: 45,
    token: "AGAMA11F",
    description: "Mengulas etika kejujuran bertransaksi obat halal, keadilan bersosial, dan tanggung jawab akhlak mulia asisten apoteker terhadap pasien.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xi-matematika-far",
    name: "MATEMATIKA",
    durationMinutes: 45,
    token: "MTK11F",
    description: "Perhitungan dosis maksimum anak umur (rumus Young, Dilling), hitungan pengenceran larutan alkohol, serta persentase rendemen simplisia.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xi-pkk-far",
    name: "PRODUK KREATIF DAN KEWIRAUSAHAAN",
    durationMinutes: 45,
    token: "PKK11F",
    description: "Perencanaan bisnis apotek mini, strategi pemasaran produk teh herbal lokal Sultra, dan analisis modal serta titik impas (BEP) produksi.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xi-sejarah-far",
    name: "SEJARAH INDONESIA",
    durationMinutes: 45,
    token: "SEJ11F",
    description: "Sejarah pemanfaatan obat tradisional Nusantara (jamu) sejak zaman dahulu, serta perkembangan apotek pertama nasional pasca kemerdekaan.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xi-indonesia-far",
    name: "BAHASA INDONESIA",
    durationMinutes: 45,
    token: "INDO11F",
    description: "Penulisan karya ilmiah kefarmasiaan, teknik menyusun teks biografi ilmuwan farmasi, serta presentasi laporan pengujian fitofarmaka.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xi-administrasi-far",
    name: "ADMINISTRASI FARMASI",
    durationMinutes: 45,
    token: "ADM11F",
    description: "Proses administrasi pembukuan sediaan farmasi di gudang, pengisian kartu stok (FIFO/FEFO), surat pesanan obat (SP-Narkotika/Psikotropika).",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xi-pelayanan-far",
    name: "PELAYANAN FARMASI",
    durationMinutes: 45,
    token: "YANFAR11F",
    description: "Asesmen teknik meracik sediaan salep (unguenta), serbuk bagi (pulveres), kapsul, emulsi, sediaan suspensi, dan kalkulasi penarikan resep.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xi-kimia-far",
    name: "KIMIA",
    durationMinutes: 45,
    token: "KIM11F",
    description: "Analisis reaksi asam-basa, larutan penyangga (buffer) tubuh, kelarutan zat aktif, serta reaksi penetapan kadar menggunakan titrasi.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xi-penjaskes-far",
    name: "PENJASKES",
    durationMinutes: 45,
    token: "PJOK11F",
    description: "Prinsip ergonomis berdiri lama saat meracik sediaan di laboratorium resep, serta pemeliharaan kebugaran jantung bagi asisten kefarmasian.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xi-pancasila-far",
    name: "PENDIDIKAN PANCASILA",
    durationMinutes: 45,
    token: "PPKN11F",
    description: "Keadilan sosial dalam jaminan kesehatan nasional nasional (BPJS), kesetaraan hak akses sediaan obat esensial bermutu bagi warga negara.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xi-farmakologi-far",
    name: "FARMAKOLOGI",
    durationMinutes: 45,
    token: "KOLOGI11F",
    description: "Farmakodinamika & farmakokinetika obat saluran pencernaan (antasida, anti-diare), analgetik-antipiretik, antibiotika, serta efek samping toksik obat.",
    kelas: Kelas.XI,
    majorRequirement: Jurusan.FARMASI,
  },

  // ==================== KELAS XII (ANATOMI EXAM) ====================
  {
    id: "anatomi-fisiologi",
    name: "Ujian Anatomi dan Fisiologi Manusia",
    durationMinutes: 30,
    token: "ANA2026",
    description: "Menguji struktur tubuh manusia, sistem kardiovaskular, sistem respirasi, tulang dan persendian untuk semua siswa kesehatan.",
    kelas: Kelas.XII,
  },

  // ==================== SISWA KELAS XII PERAWAT (KEPERAWATAN) ====================
  {
    id: "xii-pkk-kep",
    name: "PRODUK KREATIF DAN KEWIRAUSAHAAN",
    durationMinutes: 45,
    token: "PKK12K",
    description: "Perencanaan produk kreatif pelayanan asuhan mandiri, pemasaran jasa home care, dan evaluasi hasil usaha keperawatan.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xii-kdm-kep",
    name: "KEBUTUHAN DASAR MANUSIA",
    durationMinutes: 45,
    token: "KDM12K",
    description: "Membahas pemenuhan kebutuhan dasar manusia (oksigenasi, cairan, nutrisi, eliminasi, rasa aman dan nyaman, aktivitas, istirahat).",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xii-ippd-kep",
    name: "ILMU PENYAKIT DAN PENUNJANG DIAGNOSTIK",
    durationMinutes: 45,
    token: "IPPD12K",
    description: "Pemahaman patologi penyakit sistemik, pengenalan pemeriksaan penunjang laboratorium, rontgen, dan diagnosis keluhan klinis dasar.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xii-inggris-kep",
    name: "BAHASA INGGRIS",
    durationMinutes: 45,
    token: "INGG12K",
    description: "English communication in professional nursing, comprehensive medical history taking, and presenting clinical reports.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xii-matematika-kep",
    name: "MATEMATIKA",
    durationMinutes: 45,
    token: "MTK12K",
    description: "Penerapan konsep statistika parameter kesehatan, kalkulasi laju penyaluran cairan intravena, dan dosis khusus medis geriatri.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xii-kdtk-kep",
    name: "KETERAMPILAN DASAR TINDAKAN KEPERAWATAN",
    durationMinutes: 45,
    token: "KDTK12K",
    description: "Uji keterampilan praktis tindakan keperawatan esensial, pemosisian tubuh pasien secara terapeutik, serta perawatan luka dekubitus kompleks.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xii-indonesia-kep",
    name: "BAHASA INDONESIA",
    durationMinutes: 45,
    token: "INDO12K",
    description: "Penulisan laporan asuhan keperawatan terstandarisasi, penyusunan proposal program kesehatan masyarakat, serta tata bahasa baku.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xii-pilihan-kep",
    name: "MATA PELAJARAN PILIHAN",
    durationMinutes: 45,
    token: "PIL12K",
    description: "Terapi modalitas komplementer bagi lansia dengan nyeri kronis, serta bimbingan rehabilitatif fungsional khusus.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xii-pancasila-kep",
    name: "PENDIDIKAN PANCASILA",
    durationMinutes: 45,
    token: "PPKN12K",
    description: "Implementasi nilai-nilai keadilan sosial nasional, kedaulatan hak asasi bagi seluruh pasien dalam memperoleh layanan medis beradab.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.KEPERAWATAN,
  },
  {
    id: "xii-agama-kep",
    name: "PENDIDIKAN AGAMA DAN BUDI PEKERTI",
    durationMinutes: 45,
    token: "AGAMA12K",
    description: "Bimbingan kerohanian komprehensif, etika bimbingan sakaratul maut, nilai kesabaran, empati, serta tenggang rasa keagamaan asisten perawat.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.KEPERAWATAN,
  },

  // ==================== SISWA KELAS XII FARMASI ====================
  {
    id: "xii-pelayanan-far",
    name: "PELAYANAN FARMASI",
    durationMinutes: 45,
    token: "YANFAR12F",
    description: "Asesmen keterampilan pelayanan farmasi klinis: dispensing resep racikan kompleks, konseling obat praktis, dan kepatuhan BUD.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xii-pkk-far",
    name: "PRODUK KREATIF DAN KEWIRAUSAHAAN",
    durationMinutes: 45,
    token: "PKK12F",
    description: "Perencanaan strategis usaha rintisan apotek, kelayakan investasi bisnis sediaan kosmetik herbal, dan perhitungan valuasi BEP/ROI.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xii-kimia-far",
    name: "KIMIA FARMASI",
    durationMinutes: 45,
    token: "KIM12F",
    description: "Menganalisis reaksi identifikasi kimia sediaan obat kualitatif dan kuantitatif, struktur senyawa obat organik, serta termokimia dasar.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xii-inggris-far",
    name: "BAHASA INGGRIS",
    durationMinutes: 45,
    token: "INGG12F",
    description: "Professional medical and pharmaceutical vocabulary, interpreting complex clinical drug labels, and communicating with patients.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xii-matematika-far",
    name: "MATEMATIKA",
    durationMinutes: 45,
    token: "MTK12F",
    description: "Kalkulasi statistika hasil uji stabilitas sediaan, perhitungan konsentrasi pengenceran larutan zat aktif, serta matematika farmasi kepresisian.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xii-farmakognosi-far",
    name: "FARMAKOGNOSI",
    durationMinutes: 45,
    token: "KOGNOSI12F",
    description: "Identifikasi lanjut sediaan simplisia obat tradisinal flos, folium, rhizoma, uji makroskopis mikroskopis khasiat fitofarmaka Nusantara.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xii-farmakologi-far",
    name: "FARMAKOLOGI",
    durationMinutes: 45,
    token: "KOLOGI12F",
    description: "Membahas farmakodinamika & efek terapeutik obat sistem saraf pusat, kardiovaskular, kemoterapeutika, serta toksikologi efek samping.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xii-indonesia-far",
    name: "BAHASA INDONESIA",
    durationMinutes: 45,
    token: "INDO12F",
    description: "Penyusunan laporan akhir karya tulis ilmiah pengujian fitofarmaka, presentasi laporan studi kelayakan bisnis apotek secara lisan/tertulis.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xii-pilihan-far",
    name: "MATA PELAJARAN PILIHAN",
    durationMinutes: 45,
    token: "PIL12F",
    description: "Skrining sediaan obat herbal terstandar (OHT), metode ekstraksi perkolasi maserasi, serta otomatisasi manajemen apotek digital.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xii-pancasila-far",
    name: "PENDIDIKAN PANCASILA",
    durationMinutes: 45,
    token: "PPKN12F",
    description: "Penerapan etika kebangsaan, gotong royong nasional, kesetaraan hak jaminan kesehatan, serta pemerataan akses sediaan farmasi esensial.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.FARMASI,
  },
  {
    id: "xii-agama-far",
    name: "PENDIDIKAN AGAMA DAN BUDI PEKERTI",
    durationMinutes: 45,
    token: "AGAMA12F",
    description: "Evaluasi kejujuran transaksi dagang obat halal, keadilan bersosial medis, serta menjaga amanah etika moral profesi kefarmasian.",
    kelas: Kelas.XII,
    majorRequirement: Jurusan.FARMASI,
  },
];

export const QUESTIONS: Question[] = [
  // ==================== KELAS X COMMON QUESTIONS ====================
  {
    id: "q-agama-1",
    subjectId: "x-agama",
    text: "Penerapan nilai akhlak mulia dalam konteks asuhan pelayanan asisten kesehatan bagi pasien yang sedang menderita sakit berat tanpa membeda-bedakan keyakinan agamanya mencerminkan asas...",
    options: [
      { key: "A", text: "Egoisme sektoral" },
      { key: "B", text: "Kemanusiaan yang adil dan beradab berbasis cinta kasih ketuhanan" },
      { key: "C", text: "Pragmatisme asisten klinis" },
      { key: "D", text: "Formalitas tugas asuhan saja" },
      { key: "E", text: "Kewajiban komersial rumah sakit" }
    ],
    correctAnswer: "B",
    explanation: "Nilai keagamaan menuntut kita mengasihi sesama manusia tanpa pandang bulu. Memberikan pelayanan ramah dan tulus kepada semua pasien sakit, apa pun agamanya, adalah pengamalan akhlak mulia ketuhanan."
  },
  {
    id: "q-pancasila-1",
    subjectId: "x-pancasila",
    text: "Asisten kesehatan SMKS Kesehatan Unaaha wajib merawat seluruh pasien dengan adil, santun, tidak membedakan suku, kasta, atau status sosial ekonomi. Tindakan tersebut paling selaras dengan pengamalan sila Pancasila ke...",
    options: [
      { key: "A", text: "Sila ke-1 (Ketuhanan Yang Maha Esa)" },
      { key: "B", text: "Sila ke-2 (Kemanusiaan yang adil dan beradab)" },
      { key: "C", text: "Sila ke-3 (Persatuan Indonesia)" },
      { key: "D", text: "Sila ke-4 (Kerakyatan yang dipimpin oleh hikmat kebijaksanaan)" },
      { key: "E", text: "Sila ke-5 (Keadilan sosial bagi seluruh rakyat Indonesia)" }
    ],
    correctAnswer: "B",
    explanation: "Sila ke-2 (Kemanusiaan yang adil dan beradab) mengamanatkan kesetaraan hak derajat manusia dan perlakuannya yang didasari adab, tenggang rasa, serta kesamaan hak dalam memperoleh kesejahteraan kesehatan."
  },
  {
    id: "q-indo-1",
    subjectId: "x-indonesia",
    text: "Bacalah paragraf berikut:\n\n'Puskesmas Unaaha didirikan untuk memberikan asuhan pencegahan primer kepada masyarakat sekitar. Berdasarkan dokumentasi harian, rata-rata kunjungan harian mencapai 85 pasien dengan keluhan utama ISPA.'\n\nTeks di atas digolongkan sebagai jenis tulisan...",
    options: [
      { key: "A", text: "Teks Laporan Hasil Observasi" },
      { key: "B", text: "Teks Eksposisi Opini Pribadi" },
      { key: "C", text: "Teks Negosiasi Harga Obat" },
      { key: "D", text: "Teks Anekdot Komedi Klinis" },
      { key: "E", text: "Teks Cerita Prosedur Fiktif" }
    ],
    correctAnswer: "A",
    explanation: "Teks tersebut mengandung data faktual, nama instansi, statistik numerik objektif, dan pengamatan kondisi lapangan tanpa bumbu opini subjektif, sehingga dikategorikan sebagai Teks Laporan Hasil Observasi."
  },
  {
    id: "q-mtk-1",
    subjectId: "x-matematika",
    text: "Dalam resep dokter tertulis dosis sediaan paracetamol berbentuk suspensi adalah 120 mg per 5 ml. Jika seorang anak diresepkan meminum dosis sebesar 180 mg setiap kali minum, berapakah volume suspensi yang ditakar dalam sendok takar anak?",
    options: [
      { key: "A", text: "3.5 ml" },
      { key: "B", text: "5.0 ml" },
      { key: "C", text: "6.0 ml" },
      { key: "D", text: "7.5 ml" },
      { key: "E", text: "10 ml" }
    ],
    correctAnswer: "D",
    explanation: "Perhitungan rasio dasar: (180 mg / 120 mg) * 5 ml. 180 dibagi 120 adalah 1.5. Maka 1.5 * 5 ml = 7.5 ml."
  },
  {
    id: "q-inggris-1",
    subjectId: "x-inggris",
    text: "An assistant nurse meets a patient who looks confused and lost in the hospital hall. What is the most polite and caring response to offer help?",
    options: [
      { key: "A", text: "Go away please, I'm very busy right now." },
      { key: "B", text: "Where is your family? Why left you alone?" },
      { key: "C", text: "Excuse me, sir. You look lost. May I help you find your destination department?" },
      { key: "D", text: "Do you have money to buy medications here?" },
      { key: "E", text: "This is a restricted area, please walk faster." }
    ],
    correctAnswer: "C",
    explanation: "Option C ('Excuse me, sir. You look lost. May I help you find your destination department?') shows professional greeting, politeness, clear communication, and offers real solution for hospital guests/patients."
  },
  {
    id: "q-ipas-1",
    subjectId: "x-ipas",
    text: "Perkembangan jentik nyamuk Aedes aegypti pembawa virus demam berdarah dengue sangat pesat pada air genangan bersih di sekitar pemukiman warga Konawe. Manakah tindakan pencegahan sanitasi biologi yang paling tepat?",
    options: [
      { key: "A", text: "Membakar sampah plastik di halaman" },
      { key: "B", text: "Menguras dispenser dan menutup rapat wadah tampungan air kelola (3M Plus)" },
      { key: "C", text: "Menyemprotkan disinfektan ke kasur" },
      { key: "D", text: "Membuang air limbah sabun cuci langsung ke sungai" },
      { key: "E", text: "Menutup seluruh ventilasi udara ventilasi rumah siang hari" }
    ],
    correctAnswer: "B",
    explanation: "Nyamuk pembawa dengue meletakan telur pada air bersih tergenang (bukan limbah keruh). Membiasakan program 3M Plus (Menguras wadah air, Menutup rapat penampungan, Mendaur ulang barang bekas) adalah pilihan sanitasi barier terampuh."
  },
  {
    id: "q-penjaskes-1",
    subjectId: "x-penjaskes",
    text: "Asisten perawat harus memindahkan pasien dari tempat tidur ke kursi roda. Untuk mencegah terjadinya cedera pinggang bawah (low back pain) akibat beban angkat berat, mekanika tubuh manakah yang paling benar?",
    options: [
      { key: "A", text: "Membungkukkan punggung ke depan dengan kaki lurus lurus" },
      { key: "B", text: "Memutar tubuh bagian tengah saat mengangkat beban secara mendadak" },
      { key: "C", text: "Menekuk lutut (jongkok ringan) menjaga punggung tetap tegak lurus, lalu gunakan kekuatan otot kaki untuk tegak kembali" },
      { key: "D", text: "Menahan nafas sedalam mungkin lalu melompat bertenaga" },
      { key: "E", text: "Meminta pasien memeluk leher asisten terlalu erat dan menariknya paksa" }
    ],
    correctAnswer: "C",
    explanation: "Mekanika tubuh ergonomis menghentikan tumpuan beban pada otot lumbar punggung. Menurunkan pusat gravitasi lewat kaki tertekuk (squatting) membekali daya angkat bersumber dari kuadrisep paha yang jauh lebih kuat."
  },
  {
    id: "q-seni-1",
    subjectId: "x-seni-budaya",
    text: "Kesenian anyaman serat alami rotan khas Sulawesi Tenggara sering digunakan sebagai hiasan dinding di dalam klinik maupun ruang tunggu. Ditinjau dari aspek terapeutik psikologis rawat inap, fungsi dekorasi estetika tersebut adalah...",
    options: [
      { key: "A", text: "Menakuti kuman pathogens" },
      { key: "B", text: "Memberikan kesan alamiah, keharmonisan visual, ramah kultur guna menstimulasi ketenangan pikiran pasien" },
      { key: "C", text: "Meningkatkan biaya registrasi rawat inap klinik" },
      { key: "D", text: "Mencegah penularan penyakit menular secara kontak udara" },
      { key: "E", text: "Menjadi tempat bertengkar para perawat" }
    ],
    correctAnswer: "B",
    explanation: "Desain interior klinik yang menggunakan elemen budaya, warna natural (earthy), dan kesenian ramah lingkungan terbukti menstimulasi saraf parasimpatik untuk mereduksi level kecemasan pasien (Healing Environment)."
  },
  {
    id: "q-sejarah-1",
    subjectId: "x-sejarah",
    text: "Di era pra-kemerdekaan Indonesia, lembaga pelayanan kesehatan didirikan oleh pihak kolonial maupun yayasan keagamaan pribumi demi membendung wabah malaria dan cacar. Apakah peran utama Dr. Wahidin Sudirohusodo dr. alumni STOVIA dalam sejarah pergerakan nasional?",
    options: [
      { key: "A", text: "Sebagai pencetus asuransi kesehatan swasta nasional" },
      { key: "B", text: "Menginisiasi pentingnya pendidikan dan mendirikan perkumpulan Budi Utomo" },
      { key: "C", text: "Menemukan obat kina sintetis modern di laboratorium" },
      { key: "D", text: "Menjabat sebagai direktur RSUD Unaaha yang pertama" },
      { key: "E", text: "Menyusun sistem klasifikasi resep obat tradisional" }
    ],
    correctAnswer: "B",
    explanation: "Dr. Wahidin Sudirohusodo adalah tokoh intelektual lulusan STOVIA (Sekolah Dokter Jawa) yang aktif menyadarkan kaum terpelajar tentang pentingnya pendidikan bagi kemerdekaan bangsa, menginspirasi lahirnya Budi Utomo 1908."
  },
  {
    id: "q-info-1",
    subjectId: "x-informatika",
    text: "Formula spreadsheet yang paling tepat dan cepat dijalankan asisten admisi klinik untuk menjumlahkan total nominal rekam tagihan obat rawat inap pasien dari sheet sel D5 sampai sel D14 adalah...",
    options: [
      { key: "A", text: "=AVERAGE(D5:D14)" },
      { key: "B", text: "=MULTIPLY(D5, D14)" },
      { key: "C", text: "=SUM(D5:D14)" },
      { key: "D", text: "=COUNT(D5:D14)" },
      { key: "E", text: "=ADD(D5+D14)" }
    ],
    correctAnswer: "C",
    explanation: "=SUM adalah rumus built-in spreadsheet standard untuk menjumlahkan seluruh nilai numerik yang ada di dalam rentang rentang (range) sel data tertentu."
  },
  {
    id: "q-mulok-1",
    subjectId: "x-mulok",
    text: "Tanaman herbal lokal Sulawesi Tenggara salah satunya adalah tanaman 'Kumis Kucing' (Orthosiphon aristatus). Secara empiris muatan lokal keahlian obat, kumis kucing berkhasiat memfasilitasi...",
    options: [
      { key: "A", text: "Peningkatan tekanan intraokular mata" },
      { key: "B", text: "Pelancar ekskresi kemih (Diuretik) guna meluruhkan batu ginjal" },
      { key: "C", text: "Obat bius total pembedahan mayor" },
      { key: "D", text: "Zat pemicu napsu makan instan anak bayi" },
      { key: "E", text: "Peningkat stamina atlit olahraga lari" }
    ],
    correctAnswer: "B",
    explanation: "Kumis Kucing (Orthosiphon aristatus) mengandung senyawa sinensetin yang bersifat diuretik kuat, meningkatkan produksi urin untuk membantu membilas infeksi saluran kemih dan meluruhkan kristal deposit natrium di ginjal."
  },

  // ==================== KELAS X KEPERAWATAN SPECIALIZED Qs ====================
  {
    id: "q-dlk1-1",
    subjectId: "x-dlk-1",
    text: "Seorang pasien perempuan berumur 45 tahun dirawat di kamar rawat inap dengan gejala anemia akut. Sesuai aturan etika profesi klinis, data rahasia diagnosa medis pasien dilarang dibocorkan kepada pihak luar tanpa persetujuan.",
    options: [
      { key: "A", text: "Rahasia medis dapat diceritakan bebas di warung makan asalkan dengan bisik-bisik" },
      { key: "B", text: "Asisten perawat wajib mengunci dokumen catatan perkembangan pasien dan hanya membagikan data kelola klinis kepada tim medis yang merawat langsung (Medical Confidentiality)" },
      { key: "C", text: "Rahasia rekam medis bebas diunggah ke status media sosial untuk sarana edukasi khalayak" },
      { key: "D", text: "Pasien wajib menyerahkan biaya denda jika tidak bersedia menyebarkan diagnosanya" },
      { key: "E", text: "Rahasia medis hanya boleh disimpan oleh asisten kesehatan selama jam kerja aktif saja" }
    ],
    correctAnswer: "B",
    explanation: "Asas kerahasiaan medis (Medical Confidentiality) mengamanatkan setiap asisten kesehatan melindungi kerahasiaan klinis klien demi aspek hukum perlindungan pasien, kecuali dalam pemenuhan hukum aparatur negara."
  },
  {
    id: "q-dlk2-1",
    subjectId: "x-dlk-2",
    text: "Saat melakukan asuhan bantuan eliminasi, Anda mendapati pasien muntah-muntah dan terdapat darah pada seprai tempat tidur. APD (Alat Pelindung Diri) wajib paling aman yang harus disiapkan asisten perawat sebelum membersihkan area terkontaminasi tersebut adalah...",
    options: [
      { key: "A", text: "Memakai kacamata olahraga dan topi kain saja" },
      { key: "B", text: "Handscoon (sarung tangan latex steril/non-steril) dan masker bedah penahan droplet" },
      { key: "C", text: "Mantel hujan tebal tahan angin kencang" },
      { key: "D", text: "Hanya menggunakan masker tanpa sarung tangan" },
      { key: "E", text: "Tidak memerlukan APD karena asisten asisten sehat jasmani" }
    ],
    correctAnswer: "B",
    explanation: "Darah dan cairan tubuh pasien adalah media transmisi infeksi hepatitis, HIV, maupun bakteri pathogens. Penggunaan sarung tangan protektif kulit ditambah masker penutup membran mukosa respiratorik mereduksi transmisi infeksius PPI."
  },
  {
    id: "q-dlk3-1",
    text: "Berapakah denyut nadi istirahat yang dinilai normal bagi populasi orang dewasa sehat (normal range) ketika Anda memeriksanya pada pergelangan tangan (arteri radialis) selama 1 menit penuh?",
    subjectId: "x-dlk-3",
    options: [
      { key: "A", text: "30 - 50 x/menit" },
      { key: "B", text: "60 - 100 x/menit" },
      { key: "C", text: "110 - 150 x/menit" },
      { key: "D", text: "160 - 200 x/menit" },
      { key: "E", text: "Menyesuaikan dengan jam makan pasien" }
    ],
    correctAnswer: "B",
    explanation: "Frekuensi denyut nadi normal manusia dewasa adalah 60 hingga 100 kali per menit (bpm). Di bawah 60 disebut bradikardia, di atas 100 disebut takikardia."
  },
  {
    id: "q-dlk4-1",
    subjectId: "x-dlk-4",
    text: "Seorang pasien lanjut usia lumpuh total pasca cedera kepala tidak mampu bergerak sendiri. Asisten perawat dituntut membantu asuhan personal hygiene berupa memandikan pasien di atas kasur rawat.",
    options: [
      { key: "A", text: "Membiarkan pasien tanpa mandi berhari-hari agar hemat air" },
      { key: "B", text: "Mengusap tubuh pasien mengunakan waslap hangat basah sabun mulai dari area terbersih (wajah, leher) ke arah distal / area terkotor (lipatan paha, genital) secara runut" },
      { key: "C", text: "Menyiramkan air seember langsung di atas tempat tidur tanpa seprai steril" },
      { key: "D", text: "Mengusap area perineal/genital terlebih dahulu baru mengusap mata dan hidung" },
      { key: "E", text: "Memandikan pasien bedridden menggunakan alkohol pembersih luka 70%" }
    ],
    correctAnswer: "B",
    explanation: "Memandikan pasien di atas tempat tidur harus memperhatikan arah usapan, yaitu dari yang paling bersih (mata, dahi, wajah, tangan, dada, abdomen) ke ekstrimitas, lalu ke area punggung, dan terakhir genital/perineal yang mengidap akumulasi kuman terbanyak."
  },
  {
    id: "q-pilkep-1",
    subjectId: "x-pilihan-kep",
    text: "Tindakan berupa latihan rentang gerak aktif maupun pasif (Range of Motion / ROM) yang dijalankan oleh asisten perawat kepada pasien stroke tirah baring memiliki tujuan utama sebagai...",
    options: [
      { key: "A", text: "Menambah kecerdasan kognitif otak kiri pasien" },
      { key: "B", text: "Mempercepat penurunan nafsu makan berlebihan" },
      { key: "C", text: "Mempertahankan fleksibilitas sendi dan mencegah kekakuan otot (Atrofi/Kontraktur)" },
      { key: "D", text: "Mengecilkan lingkar perut pasien dalam jangka pendek" },
      { key: "E", text: "Menghibur keluarga pasien yang sedang kelelahan" }
    ],
    correctAnswer: "C",
    explanation: "Latihan Range of Motion secara pasif membantu sirkulasi sinovial sendi, menjaga integritas otot, serta meminimalkan risiko atrofi (penyusutan otot) serta kekakuan permanen sendi (kontraktur) bagi pasien imobilisasi jangka panjang."
  },

  // ==================== KELAS X FARMASI SPECIALIZED Qs ====================
  {
    id: "q-dtf1-1",
    subjectId: "x-dtf-1",
    text: "Sediaan solida serbuk terbagi merupakan salah satu sediaan tertua di Indonesia. Istilah farmasi yang merujuk pada sediaan serbuk terbagi (misalnya puyer batuk parasetamol) adalah...",
    options: [
      { key: "A", text: "Pulvis" },
      { key: "B", text: "Pulveres" },
      { key: "C", text: "Unguentum" },
      { key: "D", text: "Kapsula" },
      { key: "E", text: "Solutio" }
    ],
    correctAnswer: "B",
    explanation: "Dalam terminologi kefarmasian, Pulvis berarti serbuk tidak terbagi (seperti bedak tabur), sedangkan Pulveres berarti serbuk terbagi yang dibungkus masing-masing dalam kertas puyer/perkamen porsi."
  },
  {
    id: "q-dtf2-1",
    subjectId: "x-dtf-2",
    text: "Aturan pakai obat dalam lembar resep berbunyi 'S. b. d. d. caps. I'. Arti atau kepanjangan latin penulisan aturan pemakaian obat tersebut di apotek adalah...",
    options: [
      { key: "A", text: "Signa ter de die capsulam unam (Tiga kali sehari satu kapsul)" },
      { key: "B", text: "Signa bis de die capsulam unam (Dua kali sehari satu kapsul)" },
      { key: "C", text: "Signa semel de die capsulam unam (Sekali sehari satu kapsul)" },
      { key: "D", text: "Signa quartuor de die capsulam unam (Empat kali sehari satu kapsul)" },
      { key: "E", text: "Signa pro re nata capsulam unam (Bila perlu minum satu kapsul)" }
    ],
    correctAnswer: "B",
    explanation: "'S. b. d. d. caps. I' singkatan dari obat 'Signa bis de die capsulam unam' yang diterjemahkan sebagai 'Tandailah dua kali sehari satu kapsul'."
  },
  {
    id: "q-dtf3-1",
    subjectId: "x-dtf-3",
    text: "Sebelum mengaplikasikan timbangan obat analitis di laboratorium farmasi SMKS Kesehatan Unaaha, asisten apoteker wajib meluruskan posisi timbangan setimbang datar. Alat pendeteksi kedataran air pada kaki timbangan disebut...",
    options: [
      { key: "A", text: "Metronom musik" },
      { key: "B", text: "Waterpass (anting setimbang berupa gelembung udara dalam cairan)" },
      { key: "C", text: "Sekrup pengerem manual" },
      { key: "D", text: "Piringan wadah logam" },
      { key: "E", text: "Termometer ruangan" }
    ],
    correctAnswer: "B",
    explanation: "Waterpass atau anting timbangan (gelembung udara dalam cairan penunjuk keseimbangan) wajib berada tepat di lingkaran tengah sebagai garansi kemiringan seimbang antar kedua sisi lengan piringan timbah resep."
  },
  {
    id: "q-dtf4-1",
    subjectId: "x-dtf-4",
    text: "Kelompok obat tertentu sangat diawasi izin penerimaan dan pengeluarannya karena berisiko memicu kecanduan fisik-mental tingkat tinggi pada sirkuit saraf pusat. Kelompok obat tersebut diatur khusus di bawah payung hukum...",
    options: [
      { key: "A", text: "Obat Bebas Terbatas" },
      { key: "B", text: "Obat Tradisional Jamu lokal" },
      { key: "C", text: "Narkotika dan Psikotropika" },
      { key: "D", text: "Kosmetika sediaan pelembab" },
      { key: "E", text: "Fitofarmaka modern" }
    ],
    correctAnswer: "C",
    explanation: "Narkotika dan Psikotropika memiliki potensi adiksi hebat, sehingga undang-undang mewajibkan pelaporan bulanan SIPNAP khusus serta resep asli wajib disimpan terpisah dari golongan obat biasa."
  },
  {
    id: "q-pilfar-1",
    subjectId: "x-pilihan-far",
    text: "Sediaan sirup suspensi kering Amoxicillin antibiotik setelah dilarutkan dengan air matang oleh pasien hanya boleh digunakan maksimal selama beberapa hari sebelum dinyatakan rusak. Masa batas pakai sisa ini dinamakan...",
    options: [
      { key: "A", text: "Expired Date (ED) pabrik" },
      { key: "B", text: "Beyond Use Date (BUD) sirup antibiotik rekonstitusi (umumnya 7-14 hari)" },
      { key: "C", text: "Tanggal manufaktur racikan" },
      { key: "D", text: "Waktu paruh eliminasi hepar" },
      { key: "E", text: "Lama penyerapan lambung" }
    ],
    correctAnswer: "B",
    explanation: "Beyond Use Date (BUD) adalah batas waktu penggunaan produk obat setelah kemasan primer dirusak/dibuka/direkonstitusi. Sirup amoxicillin rekonstitusi hanya stabil maksimal 7-14 hari pada suhu sejuk karena antibiotik rentan terhidrolisis air."
  },

  // ==================== CLASS XI PRESETS QUESTIONS (KEPERAWATAN DASAR) ====================
  {
    id: "kep-1",
    subjectId: "kep-dasar",
    caseStudy: "Seorang pasien laki-laki berumur 58 tahun dirawat di bangsal penyakit dalam dengan diagnosa stroke. Pasien mengalami kondisi bedridden (tirah baring lama). Sebagai asisten keperawatan, Anda menerima instruksi untuk mencegah terjadinya luka dekubitus pada area penonjolan tulang.",
    text: "Tindakan keperawatan preventif utama yang paling tepat dan terjadwal dalam asuhan harian adalah...",
    options: [
      { key: "A", text: "Mengganti sprei pasien sesering mungkin" },
      { key: "B", text: "Melakukan ambulasi dini serta melatih pasien berjalan" },
      { key: "C", text: "Melakukan reposisi berupa alih baring (miring kanan-miring kiri) setiap 2 jam sekali" },
      { key: "D", text: "Memberikan kompres hangat pada punggung dan bokong pasien" },
      { key: "E", text: "Memberikan diet tinggi serat secara terus menerus" }
    ],
    correctAnswer: "C",
    explanation: "Untuk pasien dengan tirah baring lama (bedridden), intervensi preventif utama untuk mencegah luka dekubitus/tekanan adalah alih baring berkala (miring kiri dan miring kanan) setiap 2 jam. Tindakan ini meredistribusikan tekanan pada area penonjolan tulang demi menjaga sirkulasi darah lokal."
  },
  {
    id: "kep-2",
    subjectId: "kep-dasar",
    caseStudy: "Seorang pasien perempuan berumur 24 tahun dirawat dengan keluhan demam tinggi selama 3 hari. Saat Anda melakukan pemeriksaan tanda-tanda vital (TTV), didapatkan suhu tubuh pasien mencapai 39,2°C, denyut nadi 94 x/menit, dan frekuensi napas 22 x/menit.",
    text: "Istilah klinis yang tepat untuk menggambarkan kondisi suhu tubuh pasien di atas adalah...",
    options: [
      { key: "A", text: "Hipotermia" },
      { key: "B", text: "Hipertermia (Febris)" },
      { key: "C", text: "Hiperventilasi" },
      { key: "D", text: "Takikardia" },
      { key: "E", text: "Normal / Eutermia" }
    ],
    correctAnswer: "B",
    explanation: "Suhu tubuh normal manusia berkisar antara 36,5°C - 37,5°C. Ketika suhu tubuh melebihi 37,5°C (dalam kasus ini 39,2°C), pasien mengalami kondisi Hipertermia, febris, atau demam tinggi."
  },
  {
    id: "kep-3",
    subjectId: "kep-dasar",
    caseStudy: "Seorang pasien mengeluh sesak napas berat dan saat ini diposisikan setengah duduk dengan posisi kepala dan dada lebih tinggi daripada kaki (kemiringan tempat tidur berkisar antara 45 hingga 60 derajat untuk memaksimalkan ekspansi paru).",
    text: "Posisi terapeutik pasien yang dideskripsikan di atas dinamakan...",
    options: [
      { key: "A", text: "Posisi Fowler" },
      { key: "B", text: "Posisi Dorsal Recumbent" },
      { key: "C", text: "Posisi Trendelenburg" },
      { key: "D", text: "Posisi Sim" },
      { key: "E", text: "Posisi Litotomi" }
    ],
    correctAnswer: "A",
    explanation: "Posisi Fowler adalah posisi setengah duduk (kemiringan sudut 45-60 derajat), yang bertujuan untuk mengurangi sesak napas, meringankan ekspansi dada, serta meningkatkan kenyamanan pasien yang mengalami gangguan pernapasan kardiovaskuler atau respiratorik."
  },
  {
    id: "kep-4",
    subjectId: "kep-dasar",
    caseStudy: "Saat Anda bertugas di bangsal rawat inap keperawatan, Anda hendak melakukan pencucian tangan aseptik sebelum memasang kateter atau membantu prosedur steril medis demi meminimalkan transmisi mikroorganisme pathogen.",
    text: "Berapakah langkah mencuci tangan yang benar dan diakui secara resmi oleh WHO (World Health Organization)?",
    options: [
      { key: "A", text: "4 langkah" },
      { key: "B", text: "5 langkah" },
      { key: "C", text: "6 langkah" },
      { key: "D", text: "7 langkah" },
      { key: "E", text: "10 langkah" }
    ],
    correctAnswer: "C",
    explanation: "WHO merumuskan panduan standar berupa Sembilan Momen atau lebih spesifik '6 langkah mencuci tangan' dengan metode gosok telapak tangan, punggung tangan, sela jari, teknik mengunci, ibu jari sirkular, dan kuku/ujung jari secara runut."
  },
  {
    id: "kep-5",
    subjectId: "kep-dasar",
    caseStudy: "Sebagai asisten keperawatan, Anda selesai melakukan tindakan pengukuran TTV dan asuhan perawatan tubuh bagi seorang pasien penderita HIV/AIDS yang baru selesai menjalani transfusi. Seluruh jarum suntik sekali pakai bekas tindakan harus segera dibuang.",
    text: "Jenis sampah medis yang tepat untuk kantong plastik tempat pembuangan limbah sisa asuhan (misalnya sarung tangan terkontaminasi darah, kassa kotor) harus menggunakan kantong berwarna...",
    options: [
      { key: "A", text: "Kuning (Medis Infeksius)" },
      { key: "B", text: "Hitam (Domestik/Noninfeksius)" },
      { key: "C", text: "Ungu (Sitostatika)" },
      { key: "D", text: "Merah (Radioaktif)" },
      { key: "E", text: "Hijau (Organik basah)" }
    ],
    correctAnswer: "A",
    explanation: "Limbah medis infeksius (terkontaminasi darah, cairan tubuh seperti kassa bekas, APD habis pakai) harus dibuang ke wadah berplastik warna Kuning. Sementara sampah domestik non-infeksius dibuang ke kantong hitam."
  },

  // ==================== CLASS XI PRESETS QUESTIONS (DASAR-DASAR KEFARMASIAN) ====================
  {
    id: "far-1",
    subjectId: "farmasi-dasar",
    caseStudy: "Dokter menulis resep dalam secarik kertas resep sebagai berikut:\n\nR/ Amoxicillin 500 mg tab No. XV\nS. t. d. d. tab I \n\nSiswa farmasi harus mampu menerjemahkan aturan pakai tersebut secara teliti.",
    text: "Arti dari tulisan aturan pakai (pemberian) 'S. t. d. d. tab I' pada lembar resep di atas adalah...",
    options: [
      { key: "A", text: "Tandailah tiga kali sehari satu tablet" },
      { key: "B", text: "Tandailah tiap dua jam satu tablet" },
      { key: "C", text: "Tandailah sekali sehari satu tablet jika perlu" },
      { key: "D", text: "Tandailah dua kali sehari setengah tablet" },
      { key: "E", text: "Tandailah tiga kali seminggu satu tablet sebelum makan" }
    ],
    correctAnswer: "A",
    explanation: "S. t. d. d. tab I merupakan singkatan latin dari 'Signa ter de die tabella unam' yang berarti 'Tandailah tiga kali sehari satu tablet'."
  },
  {
    id: "far-2",
    subjectId: "farmasi-dasar",
    caseStudy: "Seorang pasien datang membeli obat batuk hitam (OBH) di apotek SMKS Kesehatan Unaaha. Di kemasan produk tertera tanda lingkaran berwarna biru dengan garis tepi berwarna hitam tajam.",
    text: "Menurut regulasi obat di Indonesia, golongan obat apakah yang bercirikan logo lingkaran biru tersebut?",
    options: [
      { key: "A", text: "Obat Bebas (Hijau)" },
      { key: "B", text: "Obat Bebas Terbatas (Biru)" },
      { key: "C", text: "Obat Keras (Merah dengan huruf K)" },
      { key: "D", text: "Narkotika (Palang Medis Merah)" },
      { key: "E", text: "Jamu / Obat Tradisional (Pohon Hijau)" }
    ],
    correctAnswer: "B",
    explanation: "Golongan Obat Bebas Terbatas ditandai dengan lingkaran berwarna biru dan dilengkapi tanda peringatan P.No.1 sampai P.No.6 pada kemasannya. Dapat dibeli tanpa resep dokter melainkan dengan batas kuantitas tertentu."
  },
  {
    id: "far-3",
    subjectId: "farmasi-dasar",
    text: "Singkatan bahasa Latin di dalam penulisan resep yang memiliki arti 'campur dan buatlah serbuk bagi' adalah...",
    options: [
      { key: "A", text: "da in dimidio (d.i.d.)" },
      { key: "B", text: "misce fac pulveres (m.f. pulv.)" },
      { key: "C", text: "ad partes aequales (a.p.eq.)" },
      { key: "D", text: "misce fac capsulas (m.f. caps.)" },
      { key: "E", text: "si opus sit (s.o.s)" }
    ],
    correctAnswer: "B",
    explanation: "M.f. pulv. singkatan dari 'Misce fac pulveres' yang diterjemahkan sebagai 'Campur dan buatlah serbuk terbagi' (pulp/puyer)."
  },
  {
    id: "far-4",
    subjectId: "farmasi-dasar",
    caseStudy: "Terdapat resep dokter untuk balita berumur 4 tahun yang menderita flu demam:\n\nR/ Paracetamol 250 mg\nm.f.l.a pulv d.t.d No. XII\n(Dosis Maksimum Paracetamol Dewasa sekali minum adalah 500 mg, sehari adalah 2000 mg).",
    text: "Berapakah takaran berat total bahan aktif obat Paracetamol yang harus ditimbang oleh asisten apoteker untuk membuat resep di atas secara keseluruhan?",
    options: [
      { key: "A", text: "1,5 gram" },
      { key: "B", text: "2,0 gram" },
      { key: "C", text: "3,0 gram" },
      { key: "D", text: "4,0 gram" },
      { key: "E", text: "250 milligram total" }
    ],
    correctAnswer: "C",
    explanation: "Metode d.t.d (da tales doses) menyiratkan tiap bungkusan puyer mengandung dosis aktif sebesar 250 mg. Karena jumlah racikan No. XII (12 bungkus), maka total penimbangan zat penurun panas Paracetamol adalah 250 mg x 12 = 3000 mg = 3,0 gram."
  },
  {
    id: "far-5",
    subjectId: "farmasi-dasar",
    text: "Prinsip penataan obat di mana sediaan obat yang memiliki tanggal kadaluarsa paling dekat wajib diletakkan di depan agar didistribusikan terlebih dahulu dikenal sebagai...",
    options: [
      { key: "A", text: "Prinsip FIFO (First In First Out)" },
      { key: "B", text: "Prinsip LIFO (Last In First Out)" },
      { key: "C", text: "Prinsip FEFO (First Expired First Out)" },
      { key: "D", text: "Prinsip Penyimpanan Abjad Saja" },
      { key: "E", text: "Prinsip LASA (Look Alike Sound Alike)" }
    ],
    correctAnswer: "C",
    explanation: "Prinsip FEFO (First Expired First Out) mendahulukan obat yang paling dekat waktu kedaluwarsanya untuk dikeluarkan pertama kali tanpa memandang kapan obat itu tiba di apotek, meminimalkan kadaluarsanya stok farmasi."
  },

  // ==================== KELAS XII QUESTIONS (ANATOMI DAN FISIOLOGI) ====================
  {
    id: "ana-1",
    subjectId: "anatomi-fisiologi",
    text: "Sistem peredaran darah manusia merupakan sistem ganda tertutup. Bagian gantung jantung (bilik) manakah yang bertugas memompa darah kaya oksigen (O2) dari paru-paru ke seluruh tubuh?",
    options: [
      { key: "A", text: "Atrium Sembilan (Serambi) Kanan" },
      { key: "B", text: "Atrium (Serambi) Kiri" },
      { key: "C", text: "Ventrikel (Bilik) Kanan" },
      { key: "D", text: "Ventrikel (Bilik) Kiri" },
      { key: "E", text: "Aorta Ascendens" }
    ],
    correctAnswer: "D",
    explanation: "Ventrikel Kiri (Bilik Kiri) memiliki dinding miokardium otot yang lebih tebal karena bertugas memompa darah bersih mengadung Oksigen dari vena pulmonalis menuju seluruh jaringan sistemik tubuh manusia."
  },
  {
    id: "ana-2",
    subjectId: "anatomi-fisiologi",
    text: "Pertukaran gas oksigen (O2) dan karbon dioksida (CO2) di dalam sistem pernapasan manusia terjadi pada struktur mikroskopis paruparu bernama...",
    options: [
      { key: "A", text: "Bronkiolus terminalis" },
      { key: "B", text: "Trakhea" },
      { key: "C", text: "Alveolus (kantung udara kecil)" },
      { key: "D", text: "Pleura parieta" },
      { key: "E", text: "Laring" }
    ],
    correctAnswer: "C",
    explanation: "Alveolus merupakan kantung udara berdinding tipis mikropori tempat terjadi difusi udara pasif menukar Karbondioksida dari pembuluh kapiler darah vena dengan Oksigen ruangan alveolar segar."
  },
  {
    id: "ana-3",
    subjectId: "anatomi-fisiologi",
    text: "Apakah nama ilmiah Latin dari tulang selangka pada struktur kerangka tubuh manusia?",
    options: [
      { key: "A", text: "Humerus" },
      { key: "B", text: "Clavicula" },
      { key: "C", text: "Femur" },
      { key: "D", text: "Scapula" },
      { key: "E", text: "Patella" }
    ],
    correctAnswer: "B",
    explanation: "Clavicula adalah tulang selangka. Humerus adalah tulang lengan atas; Femur adalah tulang paha; Scapula adalah tulang belikat; Patella adalah tulang tempurung lutut."
  },
  {
    id: "ana-4",
    subjectId: "anatomi-fisiologi",
    text: "Otak manusia terbagi atas beberapa sirkuit fungsional. Area otak yang berfungsi utama dalam menjaga keseimbangan tubuh dan koordinasi pergerakan motorik halus adalah...",
    options: [
      { key: "A", text: "Cerebrum (Otak Besar)" },
      { key: "B", text: "Cerebellum (Otak Kecil)" },
      { key: "C", text: "Medulla Oblongata" },
      { key: "D", text: "Talamus tengah" },
      { key: "E", text: "Hipotalamus posterior" }
    ],
    correctAnswer: "B",
    explanation: "Cerebellum atau Otak Kecil yang terletak di fossa kranial posterior berfungsi mengendalikan tonus otot, keseimbangan postur tubuh, serta mengontrol kelancaran presisi gerakan motorik halus."
  },
  {
    id: "ana-5",
    subjectId: "anatomi-fisiologi",
    text: "Sistem urinaria menghasilkan urine untuk sekresi sisa nitrogen metabolisme. Berapakah 3 tahapan utama pembentukan urin pada ginjal di unit fungsional Nefron?",
    options: [
      { key: "A", text: "Difusi, Osmosis, dan Lisis" },
      { key: "B", text: "Filtrasi (Penyaringan), Reabsorpsi (Penyerapan kembali), dan Augmentasi (Sekresi)" },
      { key: "C", text: "Sintesis, Emulsifikasi, dan Hidrolisis" },
      { key: "D", text: "Eliminasi, Sirkulasi, dan Regenerasi" },
      { key: "E", text: "Miksi, Defekasi, dan Perspirasi" }
    ],
    correctAnswer: "B",
    explanation: "Pembentukan urin di ginjal melibatkan 3 proses berurutan: Filtrasi (pada Glomerulus), Reabsorpsi selektif zat berharga (pada Tubulus Proksimal), dan Augmentasi pengeluaran sisa racun (pada Tubulus Distal/Kolektivus)."
  },

  // ==================== KELAS XI PERAWAT QUESTIONS ====================
  {
    id: "q-xi-mulok-1",
    subjectId: "xi-mulok-kep",
    text: "Lansia tirah baring lama (bedridden) di Konawe berisiko mengalami lecet kulit (dekubitus). Di Sulawesi Tenggara secara tradisional, minyak herbal manakah yang efektif dioleskan tipis di daerah tumit atau bokong untuk mereduksi kelembaban berlebih dan mencegah gesekan?",
    options: [
      { key: "A", text: "Air jeruk nipis pekat" },
      { key: "B", text: "Minyak Kelapa Murni (Virgin Coconut Oil / VCO) lokal khas Sultra" },
      { key: "C", text: "Minyak tanah dicampur garam dapur" },
      { key: "D", text: "Madu liar murni hangat" },
      { key: "E", text: "Larutan sabun mandi antiseptik" }
    ],
    correctAnswer: "B",
    explanation: "Virgin Coconut Oil (VCO) mengandung asam laurat tinggi yang dapat melembabkan lapisan kulit, melindungi skin barrier, serta mereduksi koefisien gesek kulit terhadap seprai, sehingga sangat efektif mencegah luka tekan (dekubitus) secara alami."
  },
  {
    id: "q-xi-pilihan-1",
    subjectId: "xi-pilihan-kep",
    text: "Salah satu instrumen standar yang digunakan oleh asisten perawat untuk menilai tingkat kemandirian fisik atau fungsional pasien lanjut usia dalam melakukan aktivitas kehidupan sehari-hari (mandi, berpakaian, toileting) adalah...",
    options: [
      { key: "A", text: "Indeks Katz (Katz Index of Activities of Daily Living)" },
      { key: "B", text: "Skala Gempa Magnitudo Richter" },
      { key: "C", text: "Indeks Massa Tubuh (IMT)" },
      { key: "D", text: "Skala Glasgow Coma Scale (GCS) kuantitatif" },
      { key: "E", text: "Timbangan berat badan digital terkalibrasi" }
    ],
    correctAnswer: "A",
    explanation: "Indeks Katz merupakan instrumen terkemuka dalam asuhan geriatri untuk menilai kemandirian atau ketergantungan pasien lansia secara fungsional dalam melakukan enam aktivitas kehidupan dasar sehari-hari."
  },
  {
    id: "q-xi-inggris-1",
    subjectId: "xi-inggris-kep",
    text: "An assistant nurse is assessing a patient's pain severity level on a scale. Which of the following expressions is the most polite and professional standard English to ask this?",
    options: [
      { key: "A", text: "Tell me your pain number right now!" },
      { key: "B", text: "Is your illness score very high or low?" },
      { key: "C", text: "On a scale of 1 to 10, with 10 being the worst pain imaginable, how would you rate your pain?" },
      { key: "D", text: "Where is the hurt? Do you need immediate chemistry?" },
      { key: "E", text: "Why are you crying so badly? Rate the pain please." }
    ],
    correctAnswer: "C",
    explanation: "Option C is the clear, grammatically correct and internationally recognized standard nursing phrase used to evaluate pain levels objectively utilizing the Numeric Rating Scale (NRS)."
  },
  {
    id: "q-xi-pkk-1",
    subjectId: "xi-pkk-kep",
    text: "Seorang lulusan asisten keperawatan kreatif ingin mendirikan usaha mandiri terpercaya dalam penyediaan jasa kunjungan perawatan lansia (geriatri) di rumah-rumah pasien. Jenis peluang usaha berbasis jasa medik dasar ini dikenal sebagai...",
    options: [
      { key: "A", text: "Distributor Farmasi Spekulatif" },
      { key: "B", text: "Waralaba Kursi Roda dan Alat Bantu Gerak" },
      { key: "C", text: "Wirausaha Jasa Home Care Kesehatan" },
      { key: "D", text: "Apotek Pengecer Obat Keras Berizin" },
      { key: "E", text: "Industri pengolah limbah B3 medis" }
    ],
    correctAnswer: "C",
    explanation: "Jasa Home Care Kesehatan adalah jenis wirausaha jasa yang menawarkan asuhan keperawatan mandiri atau asisten asuhan harian bagi pasien di lingkungan rumah tinggal klien secara profesional dan berizin hukum."
  },
  {
    id: "q-xi-agama-1",
    subjectId: "xi-agama-kep",
    text: "Ketika seorang asisten perawat mendampingi pasien beragama Muslim yang berada dalam kondisi kritis atau sakaratul maut, asuhan keagamaan yang paling beradab dan santun untuk membimbing ketenangan spiritualnya adalah...",
    options: [
      { key: "A", text: "Mengajaknya mengobrol tentang ekonomi keluarga" },
      { key: "B", text: "Menangis histeris di telinga pasien agar ia kasihan" },
      { key: "C", text: "Membisikkan kalimat thoyyibah tahlil (Laa ilaaha illallah) secara lembut di telinganya" },
      { key: "D", text: "Mengabaikannya dan segera merapikan tempat tidur pasien lain" },
      { key: "E", text: "Memutarkan musik keras di dalam ruang rawat inap" }
    ],
    correctAnswer: "C",
    explanation: "Membimbing rohani pasien kritis dengan membisikkan doa atau kalimat-kalimat thoyyibah keagamaan (tahlil) secara tenang dan beradab merupakan wujud penghormatan serta bantuan asuhan spiritual terbaik menjelang ajal."
  },
  {
    id: "q-xi-matematika-1",
    subjectId: "xi-matematika-kep",
    text: "Seorang pasien dewasa pasca operasi dirujuk mendapatkan 500 ml cairan infus NaCl 0.9% untuk dihabiskan dalam waktu 8 jam. Bila asisten perawat menggunakan selang infus makro (faktor tetes / drop factor = 20 tetes/ml), berapakah kecepatan tetesan infus per menit yang harus disesuaikan?",
    options: [
      { key: "A", text: "15 tetes/menit" },
      { key: "B", text: "21 tetes/menit" },
      { key: "C", text: "28 tetes/menit" },
      { key: "D", text: "35 tetes/menit" },
      { key: "E", text: "42 tetes/menit" }
    ],
    correctAnswer: "B",
    explanation: "Kecepatan tetesan (tpm) = (Jumlah Cairan (ml) x Faktor Tetes) / (Waktu (jam) x 60 menit) = (500 x 20) / (8 x 60) = 10000 / 480 = 20.83. Dibulatkan menjadi 21 tetes per menit."
  },
  {
    id: "q-xi-ippd-1",
    subjectId: "xi-ippd-kep",
    text: "Seorang pasien lanjut usia datang dengan keluhan sering merasa lapar (polifagia), sering haus (polidipsia), sering kencing malam hari (poliuria), disertai penurunan berat badan drastis tanpa penyebab jelas. Patofisiologi gejala klasik ini merujuk kepada kelainan metabolik...",
    options: [
      { key: "A", text: "Gagal Jantung Kongestif" },
      { key: "B", text: "Gastroenteritis Kronis" },
      { key: "C", text: "Diabetes Mellitus" },
      { key: "D", text: "Tuberkulosis Paru Akut" },
      { key: "E", text: "Apisitis Akut" }
    ],
    correctAnswer: "C",
    explanation: "Trias gejala klasik polifagia, polidipsia, dan poliuria merupakan tanda klinis patognomonis utama penyakit Diabetes Mellitus yang dipicu oleh defisiensi insulin absolut atau relatif."
  },
  {
    id: "q-xi-sejarah-1",
    subjectId: "xi-sejarah-kep",
    text: "Organisasi kemanusiaan Palang Merah Indonesia (PMI) dibentuk secara resmi pasca kemerdekaan RI. Siapakah tokoh nasional yang menjabat sebagai Ketua PMI Pertama pada tanggal 17 September 1945?",
    options: [
      { key: "A", text: "Drs. Mohammad Hatta" },
      { key: "B", text: "Dr. Boentaran Martoatmodjo" },
      { key: "C", text: "Sutan Sjahrir" },
      { key: "D", text: "Dr. Wahidin Sudirohusodo" },
      { key: "E", text: "Ir. Soekarno" }
    ],
    correctAnswer: "A",
    explanation: "Drs. Mohammad Hatta (Bapak Wakil Presiden Republik Indonesia yang pertama) terpilih dan dilantik sebagai Ketua Palang Merah Indonesia (PMI) yang pertama sejak awal pembentukan resminya."
  },
  {
    id: "q-xi-pancasila-1",
    subjectId: "xi-pancasila-kep",
    text: "Asisten perawat melayani dan melakukan asuhan keperawatan ke seluruh pasien dengan setulus hati tanpa memandang latar belakang suku, tingkat ekonomi, atau kasta sosial pasien tersebut. Perilaku terpuji ini sesuai dengan pengamalan Pancasila yaitu sila ke...",
    options: [
      { key: "A", text: "Sila ke-1" },
      { key: "B", text: "Sila ke-2 (Kemanusiaan yang adil dan beradab)" },
      { key: "C", text: "Sila ke-3" },
      { key: "D", text: "Sila ke-4" },
      { key: "E", text: "Sila ke-5" }
    ],
    correctAnswer: "B",
    explanation: "Sila ke-2 (Kemanusiaan yang adil dan beradab) menuntut keadilan, adab yang santun, tenggang rasa, dan non-diskriminasi antarsesama manusia dalam memperoleh pelayanan asuhan sosial maupun medis."
  },
  {
    id: "q-xi-indonesia-1",
    subjectId: "xi-indonesia-kep",
    text: "Dalam sistem penulisan rekam medis atau asuhan (SOAP), manakah bagian laporan penulisan komunikatif yang mencatat pernyataan dari mulut pasien terkait rasa nyeri abdomen atau pusing kepala?",
    options: [
      { key: "A", text: "Data S (Subjektif)" },
      { key: "B", text: "Data O (Objektif)" },
      { key: "C", text: "Data A (Asesmen)" },
      { key: "D", text: "Data P (Planning)" },
      { key: "E", text: "Rekomendasi diet nutrisi" }
    ],
    correctAnswer: "A",
    explanation: "Data S (Subjektif) adalah laporan verbal/aktual yang diperoleh langsung dari keluhan perasaan yang diutarakan dari mulut pasien/keluarga pasien itu sendiri."
  },
  {
    id: "q-xi-kdtk-1",
    subjectId: "xi-kdtk-kep",
    text: "Saat melaksanakan vulva hygiene pada pasien perempuan sebelum pemasangan kateter urine (urinary foley catheter), teknik mengusap labia menggunakan kapas desinfektan yang steril harus dilakukan dari arah...",
    options: [
      { key: "A", text: "Bawah ke atas (dari anus ke vestibulum)" },
      { key: "B", text: "Atas ke bawah (dari puncak vestibulum ke perineum/arah anus) searah sekali usap (one-way stroke)" },
      { key: "C", text: "Memutar searah jarum jam di sekeliling paha" },
      { key: "D", text: "Digosok maju-mundur beberapa kali menggunakan kapas yang sama" },
      { key: "E", text: "Menyamping searah letak arteri femoralis" }
    ],
    correctAnswer: "B",
    explanation: "Arah mengusap wajib dari atas ke bawah (dari area bersih ke area terinfeksi lambat/anus) menggunakan tipe satu kapas steril sekali usap demi menyingkirkan re-translow/perpindahan koloni flora usus ke sistem uretra."
  },
  {
    id: "q-xi-penjaskes-1",
    subjectId: "xi-penjaskes-kep",
    text: "Petugas medis atau asisten perawat seringkali menderita kekakuan postur punggung bawah akibat angkat-pasien yang berulang. Manakah latihan fisik preventif harian yang paling tepat untuk menguatkan tulang dan otot penopang tubuh?",
    options: [
      { key: "A", text: "Mengkonsumsi pil kopi bersoda tinggi gula malam hari" },
      { key: "B", text: "Latihan pemanasan, stretching dinamis punggung bawah, dan mempertahankan mekanika tubuh ergonomis" },
      { key: "C", text: "Tidur telungkup di lantai keras sepanjang jam dinas" },
      { key: "D", text: "Mengangkat beban maksimal di luar kapasitas tubuh tanpa pemanasan" },
      { key: "E", text: "Menghindari segala macam aktivitas pembakaran energi" }
    ],
    correctAnswer: "B",
    explanation: "Stretching teratur punggung, pemanasan fungsional, dan disiplin menggunakan mekanika tubuh ergonomis (menekuk lutut saat mengangkat pasien) adalah tindakan rehabilitatif preventif utama menghindari low back pain."
  },

  // ==================== SISWA KELAS XI FARMASI QUESTIONS ====================
  {
    id: "q-xi-mulok-far-1",
    subjectId: "xi-mulok-far",
    text: "Tanaman 'Sambiloto' (Andrographis paniculata) merupakan salah satu simplisia herba lokal berkhasiat obat tinggi. Di Sulawesi Tenggara, secara empiris herba pahit ini dimanfaatkan keluarga binaan farmasi untuk...",
    options: [
      { key: "A", text: "Menurunkan nafsu makan berlebihan" },
      { key: "B", text: "Penurun kadar gula darah (antidiabetes) dan peningkat imunitas tubuh" },
      { key: "C", text: "Obat bius hirup darurat" },
      { key: "D", text: "Penghilang noda jerawat instan" },
      { key: "E", text: "Sediaan pewarna kuning alami makanan lokal" }
    ],
    correctAnswer: "B",
    explanation: "Sambiloto mengandung senyawa andrografolida yang secara empiris maupun klinis teruji memiliki aktivitas hipoglikemik (menurunkan kadar glukosa darah) serta sebagai imunostimulan nabati yang meningkatkan daya tahan tubuh."
  },
  {
    id: "q-xi-pilihan-far-1",
    subjectId: "xi-pilihan-far",
    text: "Pembuatan sediaan emulsi minyak ikan sering mengalami ketidakstabilan fisika di mana terjadi pemisahan fase minyak dengan fase air yang bersifat reversibel dan dapat menyatu kembali melalui pengocokan ringan. Fenomena instabilitas ini disebut...",
    options: [
      { key: "A", text: "Cracking (Pecahnya emulsi permanen)" },
      { key: "B", text: "Creaming (Pemisahan fase karena perbedaan berat jenis)" },
      { key: "C", text: "Koalesensi (Penggabungan droplet fase terdispersi)" },
      { key: "D", text: "Inversi Fase (Perubahan tipe emulsi)" },
      { key: "E", text: "Flokulasi (Penggumpalan partikel tanpa penggabungan)" }
    ],
    correctAnswer: "B",
    explanation: "Creaming adalah pemisahan fasa emulsi menjadi dua lapisan yang bersifat reversibel (dapat didispersikan kembali dengan pengocokan), biasanya dipicu oleh perbedaan berat jenis antara fase terdispersi dengan medium pendispersi."
  },
  {
    id: "q-xi-inggris-far-1",
    subjectId: "xi-inggris-far",
    text: "A doctor issues a prescription containing the signa 'gtt. auric. dext. II d.d. m. et v.'. Which of the following is the correct English translation for this pharmacy administration instruction?",
    options: [
      { key: "A", text: "Put two drops into the left ear, twice a day in the morning and evening" },
      { key: "B", text: "Put two drops into the right ear, twice a day in the morning and evening" },
      { key: "C", text: "Put two drops into both eyes, once a day in the afternoon" },
      { key: "D", text: "Take two tablets orally, twice a day before meals" },
      { key: "E", text: "Apply twice daily to the right skin area heavily" }
    ],
    correctAnswer: "B",
    explanation: "'gtt. auric.' means guttae auriculares (ear drops). 'dext.' is dextra (right). 'II d.d.' means bis de die (twice a day). 'm. et v.' means mane et vespere (morning and evening)."
  },
  {
    id: "q-xi-farmakognosi-far-1",
    subjectId: "xi-farmakognosi-far",
    text: "Simplisia 'Caryophylli Flos' diperoleh dari bagian tanaman kering Syzygium aromaticum (Myrtaceae) yang kaya akan kadar minyak atsiri berkhasiat anti-pasmodik atau anestesi lokal gigi. Bagian tanaman apakah 'Flos' tersebut?",
    options: [
      { key: "A", text: "Daun kering" },
      { key: "B", text: "Kulit batang kering" },
      { key: "C", text: "Kuncup bunga kering" },
      { key: "D", text: "Kulit buah matang" },
      { key: "E", text: "Akar tunggang" }
    ],
    correctAnswer: "C",
    explanation: "Dalam sistematika klasifikasi farmakognosi, 'Flos' merujuk pada organ bunga. Caryophylli Flos adalah kuncup bunga cengkeh kering dari tanaman Syzygium aromaticum yang berkhasiat analgesik gigi berkat kadar zat aktif eugenol."
  },
  {
    id: "q-xi-agama-far-1",
    subjectId: "xi-agama-far",
    text: "Di dalam etika pelayanan kefarmasian Islam, seorang asisten apoteker dilarang keras menukar bahan aktif sediaan resep dengan bahan yang mutunya lebih rendah atau tidak halal demi keuntungan komersial pribadi. Tindakan tidak jujur ini melanggar penerapan prinsip...",
    options: [
      { key: "A", text: "Riya (Pamer amal ibadah)" },
      { key: "B", text: "Amanah (Kepercayaan dan kejujuran tanggung jawab profesi)" },
      { key: "C", text: "Sum'ah (Mencari kepopuleran)" },
      { key: "D", text: "Takabur (Sombong)" },
      { key: "E", text: "Syirik (Menyekutukan Allah)" }
    ],
    correctAnswer: "B",
    explanation: "Prinsip Amanah dalam profesi kesehatan menuntut asisten apoteker menjaga kejujuran, menjamin kualitas sediaan sesuai resep dokter, serta menjaga keselamatan pasien demi tanggung jawab etika sosiomedis dan ketakwaan religius."
  },
  {
    id: "q-xi-matematika-far-1",
    subjectId: "xi-matematika-far",
    text: "Seorang anak berumur 8 tahun diresepkan obat Paracetamol. Dosis lazim sekali minum untuk orang dewasa adalah 500 mg. Jika asisten apoteker menghitung menggunakan rumus Young (n / (n + 12)), berapakah dosis sekali minum yang tepat untuk anak tersebut?",
    options: [
      { key: "A", text: "100 mg" },
      { key: "B", text: "150 mg" },
      { key: "C", text: "200 mg" },
      { key: "D", text: "250 mg" },
      { key: "E", text: "300 mg" }
    ],
    correctAnswer: "C",
    explanation: "Rumus Young untuk anak < 12 tahun: Dosis Anak = (n / (n + 12)) * Dosis Dewasa. Di mana n adalah umur anak. Maka Dosis Anak = (8 / (8 + 12)) * 500 mg = (8 / 20) * 500 mg = 0.4 * 500 mg = 200 mg."
  },
  {
    id: "q-xi-pkk-far-1",
    subjectId: "xi-pkk-far",
    text: "Kelompok siswa farmasi SMKS Kesehatan Unaaha mengemas produk teh simplisia daun kelor kering. Jika total biaya tetap produksi (fixed cost) adalah Rp 300.000, biaya variabel per bungkus Rp 5.000, dan harga jual ditetapkan Rp 15.000 per bungkus, berapakah jumlah bungkus teh yang wajib terjual untuk mencapai titik impas (Break Even Point / BEP)?",
    options: [
      { key: "A", text: "15 bungkus" },
      { key: "B", text: "20 bungkus" },
      { key: "C", text: "30 bungkus" },
      { key: "D", text: "40 bungkus" },
      { key: "E", text: "50 bungkus" }
    ],
    correctAnswer: "C",
    explanation: "BEP (unit) = Biaya Tetap / (Harga Jual per unit - Biaya Variabel per unit) = 300.000 / (15.000 - 5.000) = 300.000 / 10.000 = 30 bungkus."
  },
  {
    id: "q-xi-sejarah-far-1",
    subjectId: "xi-sejarah-far",
    text: "Kitab kuno 'Candi Prambanan' dan relief 'Candi Borobudur' menyimpan bukti sejarah visual yang berharga mengenai cara pengolahan tanaman obat tradisional herba di Nusantara. Apakah nama sediaan minuman herbal tradisional asli Indonesia yang telah dikenal sejak era kerajaan masa lampau tersebut?",
    options: [
      { key: "A", text: "Jamu" },
      { key: "B", text: "Fitofarmaka sediaan tablet" },
      { key: "C", text: "Eliksir minyak atsiri" },
      { key: "D", text: "Teh hitam fermentasi" },
      { key: "E", text: "Ekstrak suspensi sintetis" }
    ],
    correctAnswer: "A",
    explanation: "Jamu adalah sebutan khas Indonesia untuk obat tradisional warisan budaya leluhur Nusantara yang diracik dari bahan-bahan herbal alami pembawa khasiat kesehatan empiris secara turun-temurun."
  },
  {
    id: "q-xi-indonesia-far-1",
    subjectId: "xi-indonesia-far",
    text: "Dalam penulisan laporan karya ilmiah hasil praktikum ekstraksi simplisia farmakognosi, bagian sitematika tulisan yang memuat daftar referensi buku, jurnal ilmiah, dan rujukan dokumen lain yang digunakan penulis disebut...",
    options: [
      { key: "A", text: "Latar Belakang Masalah" },
      { key: "B", text: "Kajian Pustaka Utama" },
      { key: "C", text: "Daftar Pustaka (Bibliografi)" },
      { key: "D", text: "Hasil dan Pembahasan" },
      { key: "E", text: "Angket Kuesioner Responden" }
    ],
    correctAnswer: "C",
    explanation: "Daftar Pustaka (Bibliografi) adalah bagian penutup karya tulis ilmiah yang mencantumkan secara baku judul, penulis, tahun terbit, dan penerbit dari seluruh referensi eksternal rujukan tulisan agar terbebas dari plagiarisme."
  },
  {
    id: "q-xi-administrasi-far-1",
    subjectId: "xi-administrasi-far",
    text: "Saat menerima pesanan obat Codein (sediaan antitusif golongan narkotika) dari distributor resmi (PBF), jenis Surat Pesanan (SP) manakah yang wajib ditandatangani oleh Apoteker Pengelola Apotek (APA) sesuai regulasi hukum?",
    options: [
      { key: "A", text: "Surat Pesanan Obat Bebas Terbatas biasa" },
      { key: "B", text: "Surat Pesanan Narkotika khusus (berjumlah 4 rangkap model resmi pemerintah)" },
      { key: "C", text: "Surat Pesanan Psikotropika biasa" },
      { key: "D", text: "Surat Pesanan Obat-Obat Tertentu (OOT)" },
      { key: "E", text: "Kwitansi Faktur Pembelian Umum" }
    ],
    correctAnswer: "B",
    explanation: "Codein adalah narkotika. Surat pesanan (SP) untuk obat golongan narkotika diatur sangat ketat secara hukum nasional di mana satu lembar SP Narkotika khusus hanya boleh memuat maksimal satu jenis item narkotika dan dicetak dalam form resmi 4 rangkap."
  },
  {
    id: "q-xi-pelayanan-far-1",
    subjectId: "xi-pelayanan-far",
    text: "Dokter meminta asisten membuat salep belerang 10% sebanyak 20 gram menggunakan dasar salep Vaselin Flavum. Berapakah berat bahan aktif belerang (sulfur praecipitatum) yang harus ditimbang secara akurat oleh asisten resep tersebut?",
    options: [
      { key: "A", text: "0.5 gram" },
      { key: "B", text: "1.0 gram" },
      { key: "C", text: "2.0 gram" },
      { key: "D", text: "3.0 gram" },
      { key: "E", text: "4.0 gram" }
    ],
    correctAnswer: "C",
    explanation: "Formula salep persen: Berat sulfur = Persentase * Total Sediaan = 10% * 20 gram = (10 / 100) * 20 = 2.0 gram. Vaselin Flavum ditimbang sebanyak 20 - 2 = 18 gram."
  },
  {
    id: "q-xi-kimia-far-1",
    subjectId: "xi-kimia-far",
    text: "Indikator asam-basa Phenolphthalein (PP) lazim ditambahkan asisten analisis kimia di lab sebelum memulai titrasi asam kuat dengan basa kuat. Perubahan warna apakah yang ditunjukkan oleh indikator PP saat mencapai titik akhir titrasi basa (alkalis)?",
    options: [
      { key: "A", text: "Dari kuning menjadi biru gelap" },
      { key: "B", text: "Dari tidak berwarna menjadi merah muda (pink konstan)" },
      { key: "C", text: "Dari merah pekat menjadi kuning jingga" },
      { key: "D", text: "Dari hijau muda menjadi tidak berwarna" },
      { key: "E", text: "Dari ungu pekat menjadi hitam pekat" }
    ],
    correctAnswer: "B",
    explanation: "Indikator fenolftalein (PP) memiliki trayek pH berkisar antara 8.3 - 10.0. Pada kondisi asam hingga netral, PP tidak berwarna, sedangkan jika kondisi bergeser menjadi sedikit basa (alkalis/kelebihan setetes titran NaOH), larutan akan berubah warna menjadi merah muda (pink) konstan."
  },
  {
    id: "q-xi-penjaskes-far-1",
    subjectId: "xi-penjaskes-far",
    text: "Saat meracik puyer pulveres sebanyak 30 bungkus berturut-turut di laboratorium resep, asisten apoteker dituntut berdiri lama pada posisi meja timbangan. Untuk mereduksi regangan tulang belakang pelvis, postur ergonomis manakah yang tepat?",
    options: [
      { key: "A", text: "Menumpu berat badan pada satu kaki dominan dan membenturkan lutut ke laci meja" },
      { key: "B", text: "Berdiri tegak seimbang dengan membentangkan kaki selebar bahu dan sesekali meregangkan otot leher-lengan secara teratur" },
      { key: "C", text: "Membungkuk condong hingga kepala hampir menyentuh piringan timbang analitis" },
      { key: "D", text: "Melakukan gerakan melompat tinggi memutar badan di lab resep" },
      { key: "E", text: "Selalu bersandar dengan punggung meliuk ke arah belakang kabinet" }
    ],
    correctAnswer: "B",
    explanation: "Postur berdiri ergonomis mensyaratkan pembagian distribusi bobot tubuh setara di atas kedua telapak kaki (selebar bahu) dipadu peregangan otot dinamis berkala untuk melancarkan sirkulasi balik vena dan mencegah kelelahan spinal lumbar."
  },
  {
    id: "q-xi-pancasila-far-1",
    subjectId: "xi-pancasila-far",
    text: "Ketersediaan program Jaminan Kesehatan Nasional (JKN/BPJS Kesehatan) memudahkan seluruh lapisan masyarakat Indonesia menebus obat resep kronis di instalasi farmasi rujukan secara gratis atau terjangkau. Kebijakan sosial medis ini paling selaras dengan pengamalan Pancasila yaitu sila ke...",
    options: [
      { key: "A", text: "Sila ke-1 (Ketuhanan Yang Maha Esa)" },
      { key: "B", text: "Sila ke-2 (Kemanusiaan yang adil dan beradab)" },
      { key: "C", text: "Sila ke-3 (Persatuan Indonesia)" },
      { key: "D", text: "Sila ke-4 (Kerakyatan yang dipimpin oleh hikmat kebijaksanaan)" },
      { key: "E", text: "Sila ke-5 (Keadilan sosial bagi seluruh rakyat Indonesia)" }
    ],
    correctAnswer: "E",
    explanation: "Sila ke-5 (Keadilan sosial bagi seluruh rakyat Indonesia) menegaskan hak keadilan sosial mencakup penyediaan akses merata, adil, sosiomedis, terjangkau tanpa diskriminasi ekonomi dalam porsi pemenuhan hak pertolongan kesehatan warga negara."
  },
  {
    id: "q-xi-farmakologi-far-1",
    subjectId: "xi-farmakologi-far",
    text: "Ibu hamil trimester pertama mengalami hiperemesis (mual muntah akut) dan diresepkan obat antimual. Mengapa asisten kefarmasian harus ekstra hati-hati dan wajib memverifikasi keamanan obat antimual di bawah pengawasan apoteker terhadap ibu hamil pada fase organogenesis?",
    options: [
      { key: "A", text: "Karena obat antimual berisiko menaikkan kolesterol plasma ibu" },
      { key: "B", text: "Karena bahaya efek Teratogenik (risiko kecacatan fisik janin dalam kandungan)" },
      { key: "C", text: "Karena obat antimual dapat mempercepat pertumbuhan gigi janin sebelum lahir" },
      { key: "D", text: "Karena dapat memicu kenaikan berat badan ibu bayi secara berlebihan" },
      { key: "E", text: "Karena obat antimual mengurangi penyerapan air di usus besar ibu hamil" }
    ],
    correctAnswer: "B",
    explanation: "Obat-obatan tertentu dapat menembus sawar plasenta pada ibu hamil dan mengganggu fase pembentukan organ vital janin (organogenesis/trimester 1), yang dikenal dengan efek teratogenik (memicu malformasi kongenital / cacat lahir)."
  },

  // ==================== SISWA KELAS XII PERAWAT QUESTIONS ====================
  {
    id: "q-xii-pkk-kep-1",
    subjectId: "xii-pkk-kep",
    text: "Seorang asisten keperawatan mandiri berkeinginan menawarkan jasa pelayanan asuhan geriatri (mandi, perawatan luka ringan, pendampingan aktivitas) untuk lansia bedridden pasca stroke di Kota Unaaha. Strategi bauran pemasaran (Marketing Mix) manakah yang paling tepat sasaran untuk menyasar keluarga pelaku rawat utama?",
    options: [
      { key: "A", text: "Mempromosikan jasa lewat brosur cetak di taman hiburan anak-anak" },
      { key: "B", text: "Melakukan kemitraan rujukan terpercaya dengan klinik geriatri, puskesmas lokal, serta edukasi komunitas peduli lansia" },
      { key: "C", text: "Memasang tarif harga setinggi-tingginya agar terkesan sangat mewah" },
      { key: "D", text: "Menjual produk obat-obatan keras impor tanpa izin BPOM" },
      { key: "E", text: "Menolak memberikan brosur harga kepada calon pelanggan" }
    ],
    correctAnswer: "B",
    explanation: "Bagi jasa kesehatan lansia (home care), kredibilitas merupakan fokus utama (trust-based). Kemitraan rujukan dengan institusi pelayanan kesehatan formal (Puskesmas/Klinik) dipadukan dengan konseling langsung pada paguyuban lansia/caregiver merupakan saluran promosi paling efektif dan tepat sasaran."
  },
  {
    id: "q-xii-kdm-kep-1",
    subjectId: "xii-kdm-kep",
    text: "Seorang pasien geriatri mengalami sesak napas akut dengan frekuensi pernapasan (RR) mencapai 28 x/menit, terdengar bunyi mengi (wheezing), menggunakan otot bantu pernapasan dada, serta merasa sangat cemas. Berdasarkan teori hierarki kebutuhan dasar manusia dari Abraham Maslow, kebutuhan fisik prioritas utama manakah yang wajib segera dipenuhi asisten perawat?",
    options: [
      { key: "A", text: "Kebutuhan aktualisasi diri optimal" },
      { key: "B", text: "Kebutuhan eliminasi urine (Buang air kecil)" },
      { key: "C", text: "Kebutuhan fisiologis oksigenasi (Bernapas)" },
      { key: "D", text: "Kebutuhan nutrisi makanan berserat tinggi" },
      { key: "E", text: "Kebutuhan rasa memiliki dan cinta kasih keluarga" }
    ],
    correctAnswer: "C",
    explanation: "Kebutuhan oksigenasi/pernapasan merupakan kebutuhan fisiologis paling mendasar dan kritis pada tingkat terbawah hierarki Maslow. Tanpa suplai oksigen memadai dalam beberapa menit, sel-sel vital tubuh akan mengalami hipoksia ireversibel yang mengancam nyawa pasien."
  },
  {
    id: "q-xii-ippd-kep-1",
    subjectId: "xii-ippd-kep",
    text: "Seorang pasien rawat inap diidentifikasi menderita batuk produktif terus-menerus selama lebih dari 3 minggu disertai keringat malam hari dan penurunan berat badan signifikan. Manakah jenis spesimen klinis utama dan pemeriksaan penunjang laboratorium diagnostik yang spesifik untuk menegakkan diagnosis Tuberkulosis (TB)?",
    options: [
      { key: "A", text: "Spesimen urin pagi dan pemeriksaan sedimen kimiawi" },
      { key: "B", text: "Spesimen sputum (dahak) pasien melalui pemeriksaan mikroskopis BTA (Bakteri Tahan Asam)" },
      { key: "C", text: "Spesimen darah serum untuk analisis kadar kolesterol total" },
      { key: "D", text: "Spesimen kerokan kulit luar menggunakan larutan KOH 10%" },
      { key: "E", text: "Pemeriksaan fungsi ginjal ureum kreatinin serum biasa" }
    ],
    correctAnswer: "B",
    explanation: "Diagnosis definitif kuman Tuberkulosis paru (Mycobacterium tuberculosis) ditegakkan melalui deteksi keberadaan bakteri gram-positif tahan asam pada spesimen sputum (dahak) segar penderita yang diambil secara berkala (SPS: Sewaktu-Pagi-Sewaktu) melalui pewarnaan Ziehl-Neelsen (BTA positif)."
  },
  {
    id: "q-xii-inggris-kep-1",
    subjectId: "xii-inggris-kep",
    text: "During a clinical shift handover, an assistant nurse reads the patient's record containing: 'Male patient, 68 years old, post-laparotomy day 2. Complains of sharp, radiating abdominal pain on move, current Vitals: BP 130/80 mmHg, HR 88 bpm, RR 20 tpm.' What is the medical meaning of the term 'radiating pain'?",
    options: [
      { key: "A", text: "Pain that is caused by external radioactive imaging equipment" },
      { key: "B", text: "Pain that starts in one area and spreads out to other parts of the body" },
      { key: "C", text: "Pain that only occurs during midnight when sleeping" },
      { key: "D", text: "Pain that completely disappears within a few seconds without intervention" },
      { key: "E", text: "Mild itchy sensation on the surgical skin suture lines" }
    ],
    correctAnswer: "B",
    explanation: "In nursing terminology, 'radiating pain' (nyeri menjalar) describes a pain sensation that originates at a specific point (e.g., surgical incision) but travels or expands outward along nerve pathways to adjacent anatomical areas."
  },
  {
    id: "q-xii-matematika-kep-1",
    subjectId: "xii-matematika-kep",
    text: "Sebuah survei statistika rekam medis sederhana di SMKS Kesehatan Unaaha mencatat durasi rawat inap (lama hari rawat) 5 pasien pasca operative sebagai berikut: 3 hari, 5 hari, 4 hari, 6 hari, dan 7 hari. Berapakah nilai rata-rata (mean) lama hari rawat inap pasien tersebut?",
    options: [
      { key: "A", text: "3 hari" },
      { key: "B", text: "4 hari" },
      { key: "C", text: "5 hari" },
      { key: "D", text: "6 hari" },
      { key: "E", text: "7 hari" }
    ],
    correctAnswer: "C",
    explanation: "Rata-rata (mean) dihitung dengan menjumlahkan seluruh data lalu dibagi jumlah sampel: (3 + 5 + 4 + 6 + 7) / 5 = 25 / 5 = 5 hari."
  },
  {
    id: "q-xii-kdtk-kep-1",
    subjectId: "xii-kdtk-kep",
    text: "Seorang pasien lansia mengalami kelumpuhan anggota gerak sebelah kanan (hemiparese dextra) akibat serangan stroke 1 bulan yang lalu. Untuk mempertahankan mobilitas sendi, melatih kelenturan otot ekstremitas, dan mencegah komplikasi atrofi otot, tindakan rehabilitatif harian apakah yang paling tepat dilatih oleh asisten keperawatan?",
    options: [
      { key: "A", text: "Pemberian kompres es dingin di telapak tangan secara kontinu" },
      { key: "B", text: "Melakukan immobilisasi (pembidaian) ketat pada ekstremitas yang lumpuh" },
      { key: "C", text: "Latihan Range of Motion (ROM) pasif secara berkala dan konsisten" },
      { key: "D", text: "Terapi chiropractic manipulasi tulang belakang dengan hentakan keras" },
      { key: "E", text: "Melarang pasien menggerakkan bagian ekstremitas yang sehat" }
    ],
    correctAnswer: "C",
    explanation: "Latihan Range of Motion (ROM) pasif adalah latihan rentang gerak sendi teratur di mana perawat menggerakkan persendian luar pasien lumpuh secara fisiologis. Tindakan gerak ini bertujuan mencegah kekakuan sendi permanen (kontraktur) dan menjaga tonus pembuluh darah sirkulasi perifer ekstremitas."
  },
  {
    id: "q-xii-indonesia-kep-1",
    subjectId: "xii-indonesia-kep",
    text: "Ketika menyusun Laporan Asuhan Keperawatan Terstandarisasi, asisten keperawatan harus memisahkan data klinis yang diperoleh langsung melalui keluhan lisan pasien (Data Subjektif) dengan hasil pengukuran instrumen medis (Data Objektif). Penulisan kata baku di bawah ini yang tepat menurut KBBI adalah...",
    options: [
      { key: "A", text: "Diagnosa, tensi, apolitik, kwalitas" },
      { key: "B", text: "Diagnosis, tensimeter, apotek, kualitas" },
      { key: "C", text: "Diagnose, tensimetri, apotik, kwalitet" },
      { key: "D", text: "Diagnosism, tensi, apotik, qualitas" },
      { key: "E", text: "Diagnotis, tensimeter, apoteker, qualitet" }
    ],
    correctAnswer: "B",
    explanation: "Bentuk baku yang terdaftar di Kamus Besar Bahasa Indonesia (KBBI) adalah 'diagnosis' (bukan diagnosa), 'tensimeter' (bukan tensi), 'apotek' (bukan apotik), 'kualitas' (bukan kwalitas)."
  },
  {
    id: "q-xii-pilihan-kep-1",
    subjectId: "xii-pilihan-kep",
    text: "Lansia penderita rhematoid arthritis kronis sering mengeluhkan nyeri sendi hebat di lutut yang mengganggu pola tidurnya. Sebagai asisten keperawatan terdidik, modalitas terapi komplementer mandiri non-farmakologis manakah yang aman direkomendasikan kepada keluarga (caregiver) untuk mereduksi inflamasi sendi kronis umum?",
    options: [
      { key: "A", text: "Memberikan parasetamol dosis tinggi setiap 2 jam sekali" },
      { key: "B", text: "Aplikasi kompres hangat kering di sendi lutut selama 15-20 menit teratur" },
      { key: "C", text: "Melatih olahraga lari maraton sejauh 5 kilometer pagi hari" },
      { key: "D", text: "Membungkus persendian lutut pasien menggunakan kain perban elastis sekencang mungkin" },
      { key: "E", text: "Mengoleskan larutan cuka murni asam pekat di area sendi yang meradang" }
    ],
    correctAnswer: "B",
    explanation: "Kompres hangat basah/kering dengan suhu aman (sekitar 38-40 derajat Celcius) merangsang vasodilatasi lokal pembuluh darah, melunakkan kekakuan tendon/ligamen sendi lutut, melancarkan sirkulasi, dan mengurangi impuls nyeri hantaran serabut saraf sensorik perifer secara non-farmakologis."
  },
  {
    id: "q-xii-pancasila-kep-1",
    subjectId: "xii-pancasila-kep",
    text: "Program Jaminan Kesehatan Nasional (JKN) yang dikelola oleh BPJS menjamin hak seluruh ibu hamil dan melahirkan terlindungi secara finansial dari biaya asuhan kebidanan/dokter spesialis obgyn darurat. Prinsip keadilan pemenuhan hak primer medis tanpa membeda-bedakan kelas sosial-ekonomi bermuara pada pengamalan Pancasila, khususnya Sila...",
    options: [
      { key: "A", text: "Sila pertama (Ketuhanan yang Maha Esa)" },
      { key: "B", text: "Sila kedua (Kemanusiaan yang adil dan beradab)" },
      { key: "C", text: "Sila ketiga (Persatuan Indonesia)" },
      { key: "D", text: "Sila keempat (Kerakyatan yang dipimpin oleh hikmat kebijaksanaan)" },
      { key: "E", text: "Sila kelima (Keadilan sosial bagi seluruh rakyat Indonesia)" }
    ],
    correctAnswer: "E",
    explanation: "Pemerataan ketersediaan akses pelayanan kesehatan bermutu yang terjangkau secara adil bagi seluruh lapisan masyarakat adalah modal terkuat keadilan sosial (Sila ke-5), karena menjamin hak hidup sejahtera lahir batin dan perlindungan kesehatan warga negara Indonesia secara merata."
  },
  {
    id: "q-xii-agama-kep-1",
    subjectId: "xii-agama-kep",
    text: "Seorang asisten keperawatan sedang mendampingi pasien berkeyakinan muslim yang berada pada fase kritis sakaratul maut (menjelang ajal). Tindakan asuhan bimbingan spiritual/keagamaan yang paling menunjukkan budi pekerti akhlak mulia dan empati asisten adalah...",
    options: [
      { key: "A", text: "Meninggalkan pasien sendirian di kamar agar suasana tenang dan sunyi" },
      { key: "B", text: "Membisikkan kalimat talqin (Lailahaillallah) dengan lembut secara sabar dan santun di dekat telinga pasien" },
      { key: "C", text: "Menjelaskan detail kalkulasi sisa biaya rumah sakit di dekat pasien" },
      { key: "D", text: "Menyalakan radio musik bising agar pasien tidak merasa sepi" },
      { key: "E", text: "Memaksa pasien yang separuh sadar untuk segera menandatangani dokumen warisan" }
    ],
    correctAnswer: "B",
    explanation: "Membimbing rohani menjelang batas ajal secara beradab merupakan wujud bimbingan piritual (asuhan paliatif) mulia. Bagi pemeluk Islam, membisikkan kalimat tauhid secara berulang, lembut, dan tulus bertujuan memberikan kedamaian batin agar penderita menutup usia dalam keadaan meninggikan tauhid ketuhanan (husnul khatimah)."
  },

  // ==================== SISWA KELAS XII FARMASI QUESTIONS ====================
  {
    id: "q-xii-pelayanan-far-1",
    subjectId: "xii-pelayanan-far",
    text: "Seorang dokter menulis resep rawat jalan: 'R/ Amoxicillin 500 TAB No. X, S. 3. d.d. Tab I p.c.'. Berdasarkan kompetensi pelayanan asisten kefarmasian dalam menyerahkan sediaan obat, bagaimanakah uraian aturan pakai (signa) tersebut ketika diedukasikan ke pasien?",
    options: [
      { key: "A", text: "Minum amoxicillin sekali sehari satu tablet sebelum makan" },
      { key: "B", text: "Minum amoxicillin tiga kali sehari satu tablet sesudah makan (p.c = post coenam)" },
      { key: "C", text: "Kocok dahulu sediaan amoxicillin dilarutkan sebelum diminum saat perut kosong" },
      { key: "D", text: "Urus sediaan racikan diletakkan di bawah lidah pagi hari" },
      { key: "E", text: "Minum dua tablet sekaligus menjelang mau tidur malam hari" }
    ],
    correctAnswer: "B",
    explanation: "'S. 3 d.d. Tab I' berarti signa ter de die tabulam unam (tandailah tiga kali sehari satu tablet). 'p.c' adalah post coenam yang berarti sesudah makan. Amoxicillin adalah antibiotik yang harus dikonsumsi secara teratur sesudah makan demi mereduksi iritasi gastrointestinal dan menjaga profil kadar terapeutik obat dalam darah."
  },
  {
    id: "q-xii-pkk-far-1",
    subjectId: "xii-pkk-far",
    text: "Kelompok siswa kelas XII Farmasi merencanakan pendirian usaha apotek mini mandiri. Selama setahun operasional apotek diperoleh kalkulasi total biaya tetap sebesar Rp 120.000.000. Apabila target persentase rata-rata margin laba kotor apotek terhadap total omzet penjualan kotor ditetapkan konstan sebesar 20%, berapakah target minimal omzet pendapatan penjualan setahun untuk mencapai titik impas (Break Even Point dalam Rupiah)?",
    options: [
      { key: "A", text: "Rp 240.000.000" },
      { key: "B", text: "Rp 360.000.000" },
      { key: "C", text: "Rp 480.000.000" },
      { key: "D", text: "Rp 600.000.000" },
      { key: "E", text: "Rp 720.000.000" }
    ],
    correctAnswer: "D",
    explanation: "Titik Impas Rupiah (BEP Rp) dihitung dengan rumus: BEP Rp = Total Biaya Tetap / Persentase Laba Kotor. Maka BEP Rp = Rp 120.000.000 / 0.20 = Rp 600.000.000. Pendapatan penjualan di kisaran Rp 600.000.000 setahun tepat membuat apotek tidak untung dan tidak merugi."
  },
  {
    id: "q-xii-kimia-far-1",
    subjectId: "xii-kimia-far",
    text: "Asisten laboratorium ditugaskan memverifikasi kadar tablet kadar senyawa Natrium Bikarbonat (NaHCO3) yang merupakan sediaan bahan aktif antasida netralisir asam lambung menggunakan titrasi Asidimetri langsung memakai asam baku sekunder HCl 0,1 N. Reaksi asidimetri/alkalimetri ini tergolong ke dalam tipe reaksi kimia...",
    options: [
      { key: "A", text: "Reaksi Kompleksometri larutan logam" },
      { key: "B", text: "Reaksi Oksidasi-Reduksi reduktor" },
      { key: "C", text: "Reaksi Netralisasi (Asam Basa)" },
      { key: "D", text: "Reaksi Pengendapan Argentometri" },
      { key: "E", text: "Reaksi Hidrolisis enzimatis polimer" }
    ],
    correctAnswer: "C",
    explanation: "Titrasi Asidimetri adalah penentuan kadar basa alkali (NaHCO3) menggunakan asam baku sekunder (HCl). Reaksi yang terjadi adalah reaksi netralisasi atau penetralan ion H+ (dari HCl asam) dengan donor basa bikarbonat menghasilkan garam NaCl, gas CO2, dan air (H2O)."
  },
  {
    id: "q-xii-inggris-far-1",
    subjectId: "xii-inggris-far",
    text: "A customer came to the pharmacy with a dry cough prescription stating: 'Take 5 mL of codeine linctus three times a day. May cause drowsiness'. Which of the following is the most accurate advisory warning message to the customer in professional English?",
    options: [
      { key: "A", text: "Please use this syrup directly on dry skin rashes with cotton swabs." },
      { key: "B", text: "Take 5 mL of this cough syrup three times a day, but avoid driving or operating heavy machinery as it might make you sleepy." },
      { key: "C", text: "This syrup must be mixed with fresh orange juice to prevent total blindness." },
      { key: "D", text: "Take this syrup only when you are driving high-speed trucks on highways." },
      { key: "E", text: "Drink the whole bottle instantly for rapid clinical anesthesia benefits." }
    ],
    correctAnswer: "B",
    explanation: "'Drowsiness' is translation for 'kantuk'. Codeine is an opioid cough supressant that acts on the central nervous system, which has a major side effect of causing drowsiness. Warning customers to avoid driving or operating machinery is critical for patient safety."
  },
  {
    id: "q-xii-matematika-far-1",
    subjectId: "xii-matematika-far",
    text: "Asisten apoteker di laboratorium resep diminta mengencerkan 200 ml larutan Alkohol konsentrasi pekat 96% v/v (dengan air steril) menjadi larutan Alkohol steril konsentrasi 70% v/v untuk antiseptik bedah. Berapakah volume total hasil pengenceran larutan alkohol 70% v/v tersebut? (Dibulatkan ke angka terdekat)",
    options: [
      { key: "A", text: "214 ml" },
      { key: "B", text: "250 ml" },
      { key: "C", text: "274 ml" },
      { key: "D", text: "314 ml" },
      { key: "E", text: "350 ml" }
    ],
    correctAnswer: "C",
    explanation: "Menggunakan rumus pengenceran: V1 * C1 = V2 * C2. Di mana V1 = 200 ml, C1 = 96%, C2 = 70%. Maka: V2 = (200 * 96) / 70 = 19200 / 70 = 274.28 ml. Dengan pembulatan diperoleh volume total sebesar 274 ml."
  },
  {
    id: "q-xii-farmakognosi-far-1",
    subjectId: "xii-farmakognosi-far",
    text: "Dalam praktikum identifikasi mikroskopis serbuk kering simplisia daun Jati Belanda (Guazumae Folium) yang lazim digunakan sebagai sediaan fitofarmaka herba pelangsing tubuh alami, penanda anatomi spesifik manakah yang paling akurat diamati di bawah mikroskop cahaya?",
    options: [
      { key: "A", text: "Kelenjar rambut bercabang tunggal tebal" },
      { key: "B", text: "Rambut penutup berbentuk bintang (stelata) yang bertumpuk khas" },
      { key: "C", text: "Stomata dengan kelenjar lendir alkali besar" },
      { key: "D", text: "Kristal kalsium oksalat berbentuk jarum gila" },
      { key: "E", text: "Saluran minyak schizogen berwarna merah menyala" }
    ],
    correctAnswer: "B",
    explanation: "Secara anatomis farmakognosi, simplisia Guazumae Folium (daun jati belanda) memiliki ciri mikroskopis khas berupa serbuk yang memiliki rambut penutup berbentuk bintang (stelata) dengan banyak cabang sel penutup, disertai fragmen sel epidermis berstomata tipe anomositik."
  },
  {
    id: "q-xii-farmakologi-far-1",
    subjectId: "xii-farmakologi-far",
    text: "Sebuah sediaan sirup pencernaan mengandung Aluminium Hidroksida [Al(OH)3] dan Magnesium Hidroksida [Mg(OH)2]. Sediaan ini bekerja mengurangi iritasi mukosa lambung lewat cara menetralisir kelebihan kadar HCl perut secara kimiawi. Golongan obat farmakoterapi ini disebut...",
    options: [
      { key: "A", text: "Laksatif osmolar (Urutan pencahar)" },
      { key: "B", text: "Antiemetik antispasmodik" },
      { key: "C", text: "Antasida lokal lambung" },
      { key: "D", text: "Antidiare adsorben usus" },
      { key: "E", text: "Imunostimulan mukosa lambung" }
    ],
    correctAnswer: "C",
    explanation: "Kombinasi Aluminium Hidroksida dan Magnesium Hidroksida adalah antasida lambung. Obat ini menaikkan pH cairan lambung (menurunkan keasaman gas) melalui penetralan ion Cl- secara reaksi kimiawi asam-basa lokal di lambung."
  },
  {
    id: "q-xii-indonesia-far-1",
    subjectId: "xii-indonesia-far",
    text: "Dalam menyusun judul karya tulis ilmiah (KTI) pengujian herba sediaan antimikroba jahe, manakah format huruf kapitalisasi penulisan judul karya tulis yang tepat sesuai Pedoman Umum Ejaan Bahasa Indonesia (PUEBI)?",
    options: [
      { key: "A", text: "Uji Aktivitas Antibakteri Ekstrak Rimpang Jahe Terhadap Bakteri Staphylococcus aureus" },
      { key: "B", text: "Uji Aktivitas Antibakteri Ekstrak Rimpang Jahe terhadap Bakteri Staphylococcus aureus" },
      { key: "C", text: "Uji aktivitas antibakteri ekstrak rimpang jahe Terhadap Bakteri staphylococcus Aureus" },
      { key: "D", text: "UJI AKTIVITAS ANTIBAKTERI EKSTRAK rimpang jahe TERHADAP bakteri staphylococcus aureus" },
      { key: "E", text: "Uji Aktivitas Antibakteri Ekstrak Rimpang Jahe Terhadap bakteri Staphylococcus Aureus" }
    ],
    correctAnswer: "B",
    explanation: "Berdasarkan PUEBI, huruf pertama setiap kata dalam judul ditulis kapital, kecuali kata depan, kata hubung, kata sandang, dan partikel (seperti 'terhadap', 'di', 'dan', 'ke', 'dari', 'pada') yang terletak di tengah judul kalimat."
  },
  {
    id: "q-xii-pilihan-far-1",
    subjectId: "xii-pilihan-far",
    text: "Sebuah sediaan sirup parasetamol racikan mengalami kristalisasi gula di leher botol (cap locking) setelah satu minggu penyimpanan di suhu ruang akibat lewat jenuh sirup sakarosa. Untuk menjaga stabilitas fisik kelarutan dan mencegah penumpukan gula tersebut, modifikasi co-solvent pelarut pembantu apakah yang tepat ditambahkan?",
    options: [
      { key: "A", text: "Air raksa murni kental" },
      { key: "B", text: "Sorbiol, Gliserol atau Propilen Glikol dalam rasio formulasi aman" },
      { key: "C", text: "Alkohol pekat absolute 99%" },
      { key: "D", text: "Minyak jarak kental kastor" },
      { key: "E", text: "Minyak kayu putih aromaterapi" }
    ],
    correctAnswer: "B",
    explanation: "Untuk mencegah cap locking (kristalisasi gula sakarosa di tutup botol sirup), ditambahkan zat pencegah pengkristalan (anti-caplocking agent) seperti Sorbitol, Gliserol, atau Propilen Glikol yang sekaligus bertindak sebagai peningkat viskositas aman dan liofilisator pembantu (co-solvent)."
  },
  {
    id: "q-xii-pancasila-far-1",
    subjectId: "xii-pancasila-far",
    text: "Kebijakan penetapan Harga Eceran Tertinggi (HET) sediaan obat generik berlogo di seluruh apotek jaringan Indonesia bertujuan agar obat-obatan penting tetap terjangkau harganya oleh masyarakat miskin di pelosok desa Konawe. Pemenuhan kelayakan hak obat esensial ini merupakan perwujudan Pancasila sila...",
    options: [
      { key: "A", text: "Sila kesatu" },
      { key: "B", text: "Sila kedua" },
      { key: "C", text: "Sila ketiga" },
      { key: "D", text: "Sila keempat" },
      { key: "E", text: "Sila kelima" }
    ],
    correctAnswer: "E",
    explanation: "Sila kelima (Keadilan sosial bagi seluruh rakyat Indonesia) tercermin dalam usaha negara melindungi daya beli masyarakat miskin atas suplai komoditas obat-obatan esensial melalui instrumen hukum HET agar terbebas dari monopoli kartel dagang farmasi."
  },
  {
    id: "q-xii-agama-far-1",
    subjectId: "xii-agama-far",
    text: "Seorang asisten apoteker melayani resep pasien dengan ramah, menjelaskan aturan pakai, tidak melebihkan rincian biaya obat, serta menolak gratifikasi dari suplier obat ilegal. Kejujuran mulia asisten ini menunjukkan akhlak mulia spiritual berupa...",
    options: [
      { key: "A", text: "Qana'ah" },
      { key: "B", text: "Syaja'ah" },
      { key: "C", text: "Amanah profesi terpercaya" },
      { key: "D", text: "Tasamuh" },
      { key: "E", text: "Hasad" }
    ],
    correctAnswer: "C",
    explanation: "Menjaga amanah dalam mengelola resep dokter, harga obat jujur, dan menolak suap dari supplier obat terlarang merupakan intisari kejujuran spiritual (Amanah) bagi profesi asisten apoteker."
  }
];

