export const ENSTITU_UI = {
  tr: { back: 'Ana Sayfa', apply: 'Başvur', applyLong: 'Başvuru Formu', eyebrow: 'Enstitü', ctaTitle: 'Yeni dönem kayıtları devam ediyor.' },
  de: { back: 'Startseite', apply: 'Bewerben', applyLong: 'Zum Bewerbungsformular', eyebrow: 'Institut', ctaTitle: 'Die Einschreibung für das neue Semester läuft.' },
} as const;

export const ENSTITU = {
  tr: {
    tabs: [
      { id: 'hakkimizda', label: 'Hakkımızda', title: 'Hakkımızda', sub: 'Institute for Hadith Sciences — kimliğimiz, değerlerimiz ve hedeflerimiz.' },
      { id: 'projeler', label: 'Projeler', title: 'Projelerimiz', sub: 'Hadis ilimlerine hizmet eden akademik ve dijital çalışmalarımız.' },
      { id: 'faaliyetler', label: 'Faaliyetler', title: 'Faaliyetlerimiz', sub: 'Etkinlikler, duyurular ve enstitüden gelişmeler.' },
    ],
    about: {
      whoLabel: 'Biz Kimiz', whoTitle: 'Institute for Hadith Sciences',
      who1: 'IHS; hadis ve sünnet mirasını ilmî yöntemle geleceğe taşımak amacıyla kurulmuş bağımsız bir eğitim ve araştırma kurumudur. Meal-tefsir ve hadis ağırlıklı programlarıyla, klasik kaynaklarla doğrudan temas eden bir eğitim sunar.',
      who2: 'Enstitümüz; icazet geleneğini yaşatan ders halkaları, uluslararası akademik iş birlikleri ve dijital araştırma projeleriyle geleneksel birikimi çağdaş imkânlarla buluşturur. Dersler Türkçe ve Almanca yürütülür; öğrencilerimiz dünyanın farklı ülkelerinden katılır.',
      values: [
        { ar: 'سند', title: 'İsnad ve Emanet', desc: 'Bilgiyi kaynağına bağlayan kesintisiz zincire sadakat.' },
        { ar: 'علم', title: 'İlmî Titizlik', desc: 'Klasik usûl ile çağdaş akademik standartların birlikteliği.' },
        { ar: 'أدب', title: 'Edep ve İhlas', desc: 'İlmi, ahlak ve samimiyetle taşıyan bir eğitim iklimi.' },
        { ar: 'أمة', title: 'Topluma Hizmet', desc: 'Üretilen bilginin ümmete ve insanlığa açık olması.' },
      ],
      presLabel: 'Kurucu Başkandan',
      presQuote: '"Hadis ilmi, Efendimiz’in (s.a.v) mirasını nesilden nesile emanet eden bir zincirdir. IHS’de bu emaneti, hem senedine hem de zamanın ihtiyaçlarına sadık kalarak taşımayı hedefliyoruz."',
      presName: 'Kurucu Başkan', presRole: 'Institute for Hadith Sciences',
      missionTitle: 'Misyonumuz',
      missionText: '"En hayırlınız Kur’an’ı öğrenen ve öğretendir." hadisinden ilhamla; hadis ilimlerini sened, metin ve şerh bütünlüğünde, geleneğe sadık ve çağın ihtiyaçlarına duyarlı biçimde okutmak.',
      visionTitle: 'Vizyonumuz',
      visionText: 'Avrupa merkezli, uluslararası alanda tanınan; hadis ilimlerinde referans kabul edilen bir eğitim ve araştırma kurumu olmak.',
    },
    projects: {
      items: [
        { n: '01', title: 'Dijital İsnad Atlası', desc: 'Temel hadis kaynaklarındaki isnad ağlarını görselleştiren açık erişimli veritabanı projesi. Rical bilgileri, tabaka haritaları ve etkileşimli isnad şemalarıyla araştırmacılara açık bir kaynak sunuyor.', status: 'Devam Ediyor', date: '2024 —' },
        { n: '02', title: 'Almanca Hadis Külliyatı Çevirisi', desc: 'Kütüb-i Sitte seçkisinin ilmî notlarla Almancaya kazandırılması. Avrupa’da yaşayan Müslümanların temel hadis metinlerine kendi dillerinde, güvenilir çeviriden ulaşması hedefleniyor.', status: 'Devam Ediyor', date: '2025 —' },
        { n: '03', title: 'Genç Muhaddisler Bursu', desc: 'Hadis alanında lisansüstü çalışma yapan öğrencilere burs ve mentorluk desteği. Bursiyerler enstitü hocalarıyla birebir çalışma imkânı buluyor.', status: 'Başvuru Açık', date: '2026' },
      ],
    },
    activities: {
      items: [
        { date: 'Eylül 2026', title: 'Yeni Dönem Kayıtları Başladı', desc: '2026-2027 eğitim yılı programları için başvurular açıldı.' },
        { date: 'Ekim 2026', title: 'İcâzet Töreni', desc: 'Hadis İlimleri programını tamamlayan öğrencilerimize icazet takdim edildi.' },
        { date: 'Kasım 2026', title: 'Uluslararası Hadis Sempozyumu', desc: 'Alanında uzman akademisyenlerin katılımıyla iki günlük sempozyum.' },
        { date: 'Aralık 2026', title: 'Kırk Hadis Sohbetleri', desc: 'Her ay bir hadisin şerh geleneği ışığında konuşulduğu açık sohbet serisi.' },
        { date: 'Ocak 2027', title: 'Kış Okuma Kampı', desc: 'Yoğunlaştırılmış klasik metin okumaları ve atölyelerle bir haftalık kamp.' },
        { date: 'Şubat 2027', title: 'Açık Kapı Günü', desc: 'Programlarımızı ve kampüsümüzü tanımak isteyenler için tanışma günü.' },
      ],
    },
  },
  de: {
    tabs: [
      { id: 'hakkimizda', label: 'Über uns', title: 'Über uns', sub: 'Institute for Hadith Sciences — unsere Identität, Werte und Ziele.' },
      { id: 'projeler', label: 'Projekte', title: 'Unsere Projekte', sub: 'Akademische und digitale Arbeiten im Dienst der Hadithwissenschaften.' },
      { id: 'faaliyetler', label: 'Aktivitäten', title: 'Unsere Aktivitäten', sub: 'Veranstaltungen, Ankündigungen und Neuigkeiten aus dem Institut.' },
    ],
    about: {
      whoLabel: 'Wer wir sind', whoTitle: 'Institute for Hadith Sciences',
      who1: 'Das IHS ist eine unabhängige Bildungs- und Forschungseinrichtung, gegründet, um das Erbe von Hadith und Sunna mit wissenschaftlicher Methode in die Zukunft zu tragen. Mit Programmen mit Schwerpunkt auf Koranübersetzung, Tafsir und Hadith bietet es eine Ausbildung mit direktem Zugang zu klassischen Quellen.',
      who2: 'Unser Institut verbindet traditionelles Wissen mit zeitgemäßen Mitteln — durch Lehrkreise in der Ijaza-Tradition, internationale akademische Kooperationen und digitale Forschungsprojekte. Unterrichtet wird auf Türkisch und Deutsch; unsere Studierenden kommen aus vielen Ländern.',
      values: [
        { ar: 'سند', title: 'Isnad und Anvertrauen', desc: 'Treue zur ununterbrochenen Kette, die Wissen an seine Quelle bindet.' },
        { ar: 'علم', title: 'Wissenschaftliche Sorgfalt', desc: 'Klassische Methodik im Einklang mit modernen akademischen Standards.' },
        { ar: 'أدب', title: 'Adab und Aufrichtigkeit', desc: 'Ein Lernklima, das Wissen mit Ethik und Ernsthaftigkeit trägt.' },
        { ar: 'أمة', title: 'Dienst an der Gemeinschaft', desc: 'Erarbeitetes Wissen steht der Umma und der Menschheit offen.' },
      ],
      presLabel: 'Vom Gründungsvorsitzenden',
      presQuote: '„Die Hadithwissenschaft ist eine Kette, die das Erbe des Propheten (s.a.v.) von Generation zu Generation weiterträgt. Am IHS wollen wir dieses Erbe treu gegenüber Isnad und Zeit bewahren."',
      presName: 'Gründungsvorsitzender', presRole: 'Institute for Hadith Sciences',
      missionTitle: 'Unsere Mission',
      missionText: 'Inspiriert vom Hadith „Der Beste unter euch ist, wer den Koran lernt und lehrt": die Hadithwissenschaften in der Einheit von Isnad, Text und Kommentar zu lehren — der Tradition treu, den Anforderungen der Zeit bewusst.',
      visionTitle: 'Unsere Vision',
      visionText: 'Eine in Europa verwurzelte, international anerkannte Bildungs- und Forschungseinrichtung zu sein, die in den Hadithwissenschaften als Referenz gilt.',
    },
    projects: {
      items: [
        { n: '01', title: 'Digitaler Isnad-Atlas', desc: 'Open-Access-Datenbankprojekt zur Visualisierung der Isnad-Netzwerke in den Hadith-Grundquellen. Mit Rijal-Daten, Tabaqa-Karten und interaktiven Isnad-Diagrammen als offene Ressource für Forschende.', status: 'Laufend', date: '2024 —' },
        { n: '02', title: 'Deutsche Übersetzung der Hadith-Sammlung', desc: 'Übertragung einer Auswahl aus den Kutub al-Sitta mit wissenschaftlichen Anmerkungen ins Deutsche — damit Muslime in Europa die grundlegenden Hadith-Texte in verlässlicher Übersetzung in ihrer Sprache lesen können.', status: 'Laufend', date: '2025 —' },
        { n: '03', title: 'Stipendium für junge Hadith-Forschende', desc: 'Stipendien und Mentoring für Studierende mit Graduiertenarbeiten im Hadith-Bereich. Stipendiaten arbeiten eng mit den Lehrenden des Instituts zusammen.', status: 'Bewerbung offen', date: '2026' },
      ],
    },
    activities: {
      items: [
        { date: 'September 2026', title: 'Einschreibung für das neue Semester', desc: 'Bewerbungen für das Studienjahr 2026/2027 sind eröffnet.' },
        { date: 'Oktober 2026', title: 'Ijaza-Zeremonie', desc: 'Ijaza-Verleihung an die Absolventen des Programms Hadithwissenschaften.' },
        { date: 'November 2026', title: 'Internationales Hadith-Symposium', desc: 'Zweitägiges Symposium mit renommierten Wissenschaftlern.' },
        { date: 'Dezember 2026', title: 'Vierzig-Hadithe-Gespräche', desc: 'Offene Gesprächsreihe: jeden Monat ein Hadith im Licht der Kommentartradition.' },
        { date: 'Januar 2027', title: 'Winter-Lesecamp', desc: 'Eine Woche intensiver klassischer Textlektüre und Werkstätten.' },
        { date: 'Februar 2027', title: 'Tag der offenen Tür', desc: 'Kennenlerntag für alle, die unsere Programme und den Campus entdecken möchten.' },
      ],
    },
  },
} as const;
