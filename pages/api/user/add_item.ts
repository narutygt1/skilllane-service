// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { IUser } from "@/models/user/user.types";
import UserModel from "@/models/user/user.model";
import RoleModel from "@/models/role/role.model";
import { runMiddleware, cors } from "@/lib/cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse<IResponseData>) {
	await runMiddleware(req, res, cors);

	if (req.method == "POST") {
		const { username, password, role, firstname, lastname, nickname, gender, birthday } = req.body;
		if (!username) return res.status(400).json({ message: "'username' is undefined" });
		if (!password) return res.status(400).json({ message: "'password' is undefined" });
		if (!role) return res.status(400).json({ message: "'role' is undefined" });
		if (!firstname) return res.status(400).json({ message: "'firstname' is undefined" });
		if (!lastname) return res.status(400).json({ message: "'lastname' is undefined" });
		if (!nickname) return res.status(400).json({ message: "'nickname' is undefined" });
		if (!gender) return res.status(400).json({ message: "'gender' is undefined" });
		if (!birthday) return res.status(400).json({ message: "'birthday' is undefined" });

		await dbConnect();

		const resRole = await RoleModel.findOne({ name: role }).catch(() => {});

		if (!resRole) {
			return res.status(401).json({ message: "Create failed" });
		}

		const brDay = new Date(birthday);
		brDay.setHours(0, 0, 0, 0);

		const newItem: IUser = {
			username,
			password: await hashPassword("aaa"),
			firstname,
			lastname,
			nickname,
			birthday: brDay,
			gender,
			role: resRole._id,
		};

		const isUserExist = await UserModel.findOne({ username });
		if (isUserExist) return res.status(401).json({ message: `'${username}' does existed` });

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
