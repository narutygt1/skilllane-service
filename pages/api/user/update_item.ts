// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import UserModel from "@/models/user/user.model";
import { runMiddleware, cors } from "@/lib/cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse<IResponseData>) {
	await runMiddleware(req, res, cors);

	if (req.method == "POST") {
		const { id, firstname, lastname, nickname, gender, birthday } = req.body;
		if (!id) return res.status(400).json({ message: "'id' is undefined" });

		await dbConnect();

		const resUser = await UserModel.findById(id).catch(() => {
			return res.status(400).json({ message: "Update failed" });
		});

		if (!resUser) {
			return res.status(401).json({ message: "Username does not exist" });
		}

		if (firstname) {
			resUser.firstname = firstname;
		}

		if (lastname) {
			resUser.lastname = lastname;
		}

		if (nickname) {
			resUser.nickname = nickname;
		}

		if (gender) {
			resUser.gender = gender;
		}

		if (birthday) {
			const brDay = new Date(birthday);
			brDay.setHours(0, 0, 0, 0);
			resUser.birthday = brDay;
		}

		resUser.save();

		return res.status(200).json({ message: "Updated Successful" });
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
