import '@styles/globals.scss'
import '@styles/globals.css'
import type { AppProps } from 'next/app'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { SSRProvider } from 'react-bootstrap'
import { ProgressBar } from '@components/ProgressBar'

// config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <ProgressBar />
      <Component {...pageProps} />
    </SSRProvider>

  )
}

export default MyApp
