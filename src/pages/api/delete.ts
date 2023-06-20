import mongodb from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest,
    res: NextApiResponse) => {

    try {
        const { _id }: any = req.query;
        const db = await mongodb();
        const result = await db.collection('Vendor').deleteOne({ _id: new ObjectId(_id) });
        res.json(result);
    } catch (e: any) {
        return res.status(400).send({
            message: e.message,
            name: e.name
        });
    }

};