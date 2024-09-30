import './css/style.css';
import App from './js/App';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const app = new App(root);
  app.init();
});
