import React, { useState, useEffect } from 'react';
import { retroAudio } from '../utils/retroAudio';
import mainBanner from '../assets/main-banner.png';
import merchandiseImg from '../assets/merchandise.png';
import landingHeadImg from '../assets/landing_head.png';
import landingTitleImg from '../assets/landing_title.png';
import banner580kImg from '../assets/banner_580k.jpg';
import mainImg1 from '../assets/main-img1.jpg';

export default function MainPage({ onExit }) {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(62315100);
  
  // Bulletin Board State
  const [posts, setPosts] = useState([
    { id: 1, author: '小酒窩 (エクボ)', text: '本教隨時歡迎迷惘的羔羊，只要信奉超能安全帽教，你就能獲得幸福！', date: '2026-06-13 10:15' },
    { id: 2, author: '靈幻新隆 (Reigen)', text: '如果是煩惱諮詢，建議也來我們「靈類諮詢所」，新客享有首小時半價優惠喔。', date: '2026-06-13 11:30' },
    { id: 3, author: '路人 (Mob)', text: '師父，請不要在這裡做生意廣告。另外，請問大家有看到我的貓嗎？', date: '2026-06-13 12:05' }
  ]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');

  // Audio Playback State
  const [isMuted, setIsMuted] = useState(false);

  // Shop Modal State
  const [shopModalOpen, setShopModalOpen] = useState(false);
  const [shopDialogText, setShopDialogText] = useState('');
  const [shopCharacter, setShopCharacter] = useState('');

  // God's Voice State
  const [godVoiceActive, setGodVoiceActive] = useState(false);
  const [pageShake, setPageShake] = useState(false);

  // Auto-increment visitor count for fun retro feel
  useEffect(() => {
    // Start background music loop when component mounts
    retroAudio.startMelody();

    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);

    return () => {
      clearInterval(interval);
      retroAudio.stopMelody();
    };
  }, []);

  const handleTabChange = (tab) => {
    retroAudio.playClick();
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      retroAudio.setVolume(0.15);
      retroAudio.startMelody();
      setIsMuted(false);
    } else {
      retroAudio.setVolume(0);
      retroAudio.stopMelody();
      setIsMuted(true);
    }
  };

  // God's Voice effect
  const handleHearGodVoice = () => {
    retroAudio.playGodVoice();
    setGodVoiceActive(true);
    setPageShake(true);

    setTimeout(() => {
      setPageShake(false);
    }, 1000);

    setTimeout(() => {
      setGodVoiceActive(false);
    }, 3000);
  };

  // Add post to Board
  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    retroAudio.playClick();
    
    const newPost = {
      id: Date.now(),
      author: newAuthor,
      text: newText,
      date: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };

    setPosts([newPost, ...posts]);
    setNewAuthor('');
    setNewText('');
  };

  // Buy merchandise logic
  const handleBuyItem = (itemName) => {
    retroAudio.playClick();
    
    let char = '教團管理員';
    let text = '';

    if (itemName.includes('馬克杯')) {
      char = '小酒窩 (Dimple)';
      text = '哦？眼光不錯嘛！喝了這杯「神之馬克杯」盛裝的水，你的超能力覺醒概率會提高0.0001%哦！';
    } else if (itemName.includes('筆')) {
      char = '靈幻新隆 (Reigen)';
      text = '買神之原子筆？不如來我這買我的親筆簽名，或者做個全身精油除靈按摩，效果更佳喔！';
    } else if (itemName.includes('扇子')) {
      char = '暗田留 (Kurata)';
      text = '這把紅色的神之團扇超可愛的！拿著它說不定可以跟外星人進行心靈感應呢！';
    } else {
      char = '影山律 (Ritsu)';
      text = '謝謝你支持我哥哥（雖然他根本不知道這網站的存在）。請妥善保管這個鑰匙圈。';
    }

    setShopCharacter(char);
    setShopDialogText(text);
    setShopModalOpen(true);
  };

  // Format visitor count to string
  const formatVisitor = (num) => {
    return String(num).padStart(9, '0');
  };

  return (
    <div className={`${pageShake ? 'pulse-anim' : ''}`} style={{ minHeight: '100vh', background: '#fff' }}>
      
      {/* God's Voice Dark Overlay Screen */}
      {godVoiceActive && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 50, 0, 0.85)',
          color: '#39ff14',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          fontSize: '1.8rem',
          textAlign: 'center',
          padding: '20px',
          textShadow: '0 0 10px #39ff14'
        }}>
          <div className="float-anim" style={{ fontSize: '3rem', marginBottom: '20px' }}>🥦</div>
          <p>「聆聽神樹的啟示...」</p>
          <p style={{ fontSize: '1.2rem', marginTop: '20px', color: '#fff' }}>
            （耳邊傳來一陣神祕的 8-bit 電磁雜音...）
          </p>
        </div>
      )}

      {/* Main Wrapper Container */}
      <div className="main-wrapper">
        
        {/* Marquee Ticker */}
        <div className="marquee-container">
          <div className="marquee-text">
            ★★★ 歡迎來到超能安全帽教（サイコヘルメット教）官方網站！神樹（巨大花椰菜）參拜活動火熱募集中！加入教團即可獲得心靈的平靜！★★★
          </div>
        </div>

        {/* Layout columns */}
        <div className="main-layout">
          
          {/* LEFT SIDEBAR (Blue background pattern) */}
          <aside className="sidebar-left bg-tiled-sidebar" style={{ position: 'relative' }}>
            {/* SVG Wiggle Filter definition for Left Sidebar menu icon */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
              <defs>
                <filter id="wiggle-sidebar" x="-10%" y="-10%" width="120%" height="120%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>
            </svg>

            <div className="sidebar-content-wrapper">
              {/* Hand-drawn Menu Icon (Clickable to toggle menu on mobile) */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '15px auto 20px auto',
                  outline: 'none'
                }}
                title="選單"
              >
                <svg width="60" height="45" viewBox="0 0 40 30" style={{ filter: 'url(#wiggle-sidebar)' }}>
                  <path d="M 5,6 Q 20,4 35,6" stroke="black" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
                  <path d="M 6,15 Q 18,17 34,14" stroke="black" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
                  <path d="M 4,24 Q 22,23 36,25" stroke="black" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
                </svg>
              </button>

            <div className={`menu-list-collapse ${mobileMenuOpen ? 'show' : ''}`}>
              {/* BGM Toggle Widget */}
              <div className="retro-border" style={{ background: '#fff', padding: '10px', marginBottom: '15px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>🎵 BGM 播放器</span>
                <button className="gods-voice-btn retro-border" onClick={handleToggleMute}>
                  {isMuted ? '🔇 靜音中' : '🔊 播放中'}
                </button>
              </div>
              <button 
                className={`menu-btn menu-btn-red ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => handleTabChange('home')}
              >
                〇 網站首頁
              </button>
              <button 
                className={`menu-btn menu-btn-blue ${activeTab === 'what-is' ? 'active' : ''}`}
                onClick={() => handleTabChange('what-is')}
              >
                〇 超能安全帽教是什麼？
              </button>
              <button 
                className={`menu-btn menu-btn-red ${activeTab === 'teachings' ? 'active' : ''}`}
                onClick={() => handleTabChange('teachings')}
              >
                〇 本教教義
              </button>
              <button 
                className={`menu-btn menu-btn-blue ${activeTab === 'activities' ? 'active' : ''}`}
                onClick={() => handleTabChange('activities')}
              >
                〇 活動報告
              </button>
              <button 
                className={`menu-btn menu-btn-red ${activeTab === 'voices' ? 'active' : ''}`}
                onClick={() => handleTabChange('voices')}
              >
                〇 信徒的心聲
              </button>
              <button 
                className={`menu-btn menu-btn-blue ${activeTab === 'board' ? 'active' : ''}`}
                onClick={() => handleTabChange('board')}
              >
                〇 信徒留言板
              </button>
              <button 
                className={`menu-btn menu-btn-red ${activeTab === 'qa' ? 'active' : ''}`}
                onClick={() => handleTabChange('qa')}
              >
                〇 常見問答 Q&A
              </button>
              <button 
                className={`menu-btn menu-btn-blue ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => handleTabChange('contact')}
              >
                〇 聯絡我們
              </button>
              <button 
                className={`menu-btn menu-btn-red ${activeTab === 'links' ? 'active' : ''}`}
                onClick={() => handleTabChange('links')}
              >
                〇 友情連結
              </button>

              {/* Hear God's Voice */}
              <div className="gods-voice-box retro-border">
                <p style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px' }}>神秘小裝置</p>
                <button 
                  className="gods-voice-btn retro-border"
                  onClick={handleHearGodVoice}
                >
                  👂 傾聽神之音
                </button>
              </div>

              {/* Under Construction */}
              <div className="under-construction-box float-anim">
                🚧 工事中 🚧
                <p style={{ fontSize: '0.7rem', fontWeight: 'normal', marginTop: '4px' }}>正在進行精神武裝</p>
              </div>

              {/* What's New */}
              <div className="whats-new-box retro-border">
                <div className="whats-new-title">★ What's New !!</div>
                <ul style={{ listStyleType: 'square', paddingLeft: '14px', fontSize: '0.75rem', lineHeight: '1.4' }}>
                  <li>06/13：周邊商店隆重開幕！</li>
                  <li>05/20：尋找碗公頭神明通告發布。</li>
                  <li>04/01：本教官方留言板上線！</li>
                </ul>
              </div>
            </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="content-panel" style={{ position: 'relative', overflowY: 'auto', backgroundColor: '#ffffff' }}>
            {/* 滿版背景：黑色版本的頭，重複排列，透明度 40% */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${landingHeadImg})`,
              backgroundSize: '160px 160px',
              backgroundRepeat: 'repeat',
              filter: 'invert(1)', // 將原本白色的 Mob 頭像反轉為黑色
              opacity: 0.15, // 20% 透明度
              pointerEvents: 'none',
              zIndex: 0
            }} />

            {/* 主要內容容器，需置於 zIndex: 1 以浮於背景之上 */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              
              {/* 最上面的－ サイコヘルメット教 －，使用 landing_title.png 改成黑色 */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '80px',
                marginBottom: '20px',
                filter: 'url(#wiggle-sidebar)' /* 套用左側一樣的手繪歪斜濾鏡 */
              }}>
                <img 
                  src={landingTitleImg} 
                  alt="－ サイコヘルメット教 －" 
                  style={{
                    maxHeight: '100%',
                    maxWidth: '90%',
                    objectFit: 'contain',
                    filter: 'invert(1)' /* 將白色標題字反轉為黑色 */
                  }}
                />
              </div>

              {activeTab === 'home' && (
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '30px', 
                  width: '100%',
                  paddingBottom: '40px'
                }}>
                  {/* 
                    ================================================================
                    【圖片與文字交替置中排版區】
                    
                    👉 圖片與文字排版順序為：圖片 1 -> 文字 1 -> 圖片 2 -> 文字 2 -> 圖片 3 -> 文字 3
                    
                    【修改程式碼教學】：
                    1. 更換圖片：
                       若要更換圖片，請將下面 <img> 標籤中的 `src` 屬性換成您的圖片變數（例如將 src={mainBanner} 改成 src={yourImportedImage}）
                       或直接填寫網路圖片 URL（例如 src="https://example.com/your-image.png"）。
                    2. 更換文字：
                       若要更換文字，請直接修改各個段落標籤（如 <p> 或 <h3>）內部的文字內容即可。
                    3. 置中對齊：
                       所有的區塊都已在內聯樣式中設定為水平置中。
                    ================================================================
                  */}

                  {/* 1. 【圖片 1】 首頁歡迎橫幅照片 */}
                  <div style={{ width: '100%', maxWidth: '700px', display: 'flex', justifyContent: 'center' }}>
                    <img 
                      src={mainImg1} 
                      alt="Cult Believers" 
                      style={{ width: '100%', height: 'auto', objectFit: 'contain' }} 
                    />
                  </div>

                  {/* 2. 【文字 1】 首頁歡迎介紹文字 */}
                  <div style={{ width: '100%', maxWidth: '700px', textAlign: 'center', lineHeight: '1.8', fontSize: '1.05rem', color: '#000000' }}>
                    <p style={{ margin: '0 auto', maxWidth: '600px', fontWeight: 'bold' }}>
                      皆様ようこそサイコヘルメット教へ・・・
                    </p>
                    <p style={{ margin: '10px auto 0 auto', maxWidth: '600px' }}>
                      這裡展示了我們教團的日常活動與最新資訊。如果你對「腦電波罩」感興趣，或是想要獲得心靈的平靜與快樂，歡迎點擊左側選單了解更多！我們隨時熱烈歡迎所有新信徒的加入！
                    </p>
                  </div>

                  {/* 3. 【圖片 2】 周邊商品清單展示圖 */}
                  <div style={{ width: '100%', maxWidth: '500px', display: 'flex', justifyContent: 'center' }}>
                    <img 
                      src={merchandiseImg} 
                      alt="Merchandise List" 
                      style={{ width: '100%', height: 'auto', objectFit: 'contain' }} 
                    />
                  </div>

                  {/* 4. 【文字 2】 周邊商品列表與奉獻購入表格 */}
                  <div style={{ width: '100%', maxWidth: '700px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px', color: '#000000' }}>
                      神聖教團周邊商品 (神の周邊)
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#ff3333', fontWeight: 'bold', marginBottom: '15px' }}>
                      ★ 限時熱賣中！所有商品皆注入了神樹花椰菜的微量超能力能量。
                    </p>
                    <div style={{ display: 'inline-block', width: '100%', overflowX: 'auto', textAlign: 'center' }}>
                      <table className="merch-table" style={{ margin: '0 auto', width: '100%', maxWidth: '600px', background: 'rgba(255, 255, 255, 0.9)' }}>
                        <thead>
                          <tr>
                            <th>周邊名稱</th>
                            <th>功用說明</th>
                            <th>奉獻價</th>
                            <th>購買</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>神之馬克杯</strong></td>
                            <td>喝水順暢，頭腦清醒</td>
                            <td>¥ 800</td>
                            <td>
                              <button className="buy-btn" style={{ border: '2px solid #000' }} onClick={() => handleBuyItem('神之馬克杯')}>購入</button>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>神之原子筆組</strong></td>
                            <td>考運提升，簽名有力</td>
                            <td>¥ 800</td>
                            <td>
                              <button className="buy-btn" style={{ border: '2px solid #000' }} onClick={() => handleBuyItem('神之原子筆組')}>購入</button>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>神之紅色團扇</strong></td>
                            <td>夏日扇風，驅除惡靈</td>
                            <td>¥ 800</td>
                            <td>
                              <button className="buy-btn" style={{ border: '2px solid #000' }} onClick={() => handleBuyItem('神之紅色團扇')}>購入</button>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>神之超能鑰匙圈</strong></td>
                            <td>保佑平安，防止鑰匙遺失</td>
                            <td>¥ 800</td>
                            <td>
                              <button className="buy-btn" style={{ border: '2px solid #000' }} onClick={() => handleBuyItem('神之超能鑰匙圈')}>購入</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 5. 【圖片 3】 580k 信徒突破慶往橫幅 */}
                  <div style={{ width: '100%', maxWidth: '700px', display: 'flex', justifyContent: 'center' }}>
                    <img 
                      src={banner580kImg} 
                      alt="580k Believers Event" 
                      style={{ width: '100%', height: 'auto', objectFit: 'contain' }} 
                    />
                  </div>

                  {/* 6. 【文字 3】 580k 信徒慶祝活動描述 */}
                  <div style={{ width: '100%', maxWidth: '700px', textAlign: 'center', lineHeight: '1.8', fontSize: '1.05rem', color: '#000000' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px', color: '#000000' }}>
                      祝 信者數 580,000人突破!!
                    </h3>
                    <p style={{ margin: '0 auto', maxWidth: '600px', fontWeight: 'bold' }}>
                      〇月✕日土曜日 味玉縣調味市▲▲會館
                    </p>
                    <p style={{ margin: '10px auto 0 auto', maxWidth: '600px', fontSize: '0.95rem' }}>
                      我們在調味市會館舉辦了信眾突破 58 萬人的大型紀念慶祝活動！感謝各位信徒的虔誠信仰與支持，在神樹的庇佑下，我們將繼續把幸福與歡笑帶給更多人。
                    </p>
                  </div>

                </div>
              )}

              {activeTab === 'what-is' && (
                <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.85)', borderRadius: '8px' }}>
                  <h2 className="merch-section-title" style={{ fontSize: '1.6rem' }}>腦電波罩是什麼？</h2>
                  <p style={{ lineHeight: '1.7', marginBottom: '15px' }}>
                    「腦電波罩（サイコヘルメット）」是本教的信仰核心與神明。
                    他以一頭極具標誌性的黑亮「碗公頭（Bowl Cut）」形象著稱，是拯救過調味市無數次的神祕超能力者。
                  </p>
                  <p style={{ lineHeight: '1.7', marginBottom: '15px' }}>
                    傳說，他是一位極其溫柔、不濫用能力、且深知「真正的強大來自於內心」的少年。
                    本教致力於尋找並追隨這位神明大人的步伐，祈求神明賜予我們精神的昇華。
                  </p>
                  <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '3rem' }}>
                    👦🏻✨🥦
                  </div>
                </div>
              )}

              {activeTab === 'teachings' && (
                <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.85)', borderRadius: '8px' }}>
                  <h2 className="merch-section-title" style={{ fontSize: '1.6rem' }}>本教三大教義</h2>
                  <ol style={{ paddingLeft: '20px', lineHeight: '2', fontSize: '1.1rem' }}>
                    <li style={{ marginBottom: '10px' }}>
                      <strong>傾聽內心的聲音 (心の声を聞く)：</strong> 
                      每個人都有潛在的心靈力量，拋開外界雜音，聆聽內心深處最真實的渴望。
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      <strong>每日歡笑，拒絕壓力 (毎日楽しく笑う)：</strong> 
                      壓力是心靈的除草劑。在超能安全帽教中，我們提倡開懷大笑，讓心靈隨時充滿能量。
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                      <strong>尋求人與人的真誠連結 (真の繋がり)：</strong> 
                      我們不是孤單一人。在神樹花椰菜的恩澤下，我們所有信徒是一家人。
                    </li>
                  </ol>
                </div>
              )}

              {activeTab === 'activities' && (
                <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.85)', borderRadius: '8px' }}>
                  <h2 className="merch-section-title" style={{ fontSize: '1.6rem' }}>教團活動報告</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ borderBottom: '1px dashed #ccc', paddingBottom: '10px' }}>
                      <h4 style={{ color: 'var(--color-retro-blue-dark)', marginBottom: '5px' }}>【神樹參拜大會】順利落幕！</h4>
                      <p style={{ fontSize: '0.9rem' }}>我們召集了 500 位忠實信眾前往調味市中心的神樹（巨大花椰菜）遺址進行集體冥想。參拜過程中多位信徒反映聽到了神的囈語，心靈得到了極大治癒。</p>
                    </div>
                    <div style={{ borderBottom: '1px dashed #ccc', paddingBottom: '10px' }}>
                      <h4 style={{ color: 'var(--color-retro-blue-dark)', marginBottom: '5px' }}>【社區環保清潔義工服務】</h4>
                      <p style={{ fontSize: '0.9rem' }}>貫徹神明的善良精神，本教信徒昨日自發進行了街道清掃，清除了 50 餘袋垃圾。為市民營造了更好的生活環境！</p>
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--color-retro-blue-dark)', marginBottom: '5px' }}>【腦電波讀心術研討會】</h4>
                      <p style={{ fontSize: '0.9rem' }}>特別邀請知名靈能大師（靈幻新隆先生的助理...？）為信徒講解如何引導體內意念，學員們均表示收穫頗豐。</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'voices' && (
                <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.85)', borderRadius: '8px' }}>
                  <h2 className="merch-section-title" style={{ fontSize: '1.6rem' }}>信徒的心聲 (感應分享)</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <blockquote style={{ background: '#eee', padding: '10px', borderLeft: '4px solid var(--color-retro-red)', borderRadius: '4px' }}>
                      <p style={{ fontStyle: 'italic', fontSize: '0.95rem' }}>「以前我在學校很沒有自信，自從每晚睡前對著花椰菜祈禱，並加入教團後，我突然開竅，現在功課越來越進步了！」</p>
                      <cite style={{ display: 'block', textAlign: 'right', fontSize: '0.8rem', marginTop: '5px', fontWeight: 'bold' }}>— 國中二年級 影山同學 (14歲)</cite>
                    </blockquote>
                    <blockquote style={{ background: '#eee', padding: '10px', borderLeft: '4px solid var(--color-retro-blue)', borderRadius: '4px' }}>
                      <p style={{ fontStyle: 'italic', fontSize: '0.95rem' }}>「我本來肩頸酸痛多年，但在參加過教團的冥想集會，並購買了神之馬克杯喝水之後，肩膀奇蹟般地不痛了！真神降臨！」</p>
                      <cite style={{ display: 'block', textAlign: 'right', fontSize: '0.8rem', marginTop: '5px', fontWeight: 'bold' }}>— 軟體工程師 鈴木先生 (32歲)</cite>
                    </blockquote>
                    <blockquote style={{ background: '#eee', padding: '10px', borderLeft: '4px solid var(--color-retro-yellow)', borderRadius: '4px' }}>
                      <p style={{ fontStyle: 'italic', fontSize: '0.95rem' }}>「只要每天念誦『碗公頭、碗公頭』十遍，心情就會莫名變好。我把鑰匙圈掛在包包上，整個人都覺得很有安全感！」</p>
                      <cite style={{ display: 'block', textAlign: 'right', fontSize: '0.8rem', marginTop: '5px', fontWeight: 'bold' }}>— 高中女學生 柴田小姐 (17歲)</cite>
                    </blockquote>
                  </div>
                </div>
              )}

              {activeTab === 'board' && (
                <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.85)', borderRadius: '8px' }}>
                  <h2 className="merch-section-title" style={{ fontSize: '1.6rem' }}>信徒留言板 (掲示板)</h2>
                  <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '15px' }}>
                    ※ 歡迎在此留言交流信教心得或日常生活煩惱。禁止發表任何人身攻擊或不良廣告。
                  </p>

                  {/* Form to submit a message */}
                  <div className="board-container" style={{ background: 'rgba(255, 255, 255, 0.95)', border: '2px solid #000', borderRadius: '4px', padding: '15px', marginTop: '15px' }}>
                    <form onSubmit={handleAddPost} className="board-form">
                      <div className="board-input-row">
                        <input 
                          type="text" 
                          placeholder="信徒名稱 (Name)" 
                          className="board-input board-input-name"
                          value={newAuthor}
                          onChange={(e) => setNewAuthor(e.target.value)}
                          maxLength={15}
                          required
                        />
                        <input 
                          type="text" 
                          placeholder="請輸入留言內容..." 
                          className="board-input board-input-text"
                          value={newText}
                          onChange={(e) => setNewText(e.target.value)}
                          maxLength={100}
                          required
                        />
                      </div>
                      <button type="submit" className="board-submit-btn" style={{ border: '2px solid #000', borderRadius: '4px' }}>
                        📝 發表留言
                      </button>
                    </form>

                    {/* List of posts */}
                    <div className="board-posts">
                      {posts.map(post => (
                        <div key={post.id} className="board-post" style={{ border: '1px solid #ccc' }}>
                          <div className="post-meta">
                            <span className="post-author">{post.author}</span>
                            <span>{post.date}</span>
                          </div>
                          <p className="post-content">{post.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'qa' && (
                <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.85)', borderRadius: '8px' }}>
                  <h2 className="merch-section-title" style={{ fontSize: '1.6rem' }}>常見問答 Q&A</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', lineHeight: '1.6' }}>
                    <div>
                      <h4 style={{ color: 'var(--color-retro-red)' }}>Q: 加入超能安全帽教需要繳納昂貴的會費嗎？</h4>
                      <p style={{ paddingLeft: '15px', borderLeft: '3px solid #ccc' }}>
                        A: 完全不需要！我們是一個倡導心靈自由與和諧的團體，加入教團是免費的。
                        我們僅提供周邊商品的自由認購與奉獻箱，所有資金均用於教團宣傳及社區公益服務。
                      </p>
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--color-retro-red)' }}>Q: 我聽說教團以前跟一些都市傳說（如巨大花椰菜、神樹）有關？</h4>
                      <p style={{ paddingLeft: '15px', borderLeft: '3px solid #ccc' }}>
                        A: 沒錯！那棵聳立在調味市的巨大神樹（長得很像花椰菜的巨木）是本教的信仰聖地。
                        雖然它已經在與其他強大力量的戰鬥中消失了，但神樹遺留下來的愛與能量依然保佑著我們。
                      </p>
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--color-retro-red)' }}>Q: 請問創始人是誰？真的是照片上那個少年嗎？</h4>
                      <p style={{ paddingLeft: '15px', borderLeft: '3px solid #ccc' }}>
                        A: 咳... 關於創始人（神明大人）的真實身分，為了保護他的平靜生活，教團官方不予公開。
                        但只要大家心中存有善念，碗公頭神明就會一直在身邊守護著你！
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.85)', borderRadius: '8px' }}>
                  <h2 className="merch-section-title" style={{ fontSize: '1.6rem' }}>聯絡我們 (諮詢窗口)</h2>
                  <p style={{ marginBottom: '15px', fontSize: '0.95rem' }}>如果您對教團事務、集會參拜、或周邊商品有任何疑問，請填寫下表與我們取得聯繫：</p>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    retroAudio.playClick();
                    alert('諮詢信件已通過腦電波傳送！我們將在感應到您的想法後回覆您。');
                  }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>聯絡信箱 Email:</label>
                      <input type="email" required className="board-input" style={{ width: '100%' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>您的問題 Message:</label>
                      <textarea required rows={4} className="board-input" style={{ width: '100%', resize: 'none' }}></textarea>
                    </div>
                    <button type="submit" className="board-submit-btn" style={{ alignSelf: 'flex-start', border: '2px solid #000', borderRadius: '4px' }}>
                      🚀 傳送電波諮詢
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'links' && (
                <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.85)', borderRadius: '8px' }}>
                  <h2 className="merch-section-title" style={{ fontSize: '1.6rem' }}>友情連結 (相關網站)</h2>
                  <p style={{ marginBottom: '15px' }}>以下為與本教保持友好關係的機構網頁，歡迎參觀：</p>
                  <ul style={{ paddingLeft: '20px', lineHeight: '2', fontSize: '1.1rem' }}>
                    <li>
                      <a href="#reigen" onClick={(e) => { e.preventDefault(); alert('正在連接至：靈類諮詢相談所（所長：靈幻新隆，除靈、占卜、按摩樣樣精通）'); }} style={{ color: 'var(--color-retro-blue-dark)', fontWeight: 'bold' }}>
                        🔗 靈類諮詢相談所 (Spirits & Such Consultation Office)
                      </a>
                    </li>
                    <li>
                      <a href="#salt" onClick={(e) => { e.preventDefault(); alert('即將跳轉至鹽中學學生會官方佈告欄。'); }} style={{ color: 'var(--color-retro-blue-dark)' }}>
                        🔗 鹽中學學生會官方網站 (Salt Middle School)
                      </a>
                    </li>
                    <li>
                      <a href="#telepathy" onClick={(e) => { e.preventDefault(); alert('該社團目前正忙於召喚外星人，網站暫停更新。'); }} style={{ color: 'var(--color-retro-blue-dark)' }}>
                        🔗 腦電波電波部同好會 (Telepathy Club Fanpage)
                      </a>
                    </li>
                  </ul>
                </div>
              )}

            </div>
          </main>

          {/* RIGHT SIDEBAR (Blue background pattern) */}
          <aside className="sidebar-right bg-tiled-sidebar">
            <div className="sidebar-content-wrapper">
            
            {/* Online Shop Card */}
            <div className="online-shop-card retro-border" onClick={() => handleBuyItem('全部')}>
              <h4 style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>ONLINE SHOP</h4>
              <p style={{ fontSize: '0.75rem', borderBottom: '1px solid #fff', paddingBottom: '4px', marginBottom: '8px' }}>線上購物點此</p>
              <div style={{ background: '#fff', padding: '6px', borderRadius: '4px', display: 'inline-block' }}>
                <svg width="60" height="40" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
                  {/* Styled Green Scroll Merch Icon */}
                  <rect x="5" y="8" width="50" height="24" rx="3" fill="#3ab54a" stroke="#000" strokeWidth="2"/>
                  <circle cx="30" cy="20" r="7" fill="#fff" stroke="#000" strokeWidth="2"/>
                  <rect x="28" y="17" width="4" height="6" fill="#000"/>
                  <circle cx="15" cy="20" r="3" fill="#fce83a"/>
                  <circle cx="45" cy="20" r="3" fill="#fce83a"/>
                </svg>
              </div>
              <p style={{ fontWeight: 'bold', marginTop: '6px', fontSize: '0.9rem' }}>按此奉獻購入</p>
            </div>

            {/* Visitor Counter */}
            <div className="visitor-counter-box retro-border">
              <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#555' }}>訪客計數器</span>
              <div className="counter-digits">
                {formatVisitor(visitorCount)}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#888', display: 'block' }}>
                你是第 {visitorCount} 位光臨的信徒
              </span>
            </div>

            {/* Searching for God */}
            <div className="retro-border" style={{ background: '#fff', padding: '10px', textAlign: 'center', marginBottom: '20px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '0.85rem', color: 'red', display: 'block', marginBottom: '6px' }}>
                🔍 神を捜しています
              </span>
              <div style={{ 
                width: '100%', 
                height: '80px', 
                background: '#ddd', 
                border: '1px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                padding: '4px'
              }}>
                碗公頭少年<br />（影山茂夫 ？）
              </div>
              <p style={{ fontSize: '0.7rem', color: '#666', marginTop: '4px' }}>
                凡提供確實目擊情報者，將獲神樹祝福！
              </p>
            </div>

            {/* Simulated Twitter Widget */}
            <div className="twitter-feed-box retro-border">
              <div className="twitter-header">🕊️ 腦電波傳送門</div>
              <div className="tweet-list">
                <div className="tweet-item">
                  <span className="tweet-user">@psycho_official</span>
                  <p>今天是教團祈福冥想日，請所有信徒在 18:00 朝神樹遺址方向閉眼冥想 5 分鐘！🥦</p>
                </div>
                <div className="tweet-item">
                  <span className="tweet-user">@believer_A</span>
                  <p>自從我把房間鋪滿花椰菜之後，考試真的都拿100分！超能安全帽教真的太神啦！</p>
                </div>
                <div className="tweet-item">
                  <span className="tweet-user">@spirits_n_such</span>
                  <p>【工商】有惡靈困擾或戀愛煩惱嗎？歡迎至調味市靈類諮詢相談所，所長靈幻隨時為您服務。</p>
                </div>
              </div>
              
              {/* Giant Broccoli SVG Graphic */}
              <div style={{ marginTop: 'auto', borderTop: '1px solid #38444d', paddingTop: '4px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.65rem', color: '#8899a6' }}>- 信仰聖地: 神樹(花椰菜) -</span>
                <svg width="100%" height="45" viewBox="0 0 100 45" xmlns="http://www.w3.org/2000/svg">
                  {/* Drawn Broccoli SVG */}
                  <rect x="0" y="0" width="100" height="45" fill="#15202b"/>
                  {/* Trunk */}
                  <rect x="47" y="25" width="6" height="15" fill="#8B4513"/>
                  {/* Leaves (Broccoli crown) */}
                  <circle cx="42" cy="18" r="12" fill="#228B22"/>
                  <circle cx="58" cy="18" r="12" fill="#228B22"/>
                  <circle cx="50" cy="13" r="14" fill="#32CD32"/>
                  {/* Eyes (funny Mob eyes on broccoli) */}
                  <ellipse cx="46" cy="15" rx="2" ry="3" fill="#fff"/>
                  <ellipse cx="54" cy="15" rx="2" ry="3" fill="#fff"/>
                  <circle cx="46" cy="15" r="1" fill="#000"/>
                  <circle cx="54" cy="15" r="1" fill="#000"/>
                </svg>
              </div>
            </div>
            </div>

          </aside>

        </div>

        {/* Footer Area */}
        <footer style={{ 
          background: '#e1dfdd', 
          borderTop: 'var(--border-thick)', 
          padding: '15px', 
          textAlign: 'center', 
          fontSize: '0.8rem',
          fontWeight: 'bold' 
        }}>
          <p>無任何商業用途</p>
          <p style={{ marginTop: '5px' }}>
            <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={onExit}>
              返回進入頁面
            </span>
          </p>
        </footer>

      </div>

      {/* Online Shop Dialog Modal */}
      {shopModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content retro-border">
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📦</div>
            <h3 style={{ marginBottom: '10px', color: 'var(--color-retro-blue-dark)' }}>周邊店長說：</h3>
            <p style={{ fontWeight: 'bold', color: 'var(--color-retro-red)', marginBottom: '8px' }}>
              【 {shopCharacter} 】
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.5', background: '#f9f9f9', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}>
              "{shopDialogText}"
            </p>
            <button 
              className="modal-close retro-border"
              onClick={() => setShopModalOpen(false)}
            >
              了解！
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
