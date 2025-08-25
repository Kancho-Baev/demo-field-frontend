import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apolloClient } from './lib/apollo-client';
import Dashboard from './pages/Dashboard';
import { ModalProvider } from './providers/ModalProvider';
import NotFound from './components/NotFound';

export const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ModalProvider>
        <Router>
          <div className="min-h-screen bg-gray-900">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </Router>
      </ModalProvider>
    </ApolloProvider>
  );
};
