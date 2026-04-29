import type { AnniversaryEntity } from "@/entities/anniversaryEntity.types";
import { FirestoreService } from "./firestoreService";

export const anniversaryService = new FirestoreService<AnniversaryEntity>("anniversaries");
