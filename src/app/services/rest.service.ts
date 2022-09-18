import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  addDoc,
  setDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private usersCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.usersCollection = collection(this.firestore, 'users');
  }

  getAll() {
    return collectionData(this.usersCollection, {
      idField: 'id',
    }) as Observable<any[]>;
  }

  get(id: string) {
    const userDocumentReference = doc(this.firestore, `users/${id}`);
    return docData(userDocumentReference, { idField: 'id' });
  }

  create(user: any) {
    const userDocumentReference = doc(
      this.firestore,
      `users/${user.id}`
    );
    return setDoc(userDocumentReference, user);
  }

  update(user: any) {
    const userDocumentReference = doc(
      this.firestore,
      `users/${user.id}`
    );
    return updateDoc(userDocumentReference, { ...user });
  }

  delete(id: string) {
    const userDocumentReference = doc(this.firestore, `users/${id}`);
    return deleteDoc(userDocumentReference);
  }
}
