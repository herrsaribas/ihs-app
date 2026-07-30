import type { Lang } from '@/lib/i18n';

export const KADRO_UI: Record<Lang, Record<string, string>> = {
  tr: {
    back: 'Ana Sayfa', apply: 'Başvur', applyLong: 'Başvuru Formu', eyebrow: 'Akademik Kadro',
    title: 'Hocalarımız',
    sub: 'Danışma Kurulu ve Bilim Kurulu üyelerimiz; biyografileri, eserleri, makaleleri ve dersleriyle.',
    viewProfile: 'Profili İncele', biography: 'Biyografi', books: 'Kitaplar', articles: 'Makaleler', videos: 'Videolar', social: 'Sosyal Medya',
    ctaTitle: 'Bu kadrodan ders almak için yeni dönem kayıtları devam ediyor.',
    photoPlaceholder: 'Hoca fotoğrafı',
  },
  de: {
    back: 'Startseite', apply: 'Bewerben', applyLong: 'Zum Bewerbungsformular', eyebrow: 'Akademisches Kollegium',
    title: 'Unsere Lehrenden',
    sub: 'Die Mitglieder unseres Beirats und Wissenschaftlichen Rats — mit Biografien, Werken, Artikeln und Vorlesungen.',
    viewProfile: 'Profil ansehen', biography: 'Biografie', books: 'Bücher', articles: 'Artikel', videos: 'Videos', social: 'Soziale Medien',
    ctaTitle: 'Die Einschreibung für das neue Semester bei diesem Kollegium läuft.',
    photoPlaceholder: 'Foto',
  },
};

export interface KadroMember {
  name: string; role: string; bio: string; bioLong: string;
  books: { title: string; meta: string }[];
  articles: { title: string; meta: string }[];
  videos: { title: string; meta: string }[];
  social: { label: string; url: string }[];
  photoUrl?: string;
}

export interface KadroGroup { name: string; desc: string; members: KadroMember[] }

export const KADRO_GROUPS: Record<Lang, KadroGroup[]> = {
  tr: [
    {
      name: 'Danışma Kurulu',
      desc: 'Danışma Kurulu; enstitünün akademik yönelimini belirleyen, müfredat ve yayın politikalarına rehberlik eden kıdemli hocalarımızdan oluşur.',
      members: [
        {
          name: 'Prof. Dr. Ahmet Yılmaz', role: 'Danışma Kurulu Başkanı · Hadis',
          bio: 'Kütüb-i Sitte ricali ve isnad tarihi üzerine çalışmaları ile tanınır; 30 yılı aşkın akademik tecrübe.',
          bioLong: 'Lisans ve lisansüstü eğitimini ilahiyat alanında tamamladı; doktorasını hadis ana bilim dalında isnad tarihi üzerine verdi. Uzun yıllar yurt içi ve yurt dışında hadis kürsülerinde ders verdi, çok sayıda yüksek lisans ve doktora tezi yönetti. Kütüb-i Sitte ricali, cerh-ta’dil literatürü ve hadis eğitim tarihi başlıca çalışma alanlarıdır.',
          books: [
            { title: 'İsnad Geleneğinin Doğuşu', meta: 'Monografi, 2014' },
            { title: 'Ricâl Literatürüne Giriş', meta: 'Ders kitabı, 2019' },
          ],
          articles: [
            { title: 'Erken Dönem İsnad Tenkidinde Metin-İsnad İlişkisi', meta: 'Hadis Araştırmaları, 2021' },
            { title: 'Cerh Lafızlarının Bağlamsal Okunması', meta: 'İslami İlimler Dergisi, 2018' },
          ],
          videos: [
            { title: 'Kırk Hadis Dersleri — 1. Ders', meta: 'IHS Video Serisi' },
            { title: 'İsnad Nedir, Niçin Önemlidir?', meta: 'Konferans kaydı' },
          ],
          social: [{ label: 'X / Twitter', url: '#' }, { label: 'YouTube', url: '#' }, { label: 'Academia', url: '#' }],
        },
        {
          name: 'Prof. Dr. Mahmut Kaya', role: 'Danışma Kurulu Üyesi · Tefsir',
          bio: 'Rivayet tefsiri geleneği ve meal metodolojisi alanında çok sayıda eser kaleme aldı.',
          bioLong: 'Tefsir ana bilim dalında yürüttüğü çalışmalarla tanınır. Rivayet tefsirinin kaynak değeri, meal metodolojisi ve Kur’an ilimleri üzerine dersler vermekte; enstitünün tefsir müfredatının şekillenmesine öncülük etmektedir.',
          books: [
            { title: 'Rivayet Tefsirinin Kaynak Değeri', meta: 'Monografi, 2016' },
            { title: 'Meal Nasıl Okunur?', meta: 'İnceleme, 2021' },
          ],
          articles: [
            { title: 'Çeviride Anlam Kaybı: Deyimsel İfadeler Örneği', meta: 'Tefsir Araştırmaları, 2020' },
            { title: 'Ulûmü’l-Kur’ân Literatürünün Gelişimi', meta: 'İlahiyat Fakültesi Dergisi, 2017' },
          ],
          videos: [
            { title: 'Meal Okuma Rehberi', meta: 'IHS Video Serisi' },
            { title: 'Tefsirde Rivayetin Yeri', meta: 'Seminer kaydı' },
          ],
          social: [{ label: 'X / Twitter', url: '#' }, { label: 'Academia', url: '#' }],
        },
        {
          name: 'Doç. Dr. Halil Demir', role: 'Danışma Kurulu Üyesi · İslam Hukuku',
          bio: 'Fıkhu’l-hadis ve ahkâm hadisleri üzerine uzmanlaşmış, uluslararası projelerde görev almıştır.',
          bioLong: 'İslam hukuku ve hadis ilişkisi üzerine çalışmaktadır. Ahkâm hadislerinin fıkhi yorumu, mezheplerin hadisle istidlal yöntemleri ve fıkıh usûlü alanlarında dersler vermekte; Avrupa’daki çeşitli akademik kurumlarla ortak projeler yürütmektedir.',
          books: [{ title: 'Ahkâm Hadislerine Giriş', meta: 'Ders kitabı, 2018' }],
          articles: [
            { title: 'Mezheplerin Hadisle İstidlal Yöntemleri', meta: 'Fıkıh Araştırmaları, 2019' },
            { title: 'Fıkhu’l-Hadis Kavramının Tarihî Gelişimi', meta: 'İslam Hukuku Dergisi, 2016' },
          ],
          videos: [{ title: 'Hadis ve Fıkıh İlişkisi', meta: 'Konferans kaydı' }],
          social: [{ label: 'LinkedIn', url: '#' }, { label: 'Academia', url: '#' }],
        },
      ],
    },
    {
      name: 'Bilim Kurulu',
      desc: 'Bilim Kurulu; derslerin yürütülmesi, araştırma projeleri ve yayın süreçlerinden sorumlu öğretim kadromuzdur.',
      members: [
        {
          name: 'Doç. Dr. Elif Arslan', role: 'Bilim Kurulu Başkanı · Hadis Usûlü',
          bio: 'Cerh-ta’dil literatürü ve muhaddis kadınlar üzerine araştırmalarıyla bilinir.',
          bioLong: 'Hadis usûlü ve rical literatürü üzerine çalışmaktadır. Muhaddis kadınların hadis rivayetindeki rolü konusundaki araştırmaları uluslararası alanda ilgi görmüştür. Enstitüde hadis usûlü derslerini yürütmekte ve akademik dergi editörlüğü yapmaktadır.',
          books: [{ title: 'Hadis Rivayetinde Kadın Muhaddisler', meta: 'Monografi, 2020' }],
          articles: [
            { title: 'Tabakat Kitaplarında Kadın Raviler', meta: 'Hadis Araştırmaları, 2022' },
            { title: 'Cerh-Ta’dil Hükümlerinde Öznellik Sorunu', meta: 'İslami İlimler Dergisi, 2019' },
          ],
          videos: [
            { title: 'Hadis Usûlüne Giriş — Ders Serisi', meta: 'IHS Video Serisi' },
            { title: 'Muhaddis Kadınlar', meta: 'Konferans kaydı' },
          ],
          social: [{ label: 'X / Twitter', url: '#' }, { label: 'YouTube', url: '#' }],
        },
        {
          name: 'Dr. Yusuf Karaca', role: 'Bilim Kurulu Üyesi · Dijital Hadis',
          bio: 'Dijital hadis veritabanları ve isnad ağı analizleri üzerine çalışmaktadır.',
          bioLong: 'Hadis ilmi ile veri bilimini buluşturan çalışmalar yürütmektedir. Dijital İsnad Atlası projesinin yürütücüsüdür; isnad ağlarının bilgisayarlı analizi, hadis veritabanları ve dijital beşeri bilimler alanlarında ders vermektedir.',
          books: [{ title: 'Dijital Çağda Hadis Araştırmaları', meta: 'Derleme, 2023' }],
          articles: [
            { title: 'İsnad Ağlarının Görselleştirilmesi: Yöntem ve Sorunlar', meta: 'Dijital Beşeri Bilimler, 2024' },
            { title: 'Hadis Veritabanlarının Karşılaştırmalı Analizi', meta: 'Hadis Araştırmaları, 2021' },
          ],
          videos: [{ title: 'Dijital Hadis Araçları Atölyesi', meta: 'Atölye kaydı' }],
          social: [{ label: 'GitHub', url: '#' }, { label: 'X / Twitter', url: '#' }],
        },
        {
          name: 'Dr. Meryem Şahin', role: 'Bilim Kurulu Üyesi · Şerh Geleneği',
          bio: 'Buhârî şerhleri ve Osmanlı dönemi hadis eğitimi alanında uzman.',
          bioLong: 'Şerh geleneği üzerine çalışmaktadır; doktora tezini Osmanlı dönemi Buhârî şerhleri üzerine hazırlamıştır. Dârülhadislerin eğitim usulü, şerh metinlerinin okutulma geleneği ve Osmanlı ilim tarihi başlıca ilgi alanlarıdır.',
          books: [{ title: 'Osmanlı Dârülhadislerinde Eğitim', meta: 'Monografi, 2022' }],
          articles: [
            { title: 'Fethu’l-Bârî’nin Osmanlı’daki Okunma Serüveni', meta: 'Osmanlı Araştırmaları, 2023' },
            { title: 'Şerh Meclislerinde Usûl', meta: 'İlim Tarihi Dergisi, 2020' },
          ],
          videos: [{ title: 'Şerh Geleneğine Giriş', meta: 'IHS Video Serisi' }],
          social: [{ label: 'Academia', url: '#' }, { label: 'Instagram', url: '#' }],
        },
      ],
    },
  ],
  de: [
    {
      name: 'Beirat',
      desc: 'Der Beirat besteht aus erfahrenen Gelehrten, die die akademische Ausrichtung des Instituts bestimmen und Lehrplan- sowie Publikationspolitik begleiten.',
      members: [
        {
          name: 'Prof. Dr. Ahmet Yılmaz', role: 'Vorsitzender des Beirats · Hadith',
          bio: 'Bekannt für Arbeiten zu den Überlieferern der Kutub al-Sitta und zur Isnad-Geschichte; über 30 Jahre akademische Erfahrung.',
          bioLong: 'Studium und Promotion im Fach Hadith mit Schwerpunkt Isnad-Geschichte. Lehrte viele Jahre an Hadith-Lehrstühlen im In- und Ausland und betreute zahlreiche Master- und Promotionsarbeiten. Forschungsschwerpunkte: Rijal der Kutub al-Sitta, Jarh-wa-Ta’dil-Literatur und Geschichte der Hadith-Lehre.',
          books: [
            { title: 'Die Entstehung der Isnad-Tradition', meta: 'Monografie, 2014' },
            { title: 'Einführung in die Rijal-Literatur', meta: 'Lehrbuch, 2019' },
          ],
          articles: [
            { title: 'Text-Isnad-Beziehung in der frühen Isnad-Kritik', meta: 'Hadith-Studien, 2021' },
            { title: 'Kontextuelle Lesart der Jarh-Termini', meta: 'Zeitschrift für Islamische Wissenschaften, 2018' },
          ],
          videos: [
            { title: 'Vierzig-Hadithe-Lektionen — Lektion 1', meta: 'IHS-Videoserie' },
            { title: 'Was ist Isnad und warum ist er wichtig?', meta: 'Konferenzaufzeichnung' },
          ],
          social: [{ label: 'X / Twitter', url: '#' }, { label: 'YouTube', url: '#' }, { label: 'Academia', url: '#' }],
        },
        {
          name: 'Prof. Dr. Mahmut Kaya', role: 'Beiratsmitglied · Tafsir',
          bio: 'Verfasser zahlreicher Werke zur Überlieferungsexegese und zur Methodik der Koranübersetzung.',
          bioLong: 'Bekannt für seine Arbeiten im Fach Tafsir. Lehrt zum Quellenwert der Überlieferungsexegese, zur Übersetzungsmethodik und zu den Koranwissenschaften; prägt maßgeblich den Tafsir-Lehrplan des Instituts.',
          books: [
            { title: 'Der Quellenwert der Überlieferungsexegese', meta: 'Monografie, 2016' },
            { title: 'Wie liest man eine Koranübersetzung?', meta: 'Studie, 2021' },
          ],
          articles: [
            { title: 'Bedeutungsverlust in der Übersetzung: Idiome', meta: 'Tafsir-Studien, 2020' },
            { title: 'Die Entwicklung der Ulum-al-Qur’an-Literatur', meta: 'Zeitschrift der Theologischen Fakultät, 2017' },
          ],
          videos: [
            { title: 'Leitfaden zur Meal-Lektüre', meta: 'IHS-Videoserie' },
            { title: 'Die Rolle der Überlieferung im Tafsir', meta: 'Seminaraufzeichnung' },
          ],
          social: [{ label: 'X / Twitter', url: '#' }, { label: 'Academia', url: '#' }],
        },
        {
          name: 'Doç. Dr. Halil Demir', role: 'Beiratsmitglied · Islamisches Recht',
          bio: 'Spezialisiert auf Fiqh al-Hadith und Ahkam-Hadithe; Mitwirkung an internationalen Projekten.',
          bioLong: 'Forscht zum Verhältnis von islamischem Recht und Hadith. Lehrt zur rechtlichen Auslegung der Ahkam-Hadithe, zu den Beweisführungsmethoden der Rechtsschulen und zu Usul al-Fiqh; führt gemeinsame Projekte mit europäischen akademischen Einrichtungen durch.',
          books: [{ title: 'Einführung in die Ahkam-Hadithe', meta: 'Lehrbuch, 2018' }],
          articles: [
            { title: 'Beweisführung der Rechtsschulen mit Hadithen', meta: 'Fiqh-Studien, 2019' },
            { title: 'Die historische Entwicklung des Begriffs Fiqh al-Hadith', meta: 'Zeitschrift für Islamisches Recht, 2016' },
          ],
          videos: [{ title: 'Hadith und Fiqh', meta: 'Konferenzaufzeichnung' }],
          social: [{ label: 'LinkedIn', url: '#' }, { label: 'Academia', url: '#' }],
        },
      ],
    },
    {
      name: 'Wissenschaftlicher Rat',
      desc: 'Der Wissenschaftliche Rat ist unser Lehrkörper — verantwortlich für Unterricht, Forschungsprojekte und Publikationen.',
      members: [
        {
          name: 'Doç. Dr. Elif Arslan', role: 'Vorsitzende des Wissenschaftlichen Rats · Hadith-Methodik',
          bio: 'Bekannt für ihre Forschung zur Jarh-wa-Ta’dil-Literatur und zu Hadith-Gelehrtinnen.',
          bioLong: 'Forscht zu Hadith-Methodik und Rijal-Literatur. Ihre Arbeiten zur Rolle von Gelehrtinnen in der Hadith-Überlieferung fanden internationale Beachtung. Sie unterrichtet Hadith-Methodik am Institut und ist Herausgeberin der akademischen Zeitschrift.',
          books: [{ title: 'Gelehrtinnen in der Hadith-Überlieferung', meta: 'Monografie, 2020' }],
          articles: [
            { title: 'Überliefererinnen in den Tabaqat-Werken', meta: 'Hadith-Studien, 2022' },
            { title: 'Das Problem der Subjektivität in Jarh-wa-Ta’dil-Urteilen', meta: 'Zeitschrift für Islamische Wissenschaften, 2019' },
          ],
          videos: [
            { title: 'Einführung in die Hadith-Methodik — Lektionsreihe', meta: 'IHS-Videoserie' },
            { title: 'Hadith-Gelehrtinnen', meta: 'Konferenzaufzeichnung' },
          ],
          social: [{ label: 'X / Twitter', url: '#' }, { label: 'YouTube', url: '#' }],
        },
        {
          name: 'Dr. Yusuf Karaca', role: 'Ratsmitglied · Digitale Hadithforschung',
          bio: 'Arbeitet zu digitalen Hadith-Datenbanken und Isnad-Netzwerkanalysen.',
          bioLong: 'Verbindet Hadithwissenschaft mit Data Science. Leiter des Projekts Digitaler Isnad-Atlas; lehrt zur computergestützten Analyse von Isnad-Netzwerken, zu Hadith-Datenbanken und Digital Humanities.',
          books: [{ title: 'Hadithforschung im digitalen Zeitalter', meta: 'Sammelband, 2023' }],
          articles: [
            { title: 'Visualisierung von Isnad-Netzwerken: Methoden und Probleme', meta: 'Digital Humanities, 2024' },
            { title: 'Vergleichende Analyse von Hadith-Datenbanken', meta: 'Hadith-Studien, 2021' },
          ],
          videos: [{ title: 'Werkstatt Digitale Hadith-Werkzeuge', meta: 'Werkstattaufzeichnung' }],
          social: [{ label: 'GitHub', url: '#' }, { label: 'X / Twitter', url: '#' }],
        },
        {
          name: 'Dr. Meryem Şahin', role: 'Ratsmitglied · Kommentartradition',
          bio: 'Expertin für Buchari-Kommentare und die Hadith-Lehre der osmanischen Zeit.',
          bioLong: 'Forscht zur Kommentartradition; promovierte über die Buchari-Kommentare der osmanischen Zeit. Schwerpunkte: Lehrmethodik der Darülhadis-Schulen, Lesetradition der Kommentartexte und osmanische Wissenschaftsgeschichte.',
          books: [{ title: 'Lehre an den osmanischen Darülhadis-Schulen', meta: 'Monografie, 2022' }],
          articles: [
            { title: 'Die Rezeption von Fath al-Bari im Osmanischen Reich', meta: 'Osmanische Studien, 2023' },
            { title: 'Methodik in den Kommentar-Lesekreisen', meta: 'Zeitschrift für Wissenschaftsgeschichte, 2020' },
          ],
          videos: [{ title: 'Einführung in die Kommentartradition', meta: 'IHS-Videoserie' }],
          social: [{ label: 'Academia', url: '#' }, { label: 'Instagram', url: '#' }],
        },
      ],
    },
  ],
};
