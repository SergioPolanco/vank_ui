import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export interface NavLinkProps {
  text: string;
  href: string;
}

const LinkStyled = styled(Link)`
  && {
    color: #fff;
    text-decoration: none;
    padding: 6px;

    &:hover {
      background-color: rgba(144, 202, 249, 0.08);
    }
  }
`;

const NavLink = ({ text, href }: NavLinkProps) => {
  return (
    <Typography className="nav" variant="h6" component={LinkStyled} href={href}>
      {text}
    </Typography>
  );
};

export default NavLink;
