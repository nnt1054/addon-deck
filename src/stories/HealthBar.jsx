export const HealthBar = ({ health, maxHealth, width, color }) => {
  const percentHealth = maxHealth ? health / maxHealth : 0;
  const increasing = true;

  const barStyle = {
    position: 'relative',
    height: '12px',
    width: width ? `${width}px` : '256px',
    border: '4px solid black',
    borderRadius: '8px',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    overflow: 'hidden',
  };

  const progressStyle = {
    position: 'absolute',
    height: '12px',
    borderRadius: '8px',
    width: `${percentHealth * 100}%`,
    transition: `width 0.1s`,
    backgroundColor: color ? color : '#82DFA1',
    zIndex: 2,
  };

  const underbarStyle = {
    position: 'absolute',
    height: '12px',
    borderRadius: '8px',
    width: `${percentHealth * 100}%`,
    transition: `width 0.1s`,
    transitionDelay: `0.4s`,
    backgroundColor: 'white',
    zIndex: 1,
  };

  return (
    <div style={barStyle}>
      <div style={progressStyle}></div>
      <div style={underbarStyle}></div>
    </div>
  );
};

export default HealthBar;
