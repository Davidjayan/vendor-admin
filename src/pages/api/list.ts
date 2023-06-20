import mongodb from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest,
    res: NextApiResponse) => {

    try {
        const { limit, skip }: any = req.query;
        const db = await mongodb()
        const result = await db.collection('Vendor').find().limit(parseInt(limit)).skip(parseInt(skip)).toArray();
        res.json(result);
    } catch (e: any) {
        return res.status(400).send({
            message: e.message,
            name: e.name
        });
    }

};