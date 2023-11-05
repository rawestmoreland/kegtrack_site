const association = {
  applinks: {
    details: [
      {
        appIDs: ['KK7SBV699A.com.example.kegminder'],
        components: [
          {
            '/': '/signin/*',
            comment: 'Matches any URL with a path that starts with /signin/.',
          },
        ],
      },
    ],
  },
  activitycontinuation: {
    apps: ['KK7SBV699A.com.example.kegminder'],
  },
  webcredentials: {
    apps: ['KK7SBV699A.com.example.kegminder'],
  },
};

export default (_, res) => {
  return res.status(200).send(association);
};
