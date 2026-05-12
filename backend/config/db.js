import mongoose from "mongoose";

const MAX_CONNECTION_ATTEMPTS = 3;
const RETRY_DELAY_MS = 3000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const redactMongoUri = (uri) => uri.replace(/(mongodb(?:\+srv)?:\/\/)(.*@)/, "$1<credentials>@");

const buildMongoErrorMessage = (error, mongoUri) => {
    const safeUri = redactMongoUri(mongoUri);
    const messages = [
        `MongoDB connection failed for ${safeUri}.`,
        error.message,
    ];

    if (error.code === "ENOTFOUND" && mongoUri.startsWith("mongodb+srv://")) {
        messages.push(
            "The Atlas SRV hostname could not be resolved. Verify that MONGO_URI uses the exact connection string from MongoDB Atlas, or switch Render to the non-SRV mongodb:// connection string from Atlas if DNS SRV lookups are blocked."
        );
    }

    return messages.join(" ");
};

export const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        throw new Error("MONGO_URI environment variable is required to start the API.");
    }

    for (let attempt = 1; attempt <= MAX_CONNECTION_ATTEMPTS; attempt += 1) {
        try {
            await mongoose.connect(mongoUri, {
                serverSelectionTimeoutMS: 10000,
            });
            console.log("DB connected");
            return;
        } catch (error) {
            const isLastAttempt = attempt === MAX_CONNECTION_ATTEMPTS;
            console.error(`MongoDB connection attempt ${attempt}/${MAX_CONNECTION_ATTEMPTS} failed.`);

            if (isLastAttempt) {
                throw new Error(buildMongoErrorMessage(error, mongoUri), { cause: error });
            }

            await sleep(RETRY_DELAY_MS);
        }
    }
};
