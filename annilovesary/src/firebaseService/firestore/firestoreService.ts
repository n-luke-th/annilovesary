/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BaseEntity } from "@/entities/baseEntity.types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  QueryConstraint,
  CollectionReference,
  QueryDocumentSnapshot,
  getDocsFromCache,
  QuerySnapshot,
  getDocsFromServer,
  DocumentSnapshot,
  getDocFromCache,
  getDocFromServer,
  Timestamp,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";
import type {
  DocumentData,
  WithFieldValue,
  UpdateData,
  FirestoreDataConverter,
  SnapshotOptions,
  Transaction,
} from "firebase/firestore";
import { firestore as db } from "@/firebaseService/firebaseService";
import type {
  FirestoreCollectionName,
  FirestoreSubCollectionName,
} from "@/common/firestoreCollections";
import type { QueryBehavior } from "./types/queryBehavior.types";

export class FirestoreService<T extends BaseEntity> {
  private collectionRef: CollectionReference<T>;

  constructor(collectionName: FirestoreCollectionName);
  constructor(collectionName: FirestoreCollectionName, ...pathSegments: string[]);

  constructor(collectionName: FirestoreCollectionName, ...pathSegments: string[]) {
    // The converter ensures types are enforced when sending/receiving data
    if (pathSegments.length > 0) {
      this.collectionRef = collection(db, collectionName, ...pathSegments).withConverter(
        this.converter(),
      );
    } else this.collectionRef = collection(db, collectionName).withConverter(this.converter());
  }

  /**
   * Helper to walk through the object and transform specific types
   */
  private recursiveTransform(obj: any, transformFn: (value: any) => any): any {
    if (obj === null || typeof obj !== "object") return transformFn(obj);

    // Handle Arrays
    if (Array.isArray(obj)) return obj.map((v) => this.recursiveTransform(v, transformFn));

    // Handle Objects (but not special types like Date/Timestamp)
    if (obj.constructor.name === "Object") {
      const newObj: any = {};
      for (const key of Object.keys(obj)) {
        newObj[key] = this.recursiveTransform(obj[key], transformFn);
      }
      return newObj;
    }

    return transformFn(obj);
  }

  /**
   * The "Magic" Converter
   * Recursively converts Timestamps to Dates and vice-versa
   */
  private converter(): FirestoreDataConverter<T> {
    return {
      toFirestore: (data: WithFieldValue<T>) => data as DocumentData,
      fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): T => {
        const data = snapshot.data(options);
        const transformed = this.recursiveTransform(data, (val) => {
          if (val instanceof Timestamp) return val.toDate();
          return val;
        });
        return { ...transformed, id: snapshot.id } as T;
      },
    };
  }

  /**
   * Helper to get a typed Document Reference for a specific ID in this collection
   */
  getDocRef(id: string) {
    return doc(this.collectionRef, id);
  }

  /**
   * Access a sub-collection document with type safety
   * usage: service.getSubDocRef("inviteId", "claims", "userId")
   */
  getSubDocRef(id: string, subCollection: string, subId: string) {
    return doc(this.collectionRef, id, subCollection, subId);
  }

  /**
   * Create a new document
   */
  async create(item: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<string> {
    const docRef = await addDoc(this.collectionRef, {
      ...item,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    } as WithFieldValue<T>);
    return docRef.id;
  }

  /**
   * Get a single document by ID
   */
  async getById(id: string, behavior: QueryBehavior = "default"): Promise<T | null> {
    const docRef = doc(this.collectionRef, id);
    let snapshot: DocumentSnapshot<T, DocumentData>;
    switch (behavior) {
      case "server-only":
        snapshot = await getDocFromServer(docRef);
        break;
      case "cache-only":
        snapshot = await getDocFromCache(docRef);
        break;
      default:
        snapshot = await getDoc(docRef);
        break;
    }
    return snapshot.exists() ? snapshot.data() : null;
  }

  /**
   * Get all documents
   *
   * @param [constraints=[]] {@link QueryConstraint} - optionally specifies filters/ordering
   * @param [behavior="default"] {@link QueryBehavior} - optionally defines how Firestore query the data
   *
   * @returns A `Promise` that resolves with the type `T` of results of the query.
   */
  async getAll(
    constraints: QueryConstraint[] = [],
    behavior: QueryBehavior = "default",
  ): Promise<T[]> {
    const q = query(this.collectionRef, ...constraints);
    let snapshot: QuerySnapshot<T, DocumentData>;
    switch (behavior) {
      case "server-only":
        snapshot = await getDocsFromServer(q);
        break;
      case "cache-only":
        snapshot = await getDocsFromCache(q);
        break;
      default:
        snapshot = await getDocs(q);
        break;
    }
    return snapshot.docs.map((doc) => doc.data());
  }

  /**
   * Update an existing document
   */
  async update(id: string, item: Partial<T>): Promise<void> {
    const docRef = doc(this.collectionRef, id);
    await updateDoc(docRef, { ...item, updatedAt: serverTimestamp() } as UpdateData<T>);
  }

  /**
   * Delete a document
   */
  async delete(id: string): Promise<void> {
    const docRef = doc(this.collectionRef, id);
    await deleteDoc(docRef);
  }

  /**
   * Raw Firestore transaction runner
   */
  async runAtomic<R>(updateFunction: (transaction: Transaction) => Promise<R>): Promise<R> {
    return await runTransaction(db, updateFunction);
  }

  /**
   * Gets a reference to a sub-collection document WITHOUT the parent's converter.
   * This prevents the "Argument is not assignable to <Entity>" error.
   */
  getUntypedSubDocRef(id: string, subCollection: FirestoreSubCollectionName, subId: string) {
    // We use 'db' and strings directly to avoid inheriting the 'this.collectionRef' types
    return doc(db, this.collectionRef.path, id, subCollection, subId);
  }
}
