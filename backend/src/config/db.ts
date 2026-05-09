import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string)
        conn && console.log("Mongo DB connected")

    } catch (error) {
        console.log("error", error)
        process.exit(1);

    }
}