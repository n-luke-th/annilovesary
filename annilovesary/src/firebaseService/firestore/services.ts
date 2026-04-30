import type { AnniversaryEntity } from "@/entities/anniversaryEntity.types";
import { FirestoreService } from "./firestoreService";
import type { InviteEntity } from "@/entities/invite/inviteEntity.types";

export const anniversaryService = new FirestoreService<AnniversaryEntity>("anniversaries");
export const inviteService = new FirestoreService<InviteEntity>("invite");
