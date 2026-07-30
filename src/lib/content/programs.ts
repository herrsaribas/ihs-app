import type { Lang } from '@/lib/i18n';

export const PROGRAM_UI: Record<Lang, Record<string, string>> = {
  tr: {
    back: 'Ana Sayfa', apply: 'Başvur', applyLong: 'Başvuru Formu', enrollment: 'Kayıt Açık', allPrograms: 'Tüm Programlar',
    seeCurriculum: 'Müfredatı İncele', aboutLabel: 'Program Hakkında', aboutTitle: 'Genel Bilgiler',
    factsLabel: 'Program Bilgileri', currLabel: 'Müfredat', currTitle: 'Ders Programı',
    feeLabel: 'Ödeme Bilgisi', feeTitle: 'Program Ücreti',
    ctaTitle: 'Yeni Dönem Kayıtları Devam Ediyor', ctaSub: 'Başvurunuzu üç kısa adımda tamamlayın; ekibimiz sizinle iletişime geçsin.',
  },
  de: {
    back: 'Startseite', apply: 'Bewerben', applyLong: 'Zum Bewerbungsformular', enrollment: 'Einschreibung geöffnet', allPrograms: 'Alle Programme',
    seeCurriculum: 'Lehrplan ansehen', aboutLabel: 'Über das Programm', aboutTitle: 'Allgemeine Informationen',
    factsLabel: 'Programmdaten', currLabel: 'Lehrplan', currTitle: 'Kursprogramm',
    feeLabel: 'Zahlungsinformationen', feeTitle: 'Programmgebühr',
    ctaTitle: 'Die Einschreibung für das neue Semester läuft', ctaSub: 'Schließen Sie Ihre Bewerbung in drei kurzen Schritten ab — unser Team meldet sich bei Ihnen.',
  },
};

export interface ProgramDetail {
  tab: string; kind: string; name: string; intro: string;
  chips: string[]; about: string; about2: string;
  facts: { k: string; v: string }[];
  terms: { name: string; courses: string[] }[];
  fees: { region: string; amount: string; note: string }[];
  feeNote: string;
}

export const PROGRAMS: { id: string; tr: ProgramDetail; de: ProgramDetail }[] = [
  {
    id: 'hadis-merkezli',
    tr: {
      tab: 'Hadis Merkezli İslami İlimler', kind: 'Kapsamlı Program',
      name: 'Hadis Merkezli İslami İlimler Programı',
      intro: 'Meal-tefsir ve hadis ağırlıklı, iki yıllık kapsamlı online program. Canlı derslerle yürütülen, klasik kaynaklarla doğrudan temas eden bir müfredat.',
      chips: ['2 Yıl · 4 Dönem', 'Online Canlı Ders', 'Türkçe / Almanca', 'Sertifika + Transkript'],
      about: 'Hadis Merkezli İslami İlimler Programı, dünyanın her yerinden katılımcılara İslami ilimlerde sağlam bir temel kazandırmak için tasarlanmıştır. Program; meal ve tefsir ile hadis ilimlerini omurga kabul eder, Arapça ve destek dersleriyle bütüncül bir ilahiyat formasyonu sunar.',
      about2: 'Her dönem ortalama 5 ders alınır; dersler 60 dakikadır (50 dakika anlatım + 10 dakika soru-cevap). Tüm dersler kayıt altına alınır ve öğrenci portalı üzerinden erişime açılır. Program sonunda sertifika ve alınan dersleri gösteren transkript verilir.',
      facts: [
        { k: 'Süre', v: '2 yıl · 4 dönem (dönem başına 15 hafta)' },
        { k: 'Ders Formatı', v: '60 dk canlı ders: 50 dk anlatım + 10 dk soru-cevap' },
        { k: 'Ders Saatleri', v: 'Cuma 18:00–21:30 · Cumartesi 11:00–14:30 (Avrupa saati)' },
        { k: 'Sınav ve Başarı', v: 'Dönem sonunda tek sınav; 100 üzerinden en az 60' },
        { k: 'Belgelendirme', v: 'Sertifika + kredili transkript' },
      ],
      terms: [
        { name: '1. Dönem', courses: ['Kur’an’a Giriş ve Meal Okumaları I', 'Hadis Usûlüne Giriş', 'Arapça I', 'Siyer'] },
        { name: '2. Dönem', courses: ['Tefsir Usûlü', 'Kütüb-i Sitte Okumaları I', 'Arapça II', 'Akaid'] },
        { name: '3. Dönem', courses: ['Rivayet Tefsiri ve Meal Okumaları II', 'İsnad ve Ricâlü’l-Hadis', 'Fıkıh Usûlü', 'Arapça III'] },
        { name: '4. Dönem', courses: ['Konulu Tefsir ve Ahkâm Ayetleri', 'Şerh Geleneği ve Fıkhu’l-Hadis', 'Çağdaş Hadis Meseleleri', 'Bitirme Semineri'] },
      ],
      fees: [
        { region: 'Afrika, Orta Doğu ve Orta Asya', amount: '650 € / yıl', note: 'Yıllık ücret; iki taksitle ödenebilir.' },
        { region: 'Diğer Ülkeler', amount: '1.000 € / yıl', note: 'Yıllık ücret; iki taksitle ödenebilir.' },
      ],
      feeNote: 'Aileli kayıtlarda ve peşin ödemelerde %10 indirim uygulanır. Taksitler dönem başlarında tahsil edilir (1 Eylül / 1 Ocak). Burs imkânları için bize yazın.',
    },
    de: {
      tab: 'Hadithzentrierte Islamische Wissenschaften', kind: 'Umfassendes Programm',
      name: 'Programm Hadithzentrierte Islamische Wissenschaften',
      intro: 'Zweijähriges umfassendes Online-Programm mit Schwerpunkt auf Koranübersetzung, Tafsir und Hadith — Live-Unterricht mit direktem Zugang zu klassischen Quellen.',
      chips: ['2 Jahre · 4 Semester', 'Online-Live-Unterricht', 'Türkisch / Deutsch', 'Zertifikat + Transkript'],
      about: 'Das Programm Hadithzentrierte Islamische Wissenschaften vermittelt Teilnehmenden weltweit ein solides Fundament in den islamischen Wissenschaften. Koranübersetzung, Tafsir und Hadithwissenschaften bilden das Rückgrat; Arabisch und ergänzende Fächer runden die theologische Bildung ab.',
      about2: 'Pro Semester werden durchschnittlich 5 Kurse belegt; jede Stunde dauert 60 Minuten (50 Min. Vortrag + 10 Min. Fragen). Alle Stunden werden aufgezeichnet und über das Studierendenportal bereitgestellt. Zum Abschluss gibt es Zertifikat und Transkript.',
      facts: [
        { k: 'Dauer', v: '2 Jahre · 4 Semester (je 15 Wochen)' },
        { k: 'Unterrichtsformat', v: '60 Min. Live: 50 Min. Vortrag + 10 Min. Fragen' },
        { k: 'Unterrichtszeiten', v: 'Fr 18:00–21:30 · Sa 11:00–14:30 (MEZ)' },
        { k: 'Prüfung', v: 'Eine Prüfung am Semesterende; mindestens 60 von 100' },
        { k: 'Abschluss', v: 'Zertifikat + Transkript mit Credits' },
      ],
      terms: [
        { name: '1. Semester', courses: ['Einführung in den Koran und Übersetzungslektüre I', 'Einführung in die Hadith-Methodik', 'Arabisch I', 'Sira'] },
        { name: '2. Semester', courses: ['Tafsir-Methodik', 'Kutub-al-Sitta-Lektüre I', 'Arabisch II', 'Aqida'] },
        { name: '3. Semester', courses: ['Überlieferungsexegese und Übersetzungslektüre II', 'Isnad und Rijal al-Hadith', 'Usul al-Fiqh', 'Arabisch III'] },
        { name: '4. Semester', courses: ['Thematischer Tafsir und Ahkam-Verse', 'Kommentartradition und Fiqh al-Hadith', 'Moderne Hadith-Fragen', 'Abschlussseminar'] },
      ],
      fees: [
        { region: 'Afrika, Naher Osten und Zentralasien', amount: '650 € / Jahr', note: 'Jahresgebühr; zahlbar in zwei Raten.' },
        { region: 'Übrige Länder', amount: '1.000 € / Jahr', note: 'Jahresgebühr; zahlbar in zwei Raten.' },
      ],
      feeNote: 'Bei Familienanmeldungen und Vorauszahlung 10 % Rabatt. Raten werden zu Semesterbeginn fällig (1. September / 1. Januar). Für Stipendien schreiben Sie uns.',
    },
  },
  {
    id: 'hadis-ilimleri',
    tr: {
      tab: 'Hadis İlimleri', kind: 'İhtisas Programı',
      name: 'Hadis İlimleri Sertifika Programı',
      intro: 'Hadis usûlü, isnad-rical bilgisi ve şerh geleneğini bir arada sunan iki dönemlik ihtisas programı.',
      chips: ['2 Dönem', 'Online / Kampüs', 'Türkçe / Almanca'],
      about: 'Program, hadis ilminin terminolojisini ve usûl geleneğini kaynak metinler üzerinden kazandırır: sahih, hasen ve zayıfın tanımından cerh-ta’dil literatürüne, isnad analizinden şerh geleneğine uzanan bütüncül bir çerçeve.',
      about2: 'Dersler haftalık canlı oturumlar halinde yürütülür; klasik metinlerden seçme okumalar ödev olarak takip edilir ve örnek isnadlar birlikte analiz edilir. Programı tamamlayanlara sertifika verilir.',
      facts: [
        { k: 'Süre', v: '2 dönem (dönem başına 15 hafta)' },
        { k: 'Format', v: 'Haftalık canlı ders + uygulamalı isnad analizi' },
        { k: 'Ön Koşul', v: 'Yok; temel dini bilgi tavsiye edilir' },
        { k: 'Belgelendirme', v: 'Sertifika + dönem projesi' },
      ],
      terms: [
        { name: '1. Dönem', courses: ['Hadis Tarihi ve Tedvin', 'Hadis Usûlü I: Istılahlar', 'Kütüb-i Sitte Okumaları', 'Cerh ve Ta’dil Esasları'] },
        { name: '2. Dönem', courses: ['Hadis Usûlü II: Tenkit Yöntemleri', 'İsnad ve Ricâlü’l-Hadis Uygulaması', 'Şerh Geleneğine Giriş', 'Çağdaş Hadis Meseleleri'] },
      ],
      fees: [{ region: 'Tüm Ülkeler', amount: '300 € / dönem', note: 'Dönem başında tahsil edilir.' }],
      feeNote: 'Öğrenci ve aileli kayıtlarda %10 indirim uygulanır. Burs imkânları için bize yazın.',
    },
    de: {
      tab: 'Hadithwissenschaften', kind: 'Fachprogramm',
      name: 'Zertifikatsprogramm Hadithwissenschaften',
      intro: 'Zweisemestriges Fachprogramm, das Hadith-Methodik, Isnad-Rijal-Kunde und Kommentartradition vereint.',
      chips: ['2 Semester', 'Online / Campus', 'Türkisch / Deutsch'],
      about: 'Das Programm vermittelt Terminologie und Methodentradition der Hadithwissenschaft anhand von Quellentexten: von den Definitionen von Sahih, Hasan und Da’if über die Jarh-wa-Ta’dil-Literatur bis zur Isnad-Analyse und Kommentartradition.',
      about2: 'Der Unterricht findet in wöchentlichen Live-Sitzungen statt; ausgewählte klassische Texte werden als Lektüre begleitet und Beispiel-Isnade gemeinsam analysiert. Absolventen erhalten ein Zertifikat.',
      facts: [
        { k: 'Dauer', v: '2 Semester (je 15 Wochen)' },
        { k: 'Format', v: 'Wöchentlicher Live-Unterricht + praktische Isnad-Analyse' },
        { k: 'Voraussetzung', v: 'Keine; religiöses Grundwissen empfohlen' },
        { k: 'Abschluss', v: 'Zertifikat + Semesterprojekt' },
      ],
      terms: [
        { name: '1. Semester', courses: ['Hadithgeschichte und Kodifizierung', 'Hadith-Methodik I: Terminologie', 'Kutub-al-Sitta-Lektüre', 'Grundlagen von Jarh wa Ta’dil'] },
        { name: '2. Semester', courses: ['Hadith-Methodik II: Kritikmethoden', 'Isnad- und Rijal-Praxis', 'Einführung in die Kommentartradition', 'Moderne Hadith-Fragen'] },
      ],
      fees: [{ region: 'Alle Länder', amount: '300 € / Semester', note: 'Fällig zu Semesterbeginn.' }],
      feeNote: 'Für Studierende und Familienanmeldungen 10 % Rabatt. Für Stipendien schreiben Sie uns.',
    },
  },
  {
    id: 'tefsir-ilimleri',
    tr: {
      tab: 'Tefsir İlimleri', kind: 'İhtisas Programı',
      name: 'Tefsir İlimleri Sertifika Programı',
      intro: 'Tefsir usûlünden rivayet ve dirayet tefsirine, Kur’an ilimlerinden çağdaş yaklaşımlara uzanan iki dönemlik ihtisas programı.',
      chips: ['2 Dönem', 'Online / Kampüs', 'Türkçe / Almanca'],
      about: 'Program; ulûmü’l-Kur’ân ve tefsir usûlünü temel alır, klasik rivayet ve dirayet tefsirlerinden seçme okumalarla yorum geleneğini tanıtır. Ahkâm ayetleri ve konulu tefsir dersleriyle Kur’an’ın bütüncül okunması hedeflenir.',
      about2: 'Dersler haftalık canlı oturumlar halinde yürütülür; tefsir metinlerinden seçme okumalar ödev olarak takip edilir. Programı tamamlayanlara sertifika verilir.',
      facts: [
        { k: 'Süre', v: '2 dönem (dönem başına 15 hafta)' },
        { k: 'Format', v: 'Haftalık canlı ders + metin okumaları' },
        { k: 'Ön Koşul', v: 'Yok; temel Arapça tavsiye edilir' },
        { k: 'Belgelendirme', v: 'Sertifika' },
      ],
      terms: [
        { name: '1. Dönem', courses: ['Tefsir Tarihi ve Usûlü', 'Ulûmü’l-Kur’ân', 'Rivayet Tefsiri Okumaları', 'Arapça ve Belâgat'] },
        { name: '2. Dönem', courses: ['Dirayet Tefsiri Okumaları', 'Konulu Tefsir', 'Ahkâm Ayetleri', 'Çağdaş Tefsir Yaklaşımları'] },
      ],
      fees: [{ region: 'Tüm Ülkeler', amount: '300 € / dönem', note: 'Dönem başında tahsil edilir.' }],
      feeNote: 'Öğrenci ve aileli kayıtlarda %10 indirim uygulanır. Burs imkânları için bize yazın.',
    },
    de: {
      tab: 'Tafsir-Wissenschaften', kind: 'Fachprogramm',
      name: 'Zertifikatsprogramm Tafsir-Wissenschaften',
      intro: 'Zweisemestriges Fachprogramm von der Tafsir-Methodik über Überlieferungs- und Meinungsexegese bis zu modernen Ansätzen.',
      chips: ['2 Semester', 'Online / Campus', 'Türkisch / Deutsch'],
      about: 'Das Programm gründet auf den Koranwissenschaften (Ulum al-Qur’an) und der Tafsir-Methodik und führt mit ausgewählten Lektüren aus klassischen Werken in die Auslegungstradition ein. Ahkam-Verse und thematischer Tafsir fördern eine ganzheitliche Koranlektüre.',
      about2: 'Der Unterricht findet in wöchentlichen Live-Sitzungen statt; ausgewählte Tafsir-Texte werden als Lektüre begleitet. Absolventen erhalten ein Zertifikat.',
      facts: [
        { k: 'Dauer', v: '2 Semester (je 15 Wochen)' },
        { k: 'Format', v: 'Wöchentlicher Live-Unterricht + Textlektüre' },
        { k: 'Voraussetzung', v: 'Keine; Grundkenntnisse in Arabisch empfohlen' },
        { k: 'Abschluss', v: 'Zertifikat' },
      ],
      terms: [
        { name: '1. Semester', courses: ['Tafsir-Geschichte und -Methodik', 'Ulum al-Qur’an', 'Lektüre der Überlieferungsexegese', 'Arabisch und Rhetorik'] },
        { name: '2. Semester', courses: ['Lektüre der Meinungsexegese', 'Thematischer Tafsir', 'Ahkam-Verse', 'Moderne Tafsir-Ansätze'] },
      ],
      fees: [{ region: 'Alle Länder', amount: '300 € / Semester', note: 'Fällig zu Semesterbeginn.' }],
      feeNote: 'Für Studierende und Familienanmeldungen 10 % Rabatt. Für Stipendien schreiben Sie uns.',
    },
  },
  {
    id: 'meal-calismalari',
    tr: {
      tab: 'Meal Çalışmaları', kind: 'İhtisas Programı',
      name: 'Meal Çalışmaları Sertifika Programı',
      intro: 'Kur’an mealleri, çeviri kuramı ve mukayeseli meal okumalarına odaklanan tek dönemlik ihtisas programı.',
      chips: ['1 Dönem', 'Online', 'Türkçe / Almanca'],
      about: 'Program; meal tarihini, çeviri kuramının temel meselelerini ve Türkçe-Almanca meallerin mukayeseli okunmasını konu edinir. Deyimler, mecazlar ve çok anlamlı ifadeler üzerinden çeviri problemleri uygulamalı olarak işlenir.',
      about2: 'Haftalık canlı seminerlerle yürütülür; katılımcılar dönem sonunda kısa bir mukayeseli meal incelemesi hazırlar. Programı tamamlayanlara sertifika verilir.',
      facts: [
        { k: 'Süre', v: '1 dönem (15 hafta)' },
        { k: 'Format', v: 'Online seminer + mukayeseli okuma atölyesi' },
        { k: 'Ön Koşul', v: 'Yok' },
        { k: 'Belgelendirme', v: 'Sertifika + inceleme ödevi' },
      ],
      terms: [
        { name: 'Tek Dönem', courses: ['Meal Tarihi ve Çeviri Kuramı', 'Mukayeseli Meal Okumaları', 'Çeviri Problemleri: Deyimler ve Mecazlar', 'Meal Atölyesi', 'Değerlendirme Semineri'] },
      ],
      fees: [{ region: 'Tüm Ülkeler', amount: '250 € / dönem', note: 'Kayıtta tahsil edilir.' }],
      feeNote: 'Öğrenci ve aileli kayıtlarda %10 indirim uygulanır. Burs imkânları için bize yazın.',
    },
    de: {
      tab: 'Koranübersetzung (Meal)', kind: 'Fachprogramm',
      name: 'Zertifikatsprogramm Koranübersetzungsstudien (Meal)',
      intro: 'Einsemestriges Fachprogramm zu Koranübersetzungen, Übersetzungstheorie und vergleichender Meal-Lektüre.',
      chips: ['1 Semester', 'Online', 'Türkisch / Deutsch'],
      about: 'Das Programm behandelt die Geschichte der Koranübersetzung, Grundfragen der Übersetzungstheorie und die vergleichende Lektüre türkischer und deutscher Übersetzungen. Übersetzungsprobleme werden anhand von Idiomen, Metaphern und mehrdeutigen Ausdrücken praktisch bearbeitet.',
      about2: 'Wöchentliche Live-Seminare; zum Abschluss erstellen die Teilnehmenden eine kurze vergleichende Übersetzungsstudie. Absolventen erhalten ein Zertifikat.',
      facts: [
        { k: 'Dauer', v: '1 Semester (15 Wochen)' },
        { k: 'Format', v: 'Online-Seminar + vergleichende Lektüre-Werkstatt' },
        { k: 'Voraussetzung', v: 'Keine' },
        { k: 'Abschluss', v: 'Zertifikat + Studienarbeit' },
      ],
      terms: [
        { name: 'Ein Semester', courses: ['Geschichte der Koranübersetzung und Übersetzungstheorie', 'Vergleichende Meal-Lektüre', 'Übersetzungsprobleme: Idiome und Metaphern', 'Übersetzungswerkstatt', 'Abschlussseminar'] },
      ],
      fees: [{ region: 'Alle Länder', amount: '250 € / Semester', note: 'Fällig bei der Anmeldung.' }],
      feeNote: 'Für Studierende und Familienanmeldungen 10 % Rabatt. Für Stipendien schreiben Sie uns.',
    },
  },
];

// ---------- Eğitimler (all programs overview) ----------
export const EGITIMLER = {
  tr: {
    ui: {
      back: 'Ana Sayfa', apply: 'Başvur', applyLong: 'Başvuru Formu', eyebrow: 'Eğitimler', enrollment: 'Kayıt Açık',
      title: 'Tüm Eğitim Programları',
      sub: 'Kapsamlı ana programımız ve alanlara odaklanan ihtisas sertifika programlarımızı karşılaştırın.',
      mainLabel: 'Kapsamlı Program', specLabel: 'İhtisas Programları', compareLabel: 'Karşılaştırma',
      details: 'Detaylı Bilgi',
      ctaTitle: 'Hangi program size uygun, emin değil misiniz?', ctaSub: 'Başvuru formunu doldurun; ekibimiz sizi arayıp doğru programa yönlendirsin.',
    },
    main: {
      kind: 'Kapsamlı Program', name: 'Hadis Merkezli İslami İlimler Programı',
      desc: 'Meal-tefsir ve hadis ağırlıklı, iki yıllık kapsamlı online program. Arapça ve destek dersleriyle bütüncül bir ilahiyat formasyonu sunar; sertifika ve kredili transkript ile tamamlanır.',
      chips: ['2 Yıl · 4 Dönem', 'Online Canlı Ders', 'Sertifika + Transkript'],
      link: '/program#hadis-merkezli',
    },
    specs: [
      { kind: 'İhtisas Programı', name: 'Hadis İlimleri', desc: 'Hadis usûlü, isnad-rical bilgisi ve şerh geleneğini bir arada sunan yoğunlaştırılmış program.', meta: '2 Dönem · Online/Kampüs', link: '/program#hadis-ilimleri' },
      { kind: 'İhtisas Programı', name: 'Tefsir İlimleri', desc: 'Tefsir usûlü, ulûmü’l-Kur’ân ve klasik tefsir okumalarıyla yorum geleneğine giriş.', meta: '2 Dönem · Online/Kampüs', link: '/program#tefsir-ilimleri' },
      { kind: 'İhtisas Programı', name: 'Meal Çalışmaları', desc: 'Meal tarihi, çeviri kuramı ve mukayeseli meal okumalarına odaklanan program.', meta: '1 Dönem · Online', link: '/program#meal-calismalari' },
    ],
    compareHead: ['Hadis Merkezli İslami İlimler', 'Hadis İlimleri', 'Tefsir İlimleri', 'Meal Çalışmaları'],
    compareRows: [
      { label: 'Tür', cells: ['Kapsamlı Program', 'İhtisas', 'İhtisas', 'İhtisas'] },
      { label: 'Süre', cells: ['2 yıl · 4 dönem', '2 dönem', '2 dönem', '1 dönem'] },
      { label: 'Format', cells: ['Online canlı ders', 'Online / Kampüs', 'Online / Kampüs', 'Online seminer'] },
      { label: 'Ön Koşul', cells: ['Yok', 'Yok', 'Temel Arapça tavsiye', 'Yok'] },
      { label: 'Belgelendirme', cells: ['Sertifika + Transkript', 'Sertifika + Proje', 'Sertifika', 'Sertifika + Ödev'] },
      { label: 'Ücret', cells: ['650–1.000 € / yıl', '300 € / dönem', '300 € / dönem', '250 € / dönem'] },
    ],
  },
  de: {
    ui: {
      back: 'Startseite', apply: 'Bewerben', applyLong: 'Zum Bewerbungsformular', eyebrow: 'Bildungsangebote', enrollment: 'Einschreibung geöffnet',
      title: 'Alle Bildungsprogramme',
      sub: 'Vergleichen Sie unser umfassendes Hauptprogramm und die fachspezifischen Zertifikatsprogramme.',
      mainLabel: 'Umfassendes Programm', specLabel: 'Fachprogramme', compareLabel: 'Vergleich',
      details: 'Mehr erfahren',
      ctaTitle: 'Unsicher, welches Programm zu Ihnen passt?', ctaSub: 'Füllen Sie das Bewerbungsformular aus — unser Team berät Sie und empfiehlt das passende Programm.',
    },
    main: {
      kind: 'Umfassendes Programm', name: 'Hadithzentrierte Islamische Wissenschaften',
      desc: 'Zweijähriges umfassendes Online-Programm mit Schwerpunkt auf Koranübersetzung, Tafsir und Hadith. Arabisch und ergänzende Fächer runden die theologische Bildung ab; Abschluss mit Zertifikat und Transkript.',
      chips: ['2 Jahre · 4 Semester', 'Online-Live-Unterricht', 'Zertifikat + Transkript'],
      link: '/program#hadis-merkezli',
    },
    specs: [
      { kind: 'Fachprogramm', name: 'Hadithwissenschaften', desc: 'Intensivprogramm zu Hadith-Methodik, Isnad-Rijal-Kunde und Kommentartradition.', meta: '2 Semester · Online/Campus', link: '/program#hadis-ilimleri' },
      { kind: 'Fachprogramm', name: 'Tafsir-Wissenschaften', desc: 'Einführung in die Auslegungstradition mit Tafsir-Methodik, Ulum al-Qur’an und klassischer Lektüre.', meta: '2 Semester · Online/Campus', link: '/program#tefsir-ilimleri' },
      { kind: 'Fachprogramm', name: 'Koranübersetzung (Meal)', desc: 'Programm zu Übersetzungsgeschichte, Übersetzungstheorie und vergleichender Meal-Lektüre.', meta: '1 Semester · Online', link: '/program#meal-calismalari' },
    ],
    compareHead: ['Hadithzentrierte Islamische Wissenschaften', 'Hadithwissenschaften', 'Tafsir-Wissenschaften', 'Koranübersetzung (Meal)'],
    compareRows: [
      { label: 'Art', cells: ['Umfassendes Programm', 'Fachprogramm', 'Fachprogramm', 'Fachprogramm'] },
      { label: 'Dauer', cells: ['2 Jahre · 4 Semester', '2 Semester', '2 Semester', '1 Semester'] },
      { label: 'Format', cells: ['Online-Live-Unterricht', 'Online / Campus', 'Online / Campus', 'Online-Seminar'] },
      { label: 'Voraussetzung', cells: ['Keine', 'Keine', 'Arabisch-Grundkenntnisse empfohlen', 'Keine'] },
      { label: 'Abschluss', cells: ['Zertifikat + Transkript', 'Zertifikat + Projekt', 'Zertifikat', 'Zertifikat + Arbeit'] },
      { label: 'Gebühr', cells: ['650–1.000 € / Jahr', '300 € / Semester', '300 € / Semester', '250 € / Semester'] },
    ],
  },
} as const;

// Program options offered on the application form
export const APPLICATION_PROGRAMS: Record<Lang, { name: string; meta: string }[]> = {
  tr: [
    { name: 'Hadis Merkezli İslami İlimler Programı', meta: 'Kapsamlı Program · 2 Yıl · Online' },
    { name: 'Hadis İlimleri', meta: 'İhtisas · 2 Dönem · Online/Kampüs' },
    { name: 'Tefsir İlimleri', meta: 'İhtisas · 2 Dönem · Online/Kampüs' },
    { name: 'Meal Çalışmaları', meta: 'İhtisas · 1 Dönem · Online' },
  ],
  de: [
    { name: 'Hadithzentrierte Islamische Wissenschaften', meta: 'Umfassendes Programm · 2 Jahre · Online' },
    { name: 'Hadithwissenschaften', meta: 'Fachprogramm · 2 Semester · Online/Campus' },
    { name: 'Tafsir-Wissenschaften', meta: 'Fachprogramm · 2 Semester · Online/Campus' },
    { name: 'Koranübersetzung (Meal)', meta: 'Fachprogramm · 1 Semester · Online' },
  ],
};
