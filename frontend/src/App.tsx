import { Route, Routes } from "react-router-dom";
import { RoutesPages } from './pages/main';

function App() {

  return (
      <div className="app">
        <Routes>
          <Route path="*" element={<RoutesPages />} />
        </Routes>
      </div>      
  )
}

export default App
