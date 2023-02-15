import '../styles/globals.css';

import { wrapper } from '../redux/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyApp = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <>
          <Component {...props.pageProps} />
          <ToastContainer position='bottom-right' />
    </>

  )
}

export default wrapper.withRedux(MyApp);
