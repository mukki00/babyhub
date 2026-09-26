export default function Loyalty() {
  return (
    <>
      <div className="breadcrumb-bar"><a href="/">Home</a> <span>›</span> <span>BH Magic Loyalty</span></div>

      <div style={{ background: 'linear-gradient(135deg,#1a2340 0%,#3a2060 100%)', color: 'white', textAlign: 'center', padding: '100px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative' }}>
          <p style={{ fontFamily: "'Dancing Script',cursive", fontSize: 20, letterSpacing: 3, opacity: 0.8, marginBottom: 14 }}>Rewarding Every Little Milestone</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 52, fontWeight: 400, marginBottom: 16 }}>BH Magic Loyalty</h1>
          <p style={{ fontSize: 16, opacity: 0.8, maxWidth: 540, margin: '0 auto 36px' }}>Earn points on every purchase, every visit, every milestone. Redeem for exclusive rewards and unlock member-only benefits.</p>
          <a href="/account/login" style={{ display: 'inline-block', padding: '16px 48px', background: '#c9973c', color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', borderRadius: 4 }}>Join for Free</a>
        </div>
      </div>

      <div style={{ padding: '80px 40px', textAlign: 'center', background: '#faf6f1' }}>
        <span className="section-eyebrow">Simple &amp; Rewarding</span>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 38, fontWeight: 400, margin: '14px 0 50px' }}>How It Works</h2>
        <div className="loyalty-steps">
          {[
            ['1','Sign Up','Create your free Baby Hub account online or at any of our stores.'],
            ['2','Shop & Earn','Earn 1 point for every Rs. 100 spent in store or online.'],
            ['3','Climb the Tiers','Reach Bronze, Silver and Gold tiers to unlock increasingly exclusive perks.'],
            ['4','Redeem Rewards','Use your points for discounts, free products, and special experiences.'],
          ].map(([n, title, text]) => (
            <div className="loyalty-step" key={n}>
              <div className="loyalty-step-num">{n}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '80px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <span className="section-eyebrow">Membership Tiers</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 38, fontWeight: 400, marginTop: 14 }}>Choose Your Journey</h2>
        </div>
        <div className="loyalty-tiers">
          <div className="loyalty-tier">
            <div className="loyalty-tier-head" style={{ background: 'linear-gradient(135deg,#cd7f32,#a0522d)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🥉</div>
              <h3>Bronze</h3>
              <p style={{ fontSize: 13, opacity: 0.85, marginTop: 6 }}>Rs. 0 – Rs. 10,000 spent</p>
            </div>
            <div className="loyalty-tier-body">
              <ul>
                <li>✓ Earn 1 point per Rs. 100</li>
                <li>✓ Birthday discount voucher</li>
                <li>✓ Early access to sales</li>
                <li>✓ Monthly newsletter</li>
                <li>✓ Exclusive member events</li>
              </ul>
              <a href="/account/login" className="loyalty-tier-cta">Join Now</a>
            </div>
          </div>

          <div className="loyalty-tier featured-tier">
            <div className="tier-popular">Most Popular</div>
            <div className="loyalty-tier-head" style={{ background: 'linear-gradient(135deg,#c0c0c0,#808080)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🥈</div>
              <h3>Silver</h3>
              <p style={{ fontSize: 13, opacity: 0.85, marginTop: 6 }}>Rs. 10,001 – Rs. 50,000 spent</p>
            </div>
            <div className="loyalty-tier-body">
              <ul>
                <li>✓ Earn 1.5 points per Rs. 100</li>
                <li>✓ All Bronze benefits</li>
                <li>✓ 5% discount on all purchases</li>
                <li>✓ Free standard delivery always</li>
                <li>✓ Personalisation priority</li>
                <li>✓ Exclusive Silver events</li>
              </ul>
              <a href="/account/login" className="loyalty-tier-cta">Join Now</a>
            </div>
          </div>

          <div className="loyalty-tier">
            <div className="loyalty-tier-head" style={{ background: 'linear-gradient(135deg,#ffd700,#b8860b)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🥇</div>
              <h3>Gold</h3>
              <p style={{ fontSize: 13, opacity: 0.85, marginTop: 6 }}>Rs. 50,001+ spent</p>
            </div>
            <div className="loyalty-tier-body">
              <ul>
                <li>✓ Earn 2 points per Rs. 100</li>
                <li>✓ All Silver benefits</li>
                <li>✓ 10% discount on all purchases</li>
                <li>✓ VIP previews &amp; launches</li>
                <li>✓ Dedicated account manager</li>
                <li>✓ Complimentary gift wrapping</li>
                <li>✓ Annual Gold gift</li>
              </ul>
              <a href="/account/login" className="loyalty-tier-cta">Join Now</a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: '#1a2340', color: 'white', padding: '70px 40px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 400, marginBottom: 40 }}>Points Earning Summary</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap', maxWidth: 800, margin: '0 auto' }}>
          {[['1×','#c9973c','Bronze<br/>1pt per Rs. 100'],['1.5×','#c0c0c0','Silver<br/>1.5pts per Rs. 100'],['2×','#ffd700','Gold<br/>2pts per Rs. 100']].map(([mult, color, label]) => (
            <div key={mult} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '28px 36px', minWidth: 180 }}>
              <div style={{ fontSize: 36, fontWeight: 700, color }}>{mult}</div>
              <div style={{ fontSize: 13, opacity: 0.7, marginTop: 6 }} dangerouslySetInnerHTML={{ __html: label }}/>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 36, fontSize: 14, opacity: 0.6 }}>100 points = Rs. 100 in store credit</p>
      </div>

      <div style={{ padding: '70px 40px', textAlign: 'center', background: '#faf6f1' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 400, marginBottom: 12 }}>Ready to join?</h2>
        <p style={{ color: '#888', marginBottom: 28 }}>Sign up today — it's completely free and takes less than a minute.</p>
        <a href="/account/login" style={{ display: 'inline-block', padding: '16px 48px', background: '#1a2340', color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', borderRadius: 4 }}>Create Account</a>
      </div>
    </>
  );
}
