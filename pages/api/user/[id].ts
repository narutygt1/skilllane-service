// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import UserModel from "@/models/user/user.model";
import { runMiddleware, cors } from "@/lib/cors";
require("@/models/role/role.model");

export default async function handler(req: NextApiRequest, res: NextApiResponse<IResponseData>) {
	await runMiddleware(req, res, cors);

	if (req.method == "GET") {
		const { id } = req.query;
		if (!id) return res.status(400).json({ message: "'id' is undefined" });

		await dbConnect();
		const userRes = await UserModel.findById(id).populate("role");
		res.status(200).json({ data: userRes });
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
