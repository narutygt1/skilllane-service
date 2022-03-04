import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import RoleModel from "@/models/role/role.model";
import { IRole } from "@/models/role/role.types";

type Data = {
	message: string;
};

const initRoles: IRole[] = [
	{
		name: "student",
	},
	{
		name: "instructor",
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

		res.status(200).json({ message: "Updated to data" });
	} catch (error: any) {
		res.status(401).json({ message: error.message });
	}
}
