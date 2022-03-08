// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import CourseModel from "@/models/course/course.model";
import CategoryModel from "@/models/category/category.model";
import { runMiddleware, cors } from "@/lib/cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse<IResponseData>) {
	await runMiddleware(req, res, cors);

	if (req.method == "POST") {
		const { id, name, description, subject, category, image, start_time, end_time, number_of_student } =
			req.body;

		if (!id) return res.status(400).json({ message: "'name' is undefined" });

		await dbConnect();

		const resCourse = await CourseModel.findById(id);
		if (!resCourse) {
			return res.status(401).json({ message: "This course does not exist" });
		}

		if (name) {
			resCourse.name = name;
		}

		if (description) {
			resCourse.description = description;
		}

		if (subject) {
			resCourse.subject = subject;
		}

		if (category) {
			const resCat = await CategoryModel.findOne({ name: category }).catch(() => {});
			if (!resCat) {
				return res.status(401).json({ message: "Create failed" });
			}
			resCourse.category = resCat._id;
		}

		if (image !== undefined) {
			resCourse.image = image || "";
		}

		if (start_time) {
			resCourse.start_time = new Date(start_time);
		}

		if (end_time) {
			resCourse.end_time = new Date(end_time);
		}

		if (number_of_student) {
			resCourse.number_of_student = number_of_student || 1;
		}

		resCourse.save();

		return res.status(200).json({ message: "Updated Successful" });
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
