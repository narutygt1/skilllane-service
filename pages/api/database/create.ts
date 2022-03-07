import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import RoleModel from "@/models/role/role.model";
import CategoryModel from "@/models/category/category.model";
import { IRole } from "@/models/role/role.types";
import { ICategory } from "@/models/category/category.types";

type Data = {
	message: string;
};

const initRoles: IRole[] = [
	{
		name: "student",
		display: "นักเรียน",
	},
	{
		name: "instructor",
		display: "ผู้สอน",
	},
];

const initCat: ICategory[] = [
	{
		name: "mandatory",
		display: "วิชาบังคับ",
	},
	{
		name: "elective",
		display: "วิชาเลือก",
	},
];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		await dbConnect();

		// create or update: 'roles'
		for (const roleObj of initRoles) {
			await RoleModel.replaceOne({ name: roleObj.name }, roleObj, {
				upsert: true,
			});
		}

		// create or update: 'categories'
		for (const catObj of initCat) {
			await CategoryModel.replaceOne({ name: catObj.name }, catObj, {
				upsert: true,
			});
		}

		res.status(200).json({ message: "Created and Updated successful" });
	} catch (error: any) {
		res.status(401).json({ message: error.message });
	}
}
