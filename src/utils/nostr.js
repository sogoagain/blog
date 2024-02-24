import { parseReferences, nip19 } from "nostr-tools";

export function parseNoteContent(event) {
  const references = parseReferences(event);
  let { content } = event;
  for (let i = 0; i < references.length; i += 1) {
    const { text, profile, event: referenceEvent } = references[i];
    let reference = text;
    if (profile) {
      const { pubkey } = profile;
      reference = `@${nip19.npubEncode(pubkey)}`;
    } else if (referenceEvent) {
      const { id } = referenceEvent;
      reference = `@${nip19.noteEncode(id)}`;
    }
    content = content.replaceAll(text, reference);
  }
  return content;
}
