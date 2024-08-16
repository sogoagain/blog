import styled from "@emotion/styled";

const DividedListItem = styled.li`
  padding: 2rem 0;
  border-bottom: 1px dashed grey;
  &:first-of-type {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export default DividedListItem;
