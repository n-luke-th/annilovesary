export type CreateDoc<T> = Omit<T, "id" | "createdAt" | "updatedAt">;
