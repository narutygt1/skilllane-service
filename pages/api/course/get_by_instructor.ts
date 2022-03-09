// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import CourseModel from "@/models/course/course.model";
require("@/models/category/category.model");
require("@/models/user/user.model");
import { runMiddleware, cors } from "@/lib/cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse<IResponseData>) {
	await runMiddleware(req, res, cors);

	if (req.method == "GET") {
		const { instructorId } = req.query;

		await dbConnect();
		const courseRes =
			(await CourseModel.find({ instructor: { $in: [instructorId] } }).populate([
				{
					path: "category",
				},
				{
					path: "instructor",
					select: "firstname lastname nickname",
				},
			])) || [];
		res.status(200).json({ data: courseRes });
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
