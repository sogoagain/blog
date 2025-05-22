import { parseReferences, nip19 } from "nostr-tools";

export function refineContentWithReferences(event) {
  const references = parseReferences(event);
  const nevents = event.content.match(/(nevent1[a-z0-9]{20,})/g) || [];
  nevents.forEach((nevent) => {
    const decoded = nip19.decode(nevent);
    if (decoded.type === "nevent") {
      references.push({
        text: nevent,
        event: { id: decoded.data.id },
      });
    }
  });
  let { content } = event;
  const pubkeysMentioned = [];
  const idsQuoted = [];
  references.forEach(({ text, profile, event: referenceEvent }) => {
    let reference = text;
    if (profile) {
      const { pubkey } = profile;
      pubkeysMentioned.push(pubkey);
      reference = `@${nip19.npubEncode(pubkey)}`;
    } else if (referenceEvent) {
      const { id } = referenceEvent;
      idsQuoted.push(id);
      reference = `@${nip19.noteEncode(id)}`;
    }
    content = content.replaceAll(text, reference);
  });
  return {
    content,
    pubkeysMentioned,
    idsQuoted,
  };
}
