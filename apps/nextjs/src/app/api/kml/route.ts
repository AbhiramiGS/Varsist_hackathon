import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import parseKML from "parse-kml";

export async function POST(req: NextRequest) {
  let kmlStuff;
  console.log("=== POST ===");
  const file = JSON.parse(await req.text()); // eslint-disable-line
  console.log(file.kmlFile); // eslint-disable-line

  await parseKML.toJson(file.kmlFile).then((res) => { // eslint-disable-line
    kmlStuff = res;
  });
  return NextResponse.json(kmlStuff);
}
