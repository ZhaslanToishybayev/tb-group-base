import { ImageResponse } from 'next/og';

// Image metadata
export const runtime = 'edge';

// Get query parameters
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'TB Group';
  const description = searchParams.get('description') || 'Облачные решения для бизнеса';
  const type = searchParams.get('type') || 'default';

  const size = {
    width: 1200,
    height: 630,
  };

  return new ImageResponse(
    // Template based on type
    type === 'case' ? (
      <CaseTemplate title={title} description={description} />
    ) : type === 'service' ? (
      <ServiceTemplate title={title} description={description} />
    ) : (
      <DefaultTemplate title={title} description={description} />
    ),
    {
      ...size,
    }
  );
}

// Default template for homepage and general pages
function DefaultTemplate({ title, description }: { title: string; description: string }) {
  return (
    <div
      style={{
        fontSize: 42,
        fontFamily: 'Inter',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '60px',
        color: 'white',
      }}
    >
      {/* Logo */}
      <div style={{ fontSize: 32, fontWeight: 600, color: '#3b82f6', marginBottom: 'auto' }}>
        TB Group
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 600,
          lineHeight: 1.2,
          marginBottom: 30,
        }}
      >
        {title}
      </div>

      {/* Description */}
      <div style={{ fontSize: 32, opacity: 0.8, lineHeight: 1.4, maxWidth: '90%' }}>
        {description}
      </div>

      {/* Bottom decoration */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6)',
        }}
      />
    </div>
  );
}

// Service template
function ServiceTemplate({ title, description }: { title: string; description: string }) {
  return (
    <div
      style={{
        fontSize: 42,
        fontFamily: 'Inter',
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '60px',
        color: 'white',
      }}
    >
      {/* Service badge */}
      <div
        style={{
          fontSize: 28,
          fontWeight: 600,
          color: '#10b981',
          marginBottom: 30,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ fontSize: 36 }}>⚙️</span>
        Услуга
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 600,
          lineHeight: 1.2,
          marginBottom: 30,
        }}
      >
        {title}
      </div>

      {/* Description */}
      <div style={{ fontSize: 32, opacity: 0.8, lineHeight: 1.4, maxWidth: '90%' }}>
        {description}
      </div>

      {/* Bottom decoration */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          background: 'linear-gradient(90deg, #10b981, #3b82f6, #10b981)',
        }}
      />
    </div>
  );
}

// Case study template
function CaseTemplate({ title, description }: { title: string; description: string }) {
  return (
    <div
      style={{
        fontSize: 42,
        fontFamily: 'Inter',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '60px',
        color: 'white',
      }}
    >
      {/* Case badge */}
      <div
        style={{
          fontSize: 28,
          fontWeight: 600,
          color: '#f59e0b',
          marginBottom: 30,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ fontSize: 36 }}>📊</span>
        Кейс
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 600,
          lineHeight: 1.2,
          marginBottom: 30,
        }}
      >
        {title}
      </div>

      {/* Description */}
      <div style={{ fontSize: 32, opacity: 0.8, lineHeight: 1.4, maxWidth: '90%' }}>
        {description}
      </div>

      {/* Bottom decoration */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          background: 'linear-gradient(90deg, #f59e0b, #3b82f6, #f59e0b)',
        }}
      />
    </div>
  );
}
