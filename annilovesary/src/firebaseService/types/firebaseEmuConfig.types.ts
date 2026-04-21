export interface EmulatorsConfig {
  auth: {
    port: number;
  };
  firestore: {
    port: number;
  };
  database: {
    port: number;
  };
  ui: {
    enabled: boolean;
    port: number;
  };
  singleProjectMode: boolean;
}
