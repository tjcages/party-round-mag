export default function TaskBarItem() {
  return (
    <svg style={{ display: "none" }} version="2.0">
      <defs>
        <symbol id="windows-icon-16" viewBox="0 0 16 14" fill="none">
          <path fill="red" d="M3 6H2v2h4V6H4v1H3V6Z" />
          <path fill="#00F" d="M3 9H2v2h4V9H4v1H3V9Z" />
          <path fill="#000" d="M0 2h1v2H0z" />
          <path fill="red" d="M0 5h1v2H0z" />
          <path fill="#00F" d="M0 8h1v2H0z" />
          <path
            fill="#000"
            d="M0 11h1v2H0zM2 5V3h1v1h1V3h2V2h1V1h2V0h4v1h2v1h1v12h-1v-1h-2v-1H9v1H7v1H2v-2h1v1h1v-1h2V5H2Z"
          />
          <path fill="red" d="M8 3v3h1V5h1V2H9v1H8Z" />
          <path fill="#00F" d="M8 8v3h1v-1h1V7H9v1H8Z" />
          <path fill="#0F0" d="M13 2h-1v3h1v1h1V3h-1V2Z" />
          <path fill="#FF0" d="M13 7h-1v3h1v1h1V8h-1V7Z" />
        </symbol>
        <symbol id="default-window-icon-16" viewBox="0 0 16 16" fill="none">
          <path
            fill="gray"
            d="M0 1h16v1H0zM2 5h12v1H2zM0 13h15v1H0zM0 2h1v11H0zM14 2h1v11h-1z"
          />
          <path fill="silver" d="M1 2h13v1H1zM1 3h1v10H1z" />
          <path fill="#000" d="M0 14h16v1H0zM16 2h-1v12h1z" />
          <path fill="#0000BF" d="M2 3h12v2H2z" />
          <path fill="#000" d="M8 4h6v1H8z" />
          <path
            fill="#fff"
            d="M8 4h1v1H8zM10 4h1v1h-1zM12 4h1v1h-1zM2 6h12v7H2z"
          />
        </symbol>
        <symbol id="default-window-icon-32" viewBox="0 0 32 32" fill="none">
          <path fill="#000" d="M0 30h32v1H0zM31 2h1v28h-1z" />
          <path
            fill="gray"
            d="M0 2h31v1H0zM2 9h27v1H2zM2 10h1v18H2zM0 29h31v1H0zM0 3h1v26H0zM30 3h1v26h-1z"
          />
          <path
            fill="silver"
            d="M2 3h28v1H2zM2 8h28v1H2zM2 28h28v1H2zM1 3h1v26H1z"
          />
          <path fill="silver" d="M29 8h1v20h-1z" />
          <path fill="#0000BF" d="M2 4h28v4H2z" />
          <path fill="#000" d="M21 5h9v3h-9z" />
          <path fill="silver" d="M21 5h2v2h-2zM24 5h2v2h-2zM27 5h2v2h-2z" />
          <path fill="#fff" d="M3 10h26v18H3z" />
        </symbol>
        <symbol id="minimize-icon" viewBox="0 0 12 10" fill="none">
          <path fill="#000" d="M2 6h6v2H2z" />
        </symbol>
        <symbol id="maximize-icon" viewBox="0 0 12 10" fill="none">
          <path
            fill="#000"
            fillRule="evenodd"
            d="M10 0H1v9h9V0ZM9 2H2v6h7V2Z"
            clipRule="evenodd"
          />
        </symbol>
        <symbol id="restore-icon" viewBox="0 0 12 10" fill="none">
          <path
            fill="#000"
            fillRule="evenodd"
            d="M2 3v6h6V6h2V0H4v3H2Zm3 0V2h4v3H8V3H5ZM3 8V5h4v3H3Z"
            clipRule="evenodd"
          />
        </symbol>
        <symbol id="close-icon" viewBox="0 0 12 10" fill="none">
          <path
            d="M2 2V1H4V2H5V3H7V2H8V1H10V2H9V3H8V4H7V5H8V6H9V7H10V8H8V7H7V6H5V7H4V8H2V7H3V6H4V5H5V4H4V3H3V2H2Z"
            fill="black"
          />
        </symbol>
        <symbol id="programs-icon" viewBox="0 0 24 24" fill="none">
          <path fill="#D9D9D9" d="M6 8h17v15H6z" />
          <path fill="#87888F" d="M0 2v13h1V3h17V2h-7V1h-1V0H2v1H1v1H0Z" />
          <path fill="#fff" d="M1 2v13h1V4h16V3h-7V2h-1V1H2v1H1Z" />
          <path fill="#FF0" d="M3 1h7v1H3z" />
          <path fill="#C0C7C8" d="M1 2h10v1H1zM2 4h16v11H2z" />
          <path
            fill="#FF0"
            d="M2 4h1v1H2zM3 5h1v1H3zM7 5h1v1H7zM11 5h1v1h-1zM15 5h1v1h-1zM5 5h1v1H5zM9 5h1v1H9zM14 5h-1v1h1zM18 5h-1v1h1zM3 7h1v1H3zM3 9h1v1H3zM3 11h1v1H3zM3 13h1v1H3zM2 6h1v1H2zM2 8h1v1H2zM2 10h1v1H2zM2 12h1v1H2zM2 14h1v1H2zM4 4h1v1H4zM8 4h1v1H8zM12 4h1v1h-1zM6 4h1v1H6zM10 4h1v1h-1zM14 4h1v1h-1z"
          />
          <path
            fill="#FF0"
            d="M13 4h-1v1h1zM17 4h-1v1h1zM4 6h1v1H4zM8 6h1v1H8zM12 6h1v1h-1zM6 6h1v1H6zM10 6h1v1h-1zM14 6h1v1h-1z"
          />
          <path
            fill="#FF0"
            d="M13 6h-1v1h1zM17 6h-1v1h1zM4 8h1v1H4zM4 10h1v1H4zM4 12h1v1H4zM4 14h1v1H4z"
          />
          <path fill="#000" d="M5 7h19v17H5z" />
          <path fill="#87888F" d="M5 7h18v16H5z" />
          <path fill="#C0C7C8" d="M6 8h17v15H6z" />
          <path fill="#0000A8" d="M7 9h9v2H7z" />
          <path fill="#000" d="M16 9h6v2h-6z" />
          <path
            fill="#fff"
            d="M16 9h1v1h-1zM18 9h1v1h-1zM20 9h1v1h-1zM7 12h15v10H7z"
          />
          <path fill="#87888F" d="M8 19h3v1H8zM13 19h3v1h-3zM18 19h3v1h-3z" />
          <path fill="#A80057" d="M8 15v2h1v1h1v-1h1v-3H9v1H8Z" />
          <path fill="red" d="M9 14h1v3H9v-1H8v-1h1v-1Z" />
          <path fill="#FF0" d="M9 15h1v1H9z" />
          <path fill="#C0C7C8" d="M8 17h1v1H8z" />
          <path fill="#A857A8" d="M12 17h4v1h-4z" />
          <path fill="#C0C7C8" d="M13 17h1v1h-1z" />
          <path fill="#00F" d="M13 17v-3h1v1h2v1h-1v1h-2Z" />
          <path fill="#0FF" d="M13 15h1v1h-1z" />
          <path fill="#C0C7C8" d="M15 16h1v1h-1z" />
          <path fill="#00A857" d="M18 18h3v-3h-1v-1h-1v2h-1v2Z" />
          <path fill="#0F0" d="M19 16h1v1h-1z" />
          <path fill="#00F" d="M20 16h1v1h-1z" />
          <path fill="#A8A857" d="M0 15h5v1H0z" />
          <path fill="#000" d="M1 16h4v1H1zM18 7V3h1v1h1v3h-2Z" />
          <path fill="#A8A857" d="M18 4h1v3h-1z" />
        </symbol>
        <symbol id="arrow-right" viewBox="0 0 4 7">
          <path fill="currentColor" d="M0 0v7h1V6h1V5h1V4h1V3H3V2H2V1H1V0H0Z" />
        </symbol>
      </defs>
    </svg>
  );
}
