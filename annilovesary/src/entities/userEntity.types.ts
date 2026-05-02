import type { FieldValue, Timestamp } from "firebase/firestore";
import type { BaseEntity } from "./baseEntity.types";

/**
 data model for any documents in `users` collection

 this serves as a user data where that can't be store to the Firebase's auth
 */
export interface UserEntity extends BaseEntity {
  selectedAnniversaryId: string | null; // by default it should auto link to 'anniversary' doc where `AnniversaryType` is `annual`
  partnerInfo: PartnerInfo;
  userPref: UserPref;
}

/**
 * partner info that stored in the user's doc, this is used to quickly get the partner's basic information without fetching the partner's user doc
 */
export interface PartnerInfo {
  partnerUserId: string | null;
  displayName: string | null;
  lastUpdated: Timestamp | FieldValue;
}
/**
 * User preferences
 */
export interface UserPref {
  favTheme: string | null;
  favLang: string | null;
}
