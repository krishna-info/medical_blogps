export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
    }

    // Integrate with Brevo API here using fetch
    console.log(`[Newsletter] Subscribed: ${email}`);
    
    return new Response(JSON.stringify({ success: true, message: 'Subscribed successfully' }), { status: 200, headers: { 'Content-Type': 'application/json' }});
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to subscribe' }), { status: 500 });
  }
}
