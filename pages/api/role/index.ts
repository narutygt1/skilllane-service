// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import RoleModel from "@/models/role/role.model";

export default async function handler(req: NextApiRequest, res: NextApiResponse<IResponseData>) {
	if (req.method == "GET") {
		await dbConnect();
		const roleRes = (await RoleModel.find({})) || [];
		res.status(200).json({ data: roleRes });
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
