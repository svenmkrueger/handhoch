# handhoch — Aufgabenformat (JSON)

handhoch liest Aufgaben aus einer JSON-Datei ein („Meine Aufgaben →
Datei laden"). Dieses Dokument beschreibt genau, was in der Datei
stehen muss, damit der Import gelingt und die Aufgabe ohne Nacharbeit
startbar ist.

## Die Datei

```json
{
  "art": "handhoch-aufgaben",
  "version": 1,
  "aufgaben": [ … ]
}
```

- `art` und `version` genau so — daran erkennt handhoch die Datei.
- `aufgaben` ist eine Liste. Eine Datei darf eine oder viele Aufgaben
  enthalten.
- **Nicht angeben:** `frageId`, `zeit`, `streu`, `runden`. Das vergibt
  handhoch beim Import selbst.

## Felder, die jede Aufgabe hat

| Feld | Pflicht | Bedeutung |
|---|---|---|
| `typ` | ja | einer von `mc`, `wf`, `skala`, `mcs`, `wfs`, `sks`, `zu`, `so`, `xy`, `mix` |
| `frage` | je nach Typ | Frage, These, Arbeitsauftrag oder Überschrift |
| `mischen` | nein | `true`: Antwortmöglichkeiten bzw. Aussagen erscheinen auf den Schülergeräten gemischt. Standard `true`; bei `wf`, `skala`, `zu`, `so`, `xy` ohne Wirkung |
| `namentlich` | nein | `true`: Schüler geben vor dem Antworten ihren Vornamen ein. Standard `false` |

Lösungen werden immer als **Buchstaben** angegeben: `"A"` ist die erste
Antwortmöglichkeit in der Liste, `"B"` die zweite, und so weiter bis
`"J"`. Bei Wahr/Falsch sind es `"W"` und `"F"`.

## Die zehn Typen

### `mc` — Mehrfachauswahl (eine Frage)

```json
{
  "typ": "mc",
  "frage": "Welche Aussage über den 17. Juni 1953 trifft zu?",
  "optionen": [
    "Der Aufstand begann mit Streiks von Bauarbeitern in Ost-Berlin",
    "Die Volkskammer beschloss an diesem Tag die neue Verfassung",
    "Sowjetische Panzer beendeten den Aufstand",
    "Die Bundesrepublik erkannte die DDR an diesem Tag an"
  ],
  "loesung": ["A", "C"]
}
```

- `optionen`: 2 bis 8 Einträge.
- `loesung`: mindestens ein Buchstabe, **Pflicht**. Mehrere sind
  erlaubt; die Schüler dürfen dann auch mehrere ankreuzen. Ohne Lösung
  lässt handhoch die Aufgabe nicht starten.

### `wf` — Wahr/Falsch (eine Aussage)

```json
{
  "typ": "wf",
  "frage": "Die Berliner Mauer wurde in der Nacht zum 13. August 1961 errichtet.",
  "loesung": ["W"]
}
```

- `loesung`: genau `["W"]` oder `["F"]`, **Pflicht**.

### `skala` — Positionierung (eine These, ohne Lösung)

```json
{
  "typ": "skala",
  "frage": "Die DDR war ein Unrechtsstaat.",
  "pole": ["stimme gar nicht zu", "stimme voll zu"]
}
```

- `pole`: zwei kurze Beschriftungen für links und rechts. Die Schüler
  schieben einen Griff dazwischen; Zahlen sehen sie nicht.
- Keine Lösung — der Typ ist für Meinungen und Einschätzungen.

### `mcs` — Mehrfachauswahl-Serie (mehrere Fragen, ein Antwort-Code)

```json
{
  "typ": "mcs",
  "frage": "Geschichte der DDR — Grundwissen",
  "fragen": [
    {
      "text": "Wer war von 1971 bis 1989 Generalsekretär der SED?",
      "optionen": ["Walter Ulbricht", "Erich Honecker", "Egon Krenz", "Wilhelm Pieck"],
      "loesung": ["B"]
    }
  ]
}
```

- `frage` ist hier die Überschrift der Serie (darf leer sein).
- `fragen`: 2 bis 16 Einträge, je mit `text`, `optionen` (2–10) und
  `loesung` (mindestens ein Buchstabe, **Pflicht**).

### `wfs` — Wahr/Falsch-Serie

```json
{
  "typ": "wfs",
  "frage": "Alltag in der DDR",
  "fragen": [
    { "text": "Der Trabant war das meistgebaute Auto der DDR.", "loesung": ["W"] },
    { "text": "Jeder DDR-Bürger durfte frei in die Bundesrepublik reisen.", "loesung": ["F"] }
  ]
}
```

- `fragen`: 2 bis 16 Aussagen, je mit `text` und `loesung` (`["W"]`
  oder `["F"]`, **Pflicht**).

### `sks` — Positionierungs-Serie (mehrere Thesen, ohne Lösung)

```json
{
  "typ": "sks",
  "frage": "Wie schätzt du diese Thesen ein?",
  "pole": ["lehne ab", "stimme zu"],
  "fragen": [
    { "text": "Die Mauer hat die DDR vor dem Zusammenbruch bewahrt." },
    { "text": "Die Wiedervereinigung kam zu schnell.", "pole": ["zu langsam", "zu schnell"] }
  ]
}
```

- `pole` auf Aufgabenebene gilt für alle Thesen; eine These darf eigene
  `pole` mitbringen.
- `fragen`: 2 bis 16 Thesen. Keine Lösung.
- `mischen` hier meist `false`: Thesen haben oft eine gewollte
  Reihenfolge.

### `zu` — Zuordnung (Einträge in Spalten ziehen)

```json
{
  "typ": "zu",
  "frage": "Ordne die Begriffe den Bereichen zu.",
  "ziele": ["Politik", "Wirtschaft", "Alltag"],
  "eintraege": [
    { "text": "Politbüro", "ziel": 0 },
    { "text": "Kombinat", "ziel": 1 },
    { "text": "Datsche", "ziel": 2 }
  ]
}
```

- `ziele`: 2 bis 10 Spaltentitel.
- `eintraege`: bis zu 16, je mit `text` und `ziel` = Index der richtigen
  Spalte (0 = erste Spalte). **Jeder Eintrag braucht ein `ziel`.**
- Jeder Eintrag muss eindeutig in genau eine Spalte gehören.

### `so` — Sortieren (Aussagen in eine Reihenfolge bringen)

```json
{
  "typ": "so",
  "frage": "Bringe die Ereignisse in die richtige zeitliche Reihenfolge.",
  "eintraege": [
    { "text": "Gründung der DDR" },
    { "text": "Bau der Berliner Mauer" },
    { "text": "Fall der Mauer" }
  ],
  "geordnet": true
}
```

- `eintraege`: 2 bis 10 Aussagen, **in der richtigen Reihenfolge** (die
  erste ist Platz 1). Die Schüler bekommen sie gestreut; handhoch
  kümmert sich darum.
- `geordnet`: `true`, wenn diese Reihenfolge die Lösung ist
  (Chronologie, Arbeitsschritte). `false`, wenn es keine richtige
  Reihenfolge gibt (Prioritäten, Wertediskussion) — dann zeigt das
  Ergebnis, worauf der Kurs sich im Mittel geeinigt hat.

### `xy` — Matrix (Aussagen auf einer Fläche mit zwei Achsen einordnen)

```json
{
  "typ": "xy",
  "frage": "Wo lagen die Ursachen — und wann wirkten sie?",
  "pole": ["in Polen selbst", "außerhalb Polens"],
  "poleY": ["langfristig", "unmittelbar auslösend"],
  "achsen": ["Ort", "Zeit"],
  "eintraege": [
    { "text": "Liberum veto seit 1652", "x": 20, "y": 20 },
    { "text": "Russische Intervention gegen die Reformen", "x": 85, "y": 85 },
    { "text": "Aufstieg Brandenburg-Preußens", "x": 85, "y": 40 }
  ]
}
```

- `pole`: die waagerechte Achse, `[links, rechts]`. **Pflicht.**
- `poleY`: die senkrechte Achse, `[unten, oben]`. **Pflicht.**
- `achsen`: Namen der beiden Achsen, `[waagerecht, senkrecht]`.
  Optional — meist sagen die Pole schon alles.
- `eintraege`: 1 bis 12 Aussagen, je mit `text`. Optional je Aussage
  `x` und `y` (ganze Zahlen 0–100) als Einordnung der Lehrkraft:
  `x` von 0 (linker Pol) bis 100 (rechter Pol), `y` von 0 (unterer Pol)
  bis 100 (oberer Pol). Die Mitte ist 50/50.
- Die Einordnung der Lehrkraft ist **keine Lösung im Sinne von
  richtig/falsch**: handhoch prüft nichts, sondern blendet sie im
  Ergebnis als eigene Ebene ein — als Gesprächsangebot neben dem
  Klassenbild. Ohne `x`/`y` ist die Aufgabe ein reines Meinungsbild
  in zwei Richtungen, das ist ein normaler Fall.
- Die Aussagen erscheinen auf den Schülergeräten gemischt; die
  Reihenfolge in der Datei ist also egal.

### `mix` — Gemischte Folge (Schritte verschiedener Typen, ein Antwort-Code)

```json
{
  "typ": "mix",
  "frage": "DDR — Sicherung",
  "fragen": [
    {
      "typ": "mc",
      "text": "Was trifft auf die SED zu?",
      "optionen": ["Staatspartei", "Oppositionspartei", "Verboten ab 1953", "Gegründet 1946"],
      "loesung": ["A", "D"]
    },
    { "typ": "wf", "text": "Die Mauer fiel am 9. November 1989.", "loesung": ["W"] },
    { "typ": "skala", "text": "Die DDR war ein Unrechtsstaat.", "pole": ["nein", "ja"] },
    {
      "typ": "zu",
      "text": "Ordne die Begriffe zu.",
      "ziele": ["Politik", "Alltag"],
      "eintraege": [{ "text": "Politbüro", "ziel": 0 }, { "text": "Datsche", "ziel": 1 }]
    },
    {
      "typ": "so",
      "text": "Bringe die Ereignisse in die richtige Reihenfolge.",
      "eintraege": [{ "text": "Gründung der DDR" }, { "text": "Mauerbau" }, { "text": "Mauerfall" }],
      "geordnet": true
    }
  ]
}
```

- `frage` ist die Überschrift der Folge (darf leer sein).
- `fragen`: 2 bis 16 Schritte. **Jeder Schritt trägt sein eigenes
  `typ`** (`mc`, `wf`, `skala`, `zu`, `so` oder `xy`) und darin genau
  die Felder, die der Typ als Einzelaufgabe hätte — bei `zu` also
  `ziele` und `eintraege` mit `ziel`, bei `so` `eintraege` in
  Lösungsreihenfolge und `geordnet`, bei `xy` `pole`, `poleY` und
  `eintraege` mit `x`/`y`.
- Die Schritte erscheinen auf den Schülergeräten **in dieser
  Reihenfolge**, nicht gemischt — eine Folge baut aufeinander auf.
- Wofür: eine zusammenhängende Übungs- oder Sicherungsphase mit einem
  Anfang und einem Ende — erst Wissen (`mc`, `wf`), dann Einordnen
  (`zu`, `so`), dann Bewerten (`skala`). Die Klasse bearbeitet alles
  am Stück und schickt EINEN Antwort-Code; die Lehrkraft sammelt einmal
  ein. Nicht für Erarbeitung mit Gespräch nach jeder Frage — dafür sind
  Einzelaufgaben da.
- Länge im Blick behalten: Eine Folge summiert die Texte aller
  Schritte. Drei bis fünf Schritte sind ein guter Umfang.

## Wie lang darf eine Aufgabe sein?

Die Aufgabe erreicht die Klasse über einen QR-Code an der Tafel. Wird
sie zu lang, teilt handhoch sie auf mehrere Codes auf, die sich alle
vier Sekunden abwechseln — das funktioniert, kostet aber Zeit beim
Scannen. Richtwerte für den gesamten Text einer Aufgabe (alle Fragen,
Optionen, Aussagen zusammen):

| Rohtext | QR-Codes |
|---|---|
| bis ~500 Zeichen | 1 |
| bis ~1500 Zeichen | 2 |
| bis ~3000 Zeichen | 3 |
| darüber | 4 oder als QR nicht mehr möglich (als Link geht es immer) |

**Ziel: unter 1500 Zeichen bleiben.** Das heißt in der Praxis: eine
Serie von 6–8 Fragen mit je vier knappen Optionen, oder 10–12
Wahr/Falsch-Aussagen. Lieber zwei Serien als eine überlange.

## Didaktische Regeln

Diese Regeln machen den Unterschied zwischen einer Aufgabe, die
funktioniert, und einer, die im Unterricht Zeit kostet.

**Für alle Typen**
- Ein Gedanke je Frage. Keine Doppelfragen („Wer und wann …?").
- Fachsprache in der Höhe der Lerngruppe; Jahrgang beachten, wenn er
  genannt wird.
- Keine Fragen, die nur mit dem Material beantwortbar sind, das die
  Klasse nicht hat.
- Deutsche Anführungszeichen „so“, Gedankenstrich — nicht Bindestrich.

**Mehrfachauswahl (`mc`, `mcs`)**
- Alle Optionen etwa gleich lang und gleich konkret. Die längste Option
  ist sonst die erkennbare Lösung.
- Distraktoren müssen plausibel sein: echte Verwechslungen, typische
  Fehlvorstellungen, benachbarte Daten. Keine erkennbar absurden
  Optionen.
- Keine „Alle oben genannten" / „Keine der genannten".
- Keine Verneinungen in der Frage („Welche Aussage trifft NICHT zu?"),
  außer die Lehrkraft verlangt es.
- **Mehrere richtige Antworten gehören dazu.** In einer Serie soll
  etwa ein Drittel der Fragen zwei oder drei richtige Optionen haben,
  nicht nur eine — sonst rät die Klasse nach dem Muster „genau eine
  stimmt" und liest die übrigen Optionen gar nicht mehr.
- **Die Frage darf die Zahl der richtigen Antworten nicht verraten.**
  Nicht „Welche Aussage …" bei einer und „Welche Aussagen …" bei
  mehreren — dann sagt die Grammatik, was zu prüfen wäre. Alle Fragen
  einer Serie gleich formulieren, und zwar so, dass beides möglich
  bleibt: „Was trifft zu?", „Welche Aussagen treffen zu?", „Kreuze an,
  was stimmt." Nie „Welche zwei …". Die Schülerseite zeigt ohnehin bei
  jeder Frage „eine oder mehrere Antworten" an — die Frage soll dem
  nicht widersprechen.

**Wahr/Falsch (`wf`, `wfs`)**
- Jede Aussage muss eindeutig entscheidbar sein — kein „meistens",
  „oft", „in der Regel".
- Falsche Aussagen sollen falsch sein, weil ein Detail nicht stimmt
  (Datum, Person, Ort), nicht weil sie absurd sind.
- Wahr und Falsch etwa gleich häufig, in gemischter Reihenfolge.

**Positionierung (`skala`, `sks`)**
- Thesen, keine Fragen. Formuliert als Behauptung, zu der man Stellung
  beziehen kann.
- Die These muss kontrovers sein können — eine These, der alle
  zustimmen, ergibt keine Positionierung.
- Pole kurz und als Gegensatz: „lehne ab / stimme zu", „unwichtig /
  sehr wichtig", „Zufall / Absicht".

**Zuordnung (`zu`)**
- Spaltentitel trennscharf; jeder Eintrag gehört erkennbar in genau
  eine Spalte.
- Einträge kurz (Begriffe, Namen, Daten), 2–5 Wörter.
- Etwa gleich viele Einträge je Spalte.

**Matrix (`xy`)**
- Zwei Achsen, die wirklich unabhängig sind — sonst liegen alle
  Aussagen auf einer Diagonale, und die zweite Achse war umsonst.
  Bewährt: Ort/Zeit, Ursache/Wirkung, Absicht/Wirkung, Nähe zum
  Ereignis/Öffentlichkeit, Aufwand/Nutzen.
- Pole kurz, als Gegensatzpaar, so dass jede Aussage irgendwo dazwischen
  liegen kann. Nicht „ja / nein".
- Aussagen, bei denen die Einordnung eine Entscheidung verlangt —
  nicht solche, die offensichtlich in eine Ecke gehören. Gerade die
  strittigen tragen das Gespräch.
- 6 bis 10 Aussagen sind ein guter Umfang; 12 sind das Maximum.
- Aussagen kurz (3–8 Wörter): Im Raster stehen Nummern, die Texte
  daneben.
- Die eigene Einordnung (`x`/`y`) angeben, wenn die Lehrkraft eine
  Position vertritt — sie wird als Ebene eingeblendet, nicht geprüft.

**Sortieren (`so`)**
- Mit `geordnet: true` muss die Reihenfolge objektiv sein
  (Chronologie, Verfahrensschritte, Größenordnungen). Wenn zwei
  Aussagen vertauschbar wären, ist die Aufgabe falsch gestellt.
- Mit `geordnet: false` sollen die Aussagen gleichwertig sein, damit die
  Klasse wirklich abwägen muss.
- Aussagen kurz, 3–8 Wörter, ohne die Reihenfolge zu verraten (kein
  „zuerst", „danach", keine Jahreszahlen bei Chronologien).
