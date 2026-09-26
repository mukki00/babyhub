export default function Blog() {
  return (
    <>
      <div className="breadcrumb-bar"><a href="/">Home</a> <span>›</span> <span>Journal</span></div>

      <div style={{ background: '#1a2340', color: 'white', textAlign: 'center', padding: '70px 40px' }}>
        <p style={{ fontFamily: "'Dancing Script',cursive", fontSize: 18, letterSpacing: 3, opacity: 0.75, marginBottom: 10 }}>Stories, Tips &amp; Inspiration</p>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, fontWeight: 400 }}>The Baby Hub Journal</h1>
      </div>

      <div style={{ padding: '28px 40px', background: '#faf6f1', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          <a href="#" style={{ padding: '8px 22px', background: '#1a2340', color: 'white', borderRadius: 30, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>All</a>
          <a href="#" style={{ padding: '8px 22px', background: 'white', color: '#1a2340', border: '1px solid #e4ddd5', borderRadius: 30, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Baby Care</a>
          <a href="#" style={{ padding: '8px 22px', background: 'white', color: '#1a2340', border: '1px solid #e4ddd5', borderRadius: 30, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Nursery</a>
          <a href="#" style={{ padding: '8px 22px', background: 'white', color: '#1a2340', border: '1px solid #e4ddd5', borderRadius: 30, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Gifting</a>
          <a href="#" style={{ padding: '8px 22px', background: 'white', color: '#1a2340', border: '1px solid #e4ddd5', borderRadius: 30, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Parenting Tips</a>
          <a href="#" style={{ padding: '8px 22px', background: 'white', color: '#1a2340', border: '1px solid #e4ddd5', borderRadius: 30, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Style</a>
        </div>
      </div>

      <div className="page-body" style={{ paddingTop: 60 }}>
        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 30px rgba(26,35,64,0.10)', display: 'grid', gridTemplateColumns: '1fr 1fr', marginBottom: 60 }}>
          <div>
            <img src="https://placehold.co/700x480/f5e8ef/8b2252?text=Featured+Post" alt="Featured Post" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
          </div>
          <div style={{ padding: 50, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#c0a0b5', marginBottom: 14 }}>Baby Care &nbsp;·&nbsp; December 2025</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 400, lineHeight: 1.35, marginBottom: 16 }}>How to Bathe Your Newborn: A Step-by-Step Guide for New Parents</h2>
            <p style={{ color: '#888', lineHeight: 1.8, fontSize: 14, marginBottom: 24 }}>Bathing your newborn for the first time can be a nerve-wracking experience. Here's our complete, expert-backed guide with everything you need to know…</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <img src="https://placehold.co/40x40/f5e8ef/8b2252?text=A" alt="Author" style={{ width: 40, height: 40, borderRadius: '50%' }}/>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Baby Hub Team</div>
                <div style={{ fontSize: 12, color: '#aaa' }}>5 min read</div>
              </div>
            </div>
            <a href="#" style={{ display: 'inline-block', padding: '12px 28px', background: '#1a2340', color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', borderRadius: 4, width: 'max-content' }}>Read Article</a>
          </div>
        </div>
      </div>

      <div className="page-body" style={{ paddingBottom: 80 }}>
        <div className="blog-layout">
          {[
            { img: 'https://placehold.co/500x340/fff0f5/6b1a3a?text=Nursery', tag: 'Nursery', tagColor: '#1a2340', date: 'November 2025 · 8 min read', title: 'The Ultimate Nursery Checklist: Everything You Need Before Baby Arrives', excerpt: "From the cot to the changing table — our comprehensive nursery checklist ensures you don't miss a single essential for your new arrival." },
            { img: 'https://placehold.co/500x340/f8f0ff/3a1060?text=Gifting', tag: 'Gifting', tagColor: '#c0a0b5', date: 'October 2025 · 6 min read', title: 'Best Baby Shower Gifts of 2026: A Guide for Every Budget', excerpt: "Choosing the perfect baby shower gift doesn't have to be stressful. We've curated our top picks from Rs. 2,000 to Rs. 25,000 to suit every budget." },
            { img: 'https://placehold.co/500x340/fdf0e0/60300a?text=Style', tag: 'Style', tagColor: '#c9973c', date: 'September 2025 · 4 min read', title: 'Baby Hub Featured in British Vogue\'s "Best Baby Brands Worldwide"', excerpt: "We are beyond thrilled to share that Baby Hub Sri Lanka has been featured in British Vogue's prestigious global round-up of the world's finest baby brands." },
            { img: 'https://placehold.co/500x340/eefaee/1a5030?text=Parenting', tag: 'Parenting Tips', tagColor: '#1e7d46', date: 'August 2025 · 7 min read', title: 'Sleep Training 101: A Gentle Approach for Sri Lankan Parents', excerpt: 'Sleep deprivation is one of the hardest parts of early parenthood. Our gentle, evidence-based guide helps you find a routine that works for your whole family.' },
            { img: 'https://placehold.co/500x340/f0f0ff/1a0a60?text=Smocking', tag: 'Style', tagColor: '#1a2340', date: 'July 2025 · 5 min read', title: "The Art of Hand Smocking: Sri Lanka's Finest Artisan Tradition", excerpt: "Discover the centuries-old art of hand smocking and why Baby Hub is dedicated to preserving this beautiful Sri Lankan artisan craft for future generations." },
            { img: 'https://placehold.co/500x340/fff8e8/604010?text=Registry', tag: 'Gifting', tagColor: '#c9973c', date: 'June 2025 · 3 min read', title: 'How to Create the Perfect Baby Registry: A Step-by-Step Guide', excerpt: 'A well-curated baby registry makes gift-giving easy for loved ones and ensures you get exactly what you need. Here\'s how to build yours with Baby Hub.' },
          ].map((p, i) => (
            <article className="blog-card" key={i}>
              <div className="blog-img-wrap">
                <img src={p.img} alt="" className="blog-img"/>
                <span style={{ position: 'absolute', top: 14, left: 14, background: p.tagColor, color: 'white', padding: '5px 12px', borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>{p.tag}</span>
              </div>
              <div className="blog-info">
                <div className="blog-date">{p.date}</div>
                <h3 className="blog-title">{p.title}</h3>
                <p className="blog-excerpt">{p.excerpt}</p>
                <a href="#" className="blog-read-more">Read More →</a>
              </div>
            </article>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 50 }}>
          <button style={{ width: 38, height: 38, background: '#1a2340', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>1</button>
          <button style={{ width: 38, height: 38, background: 'white', color: '#1a2340', border: '1px solid #e4ddd5', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>2</button>
          <button style={{ width: 38, height: 38, background: 'white', color: '#1a2340', border: '1px solid #e4ddd5', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>3</button>
          <button style={{ width: 38, height: 38, background: 'white', color: '#1a2340', border: '1px solid #e4ddd5', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>›</button>
        </div>
      </div>

      <div className="newsletter-bar">
        <div className="newsletter-inner">
          <h2 className="newsletter-title">Get the Latest from Baby Hub</h2>
          <p className="newsletter-sub">Subscribe for parenting tips, new arrivals and exclusive offers.</p>
          <form className="newsletter-form form-newsletter">
            <input type="email" placeholder="Your email address…" required/>
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </>
  );
}
