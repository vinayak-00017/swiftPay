import express from "express"
import db from "@repo/db/client"

const app = express();
app.use(express.json())

app.post("/hdfcWebhook", (req, res) => {
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        db.$transaction([
            db.balance.update({
                where: {
                    userId: paymentInformation.userId,
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
        
            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                },
                data:{
                    status: "Success"
                }
            })
        ]);

        res.status(200).json({
            message: "captured"
        })

    } catch (error) {
        console.error(error)
        res.status(411).json({
            message: "Error during transaction"
        })
    }

})

app.listen(3003)

