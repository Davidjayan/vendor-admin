import mongodb from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest,
    res: NextApiResponse) => {
    const data = req.body;
    if (data) {

        try {
            const db = await mongodb()
            if (data._id) {
                const _id = data._id;
                delete data._id;
                const result = await db.collection('Vendor').updateOne({ _id: new ObjectId(_id) }, {$set:{...data}});
                res.json(result)
            } else {
                const result = await db.collection('Vendor').insertOne({ ...data });
                res.json(result);
            }
        } catch (e: any) {
            return res.status(400).send({
                message: e.message,
                name: e.name
            });
        }
    } else {
        throw new Error('Please check your request.Necessary data not provided');
    }
};