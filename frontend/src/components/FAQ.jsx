import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

function FAQ() {
  const accordionItems = [
    {
      value: "item-1",
      question: "Apakah itu kad Kahwin Digital?",
      answer: [
        "Kad kahwin digital ialah versi elektronik kad jemputan kahwin yang tradisional. Ianya boleh dihantar melalui e-mel atau dikongsi melalui platform media sosial. Kad jemputan digital menjadi semakin popular kerana memudahkan pihak majlis dan tetamu, menjimatkan kos dan lebih mesra alam.",
      ],
    },
    {
      value: "item-2",
      question: "Apakah fungi yang terdapat pada kad digital?",
      answer: [
        "RSVP - Tetamu boleh menghantar status kehadiran mereka kepada pihak majlis",
        "Money Gift - Terima wang tanpa tunai terus ke akaun bank anda",
        "Wishlist - Terima hadiah idaman anda tanpa sebarang pertindihan",
        "Contact - Hubungi pihak majis dengan satu klik sahaja",
        "Lokasi - Penunjuk arah menggunakan aplikasi Google Maps atau Waze",
        "Guestbook - Ruangan untuk tetamu menyampaikan ucapan",
        "Kalendar - Simpan tarikh majlis sebagai peringatan di aplikasi kalendar",
        "Countdown - Countdown dari tarikh majlis akan berlangsung",
        "Galeri - Paparkan gambar pengantin atau lokasi majlis",
      ],
    },
    {
      value: "item-3",
      question: "Bagaimanakah cara menempah kad digital?",
      answer: [
        "Untuk menempah kad digital, anda perlu log masuk dengan menggunakan akaun Google atau Email. Kemudian, pilih design kad digital dan isikan maklumat majlis pada borang yang disediakan dengan lengkap. Setelah selesai pembayaran, tempahan anda akan diproses dalam tempoh 1-2 hari bekerja.",
      ],
    },
    {
      value: "item-4",
      question: "Berapa lamakah tempoh masa untuk menyiapkan kad digital?",
      answer: [
        "Tempoh masa untuk menyiapkan kad digital hanyalah mengambil masa 1-2 hari bekerja sahaja, bergantung kepada segala maklumat lengkap yang telah diberikan dan juga setelah pembayaran dibuat.",
      ],
    },
    {
      value: "item-5",
      question: "Bolehkah maklumat ditukar setelah kad digital siap?",
      answer: [
        "Sebarang pertukaran maklumat boleh dibuat sebelum tarikh majlis berlangsung.",
      ],
    },
    {
      value: "item-6",
      question: "Adakah kad digital mempunyai muzik latar belakang?",
      answer: [
        "Ya, kad digital ini mempunyai muzik latar belakang. Boleh pilih dari senarai lagu kami atau masukkan link YouTube.",
      ],
    },
    {
      value: "item-7",
      question: "Bolehkah ucapan dalam guestbook dipadam?",
      answer: [
        "Ucapan dalam guestbook boleh dipadam jika ianya mendatangkan ketidakselesaan kepada pihak majlis.",
      ],
    },
    {
      value: "item-8",
      question: "Perlukah download di Appstore atau Playstore?",
      answer: [
        "Tidak perlu. KahwinNow adalah sebuah web-based app yang boleh diakses menggunakan browser.",
      ],
    },
  ];

  return (
    <>
      <section className="bg-blue-50">
        <div className="py-5 px-4 mx-auto max-w-5xl  lg:px-6">
          {/* Section header */}
          <div className="max-w-5xl mx-auto my-10 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Soalan Lazim</h2>
          </div>
          <div className="max-w-5xl mx-auto text-center pb-10">
            <Accordion type="single" collapsible>
              {accordionItems.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2 text-left text-gray-600 text-md font-medium">
                      {item.answer.map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}

export default FAQ;
