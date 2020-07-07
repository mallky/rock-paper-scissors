import { handScissorsO } from 'react-icons-kit/fa/handScissorsO';
import { handPaperO } from 'react-icons-kit/fa/handPaperO';
import { handRockO } from 'react-icons-kit/fa/handRockO';

export class IconService {
  readonly ICONS: Record<string, any>[] = [{ handRockO }, { handScissorsO }, { handPaperO }];

  getIconById(id: string) {
    const iconData = this.ICONS.find((icon) => icon[id]);

    if (!iconData) {
      return null;
    }

    return iconData[id];
  }
}
