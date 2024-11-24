import Image from 'next/image';
import { Icon } from '@mui/material';

export default function PlaylistRemoveIcon() {
  return (
    <Icon>
      <Image
        alt="RemoveCartIcon"
        src="/images/icons/playlistRemove.svg"
        height={23}
        width={23}
      />
    </Icon>
  );
}
