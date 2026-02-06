import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, email, phone, recreateInterest, otherDetails } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    if (!isSupabaseConfigured || !supabase) {
      console.warn('Supabase not configured. Logging submission to console:', body);
      
      // In development, just log the data
      console.log('\n=== NEW SIGNUP ===');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Phone:', phone);
      console.log('Interests:', recreateInterest);
      console.log('Details:', otherDetails);
      console.log('==================\n');
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Signup received (development mode)',
          data: body 
        },
        { status: 201 }
      );
    }

    // Log Supabase configuration (without exposing full keys)
    console.log('Supabase URL:', process.env.SUPABASE_URL ? 'Set' : 'Not set');
    console.log('Supabase Key:', process.env.SUPABASE_ANON_KEY ? `Set (${process.env.SUPABASE_ANON_KEY.substring(0, 10)}...)` : 'Not set');

    // Insert data into Supabase
    try {
      const { data, error } = await supabase
        .from('signups')
        .insert([
          {
            name,
            email,
            phone,
            recreate_interest: recreateInterest || [],
            other_details: otherDetails || null,
            // created_at will be set automatically by the database DEFAULT
          },
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json(
          { error: 'Failed to save signup', details: error.message },
          { status: 500 }
        );
      }

      console.log('Successfully saved signup:', data);
      return NextResponse.json(
        { success: true, data },
        { status: 201 }
      );
    } catch (insertError: any) {
      console.error('Insert error (catch):', insertError);
      return NextResponse.json(
        { 
          error: 'Failed to save signup', 
          details: insertError.message || 'Unknown error',
          hint: 'Check your Supabase credentials in .env file'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
