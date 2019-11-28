import styled from 'styled-components';

export const UserAvatar = styled.div`
  width: 84px;
  height: 84px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const AvatarDropzone = styled.div`
  width: 84px;
  height: 84px;
  display: flex;
  position: relative;
  cursor: pointer;
  min-width: 84px;

  .image-avatar {
    width: 100%;
    height: 100%;
    border: 2px solid ${props => props.theme.colors.coolGrey};
  }

  .dropzone-avatar {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 1px;
    background-color: rgba(63, 119, 191, 0.03);
    border: 2px dashed ${props => props.theme.colors.coolGrey};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  .image-avatar + .dropzone-avatar {
    display: none;
  }

  &:hover .image-avatar + .dropzone-avatar {
    display: flex;
    background-color: rgba(63, 119, 191, 0.3);
  }
`;

export const AccountStatus = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  text-align: right;
  margin-right: 30px;

  img {
    margin-right: 10px;
  }

  @media(max-width: 767px) {
    position: relative;

    &::after {
      content: ' ';
      clear: both;
    }
  }
`;

export const HR = styled.hr`
  height: 2px;
  background-color: ${props => props.theme.colors.paleGrey};
  opacity: 0.6;
  width: 90%;
  margin: 1rem 0;
  border-top: none;
`;

export const FileTable = styled.table`
  width: 70%;

  thead th {
    line-height: 1.2;
    font-family: 'PT Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: normal;
    color: ${props => props.theme.colors.slateGrey};
    text-align: center;
    padding: .2rem 1rem;
    border: none;
  }

  tbody tr {
    border: 2px solid ${props => props.theme.colors.paleGrey};

    td {
      padding: .5rem 1rem;
      text-align: center;
      vertical-align: middle;

      &:first-child {
        text-align: left;
      }

      .checkbox {
        display: inline-block;
        padding-left: 30px;
      }
    }
  }

  @media(max-width: 767px) {
    width: 100%;
  }
`;
