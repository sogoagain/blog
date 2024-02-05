module.exports = {
  SimplePool: jest.fn().mockImplementation(() => ({
    subscribeMany: jest
      .fn()
      .mockImplementation((relays, filters, callbacks) => {
        callbacks.onevent({
          id: "id2",
          kind: 1,
          content: "노트 2 #Zaps",
          created_at: 1704425529,
          tags: [],
        });
        callbacks.onevent({
          id: "id1",
          kind: 1,
          content: "노트 1 https://blog.sogoagain.com/ #Nothing",
          created_at: 1703415813,
          tags: [],
        });
        callbacks.onevent({
          id: "id3",
          kind: 1,
          content:
            "노트 3 https://cdn.nostr.build/i/b0b57f83c413825ec49035f3ed8849e0af3d8866f8e3d006eff7a5c323f8adce.jpg",
          created_at: 1704530364,
          tags: [],
        });
        callbacks.onevent({
          id: "id4",
          kind: 1,
          content: "답글",
          created_at: 1704530364,
          tags: [["e", "event-id"]],
        });
        callbacks.onevent({
          id: "id5",
          kind: 4,
          content: "DM",
          created_at: 1703415813,
          tags: [],
        });
        callbacks.onevent({
          id: "id7",
          kind: 30315,
          content: "일반 상태",
          created_at: 1704425529,
          tags: [
            ["d", "general"],
            ["r", "https://nostr.world"],
          ],
        });
        callbacks.onevent({
          id: "id8",
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
          id: "id9",
          kind: 1,
          content: "노트 4 #Zaps",
          created_at: 1705515813,
          tags: [],
        });
        callbacks.onevent({
          id: "id10",
          kind: 1,
          content: "노트 5 #Bitcoin",
          created_at: 1706465813,
          tags: [],
        });
        callbacks.onevent({
          id: "id11",
          kind: 1,
          content: "노트 6 #테스트",
          created_at: 1707465813,
          tags: [],
        });
      }),
  })),
};
