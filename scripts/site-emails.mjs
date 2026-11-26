/** Active Vyrenlo inboxes — use either where appropriate (forms, legal, support copy). */

export const VYRENLO_CONTACT_EMAIL = "contact@vyrenlo.com";
export const VYRENLO_INFO_EMAIL = "info@vyrenlo.com";

export function emailInlineHtml() {
  return `<a href="mailto:${VYRENLO_CONTACT_EMAIL}">${VYRENLO_CONTACT_EMAIL}</a> · <a href="mailto:${VYRENLO_INFO_EMAIL}">${VYRENLO_INFO_EMAIL}</a>`;
}

export function emailContactMetaListHtml() {
  return `<li><a href="mailto:${VYRENLO_CONTACT_EMAIL}">${VYRENLO_CONTACT_EMAIL}</a></li>
            <li><a href="mailto:${VYRENLO_INFO_EMAIL}">${VYRENLO_INFO_EMAIL}</a></li>`;
}

export function emailPlainOr() {
  return `${VYRENLO_CONTACT_EMAIL} or ${VYRENLO_INFO_EMAIL}`;
}