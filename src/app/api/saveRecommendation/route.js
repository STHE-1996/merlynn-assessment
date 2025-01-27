// app/api/saveRecommendation/route.js
import { connectToDatabase } from '../../../lib/mongodb';

export async function POST(req) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('recommendations'); // Name of your MongoDB collection

    // Parse the request body
    const body = await req.json();

    // Save the response to MongoDB
    const result = await collection.insertOne(body);

    return new Response(JSON.stringify({ message: 'Data saved successfully', result }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error saving data to MongoDB', error);
    return new Response(JSON.stringify({ message: 'Failed to save data', error: error.message }), {
      status: 500,
    });
  }
}
