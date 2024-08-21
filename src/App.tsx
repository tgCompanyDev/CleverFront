import V2Example from './Example';
import { CardList } from './components/cards-wrapper/CardList';

const App = () => {
  return (
    <>
        <header>header</header>
        <main className='container'>
            <CardList />
            <V2Example />
        </main>
        <footer>footer</footer>
    </>
  );
};

export default App;