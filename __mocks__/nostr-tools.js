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
          content: "노트 1 https://blog.sogoagain.com/",
          created_at: 1703415813,
          tags: [],
        });
        callbacks.onevent({
          id: "id3",
          kind: 1,
          content: "노트 3",
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
