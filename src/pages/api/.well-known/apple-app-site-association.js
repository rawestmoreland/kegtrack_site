const BUNDLE_ID = 'com.example.kegminder';
const TEAM_ID = 'KK7SBV699A';

const association = {
  applinks: {
    apps: [],
    details: [
      {
        appID: `${TEAM_ID}.${BUNDLE_ID}`,
        // all paths, except for marketing pages
        paths: ['/signin/*', '*'],
      },
    ],
  },
  activitycontinuation: {
    apps: [`${TEAM_ID}.${BUNDLE_ID}`],
  },
  webcredentials: {
    apps: [`${TEAM_ID}.${BUNDLE_ID}`],
  },
};

export default (_, res) => {
  return res.status(200).send(association);
};
