import Cors from "cors";

// Initializing the cors middleware
export const cors = Cors({
	methods: ["GET", "HEAD", "POST"],
});

export function runMiddleware(req: any, res: any, fn: any) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result: any) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}
