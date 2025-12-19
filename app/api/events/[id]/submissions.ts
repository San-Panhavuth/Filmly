import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Helper to fetch user email by user id
async function fetchUserEmailById(userId: number): Promise<string | null> {
	const res = await fetch(
		`${SUPABASE_URL}/rest/v1/user_profile?id=eq.${userId}`,
		{
			headers: { apikey: SUPABASE_ANON_KEY },
		}
	);
	if (!res.ok) return null;
	const data = await res.json();
	if (Array.isArray(data) && data.length > 0) {
		return data[0].email || null;
	}
	return null;
}

// GET /api/events/[id]/submissions
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	if (!id) {
		return NextResponse.json({ error: 'Missing event id' }, { status: 400 });
	}

	// Fetch submissions for this event
	const query = `${SUPABASE_URL}/rest/v1/event_film_submission?select=*,film(*),event(*)&event_id=eq.${encodeURIComponent(id)}`;
	const res = await fetch(query, {
		headers: {
			apikey: SUPABASE_ANON_KEY,
		},
	});

	if (!res.ok) {
		return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: res.status });
	}
	const data = await res.json();

	// For each submission, fetch the filmOwner email by id
	const submissions = Array.isArray(data)
		? await Promise.all(
				data.map(async (item) => {
					let filmOwnerEmail = null;
					if (item.filmOwner?.id) {
						filmOwnerEmail = await fetchUserEmailById(item.filmOwner.id);
					}
					return {
						...item,
						filmOwner: {
							...item.filmOwner,
							email: filmOwnerEmail,
						},
					};
				})
			)
		: [];

	return NextResponse.json({ submissions });
}
