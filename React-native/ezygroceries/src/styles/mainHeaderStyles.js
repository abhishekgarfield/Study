import {smallTitles} from '../assets/fonts';
import { black, fadedBlack } from '../components/Common/colors';

export const mainHeaderStyles = {
  greetinText: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: smallTitles,
    color:black

  },
  dateText: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: smallTitles,
    color: fadedBlack
  },
  headerTextContainer: {
    flex: 2,
    paddingHorizontal: 10,
  },
  personDp: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  topView: {
    display: 'flex',
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
};
