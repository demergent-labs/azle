import { Request, Response } from 'express';
import { createReadStream, statSync } from 'fs';
import parseRange from 'range-parser';

export function rangeResponse(maxRange: number = 3_000_000) {
    return async (req: Request, res: Response) => {
        const filePath = req.originalUrl;
        const fileLength = statSync(filePath).size;

        if (req.headers.range === undefined) {
            res.status(500).send(`Only range requests are supported`);
            return;
        }

        const ranges = parseRange(fileLength, req.headers.range);

        if (ranges === -1) {
            res.status(500).send(`The ranges are unsatisfiable`);
            return;
        }

        if (ranges === -2) {
            res.status(500).send(`The ranges are invalid`);
            return;
        }

        if (ranges.length > 1) {
            res.status(500).send(`Only a single range is allowed`);
            return;
        }

        if (ranges.type !== 'bytes') {
            res.status(500).send(`Only range bytes is allowed`);
            return;
        }

        const range = ranges[0];
        const rangeStart = range.start;
        const rangeEnd =
            range.end - range.start > maxRange
                ? range.start + maxRange - 1
                : range.end;

        const fileStream = createReadStream(filePath, {
            start: rangeStart,
            end: rangeEnd
        });

        for await (const data of fileStream) {
            res.write(data);
        }

        res.status(206);
        res.setHeader(
            'Content-Range',
            `bytes ${rangeStart}-${rangeEnd}/${fileLength}`
        );

        res.end();
    };
}
