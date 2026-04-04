import { Navigate, Route, Routes } from 'react-router-dom';
import MenuPage from './Menu/page';
import MapPage from './Map/page';
import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';

export const RoutesPages = () => {
  return (
    <Routes>
      {/* Rotas públicas: redireciona para /map se já estiver logado */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<MenuPage />} />
      </Route>

      {/* Rotas protegidas: redireciona para / se não estiver logado */}
      <Route element={<ProtectedRoute />}>
        <Route path="/map" element={<MapPage />} />
      </Route>

      {/* Qualquer rota não mapeada volta para / */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
