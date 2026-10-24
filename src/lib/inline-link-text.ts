const INLINE_LINK_SOURCE = "\\[([^\\]]+)\\]\\((\\/[^)\\s]+)\\)";

/** Texto de un enlace markdown interno, sin la URL. */
export function plainTextFromInlineLinks(text: string) {
  return text.replace(new RegExp(INLINE_LINK_SOURCE, "g"), "$1");
}

/**
 * Respuesta de FAQ para el párrafo visible y para FAQPage.
 * Es el mismo string en los dos lados, sin etiquetas ni enlaces.
 */
export function faqAnswerText(text: string) {
  return plainTextFromInlineLinks(text);
}

export function inlineLinkPattern() {
  return new RegExp(INLINE_LINK_SOURCE, "g");
}
