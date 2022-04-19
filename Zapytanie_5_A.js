printjson(
  db.people
    .aggregate([
      {
        $match: {
          sex: "Female",
          nationality: "Poland",
        },
      },
      {
        $unwind: {
          path: "$credit",
        },
      },
      {
        $project: {
          currency: "$credit.currency",
          balance: { $toDouble: "$credit.balance" },
          _id: 0,
        },
      },
      {
        $group: {
          _id: "$currency",
          avg: { $avg: "$balance" },
          total: { $sum: "$balance" },
          count: { $sum: 1 },
        },
      },
    ])
    .toArray()
);
