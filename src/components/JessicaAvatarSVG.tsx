import React from 'react';

interface JessicaAvatarProps {
  size?: number;
  className?: string;
}

export const JessicaAvatarSVG: React.FC<JessicaAvatarProps> = ({ size = 38, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
    >
      <defs>
        {/* Soft pastel background circle */}
        <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF1EB" />
          <stop offset="100%" stopColor="#ACE0F9" />
        </radialGradient>
        {/* Hair gradient */}
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2A1B18" />
          <stop offset="100%" stopColor="#120B09" />
        </linearGradient>
        {/* Skin gradient */}
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDDFCF" />
          <stop offset="100%" stopColor="#F5BCA6" />
        </linearGradient>
        {/* Sweater pink gradient */}
        <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF9EB5" />
          <stop offset="100%" stopColor="#F47291" />
        </linearGradient>
        {/* Glass reflection gradient */}
        <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle cx="50" cy="50" r="50" fill="url(#bgGrad)" />

      {/* Shirt / Collar */}
      <path
        d="M22 92C23 76 34 71 43 73L50 78L57 73C66 71 77 76 78 92C78 96 74 100 70 100H30C26 100 22 96 22 92Z"
        fill="url(#shirtGrad)"
      />
      {/* White collar detail */}
      <path d="M43 73L50 82L57 73L50 76Z" fill="#FFFFFF" />

      {/* Neck */}
      <rect x="44" y="62" width="12" height="15" rx="5" fill="url(#skinGrad)" />

      {/* Back Hair */}
      <circle cx="50" cy="46" r="32" fill="url(#hairGrad)" />
      {/* Top Bun */}
      <circle cx="50" cy="19" r="13" fill="url(#hairGrad)" />
      <circle cx="49" cy="18" r="10" fill="#3D2924" opacity="0.6" />

      {/* Head / Face */}
      <ellipse cx="50" cy="50" rx="23" ry="22" fill="url(#skinGrad)" />

      {/* Cheeks blush */}
      <ellipse cx="37" cy="56" rx="4.5" ry="2.8" fill="#FF839B" opacity="0.35" />
      <ellipse cx="63" cy="56" rx="4.5" ry="2.8" fill="#FF839B" opacity="0.35" />

      {/* Eyebrows */}
      <path d="M34 40Q39 37 44 40" stroke="#2A1B18" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M56 40Q61 37 66 40" stroke="#2A1B18" strokeWidth="2.2" strokeLinecap="round" />

      {/* Eyes */}
      <circle cx="39" cy="46" r="3.6" fill="#1C110F" />
      <circle cx="61" cy="46" r="3.6" fill="#1C110F" />
      {/* Eye highlights */}
      <circle cx="38" cy="44.8" r="1.3" fill="#FFFFFF" />
      <circle cx="60" cy="44.8" r="1.3" fill="#FFFFFF" />

      {/* Cute button nose */}
      <ellipse cx="50" cy="52" rx="1.8" ry="1.2" fill="#E29E85" />

      {/* Smile */}
      <path d="M46 58Q50 62 54 58" stroke="#B85952" strokeWidth="2" strokeLinecap="round" />

      {/* Front Hair / Bangs & Side locks */}
      <path
        d="M27 44C27 30 35 25 50 25C65 25 73 30 73 44C73 48 71 54 70 57C68 53 66 46 64 43C58 39 52 41 50 41C48 41 42 39 36 43C34 46 32 53 30 57C29 54 27 48 27 44Z"
        fill="url(#hairGrad)"
      />

      {/* Round Glasses Frame (iconic black hipster round spectacles) */}
      {/* Left Lens */}
      <circle cx="39" cy="47" r="9.5" stroke="#18181B" strokeWidth="2.8" fill="rgba(255,255,255,0.12)" />
      {/* Right Lens */}
      <circle cx="61" cy="47" r="9.5" stroke="#18181B" strokeWidth="2.8" fill="rgba(255,255,255,0.12)" />
      {/* Glasses Bridge */}
      <path d="M48.5 45Q50 43.5 51.5 45" stroke="#18181B" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      {/* Glasses temples */}
      <path d="M29.5 46L26 44.5" stroke="#18181B" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M70.5 46L74 44.5" stroke="#18181B" strokeWidth="2.4" strokeLinecap="round" />

      {/* Lens reflection glares */}
      <path d="M34 42L41 40" stroke="url(#glassReflect)" strokeWidth="2" strokeLinecap="round" />
      <path d="M56 42L63 40" stroke="url(#glassReflect)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
