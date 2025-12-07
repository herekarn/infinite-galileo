import React, { useState } from 'react';
import Xarrow, { Xwrapper } from 'react-xarrows';
import './App.css';

// 1. ข้อมูลจำลอง (เลียนแบบจากใบงานในรูปภาพ)
const appliances = [
  { id: 'app1', name: 'โทรทัศน์ (TV)', image: '/tv.png' },
  { id: 'app2', name: 'กาน้ำร้อน', image: '/kettle.png' },
  { id: 'app3', name: 'ตู้เย็น', image: '/fridge.png' },
  { id: 'app4', name: 'พัดลม', image: '/fan.png' },
  { id: 'app5', name: 'หม้อหุงข้าว', image: '/rice_cooker.png' },
  { id: 'app6', name: 'โคมไฟ', image: '/lamp.png' },
];

const energies = [
  { id: 'eng1', name: 'พลังงานกล' },
  { id: 'eng2', name: 'พลังงานไฟฟ้า' },
  { id: 'eng3', name: 'พลังงานแสง' },
  { id: 'eng6', name: 'พลังงานเสียง' },
  { id: 'eng4', name: 'พลังงานความร้อน' },
  { id: 'eng5', name: 'พลังงานน้ำ' },
];

// 2. เฉลยคำตอบ
// Key คือ id ของเครื่องใช้ไฟฟ้า, Value คือ array ของ id พลังงานที่ถูกต้อง
const correctAnswers = {
  'app1': ['eng3', 'eng6'], // โทรทัศน์ -> แสง, เสียง
  'app2': ['eng4'],         // กาน้ำร้อน -> ความร้อน
  'app3': ['eng1'],         // ตู้เย็น -> กล
  'app4': ['eng1'],         // พัดลม -> กล
  'app5': ['eng4'],         // หม้อหุงข้าว -> ความร้อน
  'app6': ['eng3', 'eng4'], // โคมไฟ -> แสง, ความร้อน
};

function App() {
  const [lines, setLines] = useState([]);
  const [selectedStart, setSelectedStart] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectStart = (id) => {
    if (showResults) return;
    setSelectedStart(prev => (prev === id ? null : id));
  };

  const lineColors = ['#FF5722', '#2196F3', '#4CAF50', '#FFC107', '#9C27B0', '#E91E63'];

  const handleSelectEnd = (id) => {
    if (showResults || !selectedStart) return;

    const exists = lines.find(line => line.start === selectedStart && line.end === id);
    if (!exists) {
      const colorIndex = lines.length % lineColors.length;
      const newColor = lineColors[colorIndex];
      setLines([...lines, { start: selectedStart, end: id, color: newColor }]);
    }
    setSelectedStart(null);
  };

  const handleRemoveLine = (indexToRemove) => {
    if (showResults) return;
    setLines(lines.filter((_, index) => index !== indexToRemove));
  };

  const handleCheckAnswers = () => {
    let currentScore = 0;
    lines.forEach(line => {
      if (correctAnswers[line.start]?.includes(line.end)) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setShowResults(true);
  };

  const handleReset = () => {
    setLines([]);
    setScore(0);
    setShowResults(false);
    setSelectedStart(null);
  };

  const isLineCorrect = (line) => {
    return correctAnswers[line.start]?.includes(line.end);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Sarabun, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>
        Meena & Mana: ใบงานจับคู่พลังงาน ⚡️
      </h2>
      <p style={{ textAlign: 'center', color: '#666', minHeight: '24px' }}>
        {showResults
          ? `คุณทำได้ ${score} คะแนน! ${score > 3 ? 'เก่งมาก!' : 'พยายามอีกหน่อยนะ!'}`
          : 'คลิกที่รูปฝั่งซ้าย แล้วคลิกคำตอบฝั่งขวา เพื่อโยงเส้น'}
      </p>

      <Xwrapper>
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1000px', margin: '0 auto' }}>
          <div className="column">
            {appliances.map((item) => (
              <div
                key={item.id}
                id={item.id}
                onClick={() => handleSelectStart(item.id)}
                style={{
                  padding: '10px',
                  margin: '15px 0',
                  border: selectedStart === item.id ? '3px solid #FF9800' : '2px dashed #aaa',
                  borderRadius: '15px',
                  cursor: showResults ? 'not-allowed' : 'pointer',
                  backgroundColor: selectedStart === item.id ? '#FFF3E0' : 'white',
                  textAlign: 'center',
                  transition: '0.3s',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '110px',
                  boxSizing: 'border-box',
                  opacity: showResults ? 0.7 : 1
                }}
              >
                <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'contain', marginBottom: '5px' }} />
                <div style={{ fontSize: '14px' }}>{item.name}</div>
              </div>
            ))}
          </div>

          <div className="column">
            {energies.map((item) => (
              <div
                key={item.id}
                id={item.id}
                onClick={() => handleSelectEnd(item.id)}
                style={{
                  padding: '5px',
                  margin: '15px 0',
                  border: '2px dashed #aaa',
                  borderRadius: '15px',
                  cursor: showResults ? 'not-allowed' : 'pointer',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '110px',
                  zIndex: 1,
                  boxSizing: 'border-box',
                  fontSize: '14px',
                  opacity: showResults ? 0.7 : 1
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {lines.map((line, index) => (
          <Xarrow
            key={index}
            start={line.start}
            end={line.end}
            startAnchor="right"
            endAnchor="left"
            color={showResults ? (isLineCorrect(line) ? '#4CAF50' : '#F44336') : line.color}
            strokeWidth={2.4}
            headSize={3.6}
            path="straight"
            curveness={0.5}
            passProps={{
              onClick: () => handleRemoveLine(index),
              style: { cursor: showResults ? 'not-allowed' : 'pointer' }
            }}
            labels={!showResults ? <span style={{ fontSize: '10px', background: 'white', cursor: 'pointer' }}>❌</span> : null}
          />
        ))}
      </Xwrapper>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        {!showResults ? (
          <button
            style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', opacity: lines.length === 0 ? 0.5 : 1 }}
            onClick={handleCheckAnswers}
            disabled={lines.length === 0}
          >
            ตรวจคำตอบ
          </button>
        ) : (
          <button
            style={{ padding: '10px 20px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}
            onClick={handleReset}
          >
            ลองอีกครั้ง
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
