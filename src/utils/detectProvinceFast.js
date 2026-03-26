export const detectProvinceFast = (address) => {
  if (!address) return null;

  const text = address.toLowerCase();

  // =========================
  // JAWA BARAT (taruh atas biar ga ketiban jakarta)
  // =========================
  if (
    text.includes("bandung") ||
    text.includes("bdg") ||
    text.includes("cimahi") ||
    text.includes("sumedang") ||
    text.includes("garut") ||
    text.includes("tasik") ||
    text.includes("tasikmalaya") ||
    text.includes("cirebon") ||
    text.includes("kuningan") ||
    text.includes("majalengka") ||
    text.includes("subang") ||
    text.includes("purwakarta") ||
    text.includes("karawang") ||
    text.includes("bekasi") ||
    text.includes("depok") ||
    text.includes("bogor") ||
    text.includes("sukabumi") ||
    text.includes("jabar") ||
    text.includes("jawa barat") ||
    text.includes("jwa bart")
  ) {
    return "Jawa Barat";
  }

  // =========================
  // DKI JAKARTA
  // =========================
  if (
    text.includes("jakarta") ||
    text.includes("jkt") ||
    text.includes("jaksel") ||
    text.includes("jakbar") ||
    text.includes("jaktim") ||
    text.includes("jakpus") ||
    text.includes("jakut")
  ) {
    return "DKI Jakarta";
  }

  // =========================
  // BANTEN
  // =========================
  if (
    text.includes("banten") ||
    text.includes("tangerang") ||
    text.includes("tgr") ||
    text.includes("serang") ||
    text.includes("cilegon") ||
    text.includes("lebak") ||
    text.includes("pandeglang")
  ) {
    return "Banten";
  }

  // =========================
  // JAWA TENGAH
  // =========================
  if (
    text.includes("semarang") ||
    text.includes("smg") ||
    text.includes("solo") ||
    text.includes("surakarta") ||
    text.includes("magelang") ||
    text.includes("klaten") ||
    text.includes("boyolali") ||
    text.includes("salatiga") ||
    text.includes("wonogiri") ||
    text.includes("sragen") ||
    text.includes("karanganyar") ||
    text.includes("purwokerto") ||
    text.includes("banyumas") ||
    text.includes("cilacap") ||
    text.includes("tegal") ||
    text.includes("pekalongan") ||
    text.includes("kudus") ||
    text.includes("jepara") ||
    text.includes("rembang") ||
    text.includes("pati") ||
    text.includes("jateng") ||
    text.includes("jawa tengah")
  ) {
    return "Jawa Tengah";
  }

  // =========================
  // DI YOGYAKARTA
  // =========================
  if (
    text.includes("yogyakarta") ||
    text.includes("jogja") ||
    text.includes("diy") ||
    text.includes("sleman") ||
    text.includes("bantul") ||
    text.includes("gunungkidul") ||
    text.includes("kulonprogo")
  ) {
    return "DI Yogyakarta";
  }

  // =========================
  // JAWA TIMUR
  // =========================
  if (
    text.includes("surabaya") ||
    text.includes("sby") ||
    text.includes("malang") ||
    text.includes("mlg") ||
    text.includes("kediri") ||
    text.includes("blitar") ||
    text.includes("tulungagung") ||
    text.includes("jombang") ||
    text.includes("mojokerto") ||
    text.includes("gresik") ||
    text.includes("sidoarjo") ||
    text.includes("pasuruan") ||
    text.includes("probolinggo") ||
    text.includes("lumajang") ||
    text.includes("jember") ||
    text.includes("bondowoso") ||
    text.includes("situbondo") ||
    text.includes("banyuwangi") ||
    text.includes("madiun") ||
    text.includes("ngawi") ||
    text.includes("bojonegoro") ||
    text.includes("tuban") ||
    text.includes("lamongan") ||
    text.includes("jatim") ||
    text.includes("jawa timur")
  ) {
    return "Jawa Timur";
  }

  // =========================
  // BALI
  // =========================
  if (
    text.includes("bali") ||
    text.includes("denpasar") ||
    text.includes("badung") ||
    text.includes("gianyar") ||
    text.includes("tabanan") ||
    text.includes("karangasem") ||
    text.includes("bangli") ||
    text.includes("klungkung") ||
    text.includes("buleleng")
  ) {
    return "Bali";
  }

  return null;
};