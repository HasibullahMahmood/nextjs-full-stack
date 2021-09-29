import fs from 'fs';
import path from 'path';

export const getFeedbacks = async () => {
	const filePath = path.join(process.cwd(), 'data', 'feedbacks.json');
	const data = fs.readFileSync(filePath);
	return JSON.parse(data);
};

const handler = (req, res) => {
	if (req.method === 'POST') {
		const { email, feedback } = req.body;

		const newFeedback = {
			id: new Date().toISOString(),
			email,
			feedback,
		};

		const filePath = path.join(process.cwd(), 'data', 'feedbacks.json');
		let data = fs.readFileSync(filePath);
		data = JSON.parse(data);
		data.push(newFeedback);

		fs.writeFileSync(filePath, JSON.stringify(data));
		res.status(201).json({ result: true, dbResult: newFeedback });
	} else {
		const data = getFeedbacks();
		res.status(200).json({ dbResult: data });
	}
};

export default handler;
