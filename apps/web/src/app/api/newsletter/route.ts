import { NextRequest, NextResponse } from 'next/server';

const BITRIX24_WEBHOOK = process.env.BITRIX24_WEBHOOK_URL || 'https://tbgroup.bitrix24.kz/rest/18/kjdwaeorinhxto5q/';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source = 'newsletter' } = body;

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send to Bitrix24
    const bitrixData = new URLSearchParams({
      'event': 'ONCRMLEADDUPLICATESEARCHRESULTNOTFOUND',
      'data[0][TYPE]': 'email',
      'data[0][VALUE]': email,
      'data[COLUMNS]': 'ID',
    });

    const bitrixResponse = await fetch(`${BITRIX24_WEBHOOK}crm.lead.add.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'fields[TITLE]': `Подписка на новости: ${email}`,
        'fields[EMAIL][0][VALUE]': email,
        'fields[EMAIL][0][VALUE_TYPE]': 'WORK',
        'fields[SOURCE_ID]': '1',
        'fields[UF_CRM_SOURCE]': source,
        'fields[COMMENTS]': 'Подписка на новостную рассылку с сайта tb-group.kz',
      }),
    });

    if (!bitrixResponse.ok) {
      console.error('Bitrix24 error:', await bitrixResponse.text());
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      );
    }

    const result = await bitrixResponse.json();
    console.log('Newsletter subscription created:', result);

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
