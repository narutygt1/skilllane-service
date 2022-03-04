// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import { IUser } from "@/models/user/user.types";
import UserModel from "@/models/user/user.model";

export default async function handler(req: NextApiRequest, res: NextApiResponse<IResponseData>) {
	if (req.method == "POST") {
		await dbConnect();
		const newItem: IUser = {
			username: "aaa",
			password: "aaa",
			firstname: "mark",
			lastname: "zuckerberg",
			nickname: "mark",
			birthday: new Date(),
			gender: "male",
			role: "613fdbab1ccac178ecee0840",
		};

		await UserModel.create(newItem)
			.then(() => {
				return res.status(200).json({ message: "Created Successful" });
			})
			.catch(() => {
				return res.status(401).json({ message: "Create failed" });
			});
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
