// DescriptionBox.js
import styled from "styled-components";

const DescriptionBox = styled.div`
  font-size: 0.8rem;
  color: #000;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  tr {
    border-bottom: 1px solid #ddd;
  }

  td {
    padding: 10px;
    border-right: 1px solid #ddd;
  }

  tr:last-child td {
    border-bottom: none;
  }

  td:last-child {
    border-right: none;
  }
`;

export default DescriptionBox;
