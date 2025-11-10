import { NextRequest, NextResponse } from 'next/server';

// This is a server-side only route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { fullName, email, phone, company, message, serviceInterest } = body;

    // Basic validation
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: 'Необходимо заполнить все обязательные поля' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Некорректный формат email' },
        { status: 400 }
      );
    }

    // Prepare data for Bitrix24
    const leadData = {
      title: `Заявка с сайта: ${fullName}`,
      name: fullName,
      email: email,
      phone: phone,
      company: company || '',
      message: message || '',
      serviceInterest: serviceInterest || '',
      source: 'website',
    };

    // Send to Bitrix24
    const bitrixWebhook = 'https://tbgroup.bitrix24.kz/rest/18/kjdwaeorinhxto5q/';

    const leadPayload = {
      fields: {
        TITLE: leadData.title,
        NAME: leadData.name,
        EMAIL: [{ VALUE: leadData.email, VALUE_TYPE: 'WORK' }],
        PHONE: [{ VALUE: leadData.phone, VALUE_TYPE: 'WORK' }],
        COMPANY_TITLE: leadData.company,
        COMMENTS: `Источник: ${leadData.source}\nУслуга: ${leadData.serviceInterest}\nСообщение: ${leadData.message}`,
        SOURCE_ID: 'WEB',
        STATUS_ID: 'NEW',
        CURRENCY_ID: 'KZT',
      }
    };

    const response = await fetch(`${bitrixWebhook}crm.lead.add.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadPayload),
      // Add timeout
      signal: AbortSignal.timeout(10000),
    });

    const data = await response.json();

    if (data.error) {
      console.error('Bitrix24 error:', data.error);
      return NextResponse.json(
        { error: 'Ошибка при отправке в Битрикс24' },
        { status: 500 }
      );
    }

    // Log success
    console.log('Lead created in Bitrix24:', data.result);

    return NextResponse.json({
      status: 'success',
      contactRequestId: `web-${Date.now()}`,
      leadId: data.result,
      message: 'Заявка успешно отправлена!',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Произошла ошибка при отправке заявки' },
      { status: 500 }
    );
  }
}
