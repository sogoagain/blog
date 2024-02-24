const nostrTools = jest.requireActual("nostr-tools");

module.exports = {
  ...nostrTools,
  SimplePool: jest.fn().mockImplementation(() => ({
    querySync: jest.fn().mockResolvedValue([
      {
        content:
          '{"about":"소개","lud16":"mockusername1@getalby.com","name":"mockusername1","website":"https://blog.mockusername1.com"}',
        created_at: 1708765612,
        id: "querySyncId1",
        kind: 0,
        pubkey:
          "a3feca3ab34fe629959ac9734c57c4ccc52efb8a7588d1a0313869a104696847",
        tags: [],
      },
      {
        content:
          '{"about":"소개","lud16":"mockusername2@getalby.com","name":"mockusername2","website":"https://blog.mockusername2.com"}',
        created_at: 1708765620,
        id: "querySyncId2",
        kind: 0,
        pubkey:
          "a3feca3ab34fe629959ac9734c57c4ccc52efb8a7588d1a0313869a104696847",
        tags: [],
      },
    ]),
    subscribeMany: jest
      .fn()
      .mockImplementation((relays, filters, callbacks) => {
        callbacks.onevent({
          id: "subscribeManyId2",
          kind: 1,
          content: "노트 2 #Zaps",
          created_at: 1704425529,
          tags: [],
        });
        callbacks.onevent({
          id: "subscribeManyId1",
          kind: 1,
          content: "노트 1 https://blog.sogoagain.com/ #Nothing",
          created_at: 1703415813,
          tags: [],
        });
        callbacks.onevent({
          id: "subscribeManyId3",
          kind: 1,
          content:
            "노트 3 https://cdn.nostr.build/i/b0b57f83c413825ec49035f3ed8849e0af3d8866f8e3d006eff7a5c323f8adce.jpg",
          created_at: 1704530364,
          tags: [],
        });
        callbacks.onevent({
          id: "subscribeManyId4",
          kind: 1,
          content: "답글",
          created_at: 1704530364,
          tags: [["e", "event-id"]],
        });
        callbacks.onevent({
          id: "subscribeManyId5",
          kind: 4,
          content: "DM",
          created_at: 1703415813,
          tags: [],
        });
        callbacks.onevent({
          id: "subscribeManyId7",
          kind: 30315,
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
          content: "음악 상태",
          created_at: 1704425529,
          tags: [
            ["d", "music"],
            ["r", "spotify:search:Intergalatic%20-%20Beastie%20Boys"],
            ["expiration", "1692845589"],
          ],
        });
        callbacks.onevent({
          id: "subscribeManyId9",
          kind: 1,
          content: "노트 4 #Zaps",
          created_at: 1705515813,
          tags: [],
        });
        callbacks.onevent({
          id: "subscribeManyId10",
          kind: 1,
          content: "노트 5 #Bitcoin",
          created_at: 1706465813,
          tags: [],
        });
        callbacks.onevent({
          id: "subscribeManyId11",
          kind: 1,
          content: "노트 6 #테스트",
          created_at: 1707465813,
          tags: [],
        });
        callbacks.onevent({
          content:
            "nostr:npub1zatgwjyc77ljzv7jx0pc5rmhadf0eqet0whnyht47y82u5lgz7vsmp5c9u 멘션과 인용 \n\nnostr:note1l63ccvqe60nzy02gw2r5su0qfxkw3n6la8dj0kl7pycy6wex3tfqlef3q4",
          created_at: 1708746983,
          id: "subscribeManyId12",
          kind: 1,
          pubkey:
            "9dd290fae92114ece2d877970ff52a782f6f343428bbf541c8b9aab0e0b9948d",
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
            "nostr:npub150lv5w4nflnzn9v6e9e5c47yenzja7u2wkydrgp38p56zprfdprsak9xzn 프로필을 조회한 멘션",
          created_at: 1708746983,
          id: "subscribeManyId13",
          kind: 1,
          pubkey:
            "9dd290fae92114ece2d877970ff52a782f6f343428bbf541c8b9aab0e0b9948d",
          tags: [
            [
              "p",
              "a3feca3ab34fe629959ac9734c57c4ccc52efb8a7588d1a0313869a104696847",
              "",
              "mention",
            ],
          ],
        });
      }),
  })),
};
