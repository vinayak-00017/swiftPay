/* eslint-disable turbo/no-undeclared-env-vars */
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import db from "@repo/db/client"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: {label:"Phone number", type:"text", placeholder:"12324234"},
                password: {label:"Password", type: 'password'}
            },
            async authorize(credentials: any){
                // Zod and otp
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });

                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation){
                        return{
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email
                        }
                    }
                    return null
                }
                try{
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    });
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    }
                }catch(e){
                    console.error(e);
                }

                return null
            }
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({token, session}: any ){
            session.user.id = token.sub

            return session
        }
    }
}


interface Credentials{
    phone: string,
    password: string
}

interface Token{
    sub: string;
}

interface Session {
    user: {
        id: string,
    };
}

