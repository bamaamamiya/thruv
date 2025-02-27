const faqs = [
  {
    question: "Apakah ini aman untuk kulit sensitif?",
    answer: "Ya, sudah diuji di BPOM & tanpa bahan iritasi!",
  },
  {
    question: "Berapa lama hasilnya terlihat?",
    answer: "Rata-rata 7 hari, tapi hasil bisa lebih cepat!",
  },
  {
    question: "Apa garansinya?",
    answer: "Kalau dalam 30 hari gak puas, uang kembali 100%!",
  },
];

export default function FAQComponent() {
  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">FAQ (Pertanyaan yang Sering Diajukan)</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details key={index} className="bg-gray-100 rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold text-lg">{faq.question}</summary>
            <div className="mt-2 flex items-start gap-2">
              <svg className="text-green-500 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-8.707a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414z" clipRule="evenodd" />
              </svg>
              <p>{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}