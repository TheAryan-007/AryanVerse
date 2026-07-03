import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Supabase environment variables are not configured." }, { status: 500 });
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/archive_entries?select=*`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      next: { revalidate: 0 } // Bypass Next.js fetch cache for real-time reads
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: `Supabase returned an error: ${errText}` }, { status: res.status });
    }

    const data = await res.json();
    
    const customEntries = {};
    const deletedDefaultTitles = [];

    data.forEach(item => {
      const mapped = {
        id: item.id,
        chamberIdx: item.chamber_idx,
        title: item.title,
        tag: item.tag,
        category: item.category,
        date: item.date,
        rating: item.rating,
        description: item.description,
        thumbnailCode: item.thumbnail_code,
        imageUrl: item.image_url,
        content: item.content,
        imageFit: item.image_fit,
        imagePosition: item.image_position,
        imageZoom: item.image_zoom,
        isCustom: true
      };

      if (mapped.category === "DELETED_DEFAULT") {
        deletedDefaultTitles.push(mapped.title);
      } else {
        const cIdx = mapped.chamberIdx;
        if (!customEntries[cIdx]) {
          customEntries[cIdx] = [];
        }
        customEntries[cIdx].push(mapped);
      }
    });

    return NextResponse.json({ customEntries, deletedDefaultTitles });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Supabase environment variables are not configured." }, { status: 500 });
  }

  try {
    const body = await req.json();
    
    const payload = {
      chamber_idx: body.chamberIdx !== undefined ? body.chamberIdx : body.chamber_idx,
      title: body.title,
      tag: body.tag,
      category: body.category,
      date: body.date,
      rating: parseFloat(body.rating) || 0,
      description: body.description,
      thumbnail_code: body.thumbnailCode,
      image_url: body.imageUrl,
      content: body.content,
      image_fit: body.imageFit || 'cover',
      image_position: body.imagePosition !== undefined ? body.imagePosition : 50,
      image_zoom: body.imageZoom !== undefined ? body.imageZoom : 100
    };

    if (body.id) {
      payload.id = body.id;
    }

    const headers = {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    };

    if (payload.id) {
      headers['Prefer'] = 'resolution=merge-duplicates,return=representation';
    }

    const res = await fetch(`${supabaseUrl}/rest/v1/archive_entries`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: `Supabase save failed: ${errText}` }, { status: res.status });
    }

    const returnedData = await res.json();
    return NextResponse.json({ success: true, data: returnedData[0] });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Supabase environment variables are not configured." }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Missing parameter 'id'" }, { status: 400 });
    }

    const res = await fetch(`${supabaseUrl}/rest/v1/archive_entries?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: `Supabase delete failed: ${errText}` }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
