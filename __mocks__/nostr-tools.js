module.exports = {
  SimplePool: jest.fn().mockImplementation(() => ({
    subscribeMany: jest
      .fn()
      .mockImplementation((relays, filters, callbacks) => {
        callbacks.onevent({
          id: "id2",
          kind: 1,
          content: "노트 2 #Bitcoin",
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
          content: "대화가 이어진 노트",
          created_at: 1704530364,
          tags: [["p", "other_pubkey"]],
        });
        callbacks.onevent({
          id: "id5",
          kind: 4,
          content: "DM",
          created_at: 1703415813,
          tags: [],
        });
      }),
  })),
};
