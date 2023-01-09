
import './App.scss';
import { useSession } from './hooks/useSession';
import { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_HTTP } from './constants';
import MainPage from './components/pages/MainPage';
function App() {
  const [userProfile, setUserProfile] = useState({});
  // useEffect(() => {
  //   axios.post(BACKEND_HTTP + '/login', { username: 'damicab214', password: '123456' }).then((data) => {
  //     setUserProfile(data.data.sessionData.userProfile.company_email)
  //   })
  // }, []);
  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
