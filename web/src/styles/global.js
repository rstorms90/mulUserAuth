import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
${({ theme }) => css`
  html {
    height: 100%;
    box-sizing: border-box;

    body {
      margin: 0;
      background: ${theme.colors.background};
      color: ${theme.colors.fontColor};
      font-family: 'Montserrat', sans-serif;

      #root {
        background: ${theme.colors.background};
        color: ${theme.colors.black};
      }
    }
  }

  .Header {
    background: ${theme.colors.darkShade};
  }

  .page-title {
    color: ${theme.colors.primaryHighlight};
  }

  .commonBtn:before {
    background: ${theme.colors.primaryHighlight};
  }
`}
`;
