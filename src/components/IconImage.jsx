import styled from "@emotion/styled";

import { unit } from "../styles/styles";

const IconImage = styled.img({}, (props) => ({
  width: unit(props.level),
  height: unit(props.level),
}));

export default IconImage;
