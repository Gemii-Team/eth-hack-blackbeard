import type { NextApiRequest, NextApiResponse } from "next";
import { Locale } from "../../../i18n-config";

const dictionaries = {
    en: () => import("../../../dictionaries/en.json").then((module) => module.default),
    th: () => import("../../../dictionaries/th.json").then((module) => module.default),
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { lang }: { lang: Locale } = req.query as any;

    if (!lang || !dictionaries[lang]) {
        return res.status(400).json({ error: "Invalid language" });
    }

    try {
        const dictionary = await dictionaries[lang]();
        return res.status(200).json(dictionary);
    } catch (error) {
        return res.status(500).json({ error: "Failed to load dictionary" });
    }
}
