export async function GET() {
  console.log("HOLA DAVID");

  const data = { pepe: "drah" };

  return Response.json(data);
}
