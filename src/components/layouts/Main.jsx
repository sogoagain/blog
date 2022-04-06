import styled from "@emotion/styled";

import { unit } from "../../styles";

const Main = styled.main({
  maxWidth: unit(160),
  margin: "0 auto",
  minHeight: `calc(100vh - ${unit(17.75)})`,
});

export default Main;
