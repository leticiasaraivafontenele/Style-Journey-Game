import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { RoutesPages } from './pages/main';
import { useToast } from './contexts/ToastContext';
import { setFlashMessengerCallback } from './utils/flashMessenger';

function App() {
  const { addToast } = useToast();

  useEffect(() => {
    setFlashMessengerCallback(addToast);
  }, [addToast]);

  return (
      <div className="app">
        <Routes>
          <Route path="*" element={<RoutesPages />} />
        </Routes>
      </div>      
  )
}

export default App
