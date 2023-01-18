import styled from 'styled-components';

const Img = styled.img`
  object-fit: contain;
  width: ${(props) => (props.responsive ? '100%' : '')};
`;
export default Img;
