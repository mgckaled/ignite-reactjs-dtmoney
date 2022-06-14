import styled from "styled-components";

export const Container = styled.div`

  /* disposição das 'divs' no container */
  display: grid;
  /* separação das 'divs' em formato de grid */
  grid-template-columns: repeat(3, 1fr);

  /* espaçamento entre os elementos do grid */
  gap: 2rem; 

  margin-top: -10rem;

  /* estilo de cada caixa  */
  div {
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--text-tile);


    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      /* Por padrão, o strong vem com display 'inline' */
      display: block;

      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    } 

    &.highlight-background {
      background: var(--green);
      color: #fff;
    }
  }
`;