const { Client } = require('pg');

const connectionString = "postgresql://neondb_owner:npg_GPf1yMtp2Vle@ep-lively-mouse-a1ylyw49-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

async function setupDatabase() {
    const client = new Client({
        connectionString: connectionString,
    });

    try {
        await client.connect();
        console.log("Connected to Neon database successfully.");

        const createTableQuery = `
      CREATE TABLE IF NOT EXISTS "Lead" (
        "id" TEXT PRIMARY KEY,
        "businessName" TEXT NOT NULL,
        "city" TEXT NOT NULL,
        "whatsapp" TEXT NOT NULL,
        "budget" TEXT NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `;

        await client.query(createTableQuery);
        console.log("Table 'Lead' created or already exists.");

    } catch (err) {
        console.error("Error setting up database:", err);
    } finally {
        await client.end();
    }
}

setupDatabase();
