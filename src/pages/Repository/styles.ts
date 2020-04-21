import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    transition: color 0.2s;

    &:hover,
    &:active {
      color: #666;
    }

    svg {
      margin-right: 4px;
    }
  }
`;

export const RepositoryInfo = styled.section`
  margin-top: 80px;

  header {
    display: flex;
    align-items: center;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    div {
      margin-left: 24px;

      strong {
        font-size: 36px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #737380;
        margin-top: 4px;
      }
    }
  }

  @media (max-width: 40rem) {
    margin-top: 40px;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      font-size: 24px;
    }

    p {
      font-size: 14px;
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;

    li {
      & + li {
        margin-left: 80px;
      }

      strong {
        display: block;
        font-size: 36px;
        color: #3d3d4d;
      }

      span {
        display: block;
        margin-top: 4px;
        color: #6c6c80;
      }
    }

    @media (max-width: 40rem) {
      justify-content: space-around;

      li {
        & + li {
          margin-left: 0;
        }

        strong {
          font-size: 24px;
        }
      }
    }
  }
`;

export const RepositoryInfoSkeleton = styled.section`
  margin-top: 80px;

  @media (max-width: 40rem) {
    margin-top: 40px;
  }

  header {
    display: flex;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
      margin-left: 18px;
      width: 100%;

      span {
        margin-top: 10px;
      }
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;

    li {
      & + li {
        margin-left: 80px;
      }

      span {
        display: block;

        & + span {
          margin-top: 8px;
        }
      }
    }
  }
`;

export const Issues = styled.div`
  margin-top: 80px;

  @media (max-width: 40rem) {
    margin-top: 40px;
  }

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    text-decoration: none;
    box-shadow: 0px 0px 6px 0px #adadad;

    display: flex;
    align-items: center;
    transition: transform 0.2s;

    &:hover,
    &:active {
      transform: translateX(10px);
    }

    & + a {
      margin-top: 16px;
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;

export const IssuesSkeleton = styled.div`
  background: #fff;
  border-radius: 5px;
  width: 100%;
  padding: 24px;

  & + div {
    margin-top: 16px;
  }

  div {
    display: flex;
    flex-direction: column;

    span:last-child {
      margin-top: 8px;
    }
  }
`;
