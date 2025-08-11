import { Routes, Route, Navigate } from 'react-router-dom';
import MapPage from './pages/MapPage';
import CreateMeme from './pages/CreateMeme';
import MemeDetail from './pages/MemeDetail';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MapPage />} />
      <Route path="/create" element={<CreateMeme />} />
      <Route path="/m/:id" element={<MemeDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
