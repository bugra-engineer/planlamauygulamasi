const form = document.getElementById("form");
const girdi = document.getElementById("girdi");
const liste = document.getElementById("liste");
const sayac = document.getElementById("sayac");
const filtreButonlari = document.querySelectorAll(".filtre");

let gorevler = JSON.parse(localStorage.getItem("gorevler")) || [];
let aktifFiltre = "hepsi";

function kaydet() {
  localStorage.setItem("gorevler", JSON.stringify(gorevler));
}

function ciz() {
  liste.innerHTML = "";

  const gosterilecekler = gorevler.filter((g) => {
    if (aktifFiltre === "aktif") return !g.bitti;
    if (aktifFiltre === "tamamlanan") return g.bitti;
    return true;
  });

  gosterilecekler.forEach((g) => {
    const li = document.createElement("li");
    if (g.bitti) li.classList.add("bitti");

    const kutu = document.createElement("input");
    kutu.type = "checkbox";
    kutu.checked = g.bitti;
    kutu.addEventListener("change", () => {
      g.bitti = !g.bitti;
      kaydet();
      ciz();
    });

    const metin = document.createElement("span");
    metin.textContent = g.metin;

    const sil = document.createElement("button");
    sil.textContent = "Sil";
    sil.className = "sil";
    sil.addEventListener("click", () => {
      gorevler = gorevler.filter((x) => x.id !== g.id);
      kaydet();
      ciz();
    });

    li.append(kutu, metin, sil);
    liste.appendChild(li);
  });

  const kalan = gorevler.filter((g) => !g.bitti).length;
  sayac.textContent = `${kalan} görev kaldı`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const metin = girdi.value.trim();
  if (!metin) return;

  gorevler.push({ id: Date.now(), metin, bitti: false });
  girdi.value = "";
  kaydet();
  ciz();
});

filtreButonlari.forEach((btn) => {
  btn.addEventListener("click", () => {
    aktifFiltre = btn.dataset.filtre;
    filtreButonlari.forEach((b) => b.classList.remove("aktif"));
    btn.classList.add("aktif");
    ciz();
  });
});

ciz();