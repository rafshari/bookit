import '../styles/globals.css';
import { wrapper } from '../redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <>
            <SessionProvider session={session}>
                <Component {...pageProps} />;
                <ToastContainer position='bottom-right' />
            </SessionProvider>
        </>
    );
}

export default wrapper.withRedux(MyApp);
