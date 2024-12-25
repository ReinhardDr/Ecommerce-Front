// TopicBox.js
import styled from "styled-components";

const TopicBox = styled.div`
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  text-align: left;

  .topic-title {
    font-size: 1.4rem;
    font-weight: bold;
    color: #1d2e22;
    margin-bottom: 20px;
    text-align: center;
  }

  .topic-description {
    line-height: 1.8;
    font-size: 1rem;
    color: #333;
    margin-bottom: 20px;
    max-height: ${(props) => (props.showMore ? "none" : "150px")};
    overflow: hidden;
    position: relative;
  }

  .topic-description::after {
    content: "";
    display: ${(props) => (props.showMore ? "none" : "block")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #fff 100%);
  }

  .see-more-btn {
    display: block;
    width: 100%;
    padding: 15px;
    font-size: 1rem;
    color: #141c16;
    outline: none;
    border: none;
    border-radius: 5px;
    text-transform: uppercase;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .see-more-btn:hover {
    background-color: #0f6b28;
  }
`;

export default TopicBox;
