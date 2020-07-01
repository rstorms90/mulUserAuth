import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
${({ theme }) => css`
  html {
    height: 100%;

    body {
      margin: 0;
      background: ${theme.colors.background};
      color: #ffffff;
      font-family: 'Montserrat', sans-serif;

      #root {
        background: ${theme.colors.background};
        color: ${theme.colors.black};
      }
    }

    .Header {
      background: ${theme.colors.headerBackground};
    }

    .page-title {
      color: ${theme.colors.pageTitle};
    }
  }
`}
`;
