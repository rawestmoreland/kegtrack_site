const association = {
  applinks: {
    apps: [],
    details: {
      appIds: ['KK7SBV699A.com.example.kegminder'],
      components: [
        {
          '/': '/signin/*',
          comment: 'Matches any URL whose path starts with /signin',
        },
      ],
    },
  },
  activitycontinuation: {
    apps: ['KK7SBV699A.com.example.kegminder'],
  },
  webcredentials: {
    apps: ['KK7SBV699A.com.example.kegminder'],
  },
};

export default (_, response) => {
  return response.status(200).send(association);
};
