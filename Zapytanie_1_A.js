printjson(
  db.people
    .aggregate([
      {
        $project: {
          sex: 1,
          weight: { $toDouble: "$weight" },
          height: { $toDouble: "$height" },
          _id: 0,
        },
      },
      {
        $group: {
          _id: "$sex",
          count: { $sum: 1 },
          avgWeight: { $avg: "$weight" },
          avgHeight: { $avg: "$height" },
        },
      },
    ])
    .toArray()
);
