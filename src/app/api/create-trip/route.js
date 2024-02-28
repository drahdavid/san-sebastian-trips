import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

export async function POST(req) {
  async function streamToString(stream) {
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString("utf8");
  }

  const response = await streamToString(req.body);
  const formData = JSON.parse(response);

  const docRes = await addDoc(collection(db, "REGISTROS"), formData);

  return Response.json(docRes);
}
