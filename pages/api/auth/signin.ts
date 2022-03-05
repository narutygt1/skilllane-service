// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import jwt from "jsonwebtoken";
import { verifyPassword } from "@/lib/auth";
import UserModel from "@/models/user/user.model";
require("@/models/role/role.model");
import { runMiddleware, cors } from "@/lib/cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse<IResponseData>) {
	await runMiddleware(req, res, cors);

	if (req.method == "POST") {
		const secret = process.env.JWT_SECRET_KEY || "";
		const { username, password } = req.body;

		if (!username) {
			return res.status(400).json({ message: "'username' is undefined" });
		}

		if (!password) {
			return res.status(400).json({ message: "'password' is undefined" });
		}

		await dbConnect();

		const resUser = await UserModel.findOne({ username }).populate("role");
		if (!resUser) {
			return res.status(410).json({ message: "Username or password is invalid" });
		}

		const isValid = await verifyPassword(password, resUser.password);

		if (!isValid) {
			return res.status(405).json({ message: "Username or password is invalid" });
		}

		let temp = jwt.sign(
			{
				...resUser,
			},
			secret
		);

		const userAuth = {
			user: {
				id: resUser._id,
				username: resUser.username,
				firstname: resUser.firstname,
				lastname: resUser.lastname,
				role: (resUser.role as any).name,
			},
			token: temp,
		};

		res.status(200).json({ data: userAuth, message: "Signed In" });
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
