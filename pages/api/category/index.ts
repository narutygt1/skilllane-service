// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import CategoryModel from "@/models/category/category.model";

export default async function handler(req: NextApiRequest, res: NextApiResponse<IResponseData>) {
	if (req.method == "GET") {
		await dbConnect();
		const catRes = (await CategoryModel.find({})) || [];
		res.status(200).json({ data: catRes });
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
