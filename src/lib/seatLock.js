import {
  doc,
  collection,
  setDoc,
  deleteDoc,
  getDoc,
  serverTimestamp,
  runTransaction,
  onSnapshot,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase";

export const getShowDocId = (movieId, hallId, time) =>
  `${movieId}_${hallId}_${encodeURIComponent(time)}`;

export async function lockSeat(showId, seatId, uid) {
  const ref = doc(db, "shows", showId, "locks", seatId);

  try {
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(ref);

      if (snap.exists()) throw new Error("LOCK_EXISTS");

      tx.set(ref, {
        uid,
        lockedAt: serverTimestamp(),
      });
    });

    return { ok: true };
  } catch (err) {
    return { ok: false };
  }
}

export async function unlockSeat(showId, seatId, uid) {
  const ref = doc(db, "shows", showId, "locks", seatId);
  const snap = await getDoc(ref);

  if (snap.exists() && snap.data().uid === uid) {
    await deleteDoc(ref);
  }
}

export function subscribeToShowLocks(showId, cb) {
  const locksRef = collection(db, "shows", showId, "locks");
  const showRef = doc(db, "shows", showId);

  const unsub1 = onSnapshot(locksRef, (q) => {
    const lockMap = {};
    q.forEach((d) => (lockMap[d.id] = d.data()));
    cb({ type: "locks", locks: lockMap });
  });

  const unsub2 = onSnapshot(showRef, (snap) =>
    cb({ type: "show", data: snap.data() })
  );

  return () => {
    unsub1();
    unsub2();
  };
}

export async function confirmBooking({ showId, seatIds, uid }) {
  const showRef = doc(db, "shows", showId);

  try {
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(showRef);

      if (!snap.exists()) throw new Error("NO_SHOW");

      const booked = snap.data().bookedSeats || [];

      for (const s of seatIds) {
        if (booked.includes(s)) throw new Error("ALREADY_BOOKED");
      }

      tx.update(showRef, {
        bookedSeats: arrayUnion(...seatIds),
      });

      for (const s of seatIds) {
        tx.delete(doc(db, "shows", showId, "locks", s));
      }
    });

    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}
