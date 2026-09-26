const STORES = [
  { name: 'Colombo 04', tag: 'Flagship Store', addr: '137 Bauddhaloka Mawatha,<br/>Colombo 04', tel: ['0112552829','011-255-2829'], hours: 'Monday – Sunday<br/>9:30am – 9:00pm' },
  { name: 'One Galle Face', tag: 'Mall Store — Colombo 02', addr: 'Level 4-59, One Galle Face Mall,<br/>1 Galle Road, Colombo 02', tel: ['0722212228','072-221-2228'], hours: 'As per Mall Hours' },
  { name: 'Kandy City Centre', tag: 'Mall Store — Kandy', addr: 'Level 3-10, Kandy City Centre,<br/>5 Dalada Veediya, Kandy', tel: ['0812220001','081-222-0001'], hours: 'As per Mall Hours' },
];

export default function Locations() {
  return (
    <>
      <div className="breadcrumb-bar"><a href="/">Home</a> <span>›</span> <span>Store Locations</span></div>

      <div style={{ background: 'linear-gradient(135deg,#1a2340 0%,#2e3f6f 100%)', color: 'white', textAlign: 'center', padding: '80px 40px' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, fontWeight: 400, marginBottom: 10 }}>Find Us Near You</h1>
        <p style={{ opacity: 0.75 }}>Visit any of our 3 beautiful stores across Sri Lanka.</p>
      </div>

      <div className="page-body" style={{ paddingTop: 60, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 36 }}>
          {STORES.map(s => (
            <div key={s.name} style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 24px rgba(26,35,64,0.10)' }}>
              <div style={{ background: '#1a2340', padding: 36, textAlign: 'center', color: 'white' }}>
                <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 28 }}>📍</div>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 500, marginBottom: 6 }}>{s.name}</h2>
                <p style={{ fontSize: 13, opacity: 0.7 }}>{s.tag}</p>
              </div>
              <div style={{ padding: 32 }}>
                <div style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>🏠</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, color: '#888', marginBottom: 4 }}>Address</div>
                    <p style={{ fontSize: 14, color: '#4a4a6a' }} dangerouslySetInnerHTML={{ __html: s.addr }}/>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>📞</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, color: '#888', marginBottom: 4 }}>Phone</div>
                    <a href={`tel:${s.tel[0]}`} style={{ fontSize: 14, color: '#1a2340', fontWeight: 500 }}>{s.tel[1]}</a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 14, marginBottom: 24, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>🕐</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, color: '#888', marginBottom: 4 }}>Opening Hours</div>
                    <p style={{ fontSize: 14, color: '#4a4a6a' }} dangerouslySetInnerHTML={{ __html: s.hours }}/>
                  </div>
                </div>
                <div style={{ background: '#e4ddd5', height: 180, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#888', marginBottom: 16 }}>
                  📍 Google Maps — {s.name}
                </div>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: 12, border: '2px solid #1a2340', color: '#1a2340', fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', borderRadius: 4 }}>Get Directions</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
