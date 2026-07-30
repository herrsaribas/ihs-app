import type { Lang } from '@/lib/i18n';

export const SORU_UI = {
  tr: {
    back: 'Ana Sayfa', apply: 'Başvur', eyebrow: 'Sorularla Hadis Köşesi',
    title: 'Merak Ettiğiniz Her Şey',
    sub: 'Hadis ilmine dair sık sorulan sorular; hocalarımızın kaleminden kısa, kaynaklı ve anlaşılır cevaplarla.',
    searchPh: 'Soru arayın... (ör. sahih, isnad, meal)',
    sourceLabel: 'Hazırlayan', allCat: 'Tümü',
    results: 'soru gösteriliyor', noResults: 'Aramanızla eşleşen soru bulunamadı — sorunuzu aşağıdan bize iletebilirsiniz.',
    askLabel: 'Soru Sor', askTitle: 'Cevabını Bulamadınız mı?',
    askSub: 'Sorunuzu gönderin; hocalarımız incelesin, cevabı bu köşede yayımlansın ve size e-posta ile iletilsin.',
    askName: 'Ad Soyad', askEmail: 'E-posta', askQuestion: 'Sorunuz...', askSubmit: 'Soruyu Gönder',
    askDone: 'Sorunuz alındı. Hocalarımız inceledikten sonra cevap e-posta adresinize iletilecek ve uygun görülürse bu köşede yayımlanacaktır.',
  },
  de: {
    back: 'Startseite', apply: 'Bewerben', eyebrow: 'Hadith in Fragen',
    title: 'Alles, was Sie wissen möchten',
    sub: 'Häufige Fragen zur Hadithwissenschaft — mit kurzen, belegten und verständlichen Antworten unserer Lehrenden.',
    searchPh: 'Frage suchen... (z. B. Sahih, Isnad, Übersetzung)',
    sourceLabel: 'Verfasst von', allCat: 'Alle',
    results: 'Fragen angezeigt', noResults: 'Keine passende Frage gefunden — senden Sie uns Ihre Frage unten.',
    askLabel: 'Frage stellen', askTitle: 'Antwort nicht gefunden?',
    askSub: 'Senden Sie Ihre Frage; unsere Lehrenden prüfen sie, die Antwort erscheint in dieser Rubrik und wird Ihnen per E-Mail zugesandt.',
    askName: 'Name', askEmail: 'E-Mail', askQuestion: 'Ihre Frage...', askSubmit: 'Frage senden',
    askDone: 'Ihre Frage ist eingegangen. Nach Prüfung durch unsere Lehrenden erhalten Sie die Antwort per E-Mail; gegebenenfalls wird sie in dieser Rubrik veröffentlicht.',
  },
} as const;

export interface QAEntry { cat: string; q: string; a: string; src: string }

export const QA_DEFAULT: Record<Lang, QAEntry[]> = {
  tr: [
    { cat: 'Usûl', q: 'Bir hadisin sahih olduğu nasıl anlaşılır?', a: 'Sahihlik; senedin kesintisiz olması, ravilerin adalet ve zabt sahibi olması, rivayetin şâz ve illetli olmaması şartlarının birlikte incelenmesiyle tespit edilir. Muhaddisler bu şartları hem isnad hem metin üzerinde titizlikle uygular; tek bir şartın eksikliği hadisin derecesini değiştirir.', src: 'IHS Hadis Usûlü Kürsüsü' },
    { cat: 'Usûl', q: 'Mütevâtir hadis ne demektir?', a: 'Mütevâtir; her tabakada, yalan üzerinde birleşmeleri aklen mümkün olmayan sayıda ravinin naklettiği hadistir. Kesin bilgi ifade eder ve inkârı ilim ehlince ağır bir hata sayılır. Lafzen ve manen mütevâtir olmak üzere ikiye ayrılır.', src: 'IHS Hadis Usûlü Kürsüsü' },
    { cat: 'Kavramlar', q: 'Hadis ile sünnet arasındaki fark nedir?', a: 'Sünnet; Efendimiz’in (s.a.v) söz, fiil ve takrirlerinden oluşan yaşayan örnekliğidir. Hadis ise bu örnekliğin söze dökülmüş ve nakledilmiş halidir. Her hadis sünnetin bir taşıyıcısıdır; ancak sünnet, hadis metinlerinin toplamından daha geniş bir yaşam pratiğini ifade eder.', src: 'IHS Hadis Kürsüsü' },
    { cat: 'Kavramlar', q: 'Kudsî hadis nedir, Kur’an’dan farkı nedir?', a: 'Kudsî hadis; manası Allah’a, lafzı Efendimiz’e (s.a.v) ait olan rivayetlerdir. Kur’an gibi mucize değildir, namazda okunmaz ve tilavetiyle ibadet edilmez. Kur’an ise hem lafzı hem manasıyla Allah kelamıdır ve tevatüren nakledilmiştir.', src: 'IHS Hadis Kürsüsü' },
    { cat: 'Kaynaklar', q: 'Kütüb-i Sitte nedir, neden önemlidir?', a: 'Kütüb-i Sitte; Buhârî, Müslim, Ebû Dâvûd, Tirmizî, Nesâî ve İbn Mâce’nin derlediği altı temel hadis kitabıdır. Ümmetin güvenilirliği konusunda büyük ölçüde ittifak ettiği bu külliyat, hadis eğitiminin çekirdeğini oluşturur.', src: 'IHS Hadis Kürsüsü' },
    { cat: 'Kaynaklar', q: 'Buhârî ve Müslim’in özel yeri nereden gelir?', a: 'Sahîhayn diye anılan bu iki eser, yalnızca sahih hadisleri toplamayı amaç edinen ilk kapsamlı derlemelerdir. Şartlarının sıkılığı ve ravi seçimindeki titizlikleri sebebiyle ümmet bu iki kitabın sıhhatini kabulde icma derecesinde birleşmiştir.', src: 'IHS Hadis Kürsüsü' },
    { cat: 'İsnad ve Tenkit', q: 'İsnad sistemi İslam’a özgü müdür?', a: 'Rivayetleri kesintisiz bir nakil zinciriyle kaynağına bağlama ve her nakilciyi tek tek tenkide tabi tutma disiplini, bu kapsam ve süreklilikte İslam medeniyetine özgüdür; hadis ilminin en özgün katkılarından sayılır.', src: 'IHS İsnad ve Rical Kürsüsü' },
    { cat: 'İsnad ve Tenkit', q: 'Uydurma (mevzû) hadisler nasıl tespit edilir?', a: 'Mevzû rivayetler; ravisinin yalancılıkla bilinmesi, isnadının düzmece olması, metninin Kur’an’a, mütevâtir sünnete veya akl-ı selime açıkça aykırı düşmesi gibi karinelerle tespit edilir. Âlimler bu rivayetleri toplayan özel mevzûat literatürü geliştirmiştir.', src: 'IHS İsnad ve Rical Kürsüsü' },
    { cat: 'Amel', q: 'Zayıf hadis ile amel edilir mi?', a: 'Âlimlerin çoğunluğu, fezâil-i a’mâl konusunda belirli şartlarla zayıf hadisle amel edilebileceğini söylemiştir: hadisin çok zayıf olmaması, sabit bir asla dayanması ve amel edilirken sünnet olduğuna kesin hükmedilmemesi.', src: 'IHS Fıkhu’l-Hadis Kürsüsü' },
    { cat: 'Pratik', q: 'İnternette gördüğüm bir hadisin kaynağını nasıl doğrularım?', a: 'Önce rivayetin Arapça aslını ve kaynağını (kitap, bâb, hadis numarası) arayın; güvenilir hadis veritabanlarında metni tarayın. Kaynak verilmeyen, duygusal paylaşımlarla yayılan metinlere ihtiyatla yaklaşın. Emin olamadığınızda bu köşeden bize sorabilirsiniz.', src: 'IHS Dijital Hadis Kürsüsü' },
  ],
  de: [
    { cat: 'Methodik', q: 'Woran erkennt man, dass ein Hadith authentisch (sahih) ist?', a: 'Authentizität wird durch die gemeinsame Prüfung mehrerer Bedingungen festgestellt: eine ununterbrochene Überliefererkette, Rechtschaffenheit und Genauigkeit der Überlieferer sowie das Fehlen von Anomalien und verborgenen Mängeln — angewandt auf Isnad und Text. Fehlt eine Bedingung, ändert sich die Einstufung.', src: 'IHS Lehrstuhl für Hadith-Methodik' },
    { cat: 'Methodik', q: 'Was bedeutet mutawatir?', a: 'Mutawatir ist ein Hadith, den in jeder Generation so viele Überlieferer tradieren, dass eine Verabredung zur Lüge vernünftigerweise ausgeschlossen ist. Er vermittelt gesichertes Wissen. Man unterscheidet wörtliche und sinngemäße Tawatur-Überlieferung.', src: 'IHS Lehrstuhl für Hadith-Methodik' },
    { cat: 'Begriffe', q: 'Was ist der Unterschied zwischen Hadith und Sunna?', a: 'Die Sunna ist das gelebte Vorbild des Propheten (s.a.v.) aus Worten, Taten und Billigungen. Der Hadith ist die sprachlich gefasste und überlieferte Form dieses Vorbilds. Jeder Hadith trägt die Sunna weiter; die Sunna ist jedoch eine umfassendere Lebenspraxis als die Summe der Texte.', src: 'IHS Lehrstuhl für Hadith' },
    { cat: 'Begriffe', q: 'Was ist ein Hadith Qudsi — und worin unterscheidet er sich vom Koran?', a: 'Beim Hadith Qudsi stammt der Sinn von Allah, der Wortlaut vom Propheten (s.a.v.). Er ist kein Wunder wie der Koran, wird nicht im Gebet rezitiert und seine Rezitation ist kein eigener Gottesdienst. Der Koran ist nach Wortlaut und Sinn Allahs Rede und mutawatir überliefert.', src: 'IHS Lehrstuhl für Hadith' },
    { cat: 'Quellen', q: 'Was sind die Kutub al-Sitta und warum sind sie wichtig?', a: 'Die Kutub al-Sitta sind die sechs grundlegenden Hadith-Sammlungen von Buchari, Muslim, Abu Dawud, Tirmidhi, Nasa’i und Ibn Majah. Über ihre Zuverlässigkeit besteht weitgehender Konsens; sie bilden den Kern der Hadith-Ausbildung.', src: 'IHS Lehrstuhl für Hadith' },
    { cat: 'Quellen', q: 'Woher kommt die besondere Stellung von Buchari und Muslim?', a: 'Die als Sahihayn bekannten Werke sind die ersten umfassenden Sammlungen, die ausschließlich authentische Hadithe aufnehmen wollten. Wegen ihrer strengen Kriterien und sorgfältigen Überliefererauswahl herrscht über ihre Zuverlässigkeit nahezu Konsens.', src: 'IHS Lehrstuhl für Hadith' },
    { cat: 'Isnad und Kritik', q: 'Ist das Isnad-System einzigartig im Islam?', a: 'Die Disziplin, Überlieferungen durch eine lückenlose Kette an ihre Quelle zu binden und jeden Überlieferer einzeln zu prüfen, ist in diesem Umfang und dieser Kontinuität der islamischen Zivilisation eigen — einer der originellsten Beiträge der Hadithwissenschaft.', src: 'IHS Lehrstuhl für Isnad und Rijal' },
    { cat: 'Isnad und Kritik', q: 'Wie werden erfundene (mawdu) Hadithe erkannt?', a: 'Erfundene Überlieferungen erkennt man an Indizien wie einem als Lügner bekannten Überlieferer, einer gefälschten Kette oder einem Text, der Koran, mutawatir Sunna oder gesundem Verstand offenkundig widerspricht. Die Gelehrten entwickelten eine eigene Mawduat-Literatur.', src: 'IHS Lehrstuhl für Isnad und Rijal' },
    { cat: 'Praxis der Religion', q: 'Darf man nach einem schwachen Hadith handeln?', a: 'Die Mehrheit der Gelehrten erlaubt das Handeln nach schwachen Hadithen im Bereich der empfohlenen Werke unter Bedingungen: Der Hadith darf nicht sehr schwach sein, muss auf einer gesicherten Grundlage beruhen, und man darf ihn nicht mit Gewissheit dem Propheten zuschreiben.', src: 'IHS Lehrstuhl für Fiqh al-Hadith' },
    { cat: 'Alltag', q: 'Wie überprüfe ich die Quelle eines Hadith aus dem Internet?', a: 'Suchen Sie zuerst das arabische Original und die Quellenangabe (Werk, Kapitel, Nummer); durchsuchen Sie verlässliche Hadith-Datenbanken. Texten ohne Quellenangabe, die emotional geteilt werden, sollte man mit Vorsicht begegnen. Im Zweifel fragen Sie uns über diese Rubrik.', src: 'IHS Lehrstuhl für Digitale Hadithforschung' },
  ],
};
