import '@/styles/globals.css'
import { wrapper, store } from '@/redux/store'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
export default wrapper.withRedux(MyApp)


