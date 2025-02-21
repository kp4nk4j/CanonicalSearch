import natural from "natural";

export const generatePhoneticKeys = (word: string): string[] => {
  if (!word) return [];

  const soundex = new natural.SoundEx();
  const metaphone = new natural.Metaphone();

  const soundexKey = soundex.process(word);
  const metaphoneKey = metaphone.process(word);

  return [soundexKey, metaphoneKey];
};
