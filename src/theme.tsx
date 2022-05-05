import { LinkProps } from '@mui/material/Link';
import { createTheme } from '@mui/material/styles';
import LinkBehavior from './common/components/LinkBehavior';

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

export default theme;
