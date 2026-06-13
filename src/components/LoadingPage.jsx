import React, { useState, useEffect } from 'react';
import landingHeadImg from '../assets/landing_head.png';

export default function LoadingPage({ onFinished }) {
  const [dots, setDots] = useState('...');

  // 1. 主轉場定時器：2.5秒後切換到主網頁
  useEffect(() => {
    const timer = setTimeout(onFinished, 2500);
    return () => clearTimeout(timer);
  }, [onFinished]);

  // 2. 「...」點點動畫定時器：每 500 毫秒循環變化一、二、三個點
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '.') return '..';
        if (prev === '..') return '...';
        return '.';
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container bg-tiled-diagonal" style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#e3e2de', /* 溫暖的日系復古灰白色背景 */
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      {/* SVG Wiggle Filter (手繪歪歪扭扭效果濾鏡，給文字使用) */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="wiggle-loading" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* 
        ==================================================
        1. 中間的頭像 (Center Head)
        ==================================================
        - 採用高品質透明 PNG 檔案，擁有完美向量畫質，不模糊。
        - 按照要求設定成 80% 透明度 (opacity: 0.8)。
      */}
      <div style={{
        height: '240px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
        transform: 'scaleY(0.8)' /* 👈 垂直縮小為 80% (扁平化)，非等比 */
      }}>
        <img 
          src={landingHeadImg} 
          alt="Loading Head Outline" 
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            filter: 'invert(1)', /* 👈 將白線反轉為黑線 */
            opacity: 0.6 /* 👈 60% 透明度 */
          }}
        />
      </div>

      {/* 
        ==================================================
        2. 下方的 Now Loading 字樣 (Now Loading Text)
        ==================================================
        - 以 HTML 高畫質向量文字呈現，非圖片，字體邊緣絕不模糊。
        - 改為黑色 (#000000)，且透明度設為 80% (opacity: 0.8)。
        - 動態更新後面點點的個數，創造出經典載入動畫。
      */}
      <h2 
        style={{
          color: '#000000',
          opacity: 0.6, /* 👈 80% 透明度 */
          fontSize: '2.5rem',
          fontWeight: 'bold',
          letterSpacing: '0.05em',
          fontFamily: "'Delius', sans-serif", /* 手寫字母字型 */
          filter: 'url(#wiggle-loading)', /* 套用手繪歪斜濾鏡 */
          margin: 0,
          textAlign: 'center',
          userSelect: 'none'
        }}
      >
        Now Loading{dots}
      </h2>

    </div>
  );
}
