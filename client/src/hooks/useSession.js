import { useState, useEffect, useCallback, useMemo } from 'react';
import { BACKEND_HTTP } from '../constants';
import axios from 'axios';

export const useSession = () => {
    const [session, setSession] = useState({});
    useMemo(() => {
        return axios.get(`${BACKEND_HTTP}/session`).then((data) => {
            setSession(data);
        })
    }, [session])
    return session;
}