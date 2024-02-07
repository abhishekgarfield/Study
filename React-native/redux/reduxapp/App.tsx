import { Provider } from 'react-redux';
import { Store } from './src/store/store';
import Counter from './src/components/counter';

const App = () => {
  return (
    <Provider store={Store}>
      <Counter/>
    </Provider>
  );
};
export default App;
