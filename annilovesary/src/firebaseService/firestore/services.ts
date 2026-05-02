import type { AnniversaryEntity } from "@/entities/anniversaryEntity.types";
import { FirestoreService } from "./firestoreService";
import type { InviteEntity } from "@/entities/invite/inviteEntity.types";
import type { UserEntity } from "@/entities/userEntity.types";

export const userService = new FirestoreService<UserEntity>("users");
export const anniversaryService = new FirestoreService<AnniversaryEntity>("anniversaries");
export const inviteService = new FirestoreService<InviteEntity>("invite");
