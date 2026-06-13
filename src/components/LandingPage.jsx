import React, { useState } from 'react';
import { retroAudio } from '../utils/retroAudio';
import landingHeadImg from '../assets/landing_head.png';
import landingTitleImg from '../assets/landing_title.png'; // 新增的標題圖片

export default function LandingPage({ onEnter }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleEnterClick = () => {
    retroAudio.playEnter();
    onEnter();
  };

  const handleMenuClick = () => {
    retroAudio.playClick();
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="landing-container" style={{ position: 'relative', minHeight: '100vh', justifyContent: 'center', gap: '15px', padding: '40px 20px' }}>
      
      {/* SVG Wiggle Filter (手繪歪歪扭扭效果濾鏡) */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="wiggle" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* 
        ==================================================
        1. 左上角選單三條線 (Top-Left Menu Icon)
        ==================================================
        要調整選單按鈕的大小：
        - 調整最外層 button 的 top, left 可以改變按鈕在螢幕上的位置。
        - 調整 svg 的 width 和 height 可以改變三條線的大小（目前為寬 60px / 高 45px，已放大）。
        - 調整 path 的 strokeWidth 可以改變線條的粗細（目前為 4.5px）。
      */}
      <div style={{ position: 'absolute', top: '30px', left: '30px', zIndex: 100 }}>
        <button 
          onClick={handleMenuClick}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg 
            width="60"  /* 👈 調整選單寬度 */
            height="45" /* 👈 調整選單高度 */
            viewBox="0 0 40 30" 
            style={{ filter: 'url(#wiggle)' }}
          >
            <path d="M 5,6 Q 20,4 35,6" stroke="white" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
            <path d="M 6,15 Q 18,17 34,14" stroke="white" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
            <path d="M 4,24 Q 22,23 36,25" stroke="white" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
          </svg>
        </button>

        {/* 下拉選單選單本體 */}
        {menuOpen && (
          <div style={{
            position: 'absolute',
            top: '60px',
            left: '10px',
            background: '#000',
            color: '#fff',
            border: '3px solid #fff',
            borderRadius: '4px',
            padding: '15px',
            width: '200px',
            fontSize: '0.95rem',
            textAlign: 'left',
            filter: 'url(#wiggle)',
            boxShadow: '6px 6px 0 #333'
          }}>
            <p style={{ fontWeight: 'bold', borderBottom: '1px dashed #fff', paddingBottom: '6px', marginBottom: '10px' }}>
              教團佈告欄
            </p>
            <p style={{ margin: '6px 0' }}>• 教祖: 影山茂夫</p>
            <p style={{ margin: '6px 0' }}>• 管理: 小酒窩</p>
            <p style={{ margin: '6px 0' }}>• 宗旨: 快樂與歡笑</p>
            <p style={{ fontSize: '0.8rem', marginTop: '12px', color: '#ffeb3b', textAlign: 'center' }}>
              (請點擊 ENTER 進入總部)
            </p>
          </div>
        )}
      </div>

      {/* 
        ==================================================
        2. 中間 Mob 頭像 (Center Head Outline)
        ==================================================
        要調整中間頭像的大小：
        - 調整容器的 height (目前為 420px，已放大) 可以改變圖片佔據的垂直高度。
        - 圖片設有 maxHeight: '100%' 和 maxWidth: '100%'，會自適應容器大小。
      */}
      <div style={{
        width: '100%',
        height: '280px', /* 👈 已從 420px 縮小至 280px，避免垂直高度溢出切到 ENTER 按鈕 */
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '0px', /* 👈 移除底部邊距，改用主容器的 gap 統一控制間距 */
        padding: '0 20px'
      }}>
        <img 
          src={landingHeadImg} 
          alt="Psycho Helmet Face" 
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.2))'
          }}
        />
      </div>

      {/* 
        ==================================================
        3. 下方「－ サイコヘルメット教 －」標題圖片 (Title Image)
        ==================================================
        要調整標題圖片的大小：
        - 調整容器的 height (目前為 110px) 可以設定它的最大高度限制。
        - 調整圖片 style 的 maxWidth (目前為 80%) 可以改變它在網頁中佔據的寬度比例（例如 90% 會更寬）。
      */}
      <div style={{
        width: '100%',
        height: '80px', /* 👈 已從 110px 縮小至 80px，防止高度切到 ENTER */
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '0px', /* 👈 移除底部邊距 */
        filter: 'url(#wiggle)' /* 👈 標題圖案同樣套用手繪歪斜濾鏡 */
      }}>
        <img 
          src={landingTitleImg} 
          alt="－ サイコヘルメット教 －" 
          style={{
            maxHeight: '100%',
            maxWidth: '95%', /* 👈 改為 95% 寬度，在手機版上可以儘可能塞滿左右 */
            objectFit: 'contain'
          }}
        />
      </div>

      {/* 
        ==================================================
        4. 最下方 ENTER 純文字按鈕 (ENTER Text Button)
        ==================================================
        要調整 ENTER 按鈕的大小：
        - 調整 fontSize (目前為 3.2rem，已放大) 可以直接改變字體大小。
        - 調整 letterSpacing 可以改變字距（目前為 0.15em）。
      */}
      <button 
        className="wavy-latin"
        onClick={handleEnterClick}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '2.8rem', /* 👈 由於間距變為緊湊，ENTER 字型可以稍微放大為 2.8rem 看得更清楚 */
          fontWeight: 'bold',
          cursor: 'pointer',
          letterSpacing: '0.15em',
          filter: 'url(#wiggle)',
          fontFamily: "'Delius', sans-serif",
          transition: 'all 0.15s ease',
          outline: 'none',
          padding: '10px 20px',
          margin: '0 auto',
          display: 'block'
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#ffeb3b';
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = 'white';
          e.target.style.transform = 'scale(1)';
        }}
      >
        ENTER
      </button>

    </div>
  );
}
