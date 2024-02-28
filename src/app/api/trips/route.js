import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export async function GET(req) {
  let data = [];
  const q = query(collection(db, "REGISTROS"));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  return Response.json(data);
}
