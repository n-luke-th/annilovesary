/**
 data model for reading any documents in `users` collection

 this serves as a user data where that can't be store to the Firebase's auth
 */
export interface UserEntity {
  docId: string;
  partnerUserId: string | null;
  selectedAnniversaryId: string | null; // by default it should auto link to 'anniversary' doc where `AnniversaryType` is `annual`
  updatedAt: Date;
}

/**
 data model for writing any documents in `users` collection
 */
export interface UserWriteEntity {
  partnerUserId: string;
  customTypeValue: string | null;
  date: Date;
  desc: string | null;
  [key: string]: unknown;
}
