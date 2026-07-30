import type { Lang } from '@/lib/i18n';

export const DAILY = [
  {
    hadithAr: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ',
    hadith: { tr: 'Ameller ancak niyetlere göredir.', de: 'Die Taten sind nur entsprechend den Absichten.', en: 'Actions are but by intentions.' },
    hadithSrc: 'Buhârî, Bed’ü’l-Vahy 1',
    ayahAr: 'يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ',
    ayah: { tr: 'Allah, sizden iman edenleri ve kendilerine ilim verilenleri derecelerle yükseltir.', de: 'Allah erhöht diejenigen von euch, die glauben, und diejenigen, denen Wissen gegeben wurde, um Rangstufen.', en: 'Allah will raise those who have believed among you and those who were given knowledge, by degrees.' },
    ayahSrc: 'Mücâdele, 58/11',
  },
  {
    hadithAr: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
    hadith: { tr: 'İlim tahsil etmek her Müslümana farzdır.', de: 'Das Streben nach Wissen ist jedem Muslim eine Pflicht.', en: 'Seeking knowledge is an obligation upon every Muslim.' },
    hadithSrc: 'İbn Mâce, Mukaddime 17',
    ayahAr: 'وَقُل رَّبِّ زِدْنِي عِلْمًا',
    ayah: { tr: 'De ki: Rabbim, ilmimi artır.', de: 'Und sag: Mein Herr, mehre mein Wissen.', en: 'And say: My Lord, increase me in knowledge.' },
    ayahSrc: 'Tâhâ, 20/114',
  },
  {
    hadithAr: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
    hadith: { tr: 'En hayırlınız, Kur’an’ı öğrenen ve öğretendir.', de: 'Der Beste unter euch ist, wer den Koran lernt und lehrt.', en: 'The best of you are those who learn the Qur’an and teach it.' },
    hadithSrc: 'Buhârî, Fezâilü’l-Kur’ân 21',
    ayahAr: 'قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ',
    ayah: { tr: 'De ki: Hiç bilenlerle bilmeyenler bir olur mu?', de: 'Sag: Sind etwa diejenigen, die wissen, und diejenigen, die nicht wissen, gleich?', en: 'Say: Are those who know equal to those who do not know?' },
    ayahSrc: 'Zümer, 39/9',
  },
];

export type DailyLang = 'tr' | 'de' | 'en' | 'ar';

export const DAILY_UI: Record<DailyLang, { hadith: string; ayah: string; continue: string }> = {
  tr: { hadith: 'Günün Hadisi', ayah: 'Günün Ayeti', continue: 'Siteye Devam Et' },
  de: { hadith: 'Hadith des Tages', ayah: 'Vers des Tages', continue: 'Weiter zur Seite' },
  en: { hadith: 'Hadith of the Day', ayah: 'Verse of the Day', continue: 'Continue to Site' },
  ar: { hadith: 'حديث اليوم', ayah: 'آية اليوم', continue: 'الدخول إلى الموقع' },
};

export const HOME_KADRO: Record<Lang, { groups: string[]; members: { name: string; role: string; bio: string }[][] }> = {
  tr: {
    groups: ['Danışma Kurulu', 'Bilim Kurulu'],
    members: [
      [
        { name: 'Prof. Dr. Ahmet Yılmaz', role: 'Danışma Kurulu Başkanı · Hadis', bio: 'Kütüb-i Sitte ricali ve isnad tarihi üzerine çalışmaları ile tanınır; 30 yılı aşkın akademik tecrübe.' },
        { name: 'Prof. Dr. Mahmut Kaya', role: 'Danışma Kurulu Üyesi · Tefsir', bio: 'Rivayet tefsiri geleneği ve meal metodolojisi alanında çok sayıda eser kaleme aldı.' },
        { name: 'Doç. Dr. Halil Demir', role: 'Danışma Kurulu Üyesi · İslam Hukuku', bio: 'Fıkhu’l-hadis ve ahkâm hadisleri üzerine uzmanlaşmış, uluslararası projelerde görev almıştır.' },
      ],
      [
        { name: 'Doç. Dr. Elif Arslan', role: 'Bilim Kurulu Başkanı · Hadis Usûlü', bio: 'Cerh-ta’dil literatürü ve muhaddis kadınlar üzerine araştırmalarıyla bilinir.' },
        { name: 'Dr. Yusuf Karaca', role: 'Bilim Kurulu Üyesi · Dijital Hadis', bio: 'Dijital hadis veritabanları ve isnad ağı analizleri üzerine çalışmaktadır.' },
        { name: 'Dr. Meryem Şahin', role: 'Bilim Kurulu Üyesi · Şerh Geleneği', bio: 'Buhârî şerhleri ve Osmanlı dönemi hadis eğitimi alanında uzman.' },
      ],
    ],
  },
  de: {
    groups: ['Beirat', 'Wissenschaftlicher Rat'],
    members: [
      [
        { name: 'Prof. Dr. Ahmet Yılmaz', role: 'Vorsitzender des Beirats · Hadith', bio: 'Bekannt für seine Arbeiten zu den Überlieferern der Kutub al-Sitta und zur Isnad-Geschichte; über 30 Jahre akademische Erfahrung.' },
        { name: 'Prof. Dr. Mahmut Kaya', role: 'Beiratsmitglied · Tafsir', bio: 'Verfasser zahlreicher Werke zur Überlieferungsexegese und zur Methodik der Koranübersetzung.' },
        { name: 'Doç. Dr. Halil Demir', role: 'Beiratsmitglied · Islamisches Recht', bio: 'Spezialisiert auf Fiqh al-Hadith und Ahkam-Hadithe; Mitwirkung an internationalen Projekten.' },
      ],
      [
        { name: 'Doç. Dr. Elif Arslan', role: 'Vorsitzende des Wissenschaftlichen Rats · Hadith-Methodik', bio: 'Bekannt für ihre Forschung zur Jarh-wa-Ta’dil-Literatur und zu Hadith-Gelehrtinnen.' },
        { name: 'Dr. Yusuf Karaca', role: 'Ratsmitglied · Digitale Hadithforschung', bio: 'Arbeitet zu digitalen Hadith-Datenbanken und Isnad-Netzwerkanalysen.' },
        { name: 'Dr. Meryem Şahin', role: 'Ratsmitglied · Kommentartradition', bio: 'Expertin für Buchari-Kommentare und die Hadith-Lehre der osmanischen Zeit.' },
      ],
    ],
  },
};

export const HOME_CONTENT = {
  tr: {
    nav: { program: 'Eğitimler', edu: 'Eğitimler', eduMain: 'Kapsamlı Program', eduSpec: 'İhtisas Programları', eduAll: 'Tüm Programları İncele', eduP1: 'Hadis Merkezli İslami İlimler', eduP2: 'Hadis İlimleri', eduP3: 'Tefsir İlimleri', eduP4: 'Meal Çalışmaları', inst: 'Enstitü', instAbout: 'Hakkımızda', kadro: 'Akademik Kadro', hadis: 'Sorularla Hadis', yayinlar: 'Yayınlar', projeler: 'Projeler', faaliyetler: 'Faaliyetler', contact: 'İletişim' },
    buttons: { apply: 'Başvur' },
    hero: {
      eyebrow: 'IHS · Institute for Hadith Sciences',
      title: 'Bilgi, Hikmete Dönüşür',
      sub: 'Hadis ilimlerinde isnad, rical ve şerh geleneğini çağdaş bir müfredatla buluşturan bir eğitim kurumu.',
      cta1: 'Online İlahiyat Programı', cta2: 'Bilgi Al',
    },
    mission: { label: 'Misyonumuz', text: '"En hayırlınız Kur’an’ı öğrenen ve öğretendir." hadisinden ilhamla; hadis ilimlerini sened, metin ve şerh bütünlüğünde, geleneğe sadık ve çağın ihtiyaçlarına duyarlı biçimde okutuyoruz.' },
    program: {
      label: 'Kapsamlı Program · Kayıt Açık', title: 'Hadis Merkezli İslami İlimler Programı',
      sub: 'Meal-tefsir ve hadis ağırlıklı, iki yıllık kapsamlı online program. Klasik kaynaklarla doğrudan temas eden, canlı derslerle yürütülen bir müfredat.',
      pillars: [
        { ar: 'تفسير', title: 'Meal ve Tefsir', desc: 'Kur’an’ın anlam dünyası; meal okumaları, rivayet ve dirayet tefsiri geleneği.' },
        { ar: 'حديث', title: 'Hadis İlimleri', desc: 'Hadis usûlü, Kütüb-i Sitte okumaları, isnad ve rical bilgisi — programın omurgası.' },
        { ar: 'علوم', title: 'Destek Dersleri', desc: 'Arapça, fıkıh usûlü, siyer ve akaid ile bütüncül bir ilahiyat formasyonu.' },
      ],
      cta: 'Başvuru ve Detaylı Bilgi', meta: '2 Yıl · Online Canlı Dersler · Türkçe/Almanca',
    },
    programs: {
      label: 'İhtisas Programları', title: 'Alanına Odaklanan Sertifika Programları',
      sub: 'Belirli ilim dallarında derinleşmek isteyenler için yoğunlaştırılmış ihtisas programları.',
      more: 'Detaylı Bilgi', all: 'Tüm Programları İncele',
      items: [
        { code: '01', name: 'Hadis İlimleri', desc: 'Hadis usûlü, isnad-rical bilgisi ve şerh geleneğini bir arada sunan program.', duration: '2 Dönem · Online/Kampüs', link: '/program#hadis-ilimleri' },
        { code: '02', name: 'Tefsir İlimleri', desc: 'Tefsir usûlü, ulûmü’l-Kur’ân ve klasik tefsir okumalarıyla yorum geleneğine giriş.', duration: '2 Dönem · Online/Kampüs', link: '/program#tefsir-ilimleri' },
        { code: '03', name: 'Meal Çalışmaları', desc: 'Meal tarihi, çeviri kuramı ve mukayeseli meal okumalarına odaklanan program.', duration: '1 Dönem · Online', link: '/program#meal-calismalari' },
      ],
    },
    kadro: {
      label: 'Akademik Kadro', title: 'Hocalarımız',
      sub: 'Danışma Kurulu ve Bilim Kurulu üyelerimiz; biyografileri, eserleri ve dersleriyle.',
      links: { bio: 'Biyografi', books: 'Kitaplar', articles: 'Makaleler', videos: 'Videolar', social: 'Sosyal Medya' },
    },
    qa: {
      label: 'Sorularla Hadis Köşesi', title: 'Merak Edilenler',
      sub: 'Hadis ilmine dair sık sorulan sorular, hocalarımızın kaleminden kısa cevaplarla.',
      all: 'Tüm Soruları Gör',
      items: [
        { q: 'Bir hadisin sahih olduğu nasıl anlaşılır?', a: 'Sahihlik; senedin kesintisiz olması, ravilerin adalet ve zabt sahibi olması, rivayetin şâz ve illetli olmaması gibi şartların birlikte incelenmesiyle tespit edilir. Muhaddisler bu şartları hem isnad hem metin üzerinde titizlikle uygular.' },
        { q: 'Kütüb-i Sitte nedir, neden önemlidir?', a: 'Kütüb-i Sitte; Buhârî, Müslim, Ebû Dâvûd, Tirmizî, Nesâî ve İbn Mâce’nin derlediği altı temel hadis kitabıdır. Ümmetin güvenilirliği konusunda büyük ölçüde ittifak ettiği bu külliyat, hadis eğitiminin çekirdeğini oluşturur.' },
        { q: 'Zayıf hadis ile amel edilir mi?', a: 'Âlimlerin çoğunluğu, fezâil-i a’mâl konusunda belirli şartlarla zayıf hadisle amel edilebileceğini söylemiştir: hadisin çok zayıf olmaması, sabit bir asla dayanması ve amel edilirken sünnet olduğuna kesin hükmedilmemesi.' },
        { q: 'İsnad sistemi İslam’a özgü müdür?', a: 'Rivayetleri kesintisiz bir nakil zinciriyle kaynağına bağlama ve her nakilciyi tek tek tenkide tabi tutma disiplini, bu kapsam ve süreklilikte İslam medeniyetine özgüdür; hadis ilminin en özgün katkılarından sayılır.' },
      ],
    },
    pubs: {
      label: 'Yayınlarımız', title: 'Görsel ve Yazılı Yayınlar',
      visualTitle: 'Görsel Yayınlar',
      visual: [
        { type: 'Video Serisi', title: 'Kırk Hadis Dersleri' },
        { type: 'Konferans Kaydı', title: 'İsnad Geleneği ve Güvenilir Bilgi' },
        { type: 'Podcast', title: 'Hadis Sohbetleri' },
      ],
      writtenTitle: 'Yazılı Yayınlar',
      written: [
        { type: 'Kitap', title: 'Hadis Usûlüne Giriş', desc: 'Enstitü ders kitabı olarak hazırlanan kapsamlı bir usûl metni.' },
        { type: 'Dergi', title: 'IHS Hadis Araştırmaları Dergisi', desc: 'Yılda iki kez yayımlanan hakemli akademik dergi.' },
        { type: 'Makale Serisi', title: 'Sorularla Hadis Risaleleri', desc: 'Güncel soruları klasik kaynaklar ışığında ele alan kısa metinler.' },
      ],
    },
    projects: {
      label: 'Projelerimiz', title: 'Devam Eden Çalışmalar',
      items: [
        { n: '01', title: 'Dijital İsnad Atlası', desc: 'Temel hadis kaynaklarındaki isnad ağlarını görselleştiren açık erişimli veritabanı projesi.', status: 'Devam Ediyor' },
        { n: '02', title: 'Almanca Hadis Külliyatı Çevirisi', desc: 'Kütüb-i Sitte seçkisinin ilmî notlarla Almancaya kazandırılması.', status: 'Devam Ediyor' },
        { n: '03', title: 'Genç Muhaddisler Bursu', desc: 'Hadis alanında lisansüstü çalışma yapan öğrencilere burs ve mentorluk desteği.', status: 'Başvuru Açık' },
      ],
    },
    activities: {
      label: 'Faaliyetlerimiz', title: 'Etkinlikler ve Duyurular',
      items: [
        { date: 'Eylül 2026', title: 'Yeni Dönem Kayıtları Başladı', desc: '2026-2027 Online İlahiyat ve sertifika programları için başvurular açıldı.' },
        { date: 'Ekim 2026', title: 'İcâzet Töreni', desc: 'Hadis Usûlü programını tamamlayan öğrencilerimize icazet takdim edildi.' },
        { date: 'Kasım 2026', title: 'Uluslararası Hadis Sempozyumu', desc: 'Alanında uzman akademisyenlerin katılımıyla iki günlük sempozyum.' },
      ],
    },
    donate: { label: 'Destek Olun', title: 'İslami İlimlerin Yaşatılmasına Katkıda Bulunun', sub: 'Bağışlarınız, burslar ve akademik faaliyetler yoluyla öğrencilerimize doğrudan ulaşır.', cta: 'Bağış Yap' },
    contact: {
      label: 'İletişim', title: 'Bize Ulaşın', sub: 'Sorularınız için formu doldurun, ekibimiz en kısa sürede dönüş yapsın.',
      fields: { name: 'Ad Soyad', email: 'E-posta', message: 'Mesajınız', submit: 'Gönder' },
      sent: 'Mesajınız alındı. En kısa sürede dönüş yapacağız.',
      info: { address: 'Adres', phone: 'Telefon', email: 'E-posta' },
    },
    footer: { tagline: 'Bilgi, hikmete dönüşür.', rights: 'Tüm hakları saklıdır.', certs: 'Sertifika Programları', explore: 'Keşfet' },
  },
  de: {
    nav: { program: 'Bildungsangebote', edu: 'Bildungsangebote', eduMain: 'Umfassendes Programm', eduSpec: 'Fachprogramme', eduAll: 'Alle Programme ansehen', eduP1: 'Hadithzentrierte Islamische Wissenschaften', eduP2: 'Hadithwissenschaften', eduP3: 'Tafsir-Wissenschaften', eduP4: 'Koranübersetzung (Meal)', inst: 'Institut', instAbout: 'Über uns', kadro: 'Akademisches Kollegium', hadis: 'Hadith in Fragen', yayinlar: 'Publikationen', projeler: 'Projekte', faaliyetler: 'Aktivitäten', contact: 'Kontakt' },
    buttons: { apply: 'Bewerben' },
    hero: {
      eyebrow: 'IHS · Institute for Hadith Sciences',
      title: 'Wissen wird zu Weisheit',
      sub: 'Eine Bildungseinrichtung, die die Tradition von Isnad, Rijal und Kommentar mit einem zeitgemäßen Lehrplan verbindet.',
      cta1: 'Online-Theologie-Programm', cta2: 'Info anfordern',
    },
    mission: { label: 'Unsere Mission', text: 'Inspiriert vom Hadith „Der Beste unter euch ist, wer den Koran lernt und lehrt" vermitteln wir die Hadithwissenschaften in ihrer Einheit aus Isnad, Text und Kommentar – der Tradition treu und den Anforderungen der Zeit bewusst.' },
    program: {
      label: 'Umfassendes Programm · Einschreibung geöffnet', title: 'Hadithzentrierte Islamische Wissenschaften',
      sub: 'Zweijähriges umfassendes Online-Programm mit Schwerpunkt auf Koranübersetzung, Tafsir und Hadith. Ein Lehrplan mit direktem Zugang zu klassischen Quellen, getragen von Live-Unterricht.',
      pillars: [
        { ar: 'تفسير', title: 'Übersetzung und Tafsir', desc: 'Die Bedeutungswelt des Korans; Übersetzungslektüre, Überlieferungs- und Meinungsexegese.' },
        { ar: 'حديث', title: 'Hadithwissenschaften', desc: 'Hadith-Methodik, Lektüre der Kutub al-Sitta, Isnad- und Rijal-Kunde — das Rückgrat des Programms.' },
        { ar: 'علوم', title: 'Ergänzende Fächer', desc: 'Arabisch, Usul al-Fiqh, Sira und Aqida für eine ganzheitliche theologische Bildung.' },
      ],
      cta: 'Bewerbung und Details', meta: '2 Jahre · Online-Live-Unterricht · Türkisch/Deutsch',
    },
    programs: {
      label: 'Fachprogramme', title: 'Fachspezifische Zertifikatsprogramme',
      sub: 'Intensive Fachprogramme für alle, die sich in einzelnen Disziplinen vertiefen möchten.',
      more: 'Mehr erfahren', all: 'Alle Programme ansehen',
      items: [
        { code: '01', name: 'Hadithwissenschaften', desc: 'Programm zu Hadith-Methodik, Isnad-Rijal-Kunde und Kommentartradition.', duration: '2 Semester · Online/Campus', link: '/program#hadis-ilimleri' },
        { code: '02', name: 'Tafsir-Wissenschaften', desc: 'Einführung in die Auslegungstradition mit Tafsir-Methodik und klassischer Lektüre.', duration: '2 Semester · Online/Campus', link: '/program#tefsir-ilimleri' },
        { code: '03', name: 'Koranübersetzung (Meal)', desc: 'Programm zu Übersetzungsgeschichte, Übersetzungstheorie und vergleichender Meal-Lektüre.', duration: '1 Semester · Online', link: '/program#meal-calismalari' },
      ],
    },
    kadro: {
      label: 'Akademisches Kollegium', title: 'Unsere Lehrenden',
      sub: 'Mitglieder des Beirats und des Wissenschaftlichen Rats — mit Biografien, Werken und Vorlesungen.',
      links: { bio: 'Biografie', books: 'Bücher', articles: 'Artikel', videos: 'Videos', social: 'Soziale Medien' },
    },
    qa: {
      label: 'Hadith in Fragen', title: 'Häufig gestellte Fragen',
      sub: 'Kurze Antworten unserer Lehrenden auf häufige Fragen zur Hadithwissenschaft.',
      all: 'Alle Fragen ansehen',
      items: [
        { q: 'Woran erkennt man, dass ein Hadith authentisch (sahih) ist?', a: 'Authentizität wird durch die gemeinsame Prüfung mehrerer Bedingungen festgestellt: eine ununterbrochene Überliefererkette, Rechtschaffenheit und Genauigkeit der Überlieferer sowie das Fehlen von Anomalien und verborgenen Mängeln — angewandt auf Isnad und Text.' },
        { q: 'Was sind die Kutub al-Sitta und warum sind sie wichtig?', a: 'Die Kutub al-Sitta sind die sechs grundlegenden Hadith-Sammlungen von Buchari, Muslim, Abu Dawud, Tirmidhi, Nasa’i und Ibn Majah. Über ihre Zuverlässigkeit besteht weitgehender Konsens; sie bilden den Kern der Hadith-Ausbildung.' },
        { q: 'Darf man nach einem schwachen Hadith handeln?', a: 'Die Mehrheit der Gelehrten erlaubt das Handeln nach schwachen Hadithen im Bereich der empfohlenen Werke unter Bedingungen: Der Hadith darf nicht sehr schwach sein, muss auf einer gesicherten Grundlage beruhen, und man darf ihn nicht mit Gewissheit dem Propheten zuschreiben.' },
        { q: 'Ist das Isnad-System einzigartig im Islam?', a: 'Die Disziplin, Überlieferungen durch eine lückenlose Kette an ihre Quelle zu binden und jeden Überlieferer einzeln zu prüfen, ist in diesem Umfang und dieser Kontinuität der islamischen Zivilisation eigen — einer der originellsten Beiträge der Hadithwissenschaft.' },
      ],
    },
    pubs: {
      label: 'Publikationen', title: 'Visuelle und schriftliche Publikationen',
      visualTitle: 'Visuelle Publikationen',
      visual: [
        { type: 'Videoserie', title: 'Vierzig-Hadithe-Lektionen' },
        { type: 'Konferenzaufzeichnung', title: 'Isnad-Tradition und verlässliches Wissen' },
        { type: 'Podcast', title: 'Hadith-Gespräche' },
      ],
      writtenTitle: 'Schriftliche Publikationen',
      written: [
        { type: 'Buch', title: 'Einführung in die Hadith-Methodik', desc: 'Ein umfassendes Lehrwerk, erstellt als Kurstext des Instituts.' },
        { type: 'Zeitschrift', title: 'IHS Zeitschrift für Hadithforschung', desc: 'Halbjährlich erscheinende begutachtete akademische Zeitschrift.' },
        { type: 'Artikelserie', title: 'Hadith in Fragen — Abhandlungen', desc: 'Kurze Texte zu aktuellen Fragen im Licht klassischer Quellen.' },
      ],
    },
    projects: {
      label: 'Unsere Projekte', title: 'Laufende Arbeiten',
      items: [
        { n: '01', title: 'Digitaler Isnad-Atlas', desc: 'Open-Access-Datenbankprojekt zur Visualisierung der Isnad-Netzwerke in den Hadith-Grundquellen.', status: 'Laufend' },
        { n: '02', title: 'Deutsche Übersetzung der Hadith-Sammlung', desc: 'Übertragung einer Auswahl aus den Kutub al-Sitta mit wissenschaftlichen Anmerkungen ins Deutsche.', status: 'Laufend' },
        { n: '03', title: 'Stipendium für junge Hadith-Forschende', desc: 'Stipendien und Mentoring für Studierende mit Graduiertenarbeiten im Hadith-Bereich.', status: 'Bewerbung offen' },
      ],
    },
    activities: {
      label: 'Unsere Aktivitäten', title: 'Veranstaltungen und Ankündigungen',
      items: [
        { date: 'September 2026', title: 'Einschreibung für das neue Semester', desc: 'Bewerbungen für Online-Theologie und Zertifikatsprogramme 2026/2027 sind eröffnet.' },
        { date: 'Oktober 2026', title: 'Ijaza-Zeremonie', desc: 'Ijaza-Verleihung an die Absolventen des Programms Hadith-Methodik.' },
        { date: 'November 2026', title: 'Internationales Hadith-Symposium', desc: 'Zweitägiges Symposium mit renommierten Wissenschaftlern.' },
      ],
    },
    donate: { label: 'Unterstützen Sie uns', title: 'Tragen Sie zur Bewahrung der islamischen Wissenschaften bei', sub: 'Ihre Spenden erreichen unsere Studierenden direkt – durch Stipendien und akademische Programme.', cta: 'Jetzt spenden' },
    contact: {
      label: 'Kontakt', title: 'Kontaktieren Sie uns', sub: 'Füllen Sie das Formular aus – unser Team meldet sich zeitnah bei Ihnen.',
      fields: { name: 'Name', email: 'E-Mail', message: 'Ihre Nachricht', submit: 'Senden' },
      sent: 'Ihre Nachricht ist eingegangen. Wir melden uns zeitnah.',
      info: { address: 'Adresse', phone: 'Telefon', email: 'E-Mail' },
    },
    footer: { tagline: 'Wissen wird zu Weisheit.', rights: 'Alle Rechte vorbehalten.', certs: 'Zertifikatsprogramme', explore: 'Entdecken' },
  },
} as const;
