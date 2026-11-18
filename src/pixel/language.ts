// Sprache einer Frage erkennen. Pixel kann dadurch auf Deutsch, Englisch oder Russisch antworten.
/**
 * Schätzt anhand der Frage, in welcher Sprache Pixel antworten soll.
 *
 * Die Funktion schreibt die Frage klein und zerlegt sie in einzelne Wörter.
 * Für jedes Wort prüft sie, ob es in der deutschen oder englischen Wortliste
 * steht. Ein Wort mit kyrillischen Buchstaben zählt als Hinweis auf Russisch.
 *
 * Beispiel: Bei „wer ist ekaterina“ geben „wer“ und „ist“ jeweils einen
 * Punkt für Deutsch. Deutsch hat damit die meisten Punkte und die Funktion
 * gibt 'de' zurück.
 *
 * Bei Gleichstand oder bei einem Begriff wie „PHP“ ohne Sprachhinweis
 * gibt die Funktion undefined zurück. Dann verwendet Pixel die Sprache
 * der Website. Die Sprache der Website selbst wird dabei nicht geändert.
 */

const germanWords = new Set([
  'war', 'lernt', 'nach', 'ihrem', 'wozu', 'woher', 'verwendet', 'die', 'wäre', 'bevorzugt', 'können', 'wir', 'ihr', 'einen',
  'wer', 'was', 'wie', 'wo', 'woran', 'welche', 'welcher', 'welches', 'warum', 'wann',
  'ist', 'sind', 'hat', 'hast', 'arbeitet', 'gearbeitet', 'entwickelt', 'gebaut',
  'deine', 'dein', 'ihre', 'über', 'ueber', 'erzähle', 'erzähl', 'bitte', 'und',
  'ausbildung', 'berufserfahrung', 'studium', 'projekte', 'kontakt', 'hallo', 'danke', 'teamarbeit', 'stärken', 'schwächen',
  'sie', 'kann', 'kennt', 'gelernt', 'studiert', 'beherrscht', 'verdienen', 'verdient',
  'mochte', 'möchte', 'will', 'gehalt', 'gehaltsvorstellungen', 'wunschgehalt', 'vergütung', 'lohn',
  'kenntnisse', 'fähigkeiten', 'programmiersprachen', 'technologien', 'programmierkenntnisse',
  'jahresbrutto', 'entlohnung', 'gehaltlich', 'qualifikationen',
  'wochenstunden', 'arbeitszeit', 'teilzeit', 'arbeitserlaubnis', 'arbeitsberechtigung', 'arbeitsbewilligung', 'freizeit', 'lebenslauf'
])

const englishWords = new Set([
  'would', 'could', 'her', 'a', 'at', 'into', 'will', 'first', 'client',
  'who', 'what', 'can', 'she', 'learned', 'learnt', 'studied', 'earn', 'salary',
  'salaries', 'pay', 'compensation', 'skills', 'abilities', 'technologies', 'programming',
  'qualifications', 'where', 'how', 'which', 'why', 'when', 'is', 'are', 'were', 'did',
  'does', 'has', 'have', 'worked', 'built', 'developed', 'responsible', 'tell', 'about',
  'your', 'please', 'and', 'education', 'experience', 'projects', 'hello', 'thanks', 'strengths', 'weaknesses', 'teamwork', 'hours', 'permit', 'hobbies', 'resume', 'résumé'
])

export function detectAssistantLanguage(question: string) {
  const words = question.toLowerCase().normalize('NFC').match(/\p{L}+/gu) ?? []
  const scores = { de: 0, en: 0, ru: 0 }

  for (const word of words) {
    if (/\p{Script=Cyrillic}/u.test(word)) scores.ru++
    if (germanWords.has(word)) scores.de++
    if (englishWords.has(word)) scores.en++
  }

  if (scores.ru > scores.de && scores.ru > scores.en) return 'ru'
  if (scores.de > scores.ru && scores.de > scores.en) return 'de'
  if (scores.en > scores.ru && scores.en > scores.de) return 'en'
}
