# Aufgaben mit einer KI erstellen

Ein KI-Projekt, das auf Zuruf fertige handhoch-Aufgaben liefert —
„Erstelle mir eine Mehrfachauswahl-Serie zur Geschichte der DDR" ergibt
eine JSON-Datei, die sich in handhoch importieren lässt.

## Einrichten (einmalig, fünf Minuten)

Beschrieben für Claude; bei anderen Diensten heißt dasselbe
„benutzerdefiniertes GPT", „Gem" oder ähnlich — ein Ort für feste
Anweisungen plus hochgeladene Dateien. Das Prinzip ist überall gleich.

1. In Claude ein neues **Projekt** anlegen, etwa „handhoch-Aufgaben".
2. Den Inhalt von `ANWEISUNGEN.md` in das Feld **Projektanweisungen**
   (Custom Instructions) kopieren.
3. Diese beiden Dateien als **Projektwissen** hochladen:
   - `aufgabenformat.md` — das Format, die Grenzen, die didaktischen
     Regeln
   - `beispiel-aufgaben.json` — jeder Typ einmal, gültig
4. Fertig. Im Projekt einfach beschreiben, was man braucht.

## Benutzen

Beispiele, die gut funktionieren:

- „Acht Wahr/Falsch-Aussagen zur Weimarer Verfassung, Klasse 9."
- „Eine Zuordnung: Begriffe der Französischen Revolution zu Ständen."
- „Sechs Thesen zur Positionierung über Kolonialismus, Oberstufe."
- „Ordne die Etappen der Zellteilung — als Sortieraufgabe mit Lösung."
- „Hier ist meine Datei, mach die Optionen kürzer." (Datei einfügen)

Claude antwortet mit einem Codeblock. Den Inhalt als `.json` speichern
(auf dem iPad: in Notizen einfügen → Teilen → „In Dateien sichern",
oder gleich am Rechner), dann in handhoch:

**Lehrer-Seite → Meine Aufgaben → Datei laden.**

Die Aufgaben stehen danach in der Liste und lassen sich wie
selbstgebaute öffnen, ändern und starten.

## Was man wissen sollte

- **Lösungen prüfen.** Claude ist fachlich meist richtig, aber nicht
  immer. Eine falsche Lösung an der Tafel kostet mehr als eine Minute
  Gegenlesen vorher. Die Anweisungen halten Claude dazu an, unsichere
  Fragen wegzulassen oder zu markieren — verlass dich nicht darauf.
- **Länge.** Der QR-Code an der Tafel fasst etwa 1500 Zeichen Text
  bequem. Claude hält sich daran; wer mehr will, bekommt mehrere Codes,
  die sich abwechseln. handhoch zeigt vor dem Start, wie viele es sind.
- **Kennungen.** Jede importierte Aufgabe bekommt beim Laden eine
  eigene Kennung. Dieselbe Datei zweimal zu laden ergibt also zwei
  gleiche Aufgaben in der Liste, keine Aktualisierung. Eine aus
  handhoch gesicherte Datei bringt ihre Kennung dagegen mit und
  ersetzt beim erneuten Laden die alte Fassung.
