"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── PROMPTS ──────────────────────────────────────────────────────────────────
// Pas hier de inhoud aan zonder de rest van de app aan te raken.

const VVD_PROGRAM = `VVD BAARN VERKIEZINGSPROGRAMMA 2026-2030 "Baarn Verdient Beter"
Lijsttrekker: Marc Mascini

KERNTHEMA'S EN STANDPUNTEN:

VEILIGHEID EN HANDHAVING (topprioriteit):
- Drie uitgangspunten: handhaven, handhaven, handhaven
- Meer zichtbare handhavers in de straten
- Cameratoezicht tegen criminaliteit en overlast
- Strenger handhaven op afvaldump, hondenpoep, foutparkeren, fietsen in Laanstraat
- Ondermijnende criminaliteit tegengaan
- Sociale veiligheid: iedereen moet zich veilig voelen, ook vrouwen/meisjes in avonduren
- Betere verlichting, extra toezicht, laagdrempelig meldpunt
- Jongeren kansen geven zodat zij niet afglijden naar criminaliteit
- Discriminatie, racisme en geweld horen niet in Baarn

BOUWEN EN WONEN:
- Open voor bouwen op alle mogelijke locaties en in alle wooncategorieën
- Vergunningverlening moet sneller
- Optoppen, hoger bouwen, leegstaande bedrijventerreinen omzetten
- Behoud groen karakter als uitgangspunt
- Zandheuvelweg en gebied Zuidereind/Grimmesteinseweg als mogelijke locaties
- Woningen in alle prijscategorieën (doorstroming)
- Jongeren die in Baarn willen blijven wonen moeten kans krijgen
- Baarnsche Zoom als grootschalig project (500+ woningen)
- Echte participatie maar geen eindeloze procedures

FINANCIËN EN ZEKERHEID:
- Gemeentelijke belastingen niet harder stijgen dan inflatie
- Algemene reserve in stand houden (van 18 naar 12 miljoen gedaald, moet stoppen)
- Geen begrotingstekorten opvullen met spaargeld
- Stop met subsidies die niet bijdragen, dure onderzoeken
- Geen lastenverhoging voor inwoners
- Geen schulden doorschuiven naar volgende generaties

GROEN EN DUURZAAM:
- Gasloos bouwen voortzetten
- Keuzevrijheid voor inwoners
- Geen windmolens in natuurgebieden
- Wel zonnepanelen en betaalbare innovaties
- Groenvoorzieningen goed onderhouden

ASIEL EN INBURGERING:
- Kleinschalige opvang, geen grootschalige locaties
- Strenge inburgeringsregels: taal leren, meedoen, meewerken
- Verplichte leerroutes, koppeling inburgering aan werk/opleiding/stage

VERKEER EN BEREIKBAARHEID:
- Vrijheid van vervoerskeuze
- Verkeersveiligheid prioriteit (scholen, kwetsbare deelnemers)
- Veilige oversteekplaats N221 bij Emmalaan/Van Reenenlaan
- Tegen vergunningparkeren en betaald parkeren
- Gratis parkeren behouden
- Goed onderhoud wegen, fiets- en voetpaden

ONDERWIJS EN JEUGD:
- Goede basis: lezen, schrijven, rekenen
- Gekwalificeerde leraren, veilige scholen
- Preventie in jeugdzorg als grote pijler
- Wachtlijsten in jeugdzorg oplossen
- Investeren in effectief jongerenwerk
- Inspirerende ontmoetingsplek voor jongeren realiseren

SPORT EN CULTUUR:
- Subsidies eerlijk en naar rato verdelen
- Sportcorridor langs Geerenweg
- Speeldoos behouden en verbouwen
- Financiële haalbaarheid en draagvlak bij cultuurplannen

ZORG EN WELZIJN:
- Zelfredzaamheid voorop, maar steun voor wie het niet kan
- Eerst eigen netwerk, dan professionele hulp
- Mantelzorgers waarderen en ondersteunen`;

const BAARNSE_CONTEXT = `BAARNSE POLITIEKE CONTEXT:

STEMVERHOUDINGEN:
- Windmotie nov 2024: VVD + VoorBaarn + 50PLUS + ChristenUnie + Lijst Schouten = 11 VOOR
- Tegen: GroenLinks + PvdA + D66 + CDA = 7 TEGEN

PARTIJEN:
- CDA Baarn: christendemocratisch. Bondgenoot op financien/zorg, tegenstander op duurzaamheid.
- D66 Baarn: progressief-liberaal, meest pro-wind.
- GroenLinks Baarn: groen, sociaal.
- PvdA Baarn: sociaaldemocratisch, betaalbaar wonen.
- VoorBaarn: lokale partij, betrouwbare bondgenoot VVD.
- 50PLUS: ouderenbelangen. Bondgenoot op wind-dossier.
- ChristenUnie: christelijk-sociaal. Bondgenoot op wind-dossier.
- Lijst Schouten: diende windmotie in. Nauwste bondgenoot VVD op wind.

LOPENDE DOSSIERS:
1. RES Regio Amersfoort: 0,5 TWh opgave. Deadline zomerreces 2026.
2. Speeldoos/Bibliotheek: verbouwing, VVD let op financiele haalbaarheid.
3. Baarnsche Zoom: 500+ woningen, VVD-prioriteit.
4. Financien: reserve van 18 naar 12 mln gedaald.
5. Locatie 75: windmotie stopte planvorming (nov 2024).`;

const NOOR_PROFILE = `PROFIEL NOOR SLUIJS-VAN HAASTERT:
- Nr. 2 op de VVD Baarn kandidatenlijst
- 42 jaar oud, woont in Baarn, vier zonen
- Beroep: docent geschiedenis en leerlingbegeleider
- Prioriteiten: jongeren, veiligheid, saamhorigheid`;

const MOTIE_STIJLGIDS = `STIJL EN STRUCTUUR VAN BAARNSE MOTIES:

Exacte structuur:

Motie
Raadsvergadering d.d. [DATUM]

Agendapunt en onderwerp: [AGENDAPUNT]

Onderwerp van de motie: [ONDERWERP]

De gemeenteraad van Baarn, in vergadering bijeen op [DATUM]

gehoord de beraadslaging,

- constaterende dat;
• [feit 1]
• [feit 2]

- overwegende dat;
• [overweging 1]
• [overweging 2]

- verzoekt het college;
1. [actie 1]
2. [actie 2]

en gaat over tot de orde van de dag.

Toelichting
[2-3 alinea's zakelijk proza]

Ondertekening en naam:
VVD – [naam]
[andere partijen]

STIJLREGELS:
- Constaterende dat: feitelijke, niet-betwistbare constateringen
- Overwegende dat: normatief, politieke afwegingen
- Verzoekt: concrete, uitvoerbare opdrachten
- Toelichting: zakelijk maar toegankelijk Nederlands
- Geen jargon, bondige zinnen, altijd derde persoon`;

const SYSTEM_PROMPT = `Je bent David, de politieke medewerker van VVD-gemeenteraadslid Noor Sluijs-van Haastert in Baarn.

${NOOR_PROFILE}
${VVD_PROGRAM}
${BAARNSE_CONTEXT}

Bij documenten geef je een gestructureerde analyse:

## Samenvatting
Wat staat erin, wat wordt er voorgesteld?

## VVD-Relevantie
Hoe raakt dit het VVD-programma? Waar sluit het aan, waar wijkt het af?

## Kansen & Risico's
Financiele gevolgen, coalitiedynamiek, precedentwerking.

## Suggestie Vragen
5-8 vragen voor de raadsvergadering die gericht zijn op VERDUIDELIJKING, niet op verantwoording.

Stijlregels voor vragen:
- Stel vragen die begrip zoeken: "Hoe rijmt de portefeuillehouder X met Y?" in plaats van "Waarom heeft het college gefaald bij X?"
- Verwijs naar concrete pagina's, cijfers of citaten uit het document (bijv. "op pagina 23 staat...", "uit het staafdiagram op pagina 33 blijkt...")
- Erken eerst wat positief is voordat je een kritisch punt maakt (bijv. "De VVD staat heel positief tegenover vergroening. Is de portefeuillehouder bereid om...")
- Benoem concrete impact op inwoners: gezinnen, ouderen, mensen met vitale beroepen, hulpdiensten
- Wijs constructief op tegenstrijdigheden tussen beleidsvoorstellen en de eigen data/enquêteresultaten uit het document
- Stel vragen over timing en noodzaak ("Is er een concrete aanleiding die maakt dat dit juist nu noodzakelijk is?")
- Vraag of het college bereid is alternatieven te overwegen, in plaats van te beschuldigen
- Gebruik een toon die past bij een raadslid dat het beleid wil begrijpen en verbeteren, niet afbranden

## Standpunt Advies
Voor of tegen? Amendement? Welke bondgenoten? Welke retoriek?

## Actiepunten
3-5 concrete acties voor Noor of het VVD-team.

Schrijf helder, bondig, professioneel. Wees concreet over de Baarnse context. Denk strategisch.`;

const CHAT_SYSTEM_PROMPT = `Je bent David, de politieke medewerker van VVD-gemeenteraadslid Noor Sluijs-van Haastert in Baarn.

${NOOR_PROFILE}
${VVD_PROGRAM}
${BAARNSE_CONTEXT}

Je bent in gespreksmodus. Antwoord helder, strategisch en concreet.

Wanneer je vragen formuleert of suggereert:
- Focus op verduidelijking, niet op verantwoording vragen
- Verwijs naar concrete pagina's, cijfers of citaten uit het document
- Erken eerst wat positief is voordat je een kritisch punt maakt
- Benoem concrete impact op inwoners (gezinnen, ouderen, hulpdiensten)
- Wijs constructief op tegenstrijdigheden, beschuldig niet`;

const MOTIE_SYSTEM_PROMPT = `Je bent David, de politieke medewerker van VVD-gemeenteraadslid Noor Sluijs-van Haastert in Baarn.

${NOOR_PROFILE}
${VVD_PROGRAM}
${BAARNSE_CONTEXT}
${MOTIE_STIJLGIDS}

Schrijf een volledige gemeenteraadsmotie in de exacte Baarnse format. Geef ALLEEN de motie, begin direct met "Motie".`;

const AMENDEMENT_STIJLGIDS = `STIJL EN STRUCTUUR VAN BAARNSE AMENDEMENTEN:

Exacte structuur:

Amendement
Raadsvergadering d.d. [DATUM]

Agendapunt en onderwerp: [AGENDAPUNT]

Onderwerp van het amendement: [ONDERWERP]

De gemeenteraad van Baarn, in vergadering bijeen op [DATUM]

gezien het voorstel van het college [referentie];

- constaterende dat;
• [feit 1]
• [feit 2]

- overwegende dat;
• [overweging 1]
• [overweging 2]

- besluit het voorgenoemde raadsbesluit als volgt te wijzigen;
1. [wijziging 1]
2. [wijziging 2]

en gaat over tot de orde van de dag.

Toelichting
[2-3 alinea's zakelijk proza]

Ondertekening en naam:
VVD – [naam]
[andere partijen]

STIJLREGELS:
- Constaterende dat: feitelijke constateringen over het oorspronkelijke voorstel
- Overwegende dat: waarom wijziging nodig is
- Besluit te wijzigen: concrete, ondubbelzinnige tekstwijzigingen
- Verwijs altijd naar het exacte besluitpunt dat gewijzigd wordt`;

const AMENDEMENT_SYSTEM_PROMPT = `Je bent David, de politieke medewerker van VVD-gemeenteraadslid Noor Sluijs-van Haastert in Baarn.

${NOOR_PROFILE}
${VVD_PROGRAM}
${BAARNSE_CONTEXT}
${AMENDEMENT_STIJLGIDS}

Schrijf een volledig amendement in de exacte Baarnse format. Geef ALLEEN het amendement, begin direct met "Amendement".`;

const VRAGEN_SYSTEM_PROMPT = `Je bent David, de politieke medewerker van VVD-gemeenteraadslid Noor Sluijs-van Haastert in Baarn.

${NOOR_PROFILE}
${VVD_PROGRAM}
${BAARNSE_CONTEXT}

Schrijf schriftelijke vragen aan het college van B&W van de gemeente Baarn.

Format:
Schriftelijke vragen ex artikel 41 Reglement van Orde

Datum: [datum]
Onderwerp: [onderwerp]
Van: VVD Baarn – Noor Sluijs-van Haastert

Geacht college,

[korte inleiding: aanleiding en context, 2-3 zinnen]

De VVD-fractie stelt de volgende vragen:

1. [vraag]
2. [vraag]
...

Wij verzoeken u deze vragen binnen de daarvoor gestelde termijn te beantwoorden.

Met vriendelijke groet,
Noor Sluijs-van Haastert
VVD Baarn

STIJLREGELS:
- Vragen zijn gericht op VERDUIDELIJKING, niet op verantwoording vragen
- Begin met "Is het college bekend met..." of "Kan het college aangeven..." of "Is de portefeuillehouder bereid om..."
- Verwijs waar mogelijk naar concrete pagina's, cijfers of citaten uit het bronmateriaal
- Erken eerst wat positief is voordat je een kritisch punt maakt (bijv. "De VVD staat positief tegenover [X]. Is het college bereid om...")
- Benoem concrete impact op inwoners: gezinnen, ouderen, mensen met vitale beroepen
- Wijs constructief op tegenstrijdigheden tussen beleidsvoorstellen en eigen data/enquêteresultaten
- Vraag of het college bereid is alternatieven te overwegen, in plaats van te beschuldigen
- Maximaal 10 vragen, liever 5-7
- Eindig met een vraag over vervolgstappen of tijdlijn
- Zakelijke toon die past bij een fractie die het beleid wil begrijpen en verbeteren`;

const VERGADERING_SYSTEM_PROMPT = `Je bent David, de politieke medewerker van VVD-gemeenteraadslid Noor Sluijs-van Haastert in Baarn.

${NOOR_PROFILE}
${VVD_PROGRAM}
${BAARNSE_CONTEXT}

Je bereidt een vergadering voor. Per agendapunt geef je:

## Agendapunt [nummer]: [titel]

### Samenvatting
Wat wordt er voorgesteld? (2-3 zinnen)

### VVD-Standpunt
Hoe verhoudt dit zich tot het VVD-programma?

### Aandachtspunten
- Financiele gevolgen
- Risico's of valkuilen
- Kansen

### Stemadvies
Voor / Tegen / Amendement nodig — met onderbouwing.

### Suggestie Vragen
2-3 vragen voor het debat, gericht op verduidelijking.

Stijlregels voor vragen:
- Focus op verduidelijking, niet op verantwoording vragen
- Verwijs naar concrete pagina's, cijfers of citaten uit het stuk
- Erken eerst wat positief is voordat je een kritisch punt maakt
- Benoem concrete impact op inwoners (gezinnen, ouderen, hulpdiensten)
- Wijs constructief op tegenstrijdigheden in het voorstel of tussen voorstel en eigen data
- Vraag of het college bereid is alternatieven te overwegen

Wees concreet, strategisch en bondig.`;

const REACTIE_SYSTEM_PROMPT = `Je bent David, de politieke medewerker van VVD-gemeenteraadslid Noor Sluijs-van Haastert in Baarn.

${NOOR_PROFILE}
${VVD_PROGRAM}
${BAARNSE_CONTEXT}

Schrijf een antwoord namens Noor op een bericht van een inwoner.

STIJLREGELS:
- Persoonlijk en warm, maar professioneel
- Toon begrip voor de situatie van de inwoner
- Verwijs naar concrete VVD-standpunten of acties waar relevant
- Beloof alleen wat je kunt waarmaken
- Gebruik "ik" (Noor schrijft zelf)
- Sluit af met een concreet vervolgstap (uitnodigen voor gesprek, doorverwijzen, oppakken in raad)
- Onderteken met: Met vriendelijke groet, Noor Sluijs-van Haastert, VVD Baarn`;

const DEBAT_SYSTEM_PROMPT = `Je bent David, de politieke medewerker van VVD-gemeenteraadslid Noor Sluijs-van Haastert in Baarn.

${NOOR_PROFILE}
${VVD_PROGRAM}
${BAARNSE_CONTEXT}

Bereid een debat voor. Geef:

## Kernpositie VVD
Wat is ons standpunt en waarom? (3-4 zinnen)

## Hoofdargumenten
3-5 sterke argumenten, elk met onderbouwing.

## Verwachte Tegenargumenten per Partij
Per relevante partij: wat zullen zij zeggen en hoe weerleg je het?
- **GroenLinks**: [argument] → [weerlegging]
- **D66**: [argument] → [weerlegging]
- **CDA**: [argument] → [weerlegging]
- **PvdA**: [argument] → [weerlegging]
(alleen partijen die relevant zijn voor dit onderwerp)

## Bondgenoten
Welke partijen steunen ons? Hoe betrek je ze?

## One-liners
3-5 korte, krachtige zinnen voor in het debat.

## Valkuilen
Waar moet Noor op letten? Wat niet zeggen?

Wees scherp, strategisch en concreet.`;

// ─── UTILS ───────────────────────────────────────────────────────────────────

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h = h & h; }
  return h.toString(36);
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

const TYPE_LABELS = {
  analyse: "Analyse",
  motie: "Motie",
  amendement: "Amendement",
  vragen: "Schriftelijke vragen",
  vergadering: "Vergadering",
  reactie: "Inwoner reactie",
  debat: "Debat",
};

function renderMarkdown(text) {
  if (!text) return "";
  const lines = text.split("\n");
  let html = "", inList = false;
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith("## ")) {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<h2 style="font-size:13px;font-weight:700;color:#ff5470;margin:26px 0 9px;padding-bottom:5px;border-bottom:1px solid #d9dde4;text-transform:uppercase;letter-spacing:.5px">${t.slice(3)}</h2>`;
    } else if (t.startsWith("- ") || t.startsWith("* ")) {
      if (!inList) { html += '<ul style="margin:5px 0;padding-left:18px">'; inList = true; }
      html += `<li style="margin:4px 0;line-height:1.65;color:#1b2d45">${fi(t.slice(2))}</li>`;
    } else if (/^\d+\.\s/.test(t)) {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<p style="margin:4px 0;line-height:1.65;color:#1b2d45">${fi(t)}</p>`;
    } else if (t === "") {
      if (inList) { html += "</ul>"; inList = false; }
      html += "<br/>";
    } else {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<p style="margin:5px 0;line-height:1.7;color:#1b2d45">${fi(t)}</p>`;
    }
  }
  if (inList) html += "</ul>";
  return html;
}

function fi(t) {
  return t
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#00214d;font-weight:600">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

async function loadPdfJs() {
  if (typeof window === "undefined") return null;
  if (window.pdfjsLib) return window.pdfjsLib;
  return new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    s.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      res(window.pdfjsLib);
    };
    s.onerror = () => rej(new Error("Kon PDF-bibliotheek niet laden"));
    document.head.appendChild(s);
  });
}

async function readFileAsText(file) {
  const ext = file.name.split(".").pop().toLowerCase();
  if (ext === "pdf") {
    const lib = await loadPdfJs();
    const pdf = await lib.getDocument({ data: await file.arrayBuffer() }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const c = await page.getTextContent();
      text += c.items.map((x) => x.str).join(" ") + "\n\n";
    }
    if (text.trim().length < 50) throw new Error("PDF_SCAN");
    return text;
  }
  if (ext === "docx" || ext === "doc") {
    const mammoth = (await import("mammoth")).default;
    return (await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() })).value;
  }
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = (e) => res(e.target.result);
    r.onerror = () => rej(new Error("Kon bestand niet lezen"));
    r.readAsText(file);
  });
}

async function callClaude(system, messages, maxTokens = 4000) {
  const res = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: maxTokens,
      system,
      messages,
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
  return data.content?.map((b) => b.text || "").join("\n") || "Geen antwoord.";
}

// ─── STORAGE (localStorage) ───────────────────────────────────────────────────

function lsGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, val); } catch {}
}
function lsDel(key) {
  try { localStorage.removeItem(key); } catch {}
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const inputStyle = {
  width: "100%", padding: "10px 14px", fontSize: 13,
  fontFamily: "inherit", color: "#00214d", background: "#f2f4f6",
  border: "1px solid #d9dde4", borderRadius: 6, outline: "none",
  boxSizing: "border-box",
};

const btnPrimary = {
  padding: "9px 22px", fontSize: 13, fontWeight: 600, color: "#fff",
  background: "#ff5470", border: "none", borderRadius: 6,
  cursor: "pointer", fontFamily: "inherit",
};

const btnSecondary = {
  padding: "8px 16px", fontSize: 12, fontWeight: 500, color: "#1b2d45",
  background: "#f2f4f6", border: "1px solid #d9dde4", borderRadius: 6,
  cursor: "pointer", fontFamily: "inherit",
};

// ─── COPY BUTTON ─────────────────────────────────────────────────────────────

function CopyBtn({ text }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta);
      ta.select(); document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setDone(true); setTimeout(() => setDone(false), 2000);
  };
  return (
    <button onClick={copy} style={{
      ...btnSecondary,
      color: done ? "#ff5470" : "#1b2d45",
      border: `1px solid ${done ? "#ff5470" : "#d9dde4"}`,
      background: done ? "rgba(255,84,112,0.10)" : "#f2f4f6",
    }}>
      {done ? "Gekopieerd ✓" : "Kopieer"}
    </button>
  );
}

// ─── FOLLOW-UP CHAT ───────────────────────────────────────────────────────────

function FollowUpChat({ docTitle, analysis }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  const sysPrompt = `Je bent David, politiek medewerker van VVD-raadslid Noor Sluijs-van Haastert in Baarn.\n${NOOR_PROFILE}\n${VVD_PROGRAM}\n${BAARNSE_CONTEXT}\n\nJe hebt zojuist dit document geanalyseerd:\nDOCUMENT: ${docTitle}\nANALYSE:\n${analysis}\n\nBeantwoord vervolgvragen concreet en strategisch vanuit VVD-perspectief.`;

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const q = input.trim(); setInput("");
    const next = [...msgs, { role: "user", content: q }];
    setMsgs(next); setLoading(true);
    try {
      const ans = await callClaude(sysPrompt, next.map((m) => ({ role: m.role, content: m.content })), 1500);
      setMsgs([...next, { role: "assistant", content: ans }]);
    } catch (e) {
      setMsgs([...next, { role: "assistant", content: "Fout: " + e.message }]);
    } finally { setLoading(false); }
  };

  return (
    <div style={{ marginTop: 28, borderTop: "1px solid #d9dde4", paddingTop: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#ff5470", textTransform: "uppercase", letterSpacing: .5, marginBottom: 14 }}>
        Vervolgvragen
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 14 }}>
        {msgs.length === 0 && <p style={{ fontSize: 12, color: "#1b2d45", fontStyle: "italic" }}>Stel een vraag over het document of de analyse...</p>}
        {msgs.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "90%" }}>
            <div style={{ fontSize: 10, color: "#1b2d45", marginBottom: 3, textAlign: m.role === "user" ? "right" : "left" }}>
              {m.role === "user" ? "Jij" : "David"}
            </div>
            <div style={{ background: m.role === "user" ? "rgba(255,84,112,0.10)" : "#e8ebf0", border: `1px solid ${m.role === "user" ? "#ff5470" : "#d9dde4"}`, borderRadius: 8, padding: "10px 14px", fontSize: 13 }}>
              {m.role === "assistant"
                ? <div dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} />
                : <span style={{ color: "#00214d" }}>{m.content}</span>}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: "flex-start" }}>
            <div style={{ fontSize: 10, color: "#1b2d45", marginBottom: 3 }}>David</div>
            <div style={{ background: "#e8ebf0", border: "1px solid #d9dde4", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#1b2d45" }}>Denkt na...</div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Vraag iets over de analyse... (Enter = verstuur)" rows={2}
          style={{ ...inputStyle, flex: 1, resize: "none" }} />
        <button onClick={send} disabled={!input.trim() || loading}
          style={{ ...btnPrimary, alignSelf: "flex-end", opacity: !input.trim() || loading ? 0.5 : 1 }}>
          Stuur
        </button>
      </div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

export default function David() {
  const [ready, setReady] = useState(false);
  const [authState, setAuthState] = useState("checking");
  const [pwInput, setPwInput] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [authErr, setAuthErr] = useState("");

  const [view, setView] = useState("input");
  const [docText, setDocText] = useState("");
  const [docTitle, setDocTitle] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState([]);
  const [selected, setSelected] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const [chatMsgs, setChatMsgs] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEnd = useRef(null);

  const [motieForm, setMotieForm] = useState({
    onderwerp: "", datum: "",
    agendapunt: "12. – Moties over niet geagendeerde onderwerpen",
    context: "", verzoeken: "", mede_indieners: "",
  });
  const [motieOutput, setMotieOutput] = useState("");
  const [motieEdited, setMotieEdited] = useState("");
  const [motieLoading, setMotieLoading] = useState(false);
  const [motieErr, setMotieErr] = useState("");

  const [amendForm, setAmendForm] = useState({
    onderwerp: "", datum: "", agendapunt: "", voorstel: "",
    wijzigingen: "", context: "", mede_indieners: "",
  });
  const [amendOutput, setAmendOutput] = useState("");
  const [amendEdited, setAmendEdited] = useState("");
  const [amendLoading, setAmendLoading] = useState(false);
  const [amendErr, setAmendErr] = useState("");

  const [vragenForm, setVragenForm] = useState({
    onderwerp: "", datum: "", aanleiding: "", vragen: "",
  });
  const [vragenOutput, setVragenOutput] = useState("");
  const [vragenEdited, setVragenEdited] = useState("");
  const [vragenLoading, setVragenLoading] = useState(false);
  const [vragenErr, setVragenErr] = useState("");

  const [vergaderText, setVergaderText] = useState("");
  const [vergaderTitle, setVergaderTitle] = useState("");
  const [vergaderResult, setVergaderResult] = useState("");
  const [vergaderLoading, setVergaderLoading] = useState(false);
  const [vergaderErr, setVergaderErr] = useState("");
  const [vergaderUploadLoading, setVergaderUploadLoading] = useState(false);

  const [reactieInwoner, setReactieInwoner] = useState("");
  const [reactieContext, setReactieContext] = useState("");
  const [reactieOutput, setReactieOutput] = useState("");
  const [reactieEdited, setReactieEdited] = useState("");
  const [reactieLoading, setReactieLoading] = useState(false);
  const [reactieErr, setReactieErr] = useState("");

  const [debatOnderwerp, setDebatOnderwerp] = useState("");
  const [debatContext, setDebatContext] = useState("");
  const [debatResult, setDebatResult] = useState("");
  const [debatLoading, setDebatLoading] = useState(false);
  const [debatErr, setDebatErr] = useState("");

  // Init (client-only)
  useEffect(() => {
    setReady(true);
    const pw = lsGet("david-pw");
    setAuthState(pw ? "login" : "setup");
    (async () => {
      // Eenmalige migratie van oude localStorage-archieven naar Redis
      if (lsGet("david-migrated") !== "1") {
        const raw = lsGet("david-analyses");
        let oldItems = [];
        try { oldItems = raw ? JSON.parse(raw) : []; } catch {}
        if (Array.isArray(oldItems) && oldItems.length > 0) {
          for (const item of oldItems.slice().reverse()) {
            await fetch("/api/analyses", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) }).catch(() => {});
          }
        }
        lsSet("david-migrated", "1");
      }
      const r = await fetch("/api/analyses").catch(() => null);
      if (r && r.ok) {
        const list = await r.json().catch(() => []);
        if (Array.isArray(list)) setSaved(list);
      }
    })();
  }, []);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMsgs, chatLoading]);

  if (!ready) return null;

  // ── AUTH ──
  const handleSetup = () => {
    if (pwInput.length < 4) { setAuthErr("Minimaal 4 tekens"); return; }
    if (pwInput !== pwConfirm) { setAuthErr("Wachtwoorden komen niet overeen"); return; }
    lsSet("david-pw", simpleHash(pwInput));
    setAuthState("authenticated"); setPwInput(""); setPwConfirm(""); setAuthErr("");
  };
  const handleLogin = () => {
    if (lsGet("david-pw") === simpleHash(pwInput)) {
      setAuthState("authenticated"); setPwInput(""); setAuthErr("");
    } else setAuthErr("Onjuist wachtwoord");
  };

  // ── UPLOAD ──
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files); if (!files.length) return;
    setUploadLoading(true); setError("");
    try {
      const results = [];
      for (const file of files) {
        const text = await readFileAsText(file);
        results.push({ name: file.name.replace(/\.[^.]+$/, ""), text });
      }
      const combined = results.map((r) => `--- ${r.name} ---\n${r.text}`).join("\n\n");
      setDocText((prev) => prev ? prev + "\n\n" + combined : combined);
      if (!docTitle) setDocTitle(results.length === 1 ? results[0].name : `${results.length} documenten`);
    } catch (err) {
      setError(err.message === "PDF_SCAN"
        ? "Gescande PDF — kopieer de tekst handmatig."
        : "Kon bestand niet lezen: " + err.message);
    } finally { setUploadLoading(false); e.target.value = ""; }
  };

  const saveToArchive = (type, title, content) => {
    const item = { id: Date.now().toString(36), type, title: title || TYPE_LABELS[type], date: new Date().toISOString(), content };
    const updated = [item, ...saved].slice(0, 50);
    setSaved(updated);
    fetch("/api/analyses", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) }).catch(() => {});
  };

  // ── ANALYSE ──
  const handleAnalyze = async () => {
    if (!docText.trim()) return;
    setLoading(true); setError(""); setAnalysis(""); setView("analysis");
    const title = docTitle.trim() || "Analyse " + new Date().toLocaleDateString("nl-NL");
    try {
      const result = await callClaude(SYSTEM_PROMPT, [{ role: "user", content: `Analyseer het volgende document:\n\nTITEL: ${title}\n\nINHOUD:\n${docText.slice(0, 30000)}` }], 5000);
      setAnalysis(result);
      saveToArchive("analyse", title, result);
    } catch (err) { setError("Analyse mislukt: " + err.message); }
    finally { setLoading(false); }
  };

  // ── CHAT ──
  const handleChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const q = chatInput.trim(); setChatInput("");
    const next = [...chatMsgs, { role: "user", content: q }];
    setChatMsgs(next); setChatLoading(true);
    try {
      const ans = await callClaude(CHAT_SYSTEM_PROMPT, next.map((m) => ({ role: m.role, content: m.content })), 2000);
      setChatMsgs([...next, { role: "assistant", content: ans }]);
    } catch (e) { setChatMsgs([...next, { role: "assistant", content: "Fout: " + e.message }]); }
    finally { setChatLoading(false); }
  };

  // ── MOTIE ──
  const handleMotie = async () => {
    if (!motieForm.onderwerp.trim()) { setMotieErr("Vul minimaal het onderwerp in."); return; }
    setMotieLoading(true); setMotieErr(""); setMotieOutput(""); setMotieEdited("");
    const prompt = `Schrijf een volledige gemeenteraadsmotie voor Baarn:

ONDERWERP: ${motieForm.onderwerp}
DATUM: ${motieForm.datum || "[datum in te vullen]"}
AGENDAPUNT: ${motieForm.agendapunt}
CONTEXT: ${motieForm.context || "(vul aan vanuit VVD-programma en Baarnse context)"}
VERZOEKEN: ${motieForm.verzoeken || "(genereer passende verzoeken)"}
MEDE-INDIENERS NAAST VVD: ${motieForm.mede_indieners || "(niet opgegeven)"}

Schrijf een complete, direct bruikbare motie. Begin met "Motie".`;
    try {
      const result = await callClaude(MOTIE_SYSTEM_PROMPT, [{ role: "user", content: prompt }], 3000);
      setMotieOutput(result); setMotieEdited(result);
      saveToArchive("motie", motieForm.onderwerp, result);
    } catch (e) { setMotieErr("Generatie mislukt: " + e.message); }
    finally { setMotieLoading(false); }
  };

  // ── AMENDEMENT ──
  const handleAmend = async () => {
    if (!amendForm.onderwerp.trim()) { setAmendErr("Vul minimaal het onderwerp in."); return; }
    setAmendLoading(true); setAmendErr(""); setAmendOutput(""); setAmendEdited("");
    const prompt = `Schrijf een volledig amendement voor Baarn:

ONDERWERP: ${amendForm.onderwerp}
DATUM: ${amendForm.datum || "[datum in te vullen]"}
AGENDAPUNT: ${amendForm.agendapunt || "[agendapunt]"}
OORSPRONKELIJK VOORSTEL: ${amendForm.voorstel || "(niet opgegeven)"}
GEWENSTE WIJZIGINGEN: ${amendForm.wijzigingen || "(genereer passende wijzigingen)"}
CONTEXT: ${amendForm.context || "(vul aan vanuit VVD-programma en Baarnse context)"}
MEDE-INDIENERS NAAST VVD: ${amendForm.mede_indieners || "(niet opgegeven)"}

Schrijf een compleet, direct bruikbaar amendement. Begin met "Amendement".`;
    try {
      const result = await callClaude(AMENDEMENT_SYSTEM_PROMPT, [{ role: "user", content: prompt }], 3000);
      setAmendOutput(result); setAmendEdited(result);
      saveToArchive("amendement", amendForm.onderwerp, result);
    } catch (e) { setAmendErr("Generatie mislukt: " + e.message); }
    finally { setAmendLoading(false); }
  };

  // ── SCHRIFTELIJKE VRAGEN ──
  const handleVragen = async () => {
    if (!vragenForm.onderwerp.trim()) { setVragenErr("Vul minimaal het onderwerp in."); return; }
    setVragenLoading(true); setVragenErr(""); setVragenOutput(""); setVragenEdited("");
    const prompt = `Schrijf schriftelijke vragen aan het college van B&W:

ONDERWERP: ${vragenForm.onderwerp}
DATUM: ${vragenForm.datum || "[datum in te vullen]"}
AANLEIDING: ${vragenForm.aanleiding || "(vul aan vanuit VVD-programma en Baarnse context)"}
SPECIFIEKE VRAGEN DIE GESTELD MOETEN WORDEN: ${vragenForm.vragen || "(genereer passende vragen)"}

Schrijf complete, direct bruikbare schriftelijke vragen.`;
    try {
      const result = await callClaude(VRAGEN_SYSTEM_PROMPT, [{ role: "user", content: prompt }], 2500);
      setVragenOutput(result); setVragenEdited(result);
      saveToArchive("vragen", vragenForm.onderwerp, result);
    } catch (e) { setVragenErr("Generatie mislukt: " + e.message); }
    finally { setVragenLoading(false); }
  };

  // ── VERGADERING VOORBEREIDER ──
  const handleVergaderUpload = async (e) => {
    const files = Array.from(e.target.files); if (!files.length) return;
    setVergaderUploadLoading(true); setVergaderErr("");
    try {
      const results = [];
      for (const file of files) {
        const text = await readFileAsText(file);
        results.push({ name: file.name.replace(/\.[^.]+$/, ""), text });
      }
      const combined = results.map((r) => `--- ${r.name} ---\n${r.text}`).join("\n\n");
      setVergaderText((prev) => prev ? prev + "\n\n" + combined : combined);
      if (!vergaderTitle) setVergaderTitle(results.length === 1 ? results[0].name : `Vergadering ${new Date().toLocaleDateString("nl-NL")}`);
    } catch (err) {
      setVergaderErr(err.message === "PDF_SCAN"
        ? "Gescande PDF — kopieer de tekst handmatig."
        : "Kon bestand niet lezen: " + err.message);
    } finally { setVergaderUploadLoading(false); e.target.value = ""; }
  };

  const handleVergadering = async () => {
    if (!vergaderText.trim()) return;
    setVergaderLoading(true); setVergaderErr(""); setVergaderResult("");
    const title = vergaderTitle.trim() || "Vergadering " + new Date().toLocaleDateString("nl-NL");
    try {
      const result = await callClaude(VERGADERING_SYSTEM_PROMPT, [{ role: "user", content: `Bereid de volgende vergadering voor. Analyseer elk agendapunt:\n\n${vergaderText.slice(0, 30000)}` }], 6000);
      setVergaderResult(result);
      saveToArchive("vergadering", title, result);
    } catch (e) { setVergaderErr("Voorbereiding mislukt: " + e.message); }
    finally { setVergaderLoading(false); }
  };

  // ── INWONER REACTIE ──
  const handleReactie = async () => {
    if (!reactieInwoner.trim()) { setReactieErr("Plak het bericht van de inwoner."); return; }
    setReactieLoading(true); setReactieErr(""); setReactieOutput(""); setReactieEdited("");
    const prompt = `Schrijf een antwoord op het volgende bericht van een inwoner:

BERICHT INWONER:
${reactieInwoner}

${reactieContext ? `EXTRA CONTEXT / INSTRUCTIES:\n${reactieContext}` : ""}

Schrijf een persoonlijk, warm maar professioneel antwoord namens Noor.`;
    try {
      const result = await callClaude(REACTIE_SYSTEM_PROMPT, [{ role: "user", content: prompt }], 1500);
      setReactieOutput(result); setReactieEdited(result);
      const title = reactieInwoner.trim().split("\n")[0].slice(0, 60) || "Inwoner reactie";
      saveToArchive("reactie", title, result);
    } catch (e) { setReactieErr("Generatie mislukt: " + e.message); }
    finally { setReactieLoading(false); }
  };

  // ── DEBAT VOORBEREIDER ──
  const handleDebat = async () => {
    if (!debatOnderwerp.trim()) { setDebatErr("Vul het debatonderwerp in."); return; }
    setDebatLoading(true); setDebatErr(""); setDebatResult("");
    const prompt = `Bereid een debat voor over het volgende onderwerp:

ONDERWERP: ${debatOnderwerp}
${debatContext ? `EXTRA CONTEXT:\n${debatContext}` : ""}

Geef een complete debatvoorbereiding.`;
    try {
      const result = await callClaude(DEBAT_SYSTEM_PROMPT, [{ role: "user", content: prompt }], 4000);
      setDebatResult(result);
      saveToArchive("debat", debatOnderwerp, result);
    } catch (e) { setDebatErr("Voorbereiding mislukt: " + e.message); }
    finally { setDebatLoading(false); }
  };

  const handleDelete = (id) => {
    const updated = saved.filter((a) => a.id !== id);
    setSaved(updated);
    fetch(`/api/analyses?id=${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {});
    if (selected?.id === id) setSelected(null);
  };

  const navItems = [
    { key: "input", label: "Analyse" },
    { key: "vergadering", label: "Vergadering" },
    { key: "motie", label: "Motie" },
    { key: "amendement", label: "Amendement" },
    { key: "vragen", label: "Vragen" },
    { key: "reactie", label: "Inwoner" },
    { key: "debat", label: "Debat" },
    { key: "chat", label: "Overleg" },
    { key: "history", label: "Archief" },
    { key: "profiel", label: "David" },
  ];
  const activeNav = view === "analysis" ? "input" : view;

  // ── AUTH SCREENS ──
  if (authState !== "authenticated") return (
    <div style={{ background: "#fffffe", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',system-ui,sans-serif", color: "#00214d" }}>
      <div style={{ background: "#f2f4f6", border: "1px solid #d9dde4", borderRadius: 12, padding: "40px 36px", width: 360, maxWidth: "90vw" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: 2, color: "#ff5470", textTransform: "uppercase" }}>David</div>
        </div>
        {authState === "setup" ? (
          <>
            <p style={{ fontSize: 12, color: "#1b2d45", marginBottom: 16, textAlign: "center" }}>Stel een wachtwoord in om David te beveiligen.</p>
            <input type="password" placeholder="Wachtwoord" value={pwInput} onChange={(e) => { setPwInput(e.target.value); setAuthErr(""); }} onKeyDown={(e) => e.key === "Enter" && document.getElementById("pwc")?.focus()} style={inputStyle} />
            <input id="pwc" type="password" placeholder="Bevestig wachtwoord" value={pwConfirm} onChange={(e) => { setPwConfirm(e.target.value); setAuthErr(""); }} onKeyDown={(e) => e.key === "Enter" && handleSetup()} style={{ ...inputStyle, marginTop: 10 }} />
            <button onClick={handleSetup} style={{ ...btnPrimary, marginTop: 16, width: "100%" }}>Instellen</button>
          </>
        ) : (
          <>
            <input type="password" placeholder="Wachtwoord" value={pwInput} autoFocus onChange={(e) => { setPwInput(e.target.value); setAuthErr(""); }} onKeyDown={(e) => e.key === "Enter" && handleLogin()} style={inputStyle} />
            <button onClick={handleLogin} style={{ ...btnPrimary, marginTop: 16, width: "100%" }}>Inloggen</button>
            <button onClick={() => { if (confirm("Wachtwoord resetten?")) { lsDel("david-pw"); setAuthState("setup"); setPwInput(""); setAuthErr(""); } }}
              style={{ background: "none", border: "none", color: "#1b2d45", fontSize: 11, cursor: "pointer", fontFamily: "inherit", marginTop: 12, display: "block", width: "100%", textAlign: "center" }}>
              Wachtwoord vergeten?
            </button>
          </>
        )}
        {authErr && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 10, textAlign: "center" }}>{authErr}</p>}
      </div>
    </div>
  );

  // ── MAIN APP ──
  return (
    <div style={{ background: "#fffffe", minHeight: "100vh", fontFamily: "'Inter',system-ui,sans-serif", color: "#00214d", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 24px", borderBottom: "1px solid #d9dde4", background: "#f2f4f6", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: 1.5, color: "#ff5470", textTransform: "uppercase" }}>David</span>

        </div>
        <nav style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {navItems.map((tab) => (
            <button key={tab.key} onClick={() => { setView(tab.key); setSelected(null); }}
              style={{ padding: "6px 13px", fontSize: 12, fontWeight: activeNav === tab.key ? 600 : 400, color: activeNav === tab.key ? "#ff5470" : "#1b2d45", background: activeNav === tab.key ? "rgba(255,84,112,0.10)" : "transparent", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "inherit" }}>
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Content */}
      <main style={{ flex: 1, overflow: "auto", padding: "24px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>

          {/* ANALYSE INPUT */}
          {view === "input" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 28, padding: "20px 24px", background: "#f2f4f6", borderRadius: 12, border: "1px solid #d9dde4" }}>
                <img src="/david.png" alt="David" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#00214d", marginBottom: 3 }}>Hoi Noor, waarmee kan ik je helpen?</div>
                  <div style={{ fontSize: 13, color: "#1b2d45", lineHeight: 1.5 }}>Upload een document voor analyse, of kies een tool in het menu.</div>
                </div>
              </div>
              <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Document Analyseren</h1>
              <p style={{ fontSize: 13, color: "#1b2d45", marginBottom: 24 }}>Upload een PDF, Word of tekstbestand, of plak de inhoud hieronder.</p>
              <input type="text" placeholder="Titel van het document" value={docTitle} onChange={(e) => setDocTitle(e.target.value)} style={{ ...inputStyle, marginBottom: 12 }} />
              <textarea placeholder="Plak hier de tekst van het document..." value={docText} onChange={(e) => setDocText(e.target.value)} style={{ ...inputStyle, minHeight: 220, resize: "vertical", lineHeight: 1.6 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
                <label style={{ padding: "8px 14px", fontSize: 12, color: uploadLoading ? "#ff5470" : "#1b2d45", background: "#f2f4f6", border: `1px solid ${uploadLoading ? "#ff5470" : "#d9dde4"}`, borderRadius: 6, cursor: uploadLoading ? "wait" : "pointer", fontFamily: "inherit" }}>
                  {uploadLoading ? "Verwerken..." : "Bestanden uploaden (.pdf, .docx, .txt)"}
                  <input type="file" accept=".txt,.md,.doc,.docx,.pdf" multiple onChange={handleUpload} style={{ display: "none" }} disabled={uploadLoading} />
                </label>
                <span style={{ fontSize: 11, color: "#1b2d45", flex: 1 }}>{docText.length > 0 ? `${docText.length.toLocaleString()} tekens` : ""}</span>
                <button onClick={handleAnalyze} disabled={!docText.trim() || loading}
                  style={{ ...btnPrimary, opacity: !docText.trim() || loading ? 0.5 : 1, cursor: !docText.trim() || loading ? "not-allowed" : "pointer" }}>
                  {loading ? "Bezig..." : "Analyseren →"}
                </button>
              </div>
              {error && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 10 }}>{error}</p>}
            </div>
          )}

          {/* ANALYSE OUTPUT */}
          {view === "analysis" && (
            <div>
              <button onClick={() => { setView("input"); setAnalysis(""); setDocText(""); setDocTitle(""); }}
                style={{ background: "none", border: "none", color: "#ff5470", fontSize: 12, cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: 20 }}>
                ← Nieuwe analyse
              </button>
              {loading && (
                <div style={{ textAlign: "center", padding: 60 }}>
                  <div style={{ color: "#ff5470", fontSize: 14, marginBottom: 8 }}>David analyseert...</div>
                  <div style={{ color: "#1b2d45", fontSize: 12 }}>Even geduld bij lange documenten.</div>
                  <style>{`@keyframes bar{0%,100%{width:40px;opacity:.3}50%{width:80px;opacity:1}}`}</style>
                  <div style={{ width: 40, height: 3, background: "#ff5470", borderRadius: 2, margin: "20px auto", animation: "bar 1.5s infinite" }} />
                </div>
              )}
              {analysis && (
                <div style={{ background: "#f2f4f6", border: "1px solid #d9dde4", borderRadius: 10, padding: "26px 30px" }}>
                  <div style={{ fontSize: 10, color: "#ff5470", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Analyse</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                    <h2 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{docTitle || "Document"}</h2>
                    <CopyBtn text={analysis} />
                  </div>
                  <div style={{ fontSize: 13 }} dangerouslySetInnerHTML={{ __html: renderMarkdown(analysis) }} />
                  <FollowUpChat docTitle={docTitle} analysis={analysis} />
                </div>
              )}
              {error && !loading && <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid #ef4444", borderRadius: 8, padding: 16 }}><p style={{ color: "#ef4444", fontSize: 13 }}>{error}</p></div>}
            </div>
          )}

          {/* MOTIE */}
          {view === "motie" && (
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Motie Schrijven</h1>
              <p style={{ fontSize: 13, color: "#1b2d45", marginBottom: 24 }}>Vul de details in. David schrijft een complete motie in de juiste Baarnse format.</p>
              <div style={{ background: "#f2f4f6", border: "1px solid #d9dde4", borderRadius: 10, padding: "22px 26px", marginBottom: 20 }}>
                <div style={{ display: "grid", gap: 14 }}>
                  {[
                    { key: "onderwerp", label: "Onderwerp *", placeholder: "bv. Verbetering straatverlichting Nassaulaan" },
                    { key: "datum", label: "Datum raadsvergadering", placeholder: "bv. 25 maart 2026" },
                    { key: "agendapunt", label: "Agendapunt", placeholder: "" },
                    { key: "mede_indieners", label: "Mede-indieners (naast VVD)", placeholder: "bv. VoorBaarn, 50PLUS" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#1b2d45", textTransform: "uppercase", letterSpacing: .5, marginBottom: 5 }}>{f.label}</label>
                      <input type="text" placeholder={f.placeholder} value={motieForm[f.key]}
                        onChange={(e) => setMotieForm((p) => ({ ...p, [f.key]: e.target.value }))}
                        style={inputStyle} />
                    </div>
                  ))}
                  {[
                    { key: "context", label: "Context & aanleiding", placeholder: "Beschrijf het probleem. David vult aan vanuit VVD-programma en Baarnse context." },
                    { key: "verzoeken", label: "Wat moet het college doen?", placeholder: "Beschrijf de gewenste acties. David formuleert dit om naar formele verzoeken." },
                  ].map((f) => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#1b2d45", textTransform: "uppercase", letterSpacing: .5, marginBottom: 5 }}>{f.label}</label>
                      <textarea placeholder={f.placeholder} value={motieForm[f.key]}
                        onChange={(e) => setMotieForm((p) => ({ ...p, [f.key]: e.target.value }))}
                        rows={3} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end" }}>
                  <button onClick={handleMotie} disabled={!motieForm.onderwerp.trim() || motieLoading}
                    style={{ ...btnPrimary, opacity: !motieForm.onderwerp.trim() || motieLoading ? 0.5 : 1 }}>
                    {motieLoading ? "Bezig..." : "Genereer Motie →"}
                  </button>
                </div>
                {motieErr && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 10 }}>{motieErr}</p>}
              </div>
              {motieEdited && (
                <div style={{ background: "#f2f4f6", border: "1px solid #d9dde4", borderRadius: 10, padding: "22px 26px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: 1 }}>Concept Motie — Bewerkbaar</div>
                      <div style={{ fontSize: 11, color: "#1b2d45", marginTop: 2 }}>Pas de tekst direct aan. Kopieer als het klaar is.</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setMotieEdited(motieOutput)} style={{ ...btnSecondary, fontSize: 11 }}>Reset</button>
                      <CopyBtn text={motieEdited} />
                    </div>
                  </div>
                  <textarea value={motieEdited} onChange={(e) => setMotieEdited(e.target.value)}
                    style={{ ...inputStyle, minHeight: 520, resize: "vertical", lineHeight: 1.8, fontSize: 13, fontFamily: "'Courier New',monospace", whiteSpace: "pre-wrap" }} />
                </div>
              )}
            </div>
          )}

          {/* AMENDEMENT */}
          {view === "amendement" && (
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Amendement Schrijven</h1>
              <p style={{ fontSize: 13, color: "#1b2d45", marginBottom: 24 }}>Wijzig een raadsvoorstel. David schrijft een compleet amendement in de Baarnse format.</p>
              <div style={{ background: "#f2f4f6", border: "1px solid #d9dde4", borderRadius: 10, padding: "22px 26px", marginBottom: 20 }}>
                <div style={{ display: "grid", gap: 14 }}>
                  {[
                    { key: "onderwerp", label: "Onderwerp *", placeholder: "bv. Wijziging bestemmingsplan Baarnsche Zoom" },
                    { key: "datum", label: "Datum raadsvergadering", placeholder: "bv. 25 maart 2026" },
                    { key: "agendapunt", label: "Agendapunt", placeholder: "bv. 7. – Vaststelling bestemmingsplan" },
                    { key: "mede_indieners", label: "Mede-indieners (naast VVD)", placeholder: "bv. VoorBaarn, 50PLUS" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#1b2d45", textTransform: "uppercase", letterSpacing: .5, marginBottom: 5 }}>{f.label}</label>
                      <input type="text" placeholder={f.placeholder} value={amendForm[f.key]}
                        onChange={(e) => setAmendForm((p) => ({ ...p, [f.key]: e.target.value }))}
                        style={inputStyle} />
                    </div>
                  ))}
                  {[
                    { key: "voorstel", label: "Oorspronkelijk voorstel", placeholder: "Wat staat er in het raadsvoorstel dat je wilt wijzigen?" },
                    { key: "wijzigingen", label: "Gewenste wijzigingen", placeholder: "Wat moet er anders? David formuleert dit in formele besluitpunten." },
                    { key: "context", label: "Context & motivatie", placeholder: "Waarom is deze wijziging nodig vanuit VVD-perspectief?" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#1b2d45", textTransform: "uppercase", letterSpacing: .5, marginBottom: 5 }}>{f.label}</label>
                      <textarea placeholder={f.placeholder} value={amendForm[f.key]}
                        onChange={(e) => setAmendForm((p) => ({ ...p, [f.key]: e.target.value }))}
                        rows={3} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end" }}>
                  <button onClick={handleAmend} disabled={!amendForm.onderwerp.trim() || amendLoading}
                    style={{ ...btnPrimary, opacity: !amendForm.onderwerp.trim() || amendLoading ? 0.5 : 1 }}>
                    {amendLoading ? "Bezig..." : "Genereer Amendement →"}
                  </button>
                </div>
                {amendErr && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 10 }}>{amendErr}</p>}
              </div>
              {amendEdited && (
                <div style={{ background: "#f2f4f6", border: "1px solid #d9dde4", borderRadius: 10, padding: "22px 26px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: 1 }}>Concept Amendement — Bewerkbaar</div>
                      <div style={{ fontSize: 11, color: "#1b2d45", marginTop: 2 }}>Pas de tekst direct aan. Kopieer als het klaar is.</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setAmendEdited(amendOutput)} style={{ ...btnSecondary, fontSize: 11 }}>Reset</button>
                      <CopyBtn text={amendEdited} />
                    </div>
                  </div>
                  <textarea value={amendEdited} onChange={(e) => setAmendEdited(e.target.value)}
                    style={{ ...inputStyle, minHeight: 520, resize: "vertical", lineHeight: 1.8, fontSize: 13, fontFamily: "'Courier New',monospace", whiteSpace: "pre-wrap" }} />
                </div>
              )}
            </div>
          )}

          {/* SCHRIFTELIJKE VRAGEN */}
          {view === "vragen" && (
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Schriftelijke Vragen</h1>
              <p style={{ fontSize: 13, color: "#1b2d45", marginBottom: 24 }}>Stel formele vragen aan het college. David schrijft ze in het juiste format (art. 41 RvO).</p>
              <div style={{ background: "#f2f4f6", border: "1px solid #d9dde4", borderRadius: 10, padding: "22px 26px", marginBottom: 20 }}>
                <div style={{ display: "grid", gap: 14 }}>
                  {[
                    { key: "onderwerp", label: "Onderwerp *", placeholder: "bv. Stand van zaken wachtlijsten jeugdzorg Baarn" },
                    { key: "datum", label: "Datum", placeholder: "bv. 12 april 2026" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#1b2d45", textTransform: "uppercase", letterSpacing: .5, marginBottom: 5 }}>{f.label}</label>
                      <input type="text" placeholder={f.placeholder} value={vragenForm[f.key]}
                        onChange={(e) => setVragenForm((p) => ({ ...p, [f.key]: e.target.value }))}
                        style={inputStyle} />
                    </div>
                  ))}
                  {[
                    { key: "aanleiding", label: "Aanleiding", placeholder: "Wat is de directe aanleiding? Nieuwsbericht, signaal van inwoner, eerdere toezegging..." },
                    { key: "vragen", label: "Specifieke vragen (optioneel)", placeholder: "Welke vragen wil je zeker gesteld hebben? David vult aan en formuleert formeel." },
                  ].map((f) => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#1b2d45", textTransform: "uppercase", letterSpacing: .5, marginBottom: 5 }}>{f.label}</label>
                      <textarea placeholder={f.placeholder} value={vragenForm[f.key]}
                        onChange={(e) => setVragenForm((p) => ({ ...p, [f.key]: e.target.value }))}
                        rows={3} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end" }}>
                  <button onClick={handleVragen} disabled={!vragenForm.onderwerp.trim() || vragenLoading}
                    style={{ ...btnPrimary, opacity: !vragenForm.onderwerp.trim() || vragenLoading ? 0.5 : 1 }}>
                    {vragenLoading ? "Bezig..." : "Genereer Vragen →"}
                  </button>
                </div>
                {vragenErr && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 10 }}>{vragenErr}</p>}
              </div>
              {vragenEdited && (
                <div style={{ background: "#f2f4f6", border: "1px solid #d9dde4", borderRadius: 10, padding: "22px 26px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: 1 }}>Concept Vragen — Bewerkbaar</div>
                      <div style={{ fontSize: 11, color: "#1b2d45", marginTop: 2 }}>Pas de tekst direct aan. Kopieer als het klaar is.</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setVragenEdited(vragenOutput)} style={{ ...btnSecondary, fontSize: 11 }}>Reset</button>
                      <CopyBtn text={vragenEdited} />
                    </div>
                  </div>
                  <textarea value={vragenEdited} onChange={(e) => setVragenEdited(e.target.value)}
                    style={{ ...inputStyle, minHeight: 420, resize: "vertical", lineHeight: 1.8, fontSize: 13, fontFamily: "'Courier New',monospace", whiteSpace: "pre-wrap" }} />
                </div>
              )}
            </div>
          )}

          {/* VERGADERING VOORBEREIDER */}
          {view === "vergadering" && (
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Vergadering Voorbereiden</h1>
              <p style={{ fontSize: 13, color: "#1b2d45", marginBottom: 24 }}>Upload de raadsagenda en bijlagen. David geeft per agendapunt een VVD-briefing.</p>
              <input type="text" placeholder="Titel vergadering" value={vergaderTitle} onChange={(e) => setVergaderTitle(e.target.value)} style={{ ...inputStyle, marginBottom: 12 }} />
              <textarea placeholder="Plak hier de agenda en/of raadsstukken..." value={vergaderText} onChange={(e) => setVergaderText(e.target.value)} style={{ ...inputStyle, minHeight: 220, resize: "vertical", lineHeight: 1.6 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
                <label style={{ padding: "8px 14px", fontSize: 12, color: vergaderUploadLoading ? "#ff5470" : "#1b2d45", background: "#f2f4f6", border: `1px solid ${vergaderUploadLoading ? "#ff5470" : "#d9dde4"}`, borderRadius: 6, cursor: vergaderUploadLoading ? "wait" : "pointer", fontFamily: "inherit" }}>
                  {vergaderUploadLoading ? "Verwerken..." : "Bestanden uploaden (.pdf, .docx, .txt)"}
                  <input type="file" accept=".txt,.md,.doc,.docx,.pdf" multiple onChange={handleVergaderUpload} style={{ display: "none" }} disabled={vergaderUploadLoading} />
                </label>
                <span style={{ fontSize: 11, color: "#1b2d45", flex: 1 }}>{vergaderText.length > 0 ? `${vergaderText.length.toLocaleString()} tekens` : ""}</span>
                <button onClick={handleVergadering} disabled={!vergaderText.trim() || vergaderLoading}
                  style={{ ...btnPrimary, opacity: !vergaderText.trim() || vergaderLoading ? 0.5 : 1, cursor: !vergaderText.trim() || vergaderLoading ? "not-allowed" : "pointer" }}>
                  {vergaderLoading ? "Bezig..." : "Voorbereiden →"}
                </button>
              </div>
              {vergaderErr && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 10 }}>{vergaderErr}</p>}
              {vergaderLoading && (
                <div style={{ textAlign: "center", padding: 60 }}>
                  <div style={{ color: "#ff5470", fontSize: 14, marginBottom: 8 }}>David bereidt voor...</div>
                  <div style={{ color: "#1b2d45", fontSize: 12 }}>Even geduld, alle agendapunten worden doorgenomen.</div>
                  <style>{`@keyframes bar{0%,100%{width:40px;opacity:.3}50%{width:80px;opacity:1}}`}</style>
                  <div style={{ width: 40, height: 3, background: "#ff5470", borderRadius: 2, margin: "20px auto", animation: "bar 1.5s infinite" }} />
                </div>
              )}
              {vergaderResult && (
                <div style={{ background: "#f2f4f6", border: "1px solid #d9dde4", borderRadius: 10, padding: "26px 30px", marginTop: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                    <div>
                      <div style={{ fontSize: 10, color: "#ff5470", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Vergaderbriefing</div>
                      <h2 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{vergaderTitle || "Vergadering"}</h2>
                    </div>
                    <CopyBtn text={vergaderResult} />
                  </div>
                  <div style={{ fontSize: 13 }} dangerouslySetInnerHTML={{ __html: renderMarkdown(vergaderResult) }} />
                </div>
              )}
            </div>
          )}

          {/* INWONER REACTIE */}
          {view === "reactie" && (
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Inwoner Beantwoorden</h1>
              <p style={{ fontSize: 13, color: "#1b2d45", marginBottom: 24 }}>Plak het bericht van de inwoner. David schrijft een persoonlijk antwoord namens Noor.</p>
              <div style={{ background: "#f2f4f6", border: "1px solid #d9dde4", borderRadius: 10, padding: "22px 26px", marginBottom: 20 }}>
                <div style={{ display: "grid", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#1b2d45", textTransform: "uppercase", letterSpacing: .5, marginBottom: 5 }}>Bericht van inwoner *</label>
                    <textarea placeholder="Plak hier het bericht, e-mail of vraag van de inwoner..." value={reactieInwoner} onChange={(e) => setReactieInwoner(e.target.value)}
                      rows={6} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#1b2d45", textTransform: "uppercase", letterSpacing: .5, marginBottom: 5 }}>Extra context of instructies (optioneel)</label>
                    <textarea placeholder="bv. 'Verwijs naar de commissievergadering van vorige week' of 'Houd het kort'" value={reactieContext} onChange={(e) => setReactieContext(e.target.value)}
                      rows={2} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
                  </div>
                </div>
                <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end" }}>
                  <button onClick={handleReactie} disabled={!reactieInwoner.trim() || reactieLoading}
                    style={{ ...btnPrimary, opacity: !reactieInwoner.trim() || reactieLoading ? 0.5 : 1 }}>
                    {reactieLoading ? "Bezig..." : "Schrijf Antwoord →"}
                  </button>
                </div>
                {reactieErr && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 10 }}>{reactieErr}</p>}
              </div>
              {reactieEdited && (
                <div style={{ background: "#f2f4f6", border: "1px solid #d9dde4", borderRadius: 10, padding: "22px 26px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: 1 }}>Concept Antwoord — Bewerkbaar</div>
                      <div style={{ fontSize: 11, color: "#1b2d45", marginTop: 2 }}>Pas de tekst direct aan. Kopieer als het klaar is.</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setReactieEdited(reactieOutput)} style={{ ...btnSecondary, fontSize: 11 }}>Reset</button>
                      <CopyBtn text={reactieEdited} />
                    </div>
                  </div>
                  <textarea value={reactieEdited} onChange={(e) => setReactieEdited(e.target.value)}
                    style={{ ...inputStyle, minHeight: 300, resize: "vertical", lineHeight: 1.8, fontSize: 13, fontFamily: "'Courier New',monospace", whiteSpace: "pre-wrap" }} />
                </div>
              )}
            </div>
          )}

          {/* DEBAT VOORBEREIDER */}
          {view === "debat" && (
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Debat Voorbereiden</h1>
              <p style={{ fontSize: 13, color: "#1b2d45", marginBottom: 24 }}>David bereidt argumenten, tegenargumenten en one-liners voor.</p>
              <div style={{ background: "#f2f4f6", border: "1px solid #d9dde4", borderRadius: 10, padding: "22px 26px", marginBottom: 20 }}>
                <div style={{ display: "grid", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#1b2d45", textTransform: "uppercase", letterSpacing: .5, marginBottom: 5 }}>Debatonderwerp *</label>
                    <input type="text" placeholder="bv. RES-bod windenergie regio Amersfoort" value={debatOnderwerp} onChange={(e) => setDebatOnderwerp(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#1b2d45", textTransform: "uppercase", letterSpacing: .5, marginBottom: 5 }}>Extra context (optioneel)</label>
                    <textarea placeholder="Relevante achtergrond, eerdere standpunten, specifieke focus..." value={debatContext} onChange={(e) => setDebatContext(e.target.value)}
                      rows={4} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
                  </div>
                </div>
                <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end" }}>
                  <button onClick={handleDebat} disabled={!debatOnderwerp.trim() || debatLoading}
                    style={{ ...btnPrimary, opacity: !debatOnderwerp.trim() || debatLoading ? 0.5 : 1 }}>
                    {debatLoading ? "Bezig..." : "Voorbereiden →"}
                  </button>
                </div>
                {debatErr && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 10 }}>{debatErr}</p>}
              </div>
              {debatLoading && (
                <div style={{ textAlign: "center", padding: 60 }}>
                  <div style={{ color: "#ff5470", fontSize: 14, marginBottom: 8 }}>David bereidt het debat voor...</div>
                  <style>{`@keyframes bar{0%,100%{width:40px;opacity:.3}50%{width:80px;opacity:1}}`}</style>
                  <div style={{ width: 40, height: 3, background: "#ff5470", borderRadius: 2, margin: "20px auto", animation: "bar 1.5s infinite" }} />
                </div>
              )}
              {debatResult && (
                <div style={{ background: "#f2f4f6", border: "1px solid #d9dde4", borderRadius: 10, padding: "26px 30px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                    <div>
                      <div style={{ fontSize: 10, color: "#ff5470", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Debatvoorbereiding</div>
                      <h2 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{debatOnderwerp}</h2>
                    </div>
                    <CopyBtn text={debatResult} />
                  </div>
                  <div style={{ fontSize: 13 }} dangerouslySetInnerHTML={{ __html: renderMarkdown(debatResult) }} />
                </div>
              )}
            </div>
          )}

          {/* CHAT */}
          {view === "chat" && (
            <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 130px)" }}>
              <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4, flexShrink: 0 }}>Overleg met David</h1>
              <p style={{ fontSize: 13, color: "#1b2d45", marginBottom: 16, flexShrink: 0 }}>Bespreek strategie, bereid een debat voor, of test argumenten.</p>
              <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column", gap: 14, paddingBottom: 14 }}>
                {chatMsgs.length === 0 && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px", color: "#1b2d45" }}>
                    <img src="/david.png" alt="David" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", marginBottom: 14 }} />
                    <div style={{ fontSize: 13, textAlign: "center" }}>Begin het gesprek. David kent het VVD-programma en de Baarnse context.</div>
                  </div>
                )}
                {chatMsgs.map((m, i) => (
                  <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%", display: "flex", gap: 8, flexDirection: m.role === "user" ? "row-reverse" : "row", alignItems: "flex-start" }}>
                    {m.role === "assistant" && <img src="/david.png" alt="David" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", marginTop: 18, flexShrink: 0 }} />}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 10, color: "#1b2d45", marginBottom: 3, textAlign: m.role === "user" ? "right" : "left" }}>{m.role === "user" ? "Jij" : "David"}</div>
                      <div style={{ background: m.role === "user" ? "rgba(255,84,112,0.10)" : "#f2f4f6", border: `1px solid ${m.role === "user" ? "#ff5470" : "#d9dde4"}`, borderRadius: 10, padding: "11px 15px", fontSize: 13, lineHeight: 1.7 }}>
                        {m.role === "assistant" ? <div dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} /> : <div style={{ whiteSpace: "pre-wrap", color: "#00214d" }}>{m.content}</div>}
                      </div>
                    </div>
                  </div>
                ))}
                {chatLoading && <div style={{ alignSelf: "flex-start" }}><div style={{ fontSize: 10, color: "#1b2d45", marginBottom: 3 }}>David</div><div style={{ background: "#f2f4f6", border: "1px solid #d9dde4", borderRadius: 10, padding: "11px 15px", fontSize: 13, color: "#1b2d45" }}>Denkt na...</div></div>}
                <div ref={chatEnd} />
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0, paddingTop: 8, borderTop: "1px solid #d9dde4" }}>
                <textarea value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleChat(); } }} placeholder="Typ je vraag... (Enter = verstuur)" rows={2} style={{ ...inputStyle, flex: 1, resize: "none" }} />
                <button onClick={handleChat} disabled={!chatInput.trim() || chatLoading} style={{ ...btnPrimary, alignSelf: "flex-end", opacity: !chatInput.trim() || chatLoading ? 0.5 : 1 }}>Stuur</button>
              </div>
            </div>
          )}

          {/* ARCHIEF */}
          {view === "history" && !selected && (
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Archief</h1>
              <p style={{ fontSize: 13, color: "#1b2d45", marginBottom: 24 }}>{saved.length} opgeslagen item{saved.length !== 1 ? "s" : ""}.</p>
              {saved.length === 0
                ? <div style={{ textAlign: "center", padding: 60, color: "#1b2d45", fontSize: 13 }}>Nog niets opgeslagen.</div>
                : <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {saved.map((a) => (
                    <div key={a.id} onClick={() => setSelected(a)}
                      style={{ background: "#f2f4f6", border: "1px solid #d9dde4", borderRadius: 8, padding: "13px 17px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#e8ebf0"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "#f2f4f6"}>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: 9, color: "#ff5470", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{TYPE_LABELS[a.type] || "Analyse"}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.title}</div>
                        <div style={{ fontSize: 11, color: "#1b2d45" }}>{formatDate(a.date)}</div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(a.id); }}
                        style={{ background: "none", border: "none", color: "#1b2d45", fontSize: 11, cursor: "pointer", fontFamily: "inherit", padding: "4px 8px" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#ef4444"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#1b2d45"}>
                        verwijder
                      </button>
                    </div>
                  ))}
                </div>}
            </div>
          )}

          {/* SELECTED */}
          {view === "history" && selected && (() => {
            const body = selected.content || selected.analysis || "";
            const type = selected.type || "analyse";
            return (
              <div>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#ff5470", fontSize: 12, cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: 20 }}>← Terug naar archief</button>
                <div style={{ background: "#f2f4f6", border: "1px solid #d9dde4", borderRadius: 10, padding: "26px 30px" }}>
                  <div style={{ fontSize: 10, color: "#ff5470", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{TYPE_LABELS[type] || "Analyse"}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <h2 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{selected.title}</h2>
                    <CopyBtn text={body} />
                  </div>
                  <div style={{ fontSize: 11, color: "#1b2d45", marginBottom: 18 }}>{formatDate(selected.date)}</div>
                  <div style={{ fontSize: 13 }} dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }} />
                  {type === "analyse" && <FollowUpChat docTitle={selected.title} analysis={body} />}
                </div>
              </div>
            );
          })()}

          {/* PROFIEL */}
          {view === "profiel" && (
            <div>
              <div style={{ display: "flex", gap: 24, alignItems: "flex-start", marginBottom: 32 }}>
                <img src="/david.png" alt="David" style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                <div>
                  <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 2, color: "#00214d" }}>David</h1>
                  <div style={{ fontSize: 14, color: "#ff5470", fontWeight: 600, marginBottom: 12 }}>Politiek Assistent · VVD Baarn</div>
                  <p style={{ fontSize: 14, color: "#1b2d45", lineHeight: 1.7, margin: 0 }}>
                    David is 29 jaar en werkt als politiek assistent voor VVD-raadslid Noor Sluijs-van Haastert in Baarn. Hij is opgegroeid in Zürich en Singapore, en heeft gestudeerd in Rotterdam. Buiten het gemeentehuis vind je hem op de skipiste of op het water — skiën en zeilen zijn zijn grote passies.
                  </p>
                </div>
              </div>

              <div style={{ display: "grid", gap: 14, marginBottom: 32 }}>
                {[
                  { label: "Leeftijd", value: "29 jaar" },
                  { label: "Opgegroeid", value: "Zürich & Singapore" },
                  { label: "Studie", value: "Rotterdam" },
                  { label: "Hobby's", value: "Skiën & zeilen" },
                  { label: "Functie", value: "Politiek assistent VVD Baarn" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", gap: 12, padding: "10px 16px", background: "#f2f4f6", borderRadius: 8, border: "1px solid #d9dde4" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#1b2d45", textTransform: "uppercase", letterSpacing: .5, minWidth: 100 }}>{item.label}</span>
                    <span style={{ fontSize: 13, color: "#00214d" }}>{item.value}</span>
                  </div>
                ))}
              </div>

              <h2 style={{ fontSize: 14, fontWeight: 700, color: "#ff5470", textTransform: "uppercase", letterSpacing: .5, marginBottom: 14 }}>Wat David doet</h2>
              <p style={{ fontSize: 13, color: "#1b2d45", lineHeight: 1.7, marginBottom: 28 }}>
                David helpt Noor met alles wat een gemeenteraadslid nodig heeft: documenten analyseren, moties en amendementen schrijven, schriftelijke vragen opstellen, vergaderingen voorbereiden, inwoners beantwoorden en debatten voorbereiden. Hij kent het VVD-verkiezingsprogramma, de Baarnse politieke verhoudingen en de lopende dossiers.
              </p>

              <h2 style={{ fontSize: 14, fontWeight: 700, color: "#ff5470", textTransform: "uppercase", letterSpacing: .5, marginBottom: 14 }}>Foto's</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { src: "/david-gemeentehuis.png", caption: "Op het gemeentehuis" },
                  { src: "/david-werk.png", caption: "Aan het werk" },
                  { src: "/david-diner.png", caption: "Bij het diner" },
                  { src: "/david.png", caption: "Profielfoto" },
                ].map((photo) => (
                  <div key={photo.src} style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #d9dde4" }}>
                    <img src={photo.src} alt={photo.caption} style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
                    <div style={{ padding: "8px 12px", background: "#f2f4f6", fontSize: 12, color: "#1b2d45" }}>{photo.caption}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
