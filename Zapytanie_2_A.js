printjson(
  db.people
    .aggregate([
      {
        $unwind: "$credit",
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
          total: { $sum: "$balance" },
        },
      },
    ])
    .toArray()
);
