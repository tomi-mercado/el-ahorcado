import type { NextApiRequest, NextApiResponse } from "next";
import words from "../../db/words.json";

type Data = {
  words: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  return res.status(200).json({ words });
}
