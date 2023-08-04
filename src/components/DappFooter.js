
import {
  Footer,
  Text,
} from 'grommet';

import SocialMedia from './Footer/SocialMedia';
import TrustedBy from './Footer/TrustedBy';

export default function DappFooter() {

  return (
    <Footer pad="large" direction="row-responsive">
      <Text color="#F1F1F1" size="small" textAlign="center">
        © All Rights Reserved - LumiShare LUMI.
      </Text>
      <TrustedBy />
      <SocialMedia />
    </Footer>
  )
}
