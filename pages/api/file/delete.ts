import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import AWS from "aws-sdk";
import { runMiddleware, cors } from "@/lib/cors";

export const config = {
	api: {
		bodyParser: false,
	},
};

type Data = {
	message?: string;
	filePath?: string;
};

async function awsS3DeleteFile(req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> {
	const form = new formidable.IncomingForm();

	return new Promise(function (resolve, reject) {
		form.parse(req, async function (err, fields, files) {
			if (err) return res.status(500).json({ message: err.message });
			else {
				const fileUpload: formidable.File = files.file as any;
				const filename = fileUpload.name;
				const distPath = "skilllane/uploads/";

				AWS.config.update({
					accessKeyId: process.env.AWS_S3_ACCESS_KEY,
					secretAccessKey: process.env.AWS_S3_SECRET_KEY,
					region: process.env.AWS_S3_REGION,
					signatureVersion: "v4",
				});

				const s3 = new AWS.S3();

				var params = {
					Bucket: process.env.AWS_S3_BUCKET_NAME as string,
					Key: distPath + filename,
				};

				await s3.deleteObject(params, function (s3Err, s3Data) {
					if (err) return res.status(500).json({ message: s3Err.message });
					else {
						res.status(200).json({ message: "File deleted successfully!!" });
						resolve();
					}
				});
			}
		});
	});
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	await runMiddleware(req, res, cors);

	if (req.method !== "POST") res.status(404).json({ message: "delete failed!!" });

	// await localDeleteFile(req, res);
	await awsS3DeleteFile(req, res);
}
