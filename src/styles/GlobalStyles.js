import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --bg-dark: #f8fafc; /* Slate 50 - Light Background */
    --bg-card: #ffffff; /* White - Card Background */
    --text-primary: #0f172a; /* Slate 900 - Dark Text */
    --text-secondary: #64748b; /* Slate 500 - Muted Text */
    --accent-primary: #0ea5e9; /* Sky 500 - Primary Accent */
    --accent-glow: rgba(14, 165, 233, 0.2); /* Softer glow for light mode */
    --danger: #ef4444;
    --success: #22c55e;
    --warning: #eab308;
    --font-main: 'Inter', sans-serif;
    --border-color: #e2e8f0; /* Slate 200 - Light Border */
  }

  body {
    margin: 0;
    padding: 0;
    font-family: var(--font-main);
    background-color: var(--bg-dark);
    color: var(--text-primary);
    overflow-x: hidden;
  }

  * {
    box-sizing: border-box;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-dark);
  }

  ::-webkit-scrollbar-thumb {
    background: #cbd5e1; /* Slate 300 */
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--accent-primary);
  }
`;
