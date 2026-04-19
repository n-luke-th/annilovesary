import * as cf from "@/firebaseService/firebaseConfig.json";
import * as fb from "@/../firebase.json";
import type { FirebaseConfig } from "@/firebaseService/types/firebaseConfig.types";
import type { EmulatorsConfig } from "@/firebaseService/types/firebaseEmuConfig.types";

export const config = cf as FirebaseConfig;

export const emulatorsConfig: EmulatorsConfig = fb.emulators;
