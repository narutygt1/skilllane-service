// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import CourseModel from "@/models/course/course.model";
import { runMiddleware, cors } from "@/lib/cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse<IResponseData>) {
	await runMiddleware(req, res, cors);

	if (req.method == "POST") {
		const { id } = req.body;
		if (!id) return res.status(400).json({ message: "'id' is undefined" });

		await dbConnect();
		await CourseModel.deleteOne({ _id: id });
		res.status(200).json({ message: "Deleted Successful" });
	} else {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
