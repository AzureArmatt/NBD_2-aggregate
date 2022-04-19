printjson(
  db.people
    .aggregate([
      {
        $project: {
          height: { $toDouble: "$height" },
          weight: { $toDouble: "$weight" },
          nationality: 1,
          _id: 0,
        },
      },
      {
        $group: {
          _id: "$nationality",
          avgBMI: {
            $avg: {
              $divide: [
                "$weight",
                { $pow: [{ $divide: ["$height", 100] }, 2] },
              ],
            },
          },
          minBMI: {
            $min: {
              $divide: [
                "$weight",
                { $pow: [{ $divide: ["$height", 100] }, 2] },
              ],
            },
          },
          maxBMI: {
            $max: {
              $divide: [
                "$weight",
                { $pow: [{ $divide: ["$height", 100] }, 2] },
              ],
            },
          },
          count: { $sum: 1 },
        },
      },
    ])
    .toArray()
);
