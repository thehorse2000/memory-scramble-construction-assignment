function format(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function Timer({ secondsLeft }) {
  const warn = secondsLeft <= 10;
  return (
    <div className={`timer ${warn ? 'timer--warn' : ''}`}>
      <span className="timer__label">Time</span>
      <span className="timer__value">{format(secondsLeft)}</span>
    </div>
  );
}
