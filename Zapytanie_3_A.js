printjson(
  db.people
    .aggregate([
      { $project: { _id: 0, job: 1 } },
      {
        $group: {
          _id: {},
          jobs: { $addToSet: "$job" },
        },
      },
    ])
    .toArray()
);
