import { Server } from 'azle';
import express from 'express';
import { compile } from 'watr';

export default Server(() => {
    const app = express();

    app.get('/', async (req, res) => {
        const buffer = compile(`
        (
            func (export "double") (param i32) (result i32)
                (i32.mul (local.get 0) (i32.const 2))
        )
        (
            func (export "add") (param i32) (param i32) (result i32)
                (i32.add (local.get 0) (local.get 1))
        )
        (
            func (export "quadruple") (param i32) (result i32)
                (i32.mul (local.get 0) (i32.const 4))
        )
        `);

        const { instance } = (await WebAssembly.instantiate(
            buffer.buffer
        )) as any;

        const doubleResult = instance.exports.double(Number(req.query.num1));

        const addResult = instance.exports.add(
            Number(req.query.num1),
            Number(req.query.num2)
        );

        const quadrupleResult = instance.exports.quadruple(
            Number(req.query.num3)
        );

        res.json({
            doubleResult,
            addResult,
            quadrupleResult
        });
    });

    return app.listen();
});
