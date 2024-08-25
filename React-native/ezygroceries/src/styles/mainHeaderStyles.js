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
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},

  searchBarTopContainer :{
    marginTop:2,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
  },

  searchbarInnerContainer:{flexDirection: 'row', flex: 1, padding: 10, alignItems:'center'},
  textInputStyles:{flexBasis: '60%', flexGrow: 1, display: 'flex', color:black},



};
