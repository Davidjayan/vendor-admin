import mongodb from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest,
    res: NextApiResponse) => {

    try {
        const db = await mongodb()
        res.json(await db.collection('Vendor').countDocuments());
    } catch (e: any) {
        return res.status(400).send({
            message: e.message,
            name: e.name
        });
    }

};