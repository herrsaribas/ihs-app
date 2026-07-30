export const BASVURU = {
  tr: {
    back: 'Ana Sayfa', eyebrow: 'Başvuru', title: 'Başvuru Formu',
    sub: 'Online İlahiyat ve sertifika programlarımıza başvurunuzu üç kısa adımda tamamlayın.',
    stepLabels: ['Program', 'Kişisel Bilgiler', 'Eğitim & Motivasyon'],
    step1: { title: 'Hangi programa başvuruyorsunuz?' },
    step2: { title: 'Kişisel Bilgileriniz', name: 'Ad Soyad', email: 'E-posta', phone: 'Telefon', city: 'Şehir / Ülke' },
    step3: {
      title: 'Eğitim ve Motivasyon',
      education: 'Eğitim Durumu', educationPh: 'Örn. Lisans — İlahiyat',
      motivation: 'Neden bu programa katılmak istiyorsunuz?', motivationPh: 'Kısaca motivasyonunuzu yazın...',
    },
    prev: '← Geri', next: 'Devam Et →', submit: 'Başvuruyu Gönder', submitting: 'Gönderiliyor...',
    required: 'Lütfen ad-soyad ve e-posta alanlarını doldurun.',
    error: 'Başvuru gönderilemedi. Lütfen tekrar deneyin veya bize e-posta ile ulaşın.',
    done: { title: 'Başvurunuz Alındı', sub: 'Değerlendirme sonucu e-posta ile bildirilecektir. İlginiz için teşekkür ederiz.', cta: 'Ana Sayfaya Dön' },
    process: {
      label: 'Başvuru Süreci',
      items: [
        { n: 'I', title: 'Başvuru Formu', desc: 'Formu doldurup gönderin.' },
        { n: 'II', title: 'Değerlendirme', desc: 'Başvurunuz akademik kurul tarafından incelenir.' },
        { n: 'III', title: 'Tanışma Görüşmesi', desc: 'Online kısa bir tanışma görüşmesi yapılır.' },
        { n: 'IV', title: 'Kayıt', desc: 'Kabul sonrası kayıt işlemleri tamamlanır.' },
      ],
    },
    help: { label: 'Sorunuz mu var?', text: 'Başvuru süreciyle ilgili her türlü sorunuz için bize ulaşabilirsiniz.' },
  },
  de: {
    back: 'Startseite', eyebrow: 'Bewerbung', title: 'Bewerbungsformular',
    sub: 'Schließen Sie Ihre Bewerbung für unsere Online-Theologie- und Zertifikatsprogramme in drei kurzen Schritten ab.',
    stepLabels: ['Programm', 'Persönliche Daten', 'Bildung & Motivation'],
    step1: { title: 'Für welches Programm bewerben Sie sich?' },
    step2: { title: 'Ihre persönlichen Daten', name: 'Name', email: 'E-Mail', phone: 'Telefon', city: 'Stadt / Land' },
    step3: {
      title: 'Bildung und Motivation',
      education: 'Bildungsstand', educationPh: 'z. B. Bachelor — Theologie',
      motivation: 'Warum möchten Sie an diesem Programm teilnehmen?', motivationPh: 'Beschreiben Sie kurz Ihre Motivation...',
    },
    prev: '← Zurück', next: 'Weiter →', submit: 'Bewerbung absenden', submitting: 'Wird gesendet...',
    required: 'Bitte füllen Sie Name und E-Mail aus.',
    error: 'Die Bewerbung konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns eine E-Mail.',
    done: { title: 'Ihre Bewerbung ist eingegangen', sub: 'Das Ergebnis der Prüfung wird Ihnen per E-Mail mitgeteilt. Vielen Dank für Ihr Interesse.', cta: 'Zur Startseite' },
    process: {
      label: 'Bewerbungsprozess',
      items: [
        { n: 'I', title: 'Bewerbungsformular', desc: 'Füllen Sie das Formular aus und senden Sie es ab.' },
        { n: 'II', title: 'Prüfung', desc: 'Ihre Bewerbung wird vom akademischen Rat geprüft.' },
        { n: 'III', title: 'Kennenlerngespräch', desc: 'Ein kurzes Online-Gespräch zum Kennenlernen.' },
        { n: 'IV', title: 'Einschreibung', desc: 'Nach der Zulassung wird die Einschreibung abgeschlossen.' },
      ],
    },
    help: { label: 'Haben Sie Fragen?', text: 'Bei Fragen zum Bewerbungsprozess erreichen Sie uns jederzeit.' },
  },
} as const;
