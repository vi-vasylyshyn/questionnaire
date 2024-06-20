import type { AppProps } from 'next/app'
import { Open_Sans } from 'next/font/google'
import Head from 'next/head'

import '@/styles/globals.css'

const baseUrl = process.env.BASE_URL || 'https://example.com'
const openSansFont = Open_Sans({ subsets: ['latin'] })

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Questionnaire</title>
        <meta
          name="description"
          content="Unlock deeper understanding and connection in your relationship with our insightful 
          and personalized questionnaire."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="keywords" content="questionnaire, survey, relationship, partner, research" />
        <meta name="url" content={baseUrl} />
        {/* open graph */}
        <meta name="og:type" content="website" />
        <meta name="og:site_name" content="Questionnaire" />
        <meta name="og:url" content={baseUrl} />
        <meta name="og:title" content="Questionnaire | Relationship" />
        <meta
          name="og:description"
          content="Discover more about your relationship with our comprehensive questionnaire 
          designed to deepen your understanding and connection."
        />
        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Questionnaire" />
        <meta name="twitter:title" content="Questionnaire | Relationship" />
        <meta
          name="twitter:description"
          content="To understand your partner better, 
          your personalized questionnaire provides insightful prompts 
          and feedback to help you navigate your relationship journey with confidence."
        />
        <link rel="icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <main className={openSansFont.className}>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default App
