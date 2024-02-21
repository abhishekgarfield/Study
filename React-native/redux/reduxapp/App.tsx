import {Provider} from 'react-redux';
import {Store} from './src/store/store';
import Counter from './src/components/counter';
import {AppState, Dimensions} from 'react-native';
import {useEffect} from 'react';

const App = () => {
  let a = Dimensions.get('window').height;
  let b = Dimensions.get('screen').height;
  console.log('------a------', a, '-------b-----', b);
  useEffect(() => {
    let test = AppState.addEventListener('change', state => {
      console.log(state);
    });
    () => {
      test.remove();
    };
  });
  return (
    <Provider store={Store}>
      <Counter />
    </Provider>
  );
};
export default App;
