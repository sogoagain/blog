const nostrTools = jest.requireActual("nostr-tools");

const { nip19 } = nostrTools;

const owner = {
  nsec: "nsec1ngn6gy344alzzv29z942ur35h75z8hgp00pxuct3nachphmflgtqn6vmge",
  npub: "npub16686greycr3g4dpa8lndgqrrfxs0qdky8xtxp3nnc8z8upegzpkq566g38",
  sk: () => {
    const { data } = nip19.decode(owner.nsec);
    return data;
  },
  pk: () => {
    const { data } = nip19.decode(owner.npub);
    return data;
  },
};

module.exports = {
  ...nostrTools,
  SimplePool: jest.fn().mockImplementation(() => ({
    subscribeMany: jest
      .fn()
      .mockImplementation((relays, filters, callbacks) => {
        const sub = {
          close: jest.fn(),
        };
        filters.forEach((filter) => {
          const { authors, kinds, ids } = filter;
          if (authors && authors.includes(owner.pk())) {
            if (kinds.includes(0)) {
              callbacks.onevent({
                content:
                  '{"about":"소개","lud16":"owner@getalby.com","name":"owner","website":"https://blog.owner.com"}',
                created_at: 1708765620,
                id: "subscribeManyId19",
                kind: 0,
                pubkey: owner.pk(),
                tags: [],
              });
            }
            if (kinds.includes(1)) {
              callbacks.onevent({
                id: "subscribeManyId2",
                kind: 1,
                pubkey: owner.pk(),
                content: "노트 2 #Zaps",
                created_at: 1704425529,
                tags: [["t", "Zaps"]],
              });
              callbacks.onevent({
                id: "subscribeManyId1",
                kind: 1,
                pubkey: owner.pk(),
                content: "노트 1 https://blog.sogoagain.com/ #Nothing",
                created_at: 1703415813,
                tags: [["t", "Nothing"]],
              });
              callbacks.onevent({
                id: "subscribeManyId3",
                kind: 1,
                pubkey: owner.pk(),
                content: "노트 3 https://cdn.build/i/test.jpg",
                created_at: 1704530364,
                tags: [],
              });
              callbacks.onevent({
                id: "subscribeManyId4",
                kind: 1,
                pubkey: owner.pk(),
                content: "답글1",
                created_at: 1704530364,
                tags: [["e", "event-id", "", "reply"]],
              });
              callbacks.onevent({
                id: "subscribeManyId9",
                kind: 1,
                pubkey: owner.pk(),
                content: "노트 4 https://cdn.build/i/test.mp4 #Zaps",
                created_at: 1705515813,
                tags: [["t", "Zaps"]],
              });
              callbacks.onevent({
                id: "subscribeManyId10",
                kind: 1,
                pubkey: owner.pk(),
                content: "노트 5 #Bitcoin",
                created_at: 1706465813,
                tags: [["t", "Bitcoin"]],
              });
              callbacks.onevent({
                id: "subscribeManyId11",
                kind: 1,
                pubkey: owner.pk(),
                content: "노트 6 #테스트",
                created_at: 1707465813,
                tags: [["t", "테스트"]],
              });

              callbacks.onevent({
                content:
                  "nostr:npub1zatgwjyc77ljzv7jx0pc5rmhadf0eqet0whnyht47y82u5lgz7vsmp5c9u 조회하지 못한 멘션과 인용 \n\nnostr:note1gesl9amp9pew24jxmet3jwq0qwytxkgav02pjjkqfscy7sscf99qppm3ju",
                created_at: 1708746983,
                id: "subscribeManyId12",
                kind: 1,
                pubkey: owner.pk(),
                tags: [
                  [
                    "p",
                    "1756874898f7bf2133d233c38a0f77eb52fc832b7baf325d75f10eae53e81799",
                    "",
                    "mention",
                  ],
                ],
              });
              callbacks.onevent({
                content:
                  "nostr:npub150lv5w4nflnzn9v6e9e5c47yenzja7u2wkydrgp38p56zprfdprsak9xzn 멘션된 프로필을 조회한 노트",
                created_at: 1708746983,
                id: "subscribeManyId13",
                kind: 1,
                pubkey: owner.pk(),
                tags: [
                  [
                    "p",
                    "a3feca3ab34fe629959ac9734c57c4ccc52efb8a7588d1a0313869a104696847",
                    "",
                    "mention",
                  ],
                ],
              });
              callbacks.onevent({
                content:
                  "인용된 노트를 조회한 노트 \n\nnostr:note15flz24yq6rtzn474a9k24fna4wv07jw5s3u6uzp0flvcnxmyf9ysx6cp8k",
                created_at: 1708746983,
                id: "subscribeManyId14",
                kind: 1,
                pubkey: owner.pk(),
                tags: [
                  [
                    "e",
                    "note15flz24yq6rtzn474a9k24fna4wv07jw5s3u6uzp0flvcnxmyf9ysx6cp8k",
                    "",
                    "mention",
                  ],
                ],
              });
              callbacks.onevent({
                content:
                  "Primal에서 인용한 노트 \n\nnevent1qqs9nxc9gj975ezcrvaz6u3s0j227v56f6cpkm382u6afpvtwx9r9yspp4mhxue69uhkummn9ekx7mqujtpel",
                created_at: 1708746990,
                id: "subscribeManyId15",
                kind: 1,
                pubkey: owner.pk(),
                tags: [
                  [
                    "e",
                    "599b05448bea64581b3a2d72307c94af329a4eb01b6e275735d4858b718a3292",
                    "wss://nos.lol",
                    "mention",
                  ],
                  [
                    "p",
                    "58c741aa630c2da35a56a77c1d05381908bd10504fdd2d8b43f725efa6d23196",
                    "",
                    "mention",
                  ],
                ],
              });
              callbacks.onevent({
                id: "subscribeManyId16",
                kind: 1,
                pubkey: owner.pk(),
                content: "답글2",
                created_at: 1704530364,
                tags: [["e", "event-id", "", "root"]],
              });
            }
            if (kinds.includes(4)) {
              callbacks.onevent({
                id: "subscribeManyId5",
                kind: 4,
                pubkey: owner.pk(),
                content: "DM",
                created_at: 1703415813,
                tags: [],
              });
            }
            if (kinds.includes(30315)) {
              callbacks.onevent({
                id: "subscribeManyId7",
                kind: 30315,
                pubkey: owner.pk(),
                content: "일반 상태",
                created_at: 1704425529,
                tags: [
                  ["d", "general"],
                  ["r", "https://nostr.world"],
                ],
              });
              callbacks.onevent({
                id: "subscribeManyId8",
                kind: 30315,
                pubkey: owner.pk(),
                content: "음악 상태",
                created_at: 1704425529,
                tags: [
                  ["d", "music"],
                  ["r", "spotify:search:Intergalatic%20-%20Beastie%20Boys"],
                  ["expiration", "1692845589"],
                ],
              });
            }
          }
          if (
            ids &&
            ids.includes(
              "a27e255480d0d629d7d5e96caaa67dab98ff49d48479ae082f4fd9899b644949",
            )
          ) {
            callbacks.onevent({
              content:
                "nostr:npub1zsewm9p4eqpvezhjnntfkuxjvhh2vqj7j3kmjcxpdpsat9n6eujszmqpgw 인용된 노트 입니다. https://github.io",
              created_at: 1708663231,
              id: "a27e255480d0d629d7d5e96caaa67dab98ff49d48479ae082f4fd9899b644949",
              kind: 1,
              pubkey:
                "f114bd52ebeb74078c7791a1089f461e72eba94bf16a55955e1a575eae413c85",
              tags: [],
            });
          }
          if (authors && !authors.includes(owner.pk())) {
            if (kinds.includes(0)) {
              callbacks.onevent({
                content:
                  '{"about":"소개","lud16":"mockusername2@getalby.com","name":"mockusername2","website":"https://blog.mockusername2.com"}',
                created_at: 1708765620,
                id: "querySyncId2",
                kind: 0,
                pubkey:
                  "a3feca3ab34fe629959ac9734c57c4ccc52efb8a7588d1a0313869a104696847",
                tags: [],
              });
              callbacks.onevent({
                content:
                  '{"about":"소개","lud16":"mockusername1@getalby.com","name":"mockusername1","website":"https://blog.mockusername1.com"}',
                created_at: 1708765612,
                id: "querySyncId1",
                kind: 0,
                pubkey:
                  "a3feca3ab34fe629959ac9734c57c4ccc52efb8a7588d1a0313869a104696847",
                tags: [],
              });
              callbacks.onevent({
                content:
                  '{"about":"인용된 작성자의 소개","lud16":"AuthorOfTheQuotedPost@getalby.com","name":"AuthorOfTheQuotedPost","website":"https://blog.quote.com"}',
                created_at: 1708765612,
                id: "querySyncId3",
                kind: 0,
                pubkey:
                  "f114bd52ebeb74078c7791a1089f461e72eba94bf16a55955e1a575eae413c85",
                tags: [],
              });
              callbacks.onevent({
                content:
                  '{"about":"인용된 작성자의 소개2","lud16":"AuthorOfTheQuotedPost2@getalby.com","name":"AuthorOfTheQuotedPost2","display_name":"인용글작성자","website":"https://blog.quote2.com"}',
                created_at: 1708765620,
                id: "querySyncId4",
                kind: 0,
                pubkey:
                  "f114bd52ebeb74078c7791a1089f461e72eba94bf16a55955e1a575eae413c85",
                tags: [],
              });
            }
          }
        });
        setTimeout(() => {
          callbacks.oneose();
        }, 1);
        return sub;
      }),
  })),
};
