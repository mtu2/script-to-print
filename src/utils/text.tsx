export function isEmpty(text: string): boolean {
  return text.replace(/\s+/g, " ").length === 0;
}

export function processText(text: string, capitalise = false): string {
  // capitalise and remove additional whitespace
  // const processed = text.toUpperCase().replace(/\s+/g, " ");
  let processed = text.replace(/\s+/g, " ");
  if (capitalise) {
    processed = processed.toUpperCase();
  }

  return processed;
}
