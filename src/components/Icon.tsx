// Ícones em traço (24×24), desenhados para herdar a cor do texto.

const paths = {
  senior: (
    <>
      <circle cx="12" cy="5" r="2.5" />
      <path d="M12 8v6l-3 7M12 14l3 7M8.5 11.5 12 10l3.5 1.5M18 13v8" />
    </>
  ),
  building: (
    <>
      <path d="M3 21h18M5 21V10l7-5 7 5v11" />
      <path d="M9 21v-6h6v6M9 11h.01M15 11h.01" />
    </>
  ),
  badge: (
    <>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M9 6V4h6v2M7 15h4M7 12h6" />
      <circle cx="16.5" cy="12.5" r="1.5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </>
  ),
  family: (
    <>
      <circle cx="8" cy="6" r="2.5" />
      <circle cx="16.5" cy="8" r="2" />
      <path d="M3.5 20v-5a4.5 4.5 0 0 1 9 0v5M13 20v-3.5a3.5 3.5 0 0 1 7 0V20" />
    </>
  ),
  store: (
    <>
      <path d="M4 9 5.5 4h13L20 9M4 9h16v2a2.7 2.7 0 0 1-5.3 0 2.7 2.7 0 0 1-5.4 0A2.7 2.7 0 0 1 4 11V9Z" />
      <path d="M5 13v8h14v-8M10 21v-5h4v5" />
    </>
  ),
  swap: <path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7" />,
  card: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 10h19M6.5 15h4" />
    </>
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  car: (
    <>
      <path d="M5 17H3v-5l2.2-5.2A2 2 0 0 1 7 5.5h10a2 2 0 0 1 1.8 1.3L21 12v5h-2" />
      <path d="M3 12h18M9 17h6" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </>
  ),
  home: <path d="M3 11 12 3l9 8M5 9.5V21h5v-6h4v6h5V9.5" />,
  pos: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <rect x="8.5" y="5" width="7" height="5" rx="1" />
      <path d="M9 14h.01M12 14h.01M15 14h.01M9 17h.01M12 17h.01M15 17h.01" />
    </>
  ),
  whatsapp: (
    <path d="M3.5 20.5 5 16.3A8.5 8.5 0 1 1 8 19.2l-4.5 1.3ZM9 8.5c0 3.5 3 6.5 6.5 6.5l1.2-1.6-2.1-1-1 .9a4.5 4.5 0 0 1-2.4-2.4l.9-1-1-2.1L9 8.5Z" />
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  phone: <path d="M5 3h3.5l1.5 5-2.2 1.5a11 11 0 0 0 6.7 6.7L16 14l5 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />,
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-5 4V5ZM8 9.5h8M8 12.5h5" />,
  doc: (
    <>
      <path d="M6 2.5h8l4 4v15H6v-19Z" />
      <path d="M14 2.5v4h4M9 12h6M9 15.5h6M9 8.5h2" />
    </>
  ),
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  calculator: (
    <>
      <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
      <path d="M8 6.5h8v3H8zM8.5 13h.01M12 13h.01M15.5 13h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01" />
    </>
  ),
  heart: <path d="M12 20s-8-4.7-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.3 12 20 12 20Z" />,
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "size-6", strokeWidth = 1.7 }: { name: IconName; className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
