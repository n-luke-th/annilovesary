export const FirestoreCollection = {
  ANNIVERSARY: {
    collectionName: "anniversaries",
    desc: undefined,
    visibility: { admin: true, public: false, restricted: true },
  },
  ANNIVERSARY_EVENT: {
    collectionName: "anniversary_events",
    desc: undefined,
    visibility: { admin: true, public: false, restricted: true },
  },
  OTHER_USER_DATA: {
    collectionName: "other_user_data",
    desc: undefined,
    visibility: { admin: true, public: false, restricted: true },
  },
  NOTIFICATION: {
    collectionName: "notifications",
  },
} as const;
