import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

import * as dns from 'node:dns';

// Set custom DNS servers (Cloudflare and Google)
dns.setServers(['1.1.1.1', '8.8.8.8']);

// Verify the current servers
console.log('Current DNS servers:', dns.getServers());

// Example usage: resolve an IPv4 address
dns.resolve4('example.com', (err, addresses) => {
  if (err) {
    console.error('DNS resolution error:', err);
    return;
  }
  console.log('Resolved addresses:', addresses);
});

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL as string);
const db = client.db('better-auth-db');

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: mongodbAdapter(db, {
        client,
    }),
});
