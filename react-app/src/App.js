import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar';
import { Box } from '@mui/material'

function App() {
  return (
    <div className="App">
      <Box sx={{
        padding: '10%'
      }}>
        <Calendar></Calendar>
      </Box>
    </div>
  );
}

export default App;
