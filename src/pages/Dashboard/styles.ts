import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;

  margin-top: 80px;

  @media (max-width: 40rem) {
    margin-top: 40px;
    font-size: 36px;
  }
`;

export const Form = styled.form<FormProps>`
  margin-top: 40px;

  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0;

    &[disabled] {
      opacity: 0.5;
    }

    ${(props) =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    &::placeholder {
      color: #a8a8b3;
    }

    @media (max-width: 40rem) {
      height: 50px;
    }
  }

  button {
    width: 210px;
    height: 70px;
    background: #04d361;
    border-radius: 0px 5px 5px 0px;
    color: white;
    font-weight: bold;
    transition: background-color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;

    &[disabled] {
      opacity: 0.7;

      svg {
        animation: spin 3s linear infinite;

        @keyframes spin {
          from {
            transform: rotate(0);
          }
          to {
            transform: rotate(360deg);
          }
        }
      }
    }

    &:hover not[disabled],
    &:active not[disabled] {
      background: ${shade(0.2, '#04d361')};
    }

    span {
      display: block;
      margin-left: 4px;
    }

    @media (max-width: 40rem) {
      width: 60px;
      height: 50px;

      span {
        display: none;
      }
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;

  background: #fff;
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  box-shadow: 0px 0px 6px 0px #adadad;
  position: relative;

  & > svg {
    margin-right: 8px;
    display: none;
    cursor: pointer;
  }

  & + div {
    margin-top: 16px;
  }

  .btn-delete {
    position: absolute;
    top: 0;
    right: 0;
    margin: 8px;
    display: none;
  }

  .btn-delete:hover {
    color: #000;
  }

  &:hover,
  &:active {
    transform: translateX(10px);

    .btn-delete {
      display: block;
    }

    .btn-delete:hover {
      color: #000 !important;
      z-index: 100;
    }
  }

  @media (max-width: 40rem) {
    .btn-delete {
      display: block;
    }
  }
`;

export const Repositories = styled.div`
  flex: 1;
  margin-top: 60px;
  position: relative;

  a {
    flex: 1;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: transform 0.2s;

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
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

export const RepositorySkeleton = styled.div`
  background: #fff;
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  text-decoration: none;
  box-shadow: 0px 0px 6px 0px #adadad;
  margin-bottom: 16px;

  display: flex;
  align-items: center;

  div {
    margin: 0 16px;
    flex: 1;
    display: flex;
    flex-direction: column;

    span:last-child {
      margin-top: 8px;
    }
  }
`;
