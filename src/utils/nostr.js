import { parseReferences, nip19 } from "nostr-tools";

export function refineContentWithReferences(event) {
  const references = parseReferences(event);
  let { content } = event;
  const mentionedPubkeys = [];
  const quoteIds = [];
  for (let i = 0; i < references.length; i += 1) {
    const { text, profile, event: referenceEvent } = references[i];
    let reference = text;
    if (profile) {
      const { pubkey } = profile;
      mentionedPubkeys.push(pubkey);
      reference = `@${nip19.npubEncode(pubkey)}`;
    } else if (referenceEvent) {
      const { id } = referenceEvent;
      quoteIds.push(id);
      reference = `@${nip19.noteEncode(id)}`;
    }
    content = content.replaceAll(text, reference);
  }
  return {
    content,
    mentionedPubkeys,
    quoteIds,
  };
}
