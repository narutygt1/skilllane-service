// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import { ICourse } from "@/models/course/course.types";
import CourseModel from "@/models/course/course.model";
import CategoryModel from "@/models/category/category.model";
import UserModel from "@/models/user/user.model";
import { runMiddleware, cors } from "@/lib/cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse<IResponseData>) {
	await runMiddleware(req, res, cors);

	if (req.method == "POST") {
		const {
			name,
			description,
			subject,
			category,
			image,
			start_time,
			end_time,
			number_of_student,
			instructor,
		} = req.body;

		if (!name) return res.status(400).json({ message: "'name' is undefined" });
		if (!description) return res.status(400).json({ message: "'description' is undefined" });
		if (!subject) return res.status(400).json({ message: "'subject' is undefined" });
		if (!category) return res.status(400).json({ message: "'category' is undefined" });
		if (!start_time) return res.status(400).json({ message: "'start_time' is undefined" });
		if (!end_time) return res.status(400).json({ message: "'end_time' is undefined" });
		if (!number_of_student) return res.status(400).json({ message: "'number_of_student' is undefined" });
		if (!instructor) return res.status(400).json({ message: "'instructor' is undefined" });

		await dbConnect();

		const resCat = await CategoryModel.findOne({ name: category }).catch(() => {});
		if (!resCat) {
			return res.status(401).json({ message: "Create failed" });
		}

		const resUser = await UserModel.findById(instructor).catch(() => {});
		if (!resUser) {
			return res.status(401).json({ message: "Create failed" });
		}

		const newItem: ICourse = {
			name,
			description,
			category: resCat._id,
			image: image || "",
			subject,
			instructor: [resUser._id],
			price: {
				price: 0,
				credit_price: 0,
			},
			start_time: new Date(start_time),
			end_time: new Date(end_time),
			number_of_student,
		};

		await CourseModel.create(newItem)
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
